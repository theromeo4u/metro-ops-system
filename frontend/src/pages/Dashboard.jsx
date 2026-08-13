import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import TrainCard from "../components/TrainCard.jsx";
import useSocket from "../hooks/useSocket";

export default function Dashboard() {
  const [trains, setTrains] = useState([]);
  const [trainNumber, setTrainNumber] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const socket = useSocket();

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    trainNumber: "",
    status: "",
    location: "",
  });

  const handleEdit = (train) => {
    const newStatus = prompt("Enter new status:", train.status);
    const newLocation = prompt("Enter new location:", train.location);

    if (newStatus && newLocation) {
      handleUpdate(train._id, {
        ...train,
        status: newStatus,
        location: newLocation,
      });
    }
  };

  // ✅ Fetch trains
  const fetchTrains = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/trains", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrains(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Add train (ADMIN ONLY)
  const addTrain = async () => {
    if (!trainNumber || !status || !location) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5001/api/trains",
        { trainNumber, status, location },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setTrains((prev) => [...prev, res.data]);

      setTrainNumber("");
      setStatus("");
      setLocation("");
    } catch (err) {
      console.error(err);
      alert("Only admin can add trains 🚫");
    }
  };

  // ✅ Delete train
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/trains/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTrains((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Only admin can delete 🚫");
    }
  };

  // ✅ Update train
  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:5001/api/trains/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setTrains((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
      alert("Only admin can update 🚫");
    }
  };

  // ✅ Socket sync
  useEffect(() => {
    if (!socket) return;

    socket.on("trainAdded", (newTrain) => {
      setTrains((prev) => [...prev, newTrain]);
    });

    socket.on("trainDeleted", (id) => {
      setTrains((prev) => prev.filter((t) => t._id !== id));
    });

    socket.on("trainUpdated", (updatedTrain) => {
      setTrains((prev) =>
        prev.map((t) => (t._id === updatedTrain._id ? updatedTrain : t)),
      );
    });

    return () => {
      socket.off("trainAdded");
      socket.off("trainDeleted");
      socket.off("trainUpdated");
    };
  }, [socket]);

  // ✅ Initial load
  useEffect(() => {
    fetchTrains();
  }, []);

  // 📊 Stats
  const total = trains.length;
  const running = trains.filter((t) => t.status === "Running").length;
  const stopped = trains.filter((t) => t.status === "Stopped").length;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-4">
        {/* 📊 Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded text-center font-semibold">
            Total: {total}
          </div>

          <div className="bg-green-100 p-4 rounded text-center font-semibold">
            Running: {running}
          </div>

          <div className="bg-red-100 p-4 rounded text-center font-semibold">
            Stopped: {stopped}
          </div>
        </div>

        {/* ➕ Add Train (ONLY ADMIN) */}
        {role === "admin" && (
          <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="text-lg font-semibold mb-3">Add Train</h2>

            <div className="flex gap-2">
              <input
                value={trainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
                placeholder="Train Number"
                className="border p-2 rounded w-full"
              />

              <input
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Status"
                className="border p-2 rounded w-full"
              />

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="border p-2 rounded w-full"
              />

              <button
                onClick={addTrain}
                className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* 🚆 Train List */}
        <h2 className="text-lg font-semibold mb-3">Train List</h2>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-left border-collapse">
            {/* HEADER */}
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">🚆 Train No</th>
                <th className="p-3 text-center">📍 Station</th>
                <th className="p-3 text-right">🚦 Status</th>

                {role === "admin" && (
                  <th className="p-3 text-right">⚙ Actions</th>
                )}
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {trains.map((train) => {
                const isEditing = editingId === train._id;

                return (
                  <tr
                    key={train._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* Train Number */}
                    <td className="p-3 font-semibold">
                      {isEditing ? (
                        <input
                          value={editData.trainNumber}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              trainNumber: e.target.value,
                            })
                          }
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        train.trainNumber
                      )}
                    </td>

                    {/* Location */}
                    <td className="p-3 text-center">
                      {isEditing ? (
                        <input
                          value={editData.location}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              location: e.target.value,
                            })
                          }
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        <>📍 {train.location}</>
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-3 text-right">
                      {isEditing ? (
                        <select
                          value={editData.status}
                          onChange={(e) =>
                            setEditData({ ...editData, status: e.target.value })
                          }
                          className="border p-1 rounded"
                        >
                          <option>Running</option>
                          <option>Stopped</option>
                          <option>Failure</option>
                        </select>
                      ) : (
                        <span className="inline-flex items-center gap-2 font-medium">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              train.status === "Running"
                                ? "bg-green-500 animate-[pulse_0.5s_infinite]"
                                : train.status === "Stopped"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                            }`}
                          ></span>
                          {train.status}
                        </span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    {role === "admin" && (
                      <td className="p-3 text-right space-x-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => {
                                handleUpdate(train._id, editData);
                                setEditingId(null);
                              }}
                              className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                              Save
                            </button>

                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-gray-400 text-white px-3 py-1 rounded"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditingId(train._id);
                                setEditData({
                                  trainNumber: train.trainNumber,
                                  status: train.status,
                                  location: train.location,
                                });
                              }}
                              className="bg-yellow-400 px-3 py-1 rounded"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(train._id)}
                              className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

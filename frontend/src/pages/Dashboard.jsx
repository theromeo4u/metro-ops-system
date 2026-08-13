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

  // const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const socket = useSocket(); // ✅ FIXED

  // ✅ Fetch trains
  const fetchTrains = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/trains");
      console.log("DATA:", res.data); // 👈 ADD THIS
      setTrains(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // ✅ Add train
  const addTrain = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/trains", {
        trainNumber,
        status,
        location,
      });

      console.log("ADDED:", res.data); // 👈 DEBUG

      setTrains((prev) => [...prev, res.data]);

      setTrainNumber("");
      setStatus("");
      setLocation("");
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // ✅ Socket events
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

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-4">
        {/* 📊 Analytics */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-100 p-4 rounded">Total: {trains.length}</div>

          <div className="bg-green-100 p-4 rounded">
            Running: {trains.filter((t) => t.status === "Running").length}
          </div>

          <div className="bg-red-100 p-4 rounded">
            Stopped: {trains.filter((t) => t.status === "Stopped").length}
          </div>
        </div>

        {/* ➕ Add Train */}
        <div className="bg-white p-4 rounded shadow mb-4">
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

        {/* 🚆 Train List */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Train List</h2>

          {trains.map((train) => (
            <TrainCard
              key={train._id}
              train={train}
              setTrains={setTrains}
              role={role} // ✅ PASS ROLE
            />
          ))}
        </div>
      </div>
    </div>
  );
}

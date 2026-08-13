// import { useState } from "react";
// import axios from "axios";

// export default function TrainCard({ train, setTrains }) {
//   const [editing, setEditing] = useState(false);
//   const [status, setStatus] = useState(train.status);
//   const [location, setLocation] = useState(train.location);

//   const token = localStorage.getItem("token");

//   // ✏️ Update train
//   const updateTrain = async () => {
//     try {
//       const res = await axios.put(
//         `http://localhost:5001/api/trains/${train._id}`,
//         { status, location },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       // update UI instantly
//       setTrains((prev) =>
//         prev.map((t) => (t._id === train._id ? res.data : t)),
//       );

//       setEditing(false);
//     } catch (err) {
//       alert("Update failed");
//     }
//   };

//   // 🗑️ Delete train
//   const deleteTrain = async () => {
//     try {
//       await axios.delete(`http://localhost:5001/api/trains/${train._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setTrains((prev) => prev.filter((t) => t._id !== train._id));
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   return (
//     <div className="bg-white p-4 rounded shadow mb-3 flex justify-between items-center">
//       {/* LEFT */}
//       <div>
//         <div className="font-semibold text-lg">{train.trainNumber}</div>

//         {editing ? (
//           <div className="flex gap-2 mt-1">
//             <input
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="border p-1 rounded"
//               placeholder="Status"
//             />
//             <input
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="border p-1 rounded"
//               placeholder="Location"
//             />
//           </div>
//         ) : (
//           <div className="text-gray-600 mt-1">
//             {train.status} - {train.location}
//           </div>
//         )}
//       </div>

//       {/* RIGHT */}
//       <div className="flex items-center gap-3">
//         {/* 🟢 Live Indicator */}
//         <span
//           className={`w-3 h-3 rounded-full ${
//             train.status === "Running" ? "bg-green-500" : "bg-red-500"
//           }`}
//         ></span>

//         {/* ✏️ Edit */}
//         {editing ? (
//           <button
//             onClick={updateTrain}
//             className="bg-green-500 text-white px-3 py-1 rounded"
//           >
//             Save
//           </button>
//         ) : (
//           <button
//             onClick={() => setEditing(true)}
//             className="bg-yellow-400 px-3 py-1 rounded"
//           >
//             Edit
//           </button>
//         )}

//         {/* ❌ Cancel */}
//         {editing && (
//           <button
//             onClick={() => setEditing(false)}
//             className="bg-gray-300 px-3 py-1 rounded"
//           >
//             Cancel
//           </button>
//         )}

//         {/* 🗑️ Delete */}
//         <button
//           onClick={deleteTrain}
//           className="bg-red-500 text-white px-3 py-1 rounded"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";

const TrainCard = ({ train, onDelete, onUpdate, userRole }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    trainNumber: train.trainNumber,
    status: train.status,
    location: train.location,
  });

  const handleSave = () => {
    onUpdate(train._id, editData);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "8px",
      }}
    >
      {isEditing ? (
        <>
          <input
            value={editData.trainNumber}
            onChange={(e) =>
              setEditData({ ...editData, trainNumber: e.target.value })
            }
          />
          <input
            value={editData.status}
            onChange={(e) =>
              setEditData({ ...editData, status: e.target.value })
            }
          />
          <input
            value={editData.location}
            onChange={(e) =>
              setEditData({ ...editData, location: e.target.value })
            }
          />

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{train.trainNumber}</h4>
          <p>
            {train.status} - {train.location}
          </p>

          {/* Role-based buttons */}
          {userRole === "admin" && (
            <>
              <button
                style={{ background: "gold", marginRight: "10px" }}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>

              <button
                style={{ background: "red", color: "white" }}
                onClick={() => onDelete(train._id)}
              >
                Delete
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TrainCard;

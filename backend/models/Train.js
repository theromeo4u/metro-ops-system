// // import mongoose from "mongoose";

// // const trainSchema = new mongoose.Schema({
// //     trainNumber: String,
// //     status: String,
// //     location: String,
// // });

// // export default mongoose.model("Train", trainSchema);

// import { useState } from "react";
// import axios from "axios";

// export default function TrainCard({ train, setTrains, role }) {
//     const [editing, setEditing] = useState(false);
//     const [status, setStatus] = useState(train.status);
//     const [location, setLocation] = useState(train.location);

//     const token = localStorage.getItem("token");

//     // ✏️ UPDATE
//     const updateTrain = async () => {
//         try {
//             const res = await axios.put(
//                 `http://localhost:5001/api/trains/${train._id}`,
//                 { status, location },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             setTrains((prev) =>
//                 prev.map((t) => (t._id === train._id ? res.data : t))
//             );

//             setEditing(false);
//         } catch {
//             alert("Update failed");
//         }
//     };

//     // 🗑️ DELETE
//     const deleteTrain = async () => {
//         try {
//             await axios.delete(
//                 `http://localhost:5001/api/trains/${train._id}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             setTrains((prev) => prev.filter((t) => t._id !== train._id));
//         } catch {
//             alert("Delete failed");
//         }
//     };

//     return (
//         <div className="bg-white p-4 rounded shadow mb-3 flex justify-between items-center">
//             <div>
//                 <div className="font-semibold text-lg">{train.trainNumber}</div>

//                 {editing ? (
//                     <div className="flex gap-2 mt-1">
//                         <input
//                             value={status}
//                             onChange={(e) => setStatus(e.target.value)}
//                             className="border p-1 rounded"
//                         />
//                         <input
//                             value={location}
//                             onChange={(e) => setLocation(e.target.value)}
//                             className="border p-1 rounded"
//                         />
//                     </div>
//                 ) : (
//                     <div className="text-gray-600 mt-1">
//                         {train.status} - {train.location}
//                     </div>
//                 )}
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="flex items-center gap-3">

//                 {/* 🟢 STATUS DOT */}
//                 <span
//                     className={`w-3 h-3 rounded-full ${train.status === "Running" ? "bg-green-500" : "bg-red-500"
//                         }`}
//                 ></span>

//                 {/* 🔐 ROLE CHECK */}
//                 {role === "admin" && (
//                     <>
//                         {editing ? (
//                             <>
//                                 <button
//                                     onClick={updateTrain}
//                                     className="bg-green-500 text-white px-3 py-1 rounded"
//                                 >
//                                     Save
//                                 </button>
//                                 <button
//                                     onClick={() => setEditing(false)}
//                                     className="bg-gray-300 px-3 py-1 rounded"
//                                 >
//                                     Cancel
//                                 </button>
//                             </>
//                         ) : (
//                             <button
//                                 onClick={() => setEditing(true)}
//                                 className="bg-yellow-400 px-3 py-1 rounded"
//                             >
//                                 Edit
//                             </button>
//                         )}

//                         <button
//                             onClick={deleteTrain}
//                             className="bg-red-500 text-white px-3 py-1 rounded"
//                         >
//                             Delete
//                         </button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }


import mongoose from "mongoose";

const trainSchema = new mongoose.Schema({
    trainNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Train", trainSchema);
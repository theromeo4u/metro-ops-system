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

  // 🎨 Status Color + Animation
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "running":
        return "bg-green-500 animate-[pulse_0.6s_infinite]"; // ⚡ faster blink
      case "stopped":
        return "bg-red-500";
      case "failure":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-3 flex justify-between items-center">
      {/* LEFT - ALL IN ONE LINE */}
      <div className="w-full flex items-center justify-between">
        {/* 🚆 Train ID */}
        <span className="font-bold text-lg w-1/3">{train.trainNumber}</span>

        {/* 📍 Station */}
        <span className="text-orange-600 flex items-center justify-center w-1/3">
          📍 {train.location}
        </span>

        {/* 🚦 Status */}
        <span className="flex items-center justify-end gap-2 w-1/3 font-medium">
          <span
            className={`w-3 h-3 rounded-full ${getStatusStyle(train.status)}`}
          ></span>
          {train.status}
        </span>
      </div>
      {/* RIGHT SIDE BUTTONS */}
      <div className="flex gap-2">
        {userRole === "admin" && !isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(train._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TrainCard;

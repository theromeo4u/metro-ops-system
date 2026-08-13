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

  // 🎨 Status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "running":
        return "bg-green-100 text-green-700";
      case "stopped":
        return "bg-red-100 text-red-700";
      case "failure":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-3 flex justify-between items-center">
      {isEditing ? (
        <>
          <input
            value={editData.trainNumber}
            onChange={(e) =>
              setEditData({ ...editData, trainNumber: e.target.value })
            }
            className="border p-1 rounded"
          />
          <input
            value={editData.status}
            onChange={(e) =>
              setEditData({ ...editData, status: e.target.value })
            }
            className="border p-1 rounded"
          />
          <input
            value={editData.location}
            onChange={(e) =>
              setEditData({ ...editData, location: e.target.value })
            }
            className="border p-1 rounded"
          />

          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-3 py-1 rounded ml-2"
          >
            Save
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 px-3 py-1 rounded ml-2"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div>
            <h4 className="text-lg font-semibold">{train.trainNumber}</h4>

            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  train.status,
                )}`}
              >
                {train.status}
              </span>

              <span className="text-gray-600">{train.location}</span>
            </div>
          </div>

          {userRole === "admin" && (
            <div className="flex gap-2">
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
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrainCard;

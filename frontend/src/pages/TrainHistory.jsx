import { useEffect, useState } from "react";
import axios from "axios";

export default function TrainHistory() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/logs")
      .then((res) => setLogs(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📅 Train History</h2>

      <table className="w-full">
        <thead>
          <tr>
            <th>Train</th>
            <th>Status</th>
            <th>Location</th>
            <th>Action</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-t">
              <td>{log.trainNumber}</td>
              <td>{log.status}</td>
              <td>{log.location}</td>
              <td>{log.action}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

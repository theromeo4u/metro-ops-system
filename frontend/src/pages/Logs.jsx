import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/logs")
      .then((res) => setLogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-5xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          📅 Train History Logs
        </h2>

        <div className="bg-white dark:bg-gray-800 shadow rounded">
          <table className="w-full">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="p-3">Train</th>
                <th className="p-3">Action</th>
                <th className="p-3">Status</th>
                <th className="p-3">Location</th>
                <th className="p-3">Time</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="border-t">
                  <td className="p-3">{log.trainNumber}</td>
                  <td className="p-3">{log.action}</td>
                  <td className="p-3">{log.status}</td>
                  <td className="p-3">{log.location}</td>
                  <td className="p-3">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

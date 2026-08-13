import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5001/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    await axios.put(
      `http://localhost:5001/api/users/${id}`,
      { role },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5001/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">👥 User Management</h2>

      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td>{u.name}</td>
              <td>{u.email}</td>

              <td>
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u._id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              <td>
                <button
                  onClick={() => deleteUser(u._id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// // import { useNavigate } from "react-router-dom";

// // export default function Navbar() {
// //   const navigate = useNavigate();

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/");
// //   };

// //   return (
// //     <div className="flex justify-between items-center bg-white p-4 shadow">
// //       <h1 className="text-xl font-bold">🚆Mumbai Metro Dashboard</h1>
// //       <button
// //         onClick={logout}
// //         className="bg-red-500 text-white px-4 py-2 rounded"
// //       >
// //         Logout
// //       </button>
// //     </div>
// //   );
// // }

// // import { useNavigate } from "react-router-dom";

// // export default function Navbar() {
// //   const navigate = useNavigate();

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("role"); // ✅ ADD THIS
// //     navigate("/");
// //   };

// //   return (
// //     <div className="flex justify-between items-center bg-white p-4 shadow">
// //       <h1 className="text-xl font-bold">🚆 Mumbai Metro Dashboard</h1>

// //       <button
// //         onClick={logout}
// //         className="bg-red-500 text-white px-4 py-2 rounded"
// //       >
// //         Logout
// //       </button>
// //     </div>
// //   );
// // }

// // export default function Navbar() {
// //   const navigate = useNavigate();
// //   const role = localStorage.getItem("role");

// //   const logout = () => {
// //     localStorage.clear();
// //     navigate("/");
// //   };

// //   return (
// //     <div className="flex justify-between items-center bg-white p-4 shadow">
// //       <h1 className="text-xl font-bold">🚆 Mumbai Metro Dashboard</h1>

// //       <div className="flex items-center gap-4">
// //         <span className="text-gray-600">Role: {role}</span>

// //         <button
// //           onClick={logout}
// //           className="bg-red-500 text-white px-4 py-2 rounded"
// //         >
// //           Logout
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// import ThemeToggle from "./ThemeToggle";
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");

//   const logout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className="flex justify-between items-center bg-white p-4 shadow">
//       <h1 className="text-xl font-bold">🚆 Mumbai Metro Dashboard</h1>

//       <div className="flex items-center gap-4">
//         <button
//           onClick={() => document.documentElement.classList.toggle("dark")}
//           className="bg-gray-800 text-white px-3 py-1 rounded"
//         >
//           🌙 Toggle
//         </button>
//         <span className="text-gray-600 font-medium">
//           Role: <span className="capitalize">{role}</span>
//         </span>

//         <button
//           onClick={logout}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         >
//           Logout
//           <ThemeToggle />
//         </button>
//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow">
      <h1 className="text-xl font-bold text-black dark:text-white">
        🚆 Mumbai Metro Dashboard
      </h1>

      <div className="flex items-center gap-4">
        {/* 🌙 Proper Toggle */}
        <ThemeToggle />

        {/* Role */}
        <span className="text-gray-600 dark:text-gray-300 font-medium">
          Role: <span className="capitalize">{role}</span>
        </span>

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
        <button
          onClick={() => navigate("/logs")}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Logs
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { FaBars, FaTimes, FaHome, FaCog } from "react-icons/fa"; // Import icons
import { OpenDialogOptions, open } from "@tauri-apps/api/dialog";

function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [fileSelected, setFileSelected] = useState<any>(null);

  const openDialog = async () => {
    const options: OpenDialogOptions = {
      multiple: false,
      directory: false,
      filters: [{ name: "Data files", extensions: ["csv", "xlsx", "json"] }],
    };

    const result = await open(options);
    setFileSelected(result);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-base-200 p-4 ${
          isSidebarCollapsed ? "w-16" : "w-64"
        } transition-all duration-300 flex flex-col`} // Add flex-col for vertical layout
      >
        <button className="btn btn-circle btn-ghost " onClick={toggleSidebar}>
          {isSidebarCollapsed ? <FaBars /> : <FaTimes />} {/* Use icons */}
        </button>

        {/* Sidebar content */}
        <ul className="menu flex-grow">
          {" "}
          {/* Add flex-grow to take up remaining space */}
          <li>
            <a className="flex items-center">
              <FaHome className="mr-2" /> {/* Icon */}
              {!isSidebarCollapsed && <span>Dashboard</span>}{" "}
              {/* Text (hidden when collapsed) */}
            </a>
          </li>
          <li>
            <a className="flex items-center">
              <FaCog className="mr-2" />
              {!isSidebarCollapsed && <span>Settings</span>}
            </a>
          </li>
          {/* ... more sidebar items */}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        {/* Your dashboard content goes here */}
        {!fileSelected && (
          <div className="min-h-screen items-center flex justify-center">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div>
                <p>Select a data file to get started</p>
                <button className="btn" onClick={openDialog}>
                  Select data file
                </button>
              </div>
              <div>
                <p>Create new</p>
                <button className="btn">Create new</button>
              </div>
            </div>
          </div>
        )}
        {fileSelected && (
          <div>
            <h1>Selected file:</h1>
            <pre>{JSON.stringify(fileSelected, null, 2)}</pre>
            <button className="btn" onClick={() => setFileSelected(null)}>
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

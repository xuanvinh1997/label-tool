import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaCog,
  FaPlus,
  FaFile,
  FaFileUpload,
} from "react-icons/fa"; // Import icons
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
                <button className="btn" onClick={openDialog}>
                  <FaFileUpload />
                  Select data file
                </button>
              </div>
              <div>
                <CreateNew />
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

const CreateNew = () => {
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary"
        onClick={() => {
          (
            document.getElementById("my_modal_4") as HTMLDialogElement
          )?.showModal();
        }}
      >
        <FaPlus /> Create new
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl flex flex-col">
          <h3 className="font-bold text-lg">Create new dataset</h3>
          <div className="flex flex-col justify-between gap-2">
            <label>Name:</label>
            <input type="text" className="input input-primary" />
            <label>Description:</label>
            <textarea className="textarea textarea-primary" />
            <label>Format:</label>
            <select className="select select-primary">
              <option selected>JSON (Recommend)</option>
              <option>CSV</option>
              <option>Excel</option>
            </select>
          </div>
          <div className="modal-action flex gap-4">
          <button className="btn btn-primary">Create</button>

            <form method="dialog ">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Dashboard;

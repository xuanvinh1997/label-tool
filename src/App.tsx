import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
  ]);

  return (
    <div className="font-vietnam-pro">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

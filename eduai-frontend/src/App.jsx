import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Register from "./components/Register"
import Login from "./components/Login"

const token = localStorage.getItem("token");

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register/>
  },
  // {
  //   path: "/dashboard",
  //   element: token ? <Dashboard /> : <Navigate to="/login" />
  // },
  {
    path: "*",
    element: <Navigate to="/login" />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

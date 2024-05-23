import Navbar from "./components/navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Source from "./pages/source";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <p>Route Not Found!</p>,
    },
    {
      path: "/source",
      element: <Source />,
    },
  ]);

  return (
    <div className="font-inter min-h-screen bg-zinc-900 text-zinc-300">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

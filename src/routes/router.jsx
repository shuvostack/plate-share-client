import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import AvailableFoods from "../pages/AvailableFoods/AvailableFoods";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "../components/PrivateRoute";
import AddFood from "../pages/AddFood/AddFood";
import ManageFoods from "../pages/ManageFoods/ManageFoods";
import MyFoodRequests from "../pages/MyFoodRequests/MyFoodRequests";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import About from "../pages/About/About"; 
import Contact from "../pages/Contact/Contact";
import DashboardOverview from "../pages/Dashboard/DashboardOverview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // Public Routes
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
      },
  
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      
      {
        path: "/foods/:id",
        loader: ({ params }) =>
          fetch(
            `https://plate-share-server-eight.vercel.app/foods/${params.id}`
          ),
        element: <FoodDetails></FoodDetails>, 
      },
    ],
  },

  // Dashboard Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardOverview></DashboardOverview>,
      },
      {
        path: "add-food", 
        element: <AddFood></AddFood>,
      },
      {
        path: "manage-my-foods", 
        element: <ManageFoods></ManageFoods>,
      },
      {
        path: "my-food-requests", 
        element: <MyFoodRequests></MyFoodRequests>,
      },
    ],
  },
]);

export default router;
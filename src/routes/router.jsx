import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout"; // গত স্টেপে আমরা এই লেআউটটা বানিয়েছিলাম
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

// রিকোয়ারমেন্ট পূরণের জন্য এই দুটি নতুন পেজ বানাতে হবে।
// আপাতত ফাইল না থাকলে এই দুটি লাইন কমেন্ট করে রেখো, পরে ফাইল বানিয়ে আনকমেন্ট করো।
import About from "../pages/About/About"; 
import Contact from "../pages/Contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // === Public Routes ===
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
      },
      // Requirement #8: Extra Pages
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
      // Requirement #4: Details Page MUST be Public
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

  // === Dashboard Routes (Requirement #7) ===
  // Private CRUD পেজগুলো এখন আলাদা লেআউটের আন্ডারে
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-food", // Link হবে: /dashboard/add-food
        element: <AddFood></AddFood>,
      },
      {
        path: "manage-my-foods", // Link হবে: /dashboard/manage-my-foods
        element: <ManageFoods></ManageFoods>,
      },
      {
        path: "my-food-requests", // Link হবে: /dashboard/my-food-requests
        element: <MyFoodRequests></MyFoodRequests>,
      },
    ],
  },
]);

export default router;
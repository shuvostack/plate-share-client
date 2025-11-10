import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
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

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout></MainLayout>,
            errorElement: <ErrorPage></ErrorPage>,
            children: [
                // public routes
                {
                    path: "/",
                    element: <Home></Home>
                },
                {
                    path: "/available-foods",
                    element: <AvailableFoods></AvailableFoods>,
                },
                {
                    path: "/login",
                    element: <Login></Login>
                },
                {
                    path: "/register",
                    element: <Register></Register>
                },

                // private route

                {
                    path: "/add-food",
                    element: <PrivateRoute>
                        <AddFood></AddFood>
                    </PrivateRoute>
                },
                {
                    path: "/manage-my-foods",
                    element: <PrivateRoute>
                        <ManageFoods></ManageFoods>
                    </PrivateRoute>
                },
                {
                    path: "/my-food-requests",
                    element: <PrivateRoute>
                        <MyFoodRequests></MyFoodRequests>
                    </PrivateRoute>
                },
                {
                    path: "/food/:id",
                    element: <PrivateRoute>
                        <FoodDetails></FoodDetails>
                    </PrivateRoute>
                }
            ]
        }
    ]
)

export default router
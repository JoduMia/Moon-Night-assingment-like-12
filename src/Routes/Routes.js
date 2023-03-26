import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import ProductsCategory from "../components/Category/ProductsCategory";
import Error from "../components/shared/Error";
import AllBuyers from "../layouts/Dashboard/Admin/AllBuyers";
import Report from "../layouts/Dashboard/Admin/Report";
import MyOrders from "../layouts/Dashboard/Buyer/MyOrders";
import Dashboard from "../layouts/Dashboard/Dashboard";
import DashIndex from "../layouts/Dashboard/DashboardIndex.js/DashIndex";
import AddProduct from "../layouts/Dashboard/Seller/AddProduct";
import MyBuyers from "../layouts/Dashboard/Seller/MyBuyers";
import MyProduct from "../layouts/Dashboard/Seller/MyProduct";
import Seller from "../layouts/Dashboard/Seller/Seller";
import Main from "../layouts/Main/Main/Main";
import Blogs from "../pages/Blogs/Blogs";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Register/Register";
import Wishlist from "../pages/Wishlist/Wishlist";
import Checkout from "../payment/Checkout";
import AdminRoute from "./AdminRoute";
import BuyerRoutes from "./BuyerRoutes";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoutes";

export const routes = createBrowserRouter(createRoutesFromElements(
    <Route >
        <Route path="/" element={ <Main /> }>
            <Route index element={ <Home /> }/>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/register" element={ <Register /> }/>
            <Route path="/blogs" element={ <Blogs /> }/>
            <Route
                path="/category/:id"
                element= { <PrivateRoute><ProductsCategory /></PrivateRoute>}
            />
        </Route>

        <Route path="/dashboard"
        element={<PrivateRoute><Dashboard /></PrivateRoute>}
        errorElement={<Error />}
        >
            <Route
            path="/dashboard/checkout/:id"
            element={<BuyerRoutes><Checkout /></BuyerRoutes> }
            loader={({params}) => fetch(`https://server-tawny-theta.vercel.app/dashboard/checkout/${params.id}`)}
            />





            <Route index element={<DashIndex /> }/>
            <Route path="/dashboard/sellers" element={<AdminRoute><Seller /></AdminRoute> }/>
            <Route path="/dashboard/buyers" element={<AdminRoute><AllBuyers /></AdminRoute> }/>
            <Route path="/dashboard/myorder" element={<BuyerRoutes><MyOrders /></BuyerRoutes> }/>
            <Route path="/dashboard/addproduct" element={<SellerRoute><AddProduct /></SellerRoute> }/>
            <Route path="/dashboard/myproduct" element={<MyProduct /> }/>
            <Route path="/dashboard/mybuyers" element={<SellerRoute><MyBuyers /></SellerRoute> }/>
            <Route path="/dashboard/wishlist" element={<BuyerRoutes><Wishlist /></BuyerRoutes>} />

            <Route path="/dashboard/reports" element={<AdminRoute><Report /></AdminRoute> }/>
        </Route>
        <Route path="*" element={<NotFound />}/>
    </Route>
))
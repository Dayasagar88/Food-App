import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import VerifyEmail from "./components/auth/VerifyEmail";
import MainLayout from "./layout/MainLayout";
import HeroSection from "./components/HeroSection";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import Restaurant from "./components/Restaurant";
import AddMenu from "./components/AddMenu";
import Orders from "./components/Orders";
import Success from "./components/Success";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import Loading from "./components/Loading";
import { ThemeProvider } from "../src/components/ThemeContext";

const ProtectedRoutes = ({children} : {children : React.ReactNode}) => {
  const {isAuthenticated, user} = useUserStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }

  if(!user?.isVerified){

    return <Navigate to="/verify-email" replace/>
  }

  return children;
}

const AuthenticatedUser = ({children} : {children: React.ReactNode}) => {
  const {isAuthenticated , user} = useUserStore();
  if(isAuthenticated && user?.isVerified){
    return <Navigate to="/" replace/>
  }
  return children;
}

const AdminRoute = ({children}: {children : React.ReactNode}) => {
  const {user , isAuthenticated} = useUserStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }

  if(!user?.admin){
    return <Navigate to="/" replace />
  }
  return children
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes> ,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/status",
        element: <Success/>,
      },

      //Admin services starts here
      {
        path: "/admin/restaurant",
        element: <AdminRoute><Restaurant /></AdminRoute> ,
      },
      {
        path: "/admin/menu",
        element: <AdminRoute><AddMenu /></AdminRoute>,
      },
      {
        path: "/admin/orders",
        element: <AdminRoute><Orders /></AdminRoute>,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthenticatedUser><Login /></AuthenticatedUser> ,
  },
  {
    path: "/signup",
    element: <AuthenticatedUser><Signup /></AuthenticatedUser> ,
  },
  {
    path: "/forgot-password",
    element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser> ,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

function App() {
  const {checkAuthentication, isCheckingAuth} = useUserStore();
  useEffect(() => {
    checkAuthentication()
  },[checkAuthentication])

  if(isCheckingAuth) return <Loading/>
  return (
    <ThemeProvider>
      <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
    </ThemeProvider>
    
  );
}

export default App;

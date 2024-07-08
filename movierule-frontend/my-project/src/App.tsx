import "./App.css";
import Login from "./component/pages/user-pages/Login";
import SignUp from "./component/pages/user-pages/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import VerifyOTP from "./component/pages/user-pages/VerifyOTP";
import TheaterSignUp from "./component/pages/theater-pages/TheatreSignup";
import TheaterLogin from "./component/pages/theater-pages/TheaterLogin";
import TheaterDashboard from "./component/pages/theater-pages/TheaterDashboard";
import TheatreVerifyOtp from "./component/pages/theater-pages/TheaterVerifyOtp";
import UserProfile from "./component/pages/user-pages/UserProfile";
import { TheaterProfile } from "./component/pages/theater-pages/TheaterProfile";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Adminhome from "./component/pages/admin-pages/Adminhome";
import AdminLogin from "./component/pages/admin-pages/AdminLogin";
import MainPage from "./component/pages/user-pages/MainPage";
import HomePage from "./component/pages/user-pages/HomePage";
import ForgetPassword from "./component/pages/user-pages/ForgetPassword";
import ResetPassword from "./component/pages/user-pages/ResetPassword";
import TheaterForgetPassword from "./component/pages/theater-pages/TheaterForgetPassword";
import TheaterResetPassword from "./component/pages/theater-pages/TheaterResetPassword";
import NotAuthorized from "./component/pages/NotAuthorized";


interface IProtectedRoute {
  element: JSX.Element;
  role?: string;
}


const ProtectedRoute = ({ element, role }: IProtectedRoute) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { theaterOwner } = useSelector((state: RootState) => state.theater);
  const { admin } = useSelector((state: RootState) => state.admin);

  let currentUser = null;

  if (role === "user" && user) {
    currentUser = user;
  } else if (role === "theatre" && theaterOwner) {
    currentUser = theaterOwner;
  } else if (role === "admin" && admin) {
    currentUser = admin;
  }

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/not-authorized" />;
  }

  return element;
};


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route
            path="/homepage"
            element={<ProtectedRoute element={<HomePage />} role="user" />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<UserProfile />} role="user" />}
          />

          <Route path="/theater/signup" element={<TheaterSignUp />} />
          <Route path="/theater/verifyOtp" element={<TheatreVerifyOtp />} />
          <Route path="/theater/login" element={<TheaterLogin />} />
          <Route
            path="/theater/forgetpassword"
            element={<TheaterForgetPassword />}
          />
          <Route
            path="/theater/theater-reset-password"
            element={<TheaterResetPassword />}
          />
          <Route
            path="/theater/dashboard"
            element={
              <ProtectedRoute element={<TheaterDashboard />} role="theatre" />
            }
          />
          <Route
            path="/theater/theaterprofile"
            element={
              <ProtectedRoute element={<TheaterProfile />} role="theatre" />
            }
          />

          <Route
            path="/admin/home"
            element={<ProtectedRoute element={<Adminhome />} role="admin" />}
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

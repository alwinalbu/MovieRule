import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";

// Loader
// import MovieRuleLoader from "./component/common/MovieRuleLoader";

// ---------- User Pages ----------
// import MainPage from "./component/pages/user-pages/MainPage";
import SignUp from "./component/pages/user-pages/Signup";
import Login from "./component/pages/user-pages/Login";
import VerifyOTP from "./component/pages/user-pages/VerifyOTP";
import ForgetPassword from "./component/pages/user-pages/ForgetPassword";
import ResetPassword from "./component/pages/user-pages/ResetPassword";
import HomePage from "./component/pages/user-pages/HomePage";
import UserProfile from "./component/pages/user-pages/UserProfile";
import StreamPage from "./component/pages/user-pages/StreamPage";
import MyListPage from "./component/pages/user-pages/MyListPage";
import WalletPage from "./component/pages/user-pages/WalletPage";
import BookingPage from "./component/pages/user-pages/BookingPage";
import TicketsPage from "./component/pages/user-pages/TicketsPage";
import QrPage from "./component/pages/user-pages/QrPage";
import PaymentSuccess from "./component/pages/user-pages/PaymentSuccess";
import PaymentFailed from "./component/pages/user-pages/PaymentFailed";
import SubscriptionSuccess from "./component/pages/user-pages/SubscriptionSuccess";
import Blocked from "./component/pages/user-pages/Blocked";
import LandingPageMovieDetails from "./component/Movies/LandingPageMovieDetails";
import ScreenLayoutPage from "./component/pages/user-pages/ScreenLayoutPage";

// ---------- Theater Pages ----------
import TheaterSignUp from "./component/pages/theater-pages/TheatreSignup";
import TheaterLogin from "./component/pages/theater-pages/TheaterLogin";
import TheaterDashboard from "./component/pages/theater-pages/TheaterDashboard";
import TheatreVerifyOtp from "./component/pages/theater-pages/TheaterVerifyOtp";
import TheaterForgetPassword from "./component/pages/theater-pages/TheaterForgetPassword";
import TheaterResetPassword from "./component/pages/theater-pages/TheaterResetPassword";
import { TheaterProfile } from "./component/pages/theater-pages/TheaterProfile";
import CreateShows from "./component/pages/theater-pages/CreateShows";
import TheatreScreenAddList from "./component/pages/theater-pages/TheaterScreenAddList";
import TheatreSeatLayoutEdit from "./component/pages/theater-pages/TheatreSeatLayoutEdit";
import SnacksPage from "./component/pages/theater-pages/SnacksPage";
import BookingsList from "./component/pages/theater-pages/BookingsList";
import BookingDetailsPage from "./component/pages/theater-pages/BookingDetailsPage";

// ---------- Admin Pages ----------
import Adminhome from "./component/pages/admin-pages/Adminhome";
import AdminLogin from "./component/pages/admin-pages/AdminLogin";
import TheatresList from "./component/pages/admin-pages/TheatresListAdmin";
import UsersList from "./component/pages/admin-pages/UsersListAdmin";
import SubscribedUsersList from "./component/pages/admin-pages/SubscribedUsersList";
import TheaterDetailsPage from "./component/pages/admin-pages/TheaterDetailsPage";
import MovieDetail from "./component/Movies/MovieDetailView";
import AddMovieTmdbList from "./component/pages/admin-pages/AddMovieTMDBlist";
import TheaterMoviesList from "./component/pages/admin-pages/TheaterMoviesList";
import OTTMoviesList from "./component/pages/admin-pages/OTTMoviesList";
import { TheaterMovieDetails } from "./component/Movies/TheaterMovieDetails";

// ---------- Common ----------
import NotAuthorized from "./component/pages/NotAuthorized";
import NotFound from "./component/pages/NotFound";
import { loginSuccessUser } from "./redux/reducers/user/userSlice";
import { loginSuccessTheatre } from "./redux/reducers/theaters/theaterSlice";
import { loginSuccessAdmin } from "./redux/reducers/admin/adminSlice";
import Contact from "./component/pages/Contact";
import About from "./component/pages/About";
import TheaterMoviesPage from "./component/pages/theater-pages/TheaterMoviesPage";
import { getCurrentAuth } from "./utlis/auth";
import PendingApproval from "./component/pages/theater-pages/PendingApproval";
import ManageShowPage from "./component/pages/theater-pages/ManageShowPage";
import LoaderWrapper from "./component/pages/LoaderWrapper";

/* ---------------- ProtectedRoute ---------------- */
interface IProtectedRoute {
  element: JSX.Element;
  role?: "user" | "theatre" | "admin";
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ element, role }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const theaterOwner = useSelector(
    (state: RootState) => state.theater.theaterOwner
  );
  const admin = useSelector((state: RootState) => state.admin.admin);

  let currentUser: any = null;
  if (role === "user" && user) currentUser = user;
  if (role === "theatre" && theaterOwner) currentUser = theaterOwner;
  if (role === "admin" && admin) currentUser = admin;

  // ❌ Not logged in → redirect to correct login
  if (!currentUser) {
    switch (role) {
      case "user":
        return <Navigate to="/login" replace />;
      case "theatre":
        return <Navigate to="/theater/login" replace />;
      case "admin":
        return <Navigate to="/admin/login" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // 🚨 User status check
  if (role === "user" && currentUser?.status !== "active") {
    return <Navigate to="/blocked" replace />;
  }

  // 🚨 Theatre status check
  if (role === "theatre") {
    if (currentUser?.status === "blocked") {
      return <Navigate to="/blocked" replace />;
    }
    if (currentUser?.status === "pending") {
      return <Navigate to="/pending-approval" replace />;
    }
  }

  // ❌ Role mismatch
  if (role && currentUser.role !== role) {
    return <Navigate to="/not-authorized" replace />;
  }

  // ✅ Passed → allow rendering
  return element;
};


/* ---------------- App Component ---------------- */
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const payload = await getCurrentAuth();
        if (!payload) return;

        switch (payload.role) {
          case "user":
            if (payload.status === "active") {
              dispatch(loginSuccessUser(payload));
            } else {
              navigate("/blocked");
            }
            break;

          case "theatre":
            if (payload.status === "active") {
              dispatch(loginSuccessTheatre(payload));
            } else if (payload.status === "pending") {
              navigate("/pending-approval");
            } else {
              navigate("/blocked");
            }
            break;

          case "admin":
            dispatch(loginSuccessAdmin(payload));
            break;

          default:
            console.warn("Unknown role in payload:", payload.role);
        }
      } catch (err) {
        console.error("Failed to fetch auth state:", err);
      }
      
    };

    fetchAuth();
    // const timer = setTimeout(() => setInitialLoading(false), 5000);
    // return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  // if (initialLoading) return <MovieRuleLoader />;

  return (
    <Routes>
      {/* ---------- Public ---------- */}
      {/* <Route path="/" element={<MainPage />} /> */}
      <Route path="/" element={<LoaderWrapper />} />
      <Route path="/movie/:movieId" element={<LandingPageMovieDetails />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ---------- User ---------- */}
      <Route
        path="/homepage"
        element={<ProtectedRoute element={<HomePage />} role="user" />}
      />
      <Route
        path="/my-list"
        element={<ProtectedRoute element={<MyListPage />} role="user" />}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute element={<UserProfile />} role="user" />}
      />
      <Route
        path="/stream-library-plan"
        element={<ProtectedRoute element={<StreamPage />} role="user" />}
      />
      <Route
        path="/wallet"
        element={<ProtectedRoute element={<WalletPage />} role="user" />}
      />
      <Route
        path="/booking/movie/:movie_id"
        element={<ProtectedRoute element={<BookingPage />} role="user" />}
      />
      <Route
        path="/screen-layout/:screenId"
        element={<ProtectedRoute element={<ScreenLayoutPage />} role="user" />}
      />
      <Route path="/booked-ticket" element={<QrPage />} />
      <Route path="/tickets" element={<TicketsPage />} />
      <Route path="/paymentSuccess" element={<PaymentSuccess />} />
      <Route path="/paymentCancel" element={<PaymentFailed />} />
      <Route path="/subscriptionSuccess" element={<SubscriptionSuccess />} />
      <Route path="/blocked" element={<Blocked />} />

      {/* ---------- Theater ---------- */}
      <Route path="/theater/signup" element={<TheaterSignUp />} />
      <Route path="/theater/login" element={<TheaterLogin />} />
      <Route path="/theater/verifyOtp" element={<TheatreVerifyOtp />} />
      <Route path="/pending-approval" element={<PendingApproval />} />
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
        path="/theatre/show/manage"
        element={<ProtectedRoute element={<ManageShowPage />} role="theatre" />}
      />
      <Route
        path="/theater/movies"
        element={
          <ProtectedRoute element={<TheaterMoviesPage />} role="theatre" />
        }
      />
      <Route
        path="/theater/theaterprofile"
        element={<ProtectedRoute element={<TheaterProfile />} role="theatre" />}
      />
      <Route
        path="/theater/create-shows"
        element={<ProtectedRoute element={<CreateShows />} role="theatre" />}
      />
      <Route
        path="/theater/create-screen"
        element={
          <ProtectedRoute element={<TheatreScreenAddList />} role="theatre" />
        }
      />
      <Route
        path="/theatre/screens/edit-layout/:screenId"
        element={
          <ProtectedRoute element={<TheatreSeatLayoutEdit />} role="theatre" />
        }
      />
      <Route
        path="/theater/snacks"
        element={<ProtectedRoute element={<SnacksPage />} role="theatre" />}
      />
      <Route path="/theater/show-booking" element={<BookingsList />} />
      <Route
        path="/theater/booking-details/:bookingId"
        element={<BookingDetailsPage />}
      />

      {/* ---------- Admin ---------- */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/home"
        element={<ProtectedRoute element={<Adminhome />} role="admin" />}
      />
      <Route
        path="/admin/theatres-list"
        element={<ProtectedRoute element={<TheatresList />} role="admin" />}
      />
      <Route
        path="/admin/theater/:theaterId"
        element={
          <ProtectedRoute element={<TheaterDetailsPage />} role="admin" />
        }
      />
      <Route
        path="/admin/users-list"
        element={<ProtectedRoute element={<UsersList />} role="admin" />}
      />
      <Route
        path="/admin/Subscribed-Users-List"
        element={
          <ProtectedRoute element={<SubscribedUsersList />} role="admin" />
        }
      />
      <Route
        path="/admin/movie/:movieId"
        element={<ProtectedRoute element={<MovieDetail />} role="admin" />}
      />
      <Route
        path="/admin/movies-data/:movieId"
        element={
          <ProtectedRoute element={<TheaterMovieDetails />} role="admin" />
        }
      />
      <Route
        path="/admin/available-Movie-list"
        element={<ProtectedRoute element={<AddMovieTmdbList />} role="admin" />}
      />
      <Route
        path="/admin/theatre-movies"
        element={
          <ProtectedRoute element={<TheaterMoviesList />} role="admin" />
        }
      />
      <Route
        path="/admin/OTT-movies"
        element={<ProtectedRoute element={<OTTMoviesList />} role="admin" />}
      />

      {/* ---------- Common ---------- */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="/blocked" element={<Blocked />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

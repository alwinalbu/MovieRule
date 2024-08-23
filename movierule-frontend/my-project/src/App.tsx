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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import Adminhome from "./component/pages/admin-pages/Adminhome";
import AdminLogin from "./component/pages/admin-pages/AdminLogin";
import MainPage from "./component/pages/user-pages/MainPage";
import HomePage from "./component/pages/user-pages/HomePage";
import ForgetPassword from "./component/pages/user-pages/ForgetPassword";
import ResetPassword from "./component/pages/user-pages/ResetPassword";
import TheaterForgetPassword from "./component/pages/theater-pages/TheaterForgetPassword";
import TheaterResetPassword from "./component/pages/theater-pages/TheaterResetPassword";
import NotAuthorized from "./component/pages/NotAuthorized";
import NotFound from "./component/pages/NotFound";
import TheatresList from "./component/pages/admin-pages/TheatresListAdmin";
import UsersList from "./component/pages/admin-pages/UsersListAdmin";
import MovieDetail from "./component/Movies/MovieDetailView";
import AddMovieTmdbList from "./component/pages/admin-pages/AddMovieTMDBlist";
import TheaterMoviesList from "./component/pages/admin-pages/TheaterMoviesList";
import OTTMoviesList from "./component/pages/admin-pages/OTTMoviesList";
import CreateShows from "./component/pages/theater-pages/CreateShows";
import LandingPageMovieDetails from "./component/Movies/LandingPageMovieDetails";
import TheatreScreenAddList from "./component/pages/theater-pages/TheaterScreenAddList";
import TheatreSeatLayoutEdit from "./component/pages/theater-pages/TheatreSeatLayoutEdit";
import BookingPage from "./component/pages/user-pages/BookingPage";
import { TheaterMovieDetails } from "./component/Movies/TheaterMovieDetails";
import ScreenLayoutPage from "./component/pages/user-pages/ScreenLayoutPage";
import { useEffect } from "react";
import { getCurrntUser} from "./redux/actions/user/userActions";
import { loginSuccessUser } from "./redux/reducers/user/userSlice";
import { loginSuccessTheatre } from "./redux/reducers/theaters/theaterSlice";
import { loginSuccessAdmin } from "./redux/reducers/admin/adminSlice";
import TheaterDetailsPage from "./component/pages/admin-pages/TheaterDetailsPage";
import PaymentSuccess from "./component/pages/user-pages/PaymentSuccess";
import PaymentFailed from "./component/pages/user-pages/PaymentFailed";
import SnacksPage from "./component/pages/theater-pages/SnacksPage";
import TicketsPage from "./component/pages/user-pages/TicketsPage";
import BookingsList from "./component/pages/theater-pages/BookingsList";
import BookingDetailsPage from "./component/pages/theater-pages/BookingDetailsPage";
import StreamPage from "./component/pages/user-pages/StreamPage";
import QrPage from "./component/pages/user-pages/QrPage";
import SubscriptionSuccess from "./component/pages/user-pages/SubscriptionSuccess";
import Blocked from "./component/pages/user-pages/Blocked";
import SubscribedUsersList from "./component/pages/admin-pages/SubscribedUsersList";
import WalletPage from "./component/pages/user-pages/WalletPage";


interface IProtectedRoute {
  element: JSX.Element;
  role?: string;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ element, role }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const theaterOwner = useSelector(
    (state: RootState) => state.theater.theaterOwner
  );
  const admin = useSelector((state: RootState) => state.admin.admin);

  let currentUser: any = null;

  if (role === "user" && user) {
    currentUser = user;
  } else if (role === "theatre" && theaterOwner) {
    currentUser = theaterOwner;
  } else if (role === "admin" && admin) {
    currentUser = admin;
  }

  if (role === "user" && currentUser?.status !== "active") {
    return <Navigate to="/blocked" />;
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
  const dispatch = useDispatch<AppDispatch>();


   useEffect(() => {
   const fetchUser = async () => {
     const payload = await getCurrntUser();     
     
     if (payload) {
       switch (payload.role) {
         case "user":
           dispatch(loginSuccessUser(payload));
           break;
         case "theatre":
           dispatch(loginSuccessTheatre(payload));
           break;
         case "admin":
           dispatch(loginSuccessAdmin(payload));
           break;
         default:
           console.log("Unknown role");
       }
     }
   };
   fetchUser();
 }, [dispatch]);


  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movie/:movieId" element={<LandingPageMovieDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="booking/movie/:movie_id" element={<BookingPage />} />
          <Route
            path="/screen-layout/:screenId"
            element={<ScreenLayoutPage />}
          />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />
          <Route path="/paymentCancel" element={<PaymentFailed />} />

          <Route
            path="/subscriptionSuccess"
            element={<SubscriptionSuccess />}
          />
          {/* <Route path="/subscriptionCancel" element={} /> */}
          <Route
            path="/homepage"
            element={<ProtectedRoute element={<HomePage />} role="user" />}
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

          <Route path="/booked-ticket" element={<QrPage />} />

          <Route path="/tickets" element={<TicketsPage />} />
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
          <Route path="/theater/show-booking" element={<BookingsList />} />
          <Route
            path="/theater/booking-details/:bookingId"
            element={<BookingDetailsPage />}
          />
          <Route
            path="/theater/create-shows"
            element={
              <ProtectedRoute element={<CreateShows />} role="theatre" />
            }
          />
          <Route
            path="/theater/create-screen"
            element={
              <ProtectedRoute
                element={<TheatreScreenAddList />}
                role="theatre"
              />
            }
          />
          <Route
            path="/theater/snacks"
            element={<ProtectedRoute element={<SnacksPage />} role="theatre" />}
          />
          <Route
            path="/theatre/screens/edit-layout/:screenId"
            element={
              <ProtectedRoute
                element={<TheatreSeatLayoutEdit />}
                role="theatre"
              />
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
            element={
              <ProtectedRoute element={<AddMovieTmdbList />} role="admin" />
            }
          />
          <Route
            path="/admin/theatre-movies"
            element={
              <ProtectedRoute element={<TheaterMoviesList />} role="admin" />
            }
          />
          <Route
            path="/admin/OTT-movies"
            element={
              <ProtectedRoute element={<OTTMoviesList />} role="admin" />
            }
          />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/blocked" element={<Blocked />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
} from "@nextui-org/react";
import { Play, Ticket, Info } from "lucide-react";
import { commonRequest } from "../../config/api";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { config, URL } from "../../config/constants";
import { IMovie } from "../Movies/IMovie";
import { waitForCookies } from "../../utlis/waitForCookies";

const LandingPageMovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<any>();
  const [dbMovie, setDbMovie] = useState<IMovie | null>(null);
  const [dbMovieType, setDbMovieType] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [cast, setCast] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [inWatchlist, setInWatchlist] = useState(false);

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [secureUrl, setSecureUrl] = useState<string | null>(null);
  const [isFetchingVideo, setIsFetchingVideo] = useState(false);

  const { dbMovieId } = state || {};

  // fetch user
  useEffect(() => {
    const fetchUser = async () => {
      
      await waitForCookies();

      try {
        const { data } = await axios.get(`${URL}/getUser`, config);

        console.log(data, "from backedn about user in list page");

        setCurrentUser(data);
        setCurrentUserId(data?._id);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchDbMovie = async () => {
      if (!dbMovieId) return;
      try {
        const res = await commonRequest("GET", `/movie/${dbMovieId}`, config);
        setDbMovie(res.data);
        setDbMovieType(res.data.type);
      } catch (error) {
        console.error("Error fetching dbMovie:", error);
      }
    };
    fetchDbMovie();
  }, [dbMovieId]);

  useEffect(() => {
    if (movieId) {
      // Movie details
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
      )
        .then((res) => res.json())
        .then((data) => setMovie(data));

      // Trailer
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2a1ba4f836ae838c2fe9a42ef94af264&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => {
          const trailer = data.results.find(
            (video: any) => video.type === "Trailer"
          );
          if (trailer) setTrailerKey(trailer.key);
        });

      // Cast
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
      )
        .then((res) => res.json())
        .then((data) => setCast(data.cast));
    }
  }, [movieId]);

  useEffect(() => {
    if (currentUser && dbMovie?._id) {
      const isInList = currentUser.watchlist?.includes(dbMovie._id);
      setInWatchlist(isInList);
    }
  }, [currentUser, dbMovie]);

  useEffect(() => {
    if (isOpen && selectedMovie?._id) {
      fetchSecureUrl(selectedMovie._id);
    }
  }, [isOpen, selectedMovie]);

  // ♻️ Auto-refresh signed Cloudinary URL every 1.5 minutes
  useEffect(() => {
    let refreshInterval: NodeJS.Timeout;

    if (isOpen && selectedMovie?._id) {
      refreshInterval = setInterval(() => {
        console.log("♻️ Refreshing secure video URL...");
        fetchSecureUrl(selectedMovie._id);
      }, 1000 * 60 * 1.5); // every 1.5 minutes
    }

    return () => clearInterval(refreshInterval);
  }, [isOpen, selectedMovie]);


const fetchSecureUrl = async (movieId: string) => {
  try {
    setIsFetchingVideo(true); // 🔹 start loading state

    const response = await commonRequest(
      "GET",
      `/ott/movies/${movieId}/secure-url`,
      config
    );

    if (response.data?.secureUrl) {
      setSecureUrl(response.data.secureUrl);
      console.log("✅ Secure URL fetched:", response.data.secureUrl);
    } else {
      console.warn("⚠️ No secure URL returned or expired:", response.data);
      toast.error("Unable to fetch video link, please try again.");
    }
  } catch (error) {
    console.error("❌ Error fetching secure URL:", error);
    toast.error("Something went wrong while loading video.");
  } finally {
    setIsFetchingVideo(false); // 🔹 end loading state
  }
};


  const handleAction = () => {
    if (currentUser) {
      if (dbMovieType === "OTT") {
        if (
          currentUser.isSubscribed &&
          currentUser.isSubscribed.status === "active"
        ) {
          setSelectedMovie(dbMovie);
          setIsOpen(true);
        } else {
          setIsSubscriptionModalOpen(true);
        }
      } else {
        navigate(`/booking/movie/${dbMovieId}`);
      }
    } else {
      toast.error("Please login to proceed!");
      navigate("/login");
    }
  };

  // handle subscribe
  const handleSubscribe = async (amount: number) => {
    console.log(amount, "amount here");

    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!
    );

    if (!stripe) return;

    try {
      const body = { amount, userId: currentUserId };
      const response = await commonRequest(
        "POST",
        "/Subscribe/create-checkout-session",
        config,
        body
      );

      if (!response.data.success) throw new Error("Checkout failed");

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      if (result.error) {
        toast.error(result.error.message ?? "Checkout failed");
      }
    } catch (error) {
      toast.error("Subscription failed");
    }
  };

  // handle watchlist toggle
  const handleWatchlistToggle = async () => {
    if (!currentUser) {
      toast.error("Please login to use My List!");
      navigate("/login");
      return;
    }

    try {
      const response = await commonRequest(
        "POST",
        "/toggle-watchlist",
        config,
        { userId: currentUserId, movieId: dbMovie?._id }
      );

      console.log(
        response.data,
        "data from backedn in button press of watchlist"
      );

      if (response.data.success) {
        setInWatchlist(response.data.inWatchlist); // ✅ use backend state
        toast.success(
          response.data.inWatchlist
            ? "Added to My List!"
            : "Removed from My List!"
        );
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
      toast.error("Failed to update My List");
    }
  };

  if (!movie || !dbMovie)
    return <div className="text-center p-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <div
        className="relative h-[70vh] md:h-[85vh] flex items-end p-6 md:p-16"
        style={{
          backgroundImage: `url('${dbMovie.backdrop_path}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

        <div className="relative z-10 max-w-xl md:max-w-2xl">
          <h1 className="text-2xl md:text-5xl font-extrabold mb-4">
            {dbMovie.title}
          </h1>
          <p className="text-sm md:text-lg text-gray-300 mb-6 line-clamp-3">
            {dbMovie.overview || movie.overview}
          </p>

          <div className="flex flex-wrap gap-3">
            {/* <button
              onClick={handleAction}
              className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded font-semibold ${
                dbMovieType === "OTT"
                  ? "bg-white text-black hover:bg-gray-300"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {dbMovieType === "OTT" ? (
                <Play size={20} />
              ) : (
                <Ticket size={20} />
              )}
              {dbMovieType === "OTT" ? "Play" : "Book Tickets"}
            </button> */}
            <button
              onClick={handleAction}
              disabled={isFetchingVideo} // 🔹 disable while fetching
              className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded font-semibold transition ${
                dbMovieType === "OTT"
                  ? "bg-white text-black hover:bg-gray-300 disabled:opacity-60"
                  : "bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
              }`}
            >
              {isFetchingVideo ? (
                <span>Loading...</span> // 🔹 show loader text
              ) : dbMovieType === "OTT" ? (
                <>
                  <Play size={20} /> Play
                </>
              ) : (
                <>
                  <Ticket size={20} /> Book Tickets
                </>
              )}
            </button>

            {trailerKey && (
              <Tooltip content="Watch Trailer">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-gray-600 px-4 md:px-6 py-2 rounded font-semibold hover:bg-gray-500"
                >
                  <Info size={20} /> Trailer
                </button>
              </Tooltip>
            )}

            {/* My List button */}
            <button
              onClick={handleWatchlistToggle}
              className="flex items-center gap-2 bg-gray-700 px-4 md:px-6 py-2 rounded font-semibold hover:bg-gray-600"
            >
              {inWatchlist ? "✓ My List" : "+ My List"}
            </button>
          </div>
        </div>
      </div>

      {/* CAST */}
      {cast && (
        <div className="px-4 md:px-16 py-10">
          <h3 className="text-lg md:text-xl font-bold mb-4">Cast</h3>
          <div className="flex overflow-x-scroll scrollbar-hide gap-6">
            {cast.map(
              (cst: any) =>
                cst.profile_path && (
                  <div
                    key={cst.id}
                    className="flex-shrink-0 w-24 sm:w-28 md:w-32 text-center group"
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/original/${cst.profile_path}`}
                      className="rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover mx-auto transition-transform duration-300 group-hover:scale-110 border-2 border-gray-700"
                      alt={cst.name}
                    />
                    <p className="mt-2 text-xs md:text-sm text-gray-300 group-hover:text-white">
                      {cst.name}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {/* TRAILER MODAL */}
      {/* {isModalOpen && trailerKey && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl px-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-10 right-0 text-white text-3xl"
            >
              &times;
            </button>
            <YouTube
              videoId={trailerKey}
              opts={{ playerVars: { autoplay: 1 } }}
              className="w-full h-[250px] sm:h-[350px] md:h-[500px]"
            />
          </div>
        </div>
      )} */}

      {/* TRAILER MODAL */}
      {isModalOpen && trailerKey && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl px-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-10 right-0 text-white text-3xl"
            >
              &times;
            </button>
            <div className="w-full h-[250px] sm:h-[350px] md:h-[500px]">
              <iframe
                className="w-full h-full rounded"
                src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&controls=1&modestbranding=1&fs=0&iv_load_policy=3&cc_load_policy=0&mute=1`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* PLAY MODAL (OTT) */}
      {selectedMovie && (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen} placement="top-center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>{selectedMovie.title}</ModalHeader>
                <ModalBody>
                  {secureUrl ? (
                    <video controls autoPlay className="w-full rounded">
                      <source src={secureUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <p className="text-center text-gray-400">
                      Loading secure link...
                    </p>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {/* SUBSCRIPTION MODAL */}
      {isSubscriptionModalOpen && (
        <Modal
          isOpen={isSubscriptionModalOpen}
          onOpenChange={() => setIsSubscriptionModalOpen(false)}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Subscribe to Watch</ModalHeader>
                <ModalBody>
                  <p>Choose a plan to watch this movie.</p>
                  <div className="bg-gray-800 p-4 rounded flex justify-between items-center">
                    <div>
                      <h5 className="font-bold">Yearly Plan</h5>
                      <p>₹699</p>
                    </div>
                    <Button
                      color="success"
                      onClick={() => handleSubscribe(699)}
                    >
                      Pay ₹699
                    </Button>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default LandingPageMovieDetails;

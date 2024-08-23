
// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import YouTube from "react-youtube";
// import {
//   Tooltip,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   Image,
// } from "@nextui-org/react";
// import { RootState } from "../../redux/store";
// import { commonRequest } from "../../config/api";
// import { config } from "../../config/constants";
// import { toast } from "react-toastify";
// import { loadStripe } from "@stripe/stripe-js";

// const LandingPageMovieDetails: React.FC = () => {
//   const { movieId } = useParams<{ movieId: string }>();
//   const { state } = useLocation();
//   const [movie, setMovie] = useState<any>();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [trailerKey, setTrailerKey] = useState<string | null>(null);
//   const [cast, setCast] = useState<any>();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
//   const [selectedMovie, setSelectedMovie] = useState<any>(null);
//   const navigate = useNavigate();
//   const castContainerRef = useRef<HTMLDivElement>(null);

//   const { user } = useSelector((state: RootState) => state.user);

//   const currentUserId = user?._id;

//   console.log(user, "current user");

//   const dbMovie = state;
//   const dbMovieType = dbMovie.type;

//   console.log(dbMovieType, "movie type");

//   useEffect(() => {
//     if (movieId) {
//       fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
//       )
//         .then((res) => res.json())
//         .then((data) => setMovie(data))
//         .catch((err) => console.error("Error fetching movie details:", err));

//       fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2a1ba4f836ae838c2fe9a42ef94af264&language=en-US`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           const trailer = data.results.find(
//             (video: any) => video.type === "Trailer"
//           );
//           if (trailer) {
//             setTrailerKey(trailer.key);
//           }
//         })
//         .catch((err) => console.error("Error fetching movie videos:", err));

//       fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
//       )
//         .then((res) => res.json())
//         .then((data) => setCast(data.cast))
//         .catch((err) => console.error("Error fetching movie cast:", err));
//     }
//   }, [movieId]);

//   const scrollCast = (direction: string) => {
//     if (castContainerRef.current) {
//       const { scrollLeft, clientWidth} = castContainerRef.current;
//       const scrollAmount = clientWidth * 0.8; // Adjust the scroll amount as needed

//       if (direction === "left") {
//         castContainerRef.current.scrollTo({
//           left: scrollLeft - scrollAmount,
//           behavior: "smooth",
//         });
//       } else if (direction === "right") {
//         castContainerRef.current.scrollTo({
//           left: scrollLeft + scrollAmount,
//           behavior: "smooth",
//         });
//       }
//     }
//   };

//   const toggleTrailer = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const handleAction = () => {
//     if (user) {
//       if (dbMovieType === "OTT") {
//         console.log(user, "inside th play button");
//         console.log(dbMovieType, "inside play button");

//         if (user.isSubscribed && user.isSubscribed.status === "active") {
//           setSelectedMovie(dbMovie);
//           setIsOpen(true);
//         } else {
//           setIsSubscriptionModalOpen(true);
//         }
//       } else {
//         navigate(`/booking/movie/${state}`);
//       }
//     } else {
//       alert("Please login to proceed!");
//       navigate("/login");
//     }
//   };

//   const handleSubscribe = async (amount: number) => {
//     console.log(amount, "amount here");

//     const stripe = await loadStripe(
//       "pk_test_51PfywdInImkOs26H6WShgcp1Ofw9sDXYIOSVlx8hFLmtD8n0YM85SLqgMsDKf0oNsAKri0g4gwys0iAa7DWkXObn00czgPF6N7"
//     );

//     if (!stripe) {
//       console.error("Stripe failed to load");
//       return;
//     }

//     try {
//       const body = {
//         amount,
//         userId: currentUserId,
//       };
//       // Create a checkout session with the amount
//       const response = await commonRequest(
//         "POST",
//         "/Subscribe/create-checkout-session",
//         config,
//         body
//       );

//       console.log(response, "response from backend in front");

//       if (!response.data.success) {
//         throw new Error(
//           `Failed to create checkout session: ${response.statusText}`
//         );
//       }

//       const result = await stripe.redirectToCheckout({
//         sessionId: response.data.id,
//       });

//       if (result.error) {
//         toast.error(`Stripe checkout failed: ${result.error.message}`);
//       } else {
//         setIsSubscriptionModalOpen(false);
//         toast.success("Subscription initiated successfully!");
//       }
//     } catch (error) {
//       toast.error(`Subscription failed`);
//       console.error("Subscription failed", error);
//     }
//   };

//   const onOpenChange = (open: boolean) => {
//     setIsOpen(open);
//   };

//   if (!movie) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div
//       className="min-h-screen text-gray-200 p-6 relative flex flex-col items-center justify-center"
//       style={{
//         backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="relative z-10 w-full md:w-3/4 lg:w-1/2 p-4 bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row gap-6 md:gap-12">
//         <div className="flex-1 flex items-center justify-center">
//           <img
//             className="rounded-lg"
//             src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
//             alt={movie.title}
//           />
//         </div>
//         <div className="flex-1 flex flex-col gap-4">
//           <h2 className="text-xl md:text-2xl font-bold">{movie.title}</h2>
//           <p className="text-md">{movie.overview}</p>
//           <div className="sub-details flex flex-wrap gap-4 font-bold">
//             <h5 className="text-white text-sm">
//               <i className="fa-solid fa-language"></i> {movie.original_language}
//             </h5>
//             <h5 className="text-white text-sm">
//               <i className="fa-regular fa-clock"></i> {movie.runtime} min
//             </h5>
//             <h5 className="text-white text-sm">
//               <i className="fa-solid fa-heart"></i> {movie.vote_average}/10
//             </h5>
//             <h5 className="text-white text-sm">
//               <i className="fa-solid fa-comment"></i> {movie.vote_count} votes
//             </h5>
//           </div>
//           <div className="flex gap-2 mt-2">
//             <button
//               onClick={handleAction}
//               className={`${
//                 dbMovieType === "OTT"
//                   ? "bg-green-600 hover:bg-green-700"
//                   : "bg-blue-600 hover:bg-blue-700"
//               } text-white font-bold py-2 px-4 rounded`}
//             >
//               {dbMovieType === "OTT" ? "Play Movie" : "Book Tickets"}
//             </button>
//             <Tooltip
//               showArrow={true}
//               color="primary"
//               placement="bottom"
//               content="Click this button play Trailer"
//             >
//               <button
//                 onClick={toggleTrailer}
//                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
//               >
//                 {isModalOpen ? (
//                   <i className="fa-solid fa-pause"></i>
//                 ) : (
//                   <i className="fa-solid fa-play"></i>
//                 )}
//               </button>
//             </Tooltip>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && trailerKey && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="bg-gray-800 p-4 rounded-lg relative">
//             <button
//               onClick={toggleTrailer}
//               className="absolute top-0 right-0 mt-2 mr-2 text-white"
//             >
//               &times;
//             </button>
//             <YouTube videoId={trailerKey} />
//           </div>
//         </div>
//       )}

//       {cast && (
//         <div className="relative bottom-0 w-full mt-10">
//           <h3 className="text-xl text-center mb-6 font-semibold text-white">
//             Casts
//           </h3>
//           <div className="relative flex items-center justify-center mb-4">
//             <button
//               onClick={() => scrollCast("left")}
//               className="absolute left-0 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//             >
//               &lt;
//             </button>
//             <div
//               ref={castContainerRef}
//               className="w-full flex overflow-x-scroll items-center overflow-y-hidden scrollbar-hide p-5 space-x-8"
//             >
//               {cast.map(
//                 (cst: any) =>
//                   cst.profile_path && (
//                     <div key={cst.id} className="flex-shrink-0 w-[120px]">
//                       <Image
//                         src={`https://image.tmdb.org/t/p/original/${cst.profile_path}`}
//                         className="rounded-full border-2 border-blue-400"
//                         width={100}
//                         height={100}
//                         alt={cst.name}
//                       />
//                       <p className="text-center mt-2 text-xs text-white">
//                         {cst.name}
//                       </p>
//                     </div>
//                   )
//               )}
//             </div>
//             <button
//               onClick={() => scrollCast("right")}
//               className="absolute right-0 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       )}

//       {selectedMovie && (
//         <Modal
//           isOpen={isOpen}
//           onOpenChange={onOpenChange}
//           placement="top-center"
//         >
//           <ModalContent>
//             {(onClose) => (
//               <>
//                 <ModalHeader className="flex flex-col gap-1">
//                   {selectedMovie.title}
//                 </ModalHeader>
//                 <ModalBody>
//                   <p>{selectedMovie.overview}</p>
//                   <div className="video-container mt-10">
//                     <video
//                       controls
//                       className="w-full h-auto rounded-lg shadow-md"
//                     >
//                       <source
//                         src={selectedMovie.streamingURL}
//                         type="video/mp4"
//                       />
//                       Your browser does not support the video tag.
//                     </video>
//                   </div>
//                 </ModalBody>
//                 <ModalFooter>
//                   <Button color="danger" variant="flat" onPress={onClose}>
//                     Close
//                   </Button>
//                 </ModalFooter>
//               </>
//             )}
//           </ModalContent>
//         </Modal>
//       )}

//       {isSubscriptionModalOpen && (
//         <Modal
//           isOpen={isSubscriptionModalOpen}
//           onOpenChange={() => setIsSubscriptionModalOpen(false)}
//           placement="top-center"
//         >
//           <ModalContent>
//             {(onClose) => (
//               <>
//                 <ModalHeader className="flex flex-col gap-1">
//                   Subscribe to Watch
//                 </ModalHeader>
//                 <ModalBody>
//                   <p>Choose subscription plan to watch this movie.</p>
//                   <div className="subscription-plans flex flex-col gap-4 mt-4">
//                     <div className="plan flex items-center justify-between p-4 bg-slate-500 rounded">
//                       <div>
//                         <h5>
//                           <strong>Yearly Plan</strong>
//                         </h5>
//                         <p>
//                           <strong>₹699</strong>
//                         </p>
//                       </div>
//                       <Button
//                         color="success"
//                         onClick={() => handleSubscribe(699)}
//                       >
//                         Pay ₹699
//                       </Button>
//                     </div>
//                   </div>
//                 </ModalBody>

//                 <ModalFooter>
//                   <Button color="danger" variant="flat" onPress={onClose}>
//                     Close
//                   </Button>
//                 </ModalFooter>
//               </>
//             )}
//           </ModalContent>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default LandingPageMovieDetails;



import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import YouTube from "react-youtube";
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

import { commonRequest } from "../../config/api";

import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { config, URL } from "../../config/constants";

const LandingPageMovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { state } = useLocation();
  const [movie, setMovie] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [cast, setCast] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const navigate = useNavigate();
  const castContainerRef = useRef<HTMLDivElement>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);


 useEffect(() => {
   const fetchUser = async () => {
     try {
       const { data } = await axios.get(`${URL}/getUser`, config);
       setCurrentUser(data);
       setCurrentUserId(data?._id);
     } catch (error) {
       console.error("Error fetching user:", error);
     }
   };

   fetchUser();
 }, []);

 console.log(currentUser,"current user");
  console.log(currentUserId, "current useridddddddddd");
 

  const dbMovie = state;
  const dbMovieType = dbMovie.type;

  console.log(dbMovieType, "movie type");

  useEffect(() => {
    if (movieId) {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
      )
        .then((res) => res.json())
        .then((data) => setMovie(data))
        .catch((err) => console.error("Error fetching movie details:", err));

      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2a1ba4f836ae838c2fe9a42ef94af264&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => {
          const trailer = data.results.find(
            (video: any) => video.type === "Trailer"
          );
          if (trailer) {
            setTrailerKey(trailer.key);
          }
        })
        .catch((err) => console.error("Error fetching movie videos:", err));

      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
      )
        .then((res) => res.json())
        .then((data) => setCast(data.cast))
        .catch((err) => console.error("Error fetching movie cast:", err));
    }
  }, [movieId]);

  const scrollCast = (direction: string) => {
    if (castContainerRef.current) {
      const { scrollLeft, clientWidth } = castContainerRef.current;
      const scrollAmount = clientWidth * 0.8; // Adjust the scroll amount as needed

      if (direction === "left") {
        castContainerRef.current.scrollTo({
          left: scrollLeft - scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        castContainerRef.current.scrollTo({
          left: scrollLeft + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const toggleTrailer = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAction = () => {
    if (currentUser) {
      if (dbMovieType === "OTT") {
        console.log(currentUser, "inside th play button");
        console.log(dbMovieType, "inside play button");

        if (currentUser.isSubscribed && currentUser.isSubscribed.status === "active") {
          setSelectedMovie(dbMovie);
          setIsOpen(true);
        } else {
          setIsSubscriptionModalOpen(true);
        }
      } else {
        navigate(`/booking/movie/${state}`);
      }
    } else {
      alert("Please login to proceed!");
      navigate("/login");
    }
  };

  const handleSubscribe = async (amount: number) => {
    console.log(amount, "amount here");

    const stripe = await loadStripe(
      "pk_test_51PfywdInImkOs26H6WShgcp1Ofw9sDXYIOSVlx8hFLmtD8n0YM85SLqgMsDKf0oNsAKri0g4gwys0iAa7DWkXObn00czgPF6N7"
    );

    if (!stripe) {
      console.error("Stripe failed to load");
      return;
    }

    try {
      const body = {
        amount,
        userId: currentUserId,
      };
      // Create a checkout session with the amount
      const response = await commonRequest(
        "POST",
        "/Subscribe/create-checkout-session",
        config,
        body
      );

      console.log(response, "response from backend in front");

      if (!response.data.success) {
        throw new Error(
          `Failed to create checkout session: ${response.statusText}`
        );
      }

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        toast.error(`Stripe checkout failed: ${result.error.message}`);
      } else {
        setIsSubscriptionModalOpen(false);
        toast.success("Subscription initiated successfully!");
      }
    } catch (error) {
      toast.error(`Subscription failed`);
      console.error("Subscription failed", error);
    }
  };

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="min-h-screen text-gray-200 p-6 relative flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 w-full md:w-3/4 lg:w-1/2 p-4 bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row gap-6 md:gap-12">
        <div className="flex-1 flex items-center justify-center">
          <img
            className="rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-bold">{movie.title}</h2>
          <p className="text-md">{movie.overview}</p>
          <div className="sub-details flex flex-wrap gap-4 font-bold">
            <h5 className="text-white text-sm">
              <i className="fa-solid fa-language"></i> {movie.original_language}
            </h5>
            <h5 className="text-white text-sm">
              <i className="fa-regular fa-clock"></i> {movie.runtime} min
            </h5>
            <h5 className="text-white text-sm">
              <i className="fa-solid fa-heart"></i> {movie.vote_average}/10
            </h5>
            <h5 className="text-white text-sm">
              <i className="fa-solid fa-comment"></i> {movie.vote_count} votes
            </h5>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAction}
              className={`${
                dbMovieType === "OTT"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded`}
            >
              {dbMovieType === "OTT" ? "Play Movie" : "Book Tickets"}
            </button>
            <Tooltip
              showArrow={true}
              color="primary"
              placement="bottom"
              content="Click this button play Trailer"
            >
              <button
                onClick={toggleTrailer}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
              >
                {isModalOpen ? (
                  <i className="fa-solid fa-pause"></i>
                ) : (
                  <i className="fa-solid fa-play"></i>
                )}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {isModalOpen && trailerKey && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-4 rounded-lg relative">
            <button
              onClick={toggleTrailer}
              className="absolute top-0 right-0 mt-2 mr-2 text-white"
            >
              &times;
            </button>
            <YouTube videoId={trailerKey} />
          </div>
        </div>
      )}

      {cast && (
        <div className="relative bottom-0 w-full mt-10">
          <h3 className="text-xl text-center mb-6 font-semibold text-white">
            Casts
          </h3>
          <div className="relative flex items-center justify-center mb-4">
            <button
              onClick={() => scrollCast("left")}
              className="absolute left-0 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              &lt;
            </button>
            <div
              ref={castContainerRef}
              className="w-full flex overflow-x-scroll items-center overflow-y-hidden scrollbar-hide p-5 space-x-8"
            >
              {cast.map(
                (cst: any) =>
                  cst.profile_path && (
                    <div key={cst.id} className="flex-shrink-0 w-[120px]">
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${cst.profile_path}`}
                        className="rounded-full border-2 border-blue-400"
                        width={100}
                        height={100}
                        alt={cst.name}
                      />
                      <p className="text-center mt-2 text-xs text-white">
                        {cst.name}
                      </p>
                    </div>
                  )
              )}
            </div>
            <button
              onClick={() => scrollCast("right")}
              className="absolute right-0 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              &gt;
            </button>
          </div>
        </div>
      )}

      {selectedMovie && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {selectedMovie.title}
                </ModalHeader>
                <ModalBody>
                  <p>{selectedMovie.overview}</p>
                  <div className="video-container mt-10">
                    <video
                      controls
                      className="w-full h-auto rounded-lg shadow-md"
                    >
                      <source
                        src={selectedMovie.streamingURL}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
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

      {isSubscriptionModalOpen && (
        <Modal
          isOpen={isSubscriptionModalOpen}
          onOpenChange={() => setIsSubscriptionModalOpen(false)}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Subscribe to Watch
                </ModalHeader>
                <ModalBody>
                  <p>Choose subscription plan to watch this movie.</p>
                  <div className="subscription-plans flex flex-col gap-4 mt-4">
                    <div className="plan flex items-center justify-between p-4 bg-slate-500 rounded">
                      <div>
                        <h5>
                          <strong>Yearly Plan</strong>
                        </h5>
                        <p>
                          <strong>₹699</strong>
                        </p>
                      </div>
                      <Button
                        color="success"
                        onClick={() => handleSubscribe(699)}
                      >
                        Pay ₹699
                      </Button>
                    </div>
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

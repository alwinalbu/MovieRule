// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import YouTube from "react-youtube";
// import { Tooltip, Image } from "@nextui-org/react";
// import { RootState } from "../../redux/store";

//   export const TheaterMovieDetails: React.FC = () => {
//   const { movieId } = useParams<{ movieId: string }>();
//   const [movie, setMovie] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [trailerKey, setTrailerKey] = useState<string | null>(null);
//   const [cast, setCast] = useState<any[]>([]);
//   const navigate = useNavigate();
//   const castContainerRef = useRef<HTMLDivElement>(null);

//   const { admin } = useSelector((state: RootState) => state.admin);

//    const location = useLocation();
//    const dbMovietype = location.state;

//    console.log(dbMovietype,"movie type");
   
 
//   useEffect(() => {
//     if (movieId) {
//       // Fetch movie details
//       fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
//       )
//         .then((res) => res.json())
//         .then((data) => setMovie(data))
//         .catch((err) => console.error("Error fetching movie details:", err));

//       // Fetch movie videos
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

//       // Fetch movie cast
//       fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
//       )
//         .then((res) => res.json())
//         .then((data) => setCast(data.cast))
//         .catch((err) => console.error("Error fetching movie cast:", err));
//     }
//   }, [movieId]);

//   const scrollCast = (direction: "left" | "right") => {
//     if (castContainerRef.current) {
//       const { scrollLeft, clientWidth } = castContainerRef.current;
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


//   if (!movie) {
//     return <div className="text-center text-white">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-200 p-6 relative flex flex-col items-center justify-center">
//       <div
//         className="absolute inset-0 w-screen h-screen bg-cover bg-center"
//         style={{
//           backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
//         }}
//       />

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
//             {/* <button
//               onClick={handleDeleteMovie}
//               className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Delete Movie
//             </button> */}
//             <Tooltip
//               showArrow={true}
//               color="primary"
//               placement="bottom"
//               content="Click this button to play the trailer"
//             >
//               <button
//                 onClick={toggleTrailer}
//                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
//               > Play Trailer 
//                 {isModalOpen ? (
//                   <i className="fa-solid fa-pause"></i>
//                 ) : (
//                    <i className="fa-solid fa-play"></i>
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

//       {cast.length > 0 && (
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
//     </div>
//   );
// };

// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import YouTube from "react-youtube";
// import { Tooltip, Image, Button } from "@nextui-org/react";
// import { RootState } from "../../redux/store";


// export const TheaterMovieDetails: React.FC = () => {
//   const { movieId } = useParams<{ movieId: string }>();
//   const [movie, setMovie] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [trailerKey, setTrailerKey] = useState<string | null>(null);
//   const [cast, setCast] = useState<any[]>([]);
//   const navigate = useNavigate();
//   const castContainerRef = useRef<HTMLDivElement>(null);

//   const { admin } = useSelector((state: RootState) => state.admin);

//   const location = useLocation();
//   const dbMovietype = location.state;

//   console.log(dbMovietype, "movie type");

//   useEffect(() => {
//     if (movieId) {
//       // Fetch movie details
//       fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
//       )
//         .then((res) => res.json())
//         .then((data) => setMovie(data))
//         .catch((err) => console.error("Error fetching movie details:", err));

//       // Fetch movie videos
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

//       // Fetch movie cast
//       fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
//       )
//         .then((res) => res.json())
//         .then((data) => setCast(data.cast))
//         .catch((err) => console.error("Error fetching movie cast:", err));
//     }
//   }, [movieId]);
  

//   const scrollCast = (direction: "left" | "right") => {
//     if (castContainerRef.current) {
//       const { scrollLeft, clientWidth } = castContainerRef.current;
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

//   if (!movie) {
//     return <div className="text-center text-white">Loading...</div>;
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
//       {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}

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
//             <Tooltip
//               showArrow={true}
//               color="primary"
//               placement="bottom"
//               content="Click this button to play the trailer"
//             >
//               <button
//                 onClick={toggleTrailer}
//                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
//               >
//                 Play Trailer
//                 {isModalOpen ? (
//                   <i className="fa-solid fa-pause"></i>
//                 ) : (
//                   <i className="fa-solid fa-play"></i>
//                 )}
//               </button>
//             </Tooltip>
//             {dbMovietype === "OTT" && (
//               <Button color="primary" isLoading>
//                 Upload
//               </Button>
//             )}
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

//       {cast.length > 0 && (
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
//     </div>
//   );
// };


// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import YouTube from "react-youtube";
// import { Tooltip, Image, Button } from "@nextui-org/react";
// import { RootState } from "../../redux/store";
// import videoUpload from "../videoUpload/videoUpload";
// import VideoUploadModal from "../videoUpload/VideoUploadModal";


//   export const TheaterMovieDetails: React.FC = () => {
//     const { movieId } = useParams<{ movieId: string }>();
//     const [movie, setMovie] = useState<any>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [trailerKey, setTrailerKey] = useState<string | null>(null);
//     const [cast, setCast] = useState<any[]>([]);
//     const [videoFile, setVideoFile] = useState<File | null>(null);
//     const [uploading, setUploading] = useState(false);
//     const navigate = useNavigate();
//     const castContainerRef = useRef<HTMLDivElement>(null);

//     const { admin } = useSelector((state: RootState) => state.admin);
//     const location = useLocation();
//     const dbMovietype = location.state;

//     console.log(dbMovietype, "movie type");

//     //-----------------------------------------------fetch movie-------------------------------------------------

//     useEffect(() => {
//       if (movieId) {
//         // Fetch movie details
//         fetch(
//           `https://api.themoviedb.org/3/movie/${movieId}?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
//         )
//           .then((res) => res.json())
//           .then((data) => setMovie(data))
//           .catch((err) => console.error("Error fetching movie details:", err));

//         // Fetch movie videos
//         fetch(
//           `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2a1ba4f836ae838c2fe9a42ef94af264&language=en-US`
//         )
//           .then((res) => res.json())
//           .then((data) => {
//             const trailer = data.results.find(
//               (video: any) => video.type === "Trailer"
//             );
//             if (trailer) {
//               setTrailerKey(trailer.key);
//             }
//           })
//           .catch((err) => console.error("Error fetching movie videos:", err));

//         // Fetch movie cast
//         fetch(
//           `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
//         )
//           .then((res) => res.json())
//           .then((data) => setCast(data.cast))
//           .catch((err) => console.error("Error fetching movie cast:", err));
//       }
//     }, [movieId]);

//     //-----------------------------------------------Cast Srolling-------------------------------------------------

//     const scrollCast = (direction: "left" | "right") => {
//       if (castContainerRef.current) {
//         const { scrollLeft, clientWidth } = castContainerRef.current;
//         const scrollAmount = clientWidth * 0.8; // Adjust the scroll amount as needed

//         if (direction === "left") {
//           castContainerRef.current.scrollTo({
//             left: scrollLeft - scrollAmount,
//             behavior: "smooth",
//           });
//         } else if (direction === "right") {
//           castContainerRef.current.scrollTo({
//             left: scrollLeft + scrollAmount,
//             behavior: "smooth",
//           });
//         }
//       }
//     };

//     //-----------------------------------------------Open Trailer-------------------------------------------------

//     const toggleTrailer = () => {
//       setIsModalOpen(!isModalOpen);
//     };

 
// //-------------------------------------------------------------------------------------------------------------  

//     if (!movie) {
//       return <div className="text-center text-white">Loading...</div>;
//     }

//     return (
//       <div
//         className="min-h-screen text-gray-200 p-6 relative flex flex-col items-center justify-center"
//         style={{
//           backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <div className="relative z-10 w-full md:w-3/4 lg:w-1/2 p-4 bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row gap-6 md:gap-12">
//           <div className="flex-1 flex items-center justify-center">
//             <img
//               className="rounded-lg"
//               src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
//               alt={movie.title}
//             />
//           </div>
//           <div className="flex-1 flex flex-col gap-4">
//             <h2 className="text-xl md:text-2xl font-bold">{movie.title}</h2>
//             <p className="text-md">{movie.overview}</p>
//             <div className="sub-details flex flex-wrap gap-4 font-bold">
//               <h5 className="text-white text-sm">
//                 <i className="fa-solid fa-language"></i>{" "}
//                 {movie.original_language}
//               </h5>
//               <h5 className="text-white text-sm">
//                 <i className="fa-regular fa-clock"></i> {movie.runtime} min
//               </h5>
//               <h5 className="text-white text-sm">
//                 <i className="fa-solid fa-heart"></i> {movie.vote_average}/10
//               </h5>
//               <h5 className="text-white text-sm">
//                 <i className="fa-solid fa-comment"></i> {movie.vote_count} votes
//               </h5>
//             </div>
//             <div className="flex gap-2 mt-2">
//               <Tooltip
//                 showArrow={true}
//                 color="primary"
//                 placement="bottom"
//                 content="Click this button to play the trailer"
//               >
//                 <button
//                   onClick={toggleTrailer}
//                   className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
//                 >
//                   Play Trailer
//                   {isModalOpen ? (
//                     <i className="fa-solid fa-pause"></i>
//                   ) : (
//                     <i className="fa-solid fa-play"></i>
//                   )}
//                 </button>
//               </Tooltip>
//               {dbMovietype === "OTT" && (
//                 <div className="flex gap-2">
//                   {dbMovietype === "OTT" && (
//                     <>
//                       <Button
//                         onClick={() => setIsModalOpen(true)}
//                         color="primary"
//                       >
//                         Upload
//                       </Button>
//                       {/* <VideoUploadModal /> */}
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {isModalOpen && trailerKey && (
//           <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//             <div className="bg-gray-800 p-4 rounded-lg relative">
//               <button
//                 onClick={toggleTrailer}
//                 className="absolute top-0 right-0 mt-2 mr-2 text-white"
//               >
//                 &times;
//               </button>
//               <YouTube videoId={trailerKey} />
//             </div>
//           </div>
//         )}

//         {cast.length > 0 && (
//           <div className="relative bottom-0 w-full mt-10">
//             <h3 className="text-xl text-center mb-6 font-semibold text-white">
//               Casts
//             </h3>
//             <div className="relative flex items-center justify-center mb-4">
//               <button
//                 onClick={() => scrollCast("left")}
//                 className="absolute left-0 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 &lt;
//               </button>
//               <div
//                 ref={castContainerRef}
//                 className="w-full flex overflow-x-scroll items-center overflow-y-hidden scrollbar-hide p-5 space-x-8"
//               >
//                 {cast.map(
//                   (cst: any) =>
//                     cst.profile_path && (
//                       <div key={cst.id} className="flex-shrink-0 w-[120px]">
//                         <Image
//                           src={`https://image.tmdb.org/t/p/original/${cst.profile_path}`}
//                           className="rounded-full border-2 border-blue-400"
//                           width={100}
//                           height={100}
//                           alt={cst.name}
//                         />
//                         <p className="text-center mt-2 text-xs text-white">
//                           {cst.name}
//                         </p>
//                       </div>
//                     )
//                 )}
//               </div>
//               <button
//                 onClick={() => scrollCast("right")}
//                 className="absolute right-0 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 &gt;
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };


// import React, { useEffect, useState, useRef } from "react";
// import { useParams,useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import YouTube from "react-youtube";
// import { Tooltip, Image, Button, useDisclosure } from "@nextui-org/react";
// import { RootState } from "../../redux/store";
// import VideoUploadModal from "../videoUpload/VideoUploadModal";


// export const TheaterMovieDetails: React.FC = () => {
//   const { movieId } = useParams<{ movieId: string }>();
//   const [movie, setMovie] = useState<any>(null);
//   const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
//   const [trailerKey, setTrailerKey] = useState<string | null>(null);
//   const [cast, setCast] = useState<any[]>([]);
//   const castContainerRef = useRef<HTMLDivElement>(null);
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const { admin } = useSelector((state: RootState) => state.admin);

//   const location = useLocation();
//   const dbMovie = location.state.movie;
//   const dbMovietype = dbMovie.type;

//    console.log(dbMovie, "movie inside the deatisl");

//   console.log(dbMovietype,"movie type");
  
//   useEffect(() => {
//     if (movieId) {
//       // Fetch movie details
//       fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
//       )
//         .then((res) => res.json())
//         .then((data) => setMovie(data))
//         .catch((err) => console.error("Error fetching movie details:", err));

//       // Fetch movie videos
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

//       // Fetch movie cast
//       fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2a1ba4f836ae838c2fe9a42ef94af264`
//       )
//         .then((res) => res.json())
//         .then((data) => setCast(data.cast))
//         .catch((err) => console.error("Error fetching movie cast:", err));
//     }
//   }, [movieId]);

//   const scrollCast = (direction: "left" | "right") => {
//     if (castContainerRef.current) {
//       const { scrollLeft, clientWidth } = castContainerRef.current;
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

//   const toggleTrailerModal = () => {
//     setIsTrailerModalOpen(!isTrailerModalOpen);
//   };

//   if (!movie) {
//     return <div className="text-center text-white">Loading...</div>;
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
//       {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}

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
//             <Tooltip
//               showArrow={true}
//               color="primary"
//               placement="bottom"
//               content="Click this button to play the trailer"
//             >
//               <button
//                 onClick={toggleTrailerModal}
//                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
//               >
//                 Play Trailer
//                 {isTrailerModalOpen ? (
//                   <i className="fa-solid fa-pause"></i>
//                 ) : (
//                   <i className="fa-solid fa-play"></i>
//                 )}
//               </button>
//             </Tooltip>
//             {dbMovietype === "OTT" && (
//               <Button color="primary" onPress={onOpen}>
//                 Upload
//               </Button>
//             )}

//             {/* Video Upload Modal */}
//             <VideoUploadModal isOpen={isOpen} onClose={onClose} />
//           </div>
//         </div>
//       </div>

//       {isTrailerModalOpen && trailerKey && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="bg-gray-800 p-4 rounded-lg relative">
//             <button
//               onClick={toggleTrailerModal}
//               className="absolute top-0 right-0 mt-2 mr-2 text-white"
//             >
//               &times;
//             </button>
//             <YouTube videoId={trailerKey} />
//           </div>
//         </div>
//       )}

//       {cast.length > 0 && (
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
//     </div>
//   );
// };

import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import { Tooltip, Image, Button, useDisclosure } from "@nextui-org/react";
import { RootState } from "../../redux/store";
import VideoUploadModal from "../videoUpload/VideoUploadModal";
import { commonRequest } from "../../config/api";
import { config } from "../../config/constants";

export const TheaterMovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [cast, setCast] = useState<any[]>([]);
  const castContainerRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { admin } = useSelector((state: RootState) => state.admin);

  const location = useLocation();
  const dbMovie = location.state.movie;
  const dbMovietype = dbMovie.type;
  const dbMovieId=dbMovie._id;

  console.log(dbMovieId,"movie id in deatail page");

  

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

  const scrollCast = (direction: "left" | "right") => {
    if (castContainerRef.current) {
      const { scrollLeft, clientWidth } = castContainerRef.current;
      const scrollAmount = clientWidth * 0.8;

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

  const toggleTrailerModal = () => {
    setIsTrailerModalOpen(!isTrailerModalOpen);
  };

const handleUploadSuccess = async (videoUrl: string) => {
  try {
  
    const response = await commonRequest(
      "PATCH",
      `/admin/update-movie/${dbMovieId}`,
      config,
      { videoUrl }
    );

    if (response.status === 200) {
      alert("Video uploaded successfully!");
    } else {
      
      const errorMessage = await response.text();
      alert(`Failed to update movie: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error updating movie with video URL:", error);
    alert("An error occurred while uploading the video.");
  }
};


  if (!movie) {
    return <div className="text-center text-white">Loading...</div>;
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
            <Tooltip
              showArrow={true}
              color="primary"
              placement="bottom"
              content="Click this button to play the trailer"
            >
              <button
                onClick={toggleTrailerModal}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
              >
                Play Trailer
                {isTrailerModalOpen ? (
                  <i className="fa-solid fa-pause"></i>
                ) : (
                  <i className="fa-solid fa-play"></i>
                )}
              </button>
            </Tooltip>
            {dbMovietype === "OTT" && (
              <Button color="primary" onPress={onOpen}>
                Upload
              </Button>
            )}

            <VideoUploadModal
              isOpen={isOpen}
              onClose={onClose}
              onUploadSuccess={handleUploadSuccess} 
            />
          </div>
        </div>
      </div>

      {isTrailerModalOpen && trailerKey && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-4 rounded-lg relative">
            <button
              onClick={toggleTrailerModal}
              className="absolute top-0 right-0 mt-2 mr-2 text-white"
            >
              &times;
            </button>
            <YouTube videoId={trailerKey} />
          </div>
        </div>
      )}

      {cast.length > 0 && (
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
    </div>
  );
};

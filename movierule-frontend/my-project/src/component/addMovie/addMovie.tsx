// import React, { useState } from "react";
// import Modal from "react-modal";
// import StarRating from "../rating/starRating";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };

// Modal.setAppElement("#root");

// interface AddMovieProps {
//   handleAdd: (newMovie: {
//     name: string;
//     date: string;
//     image: string;
//     rating: number;
//     id: number;
//   }) => void;
// }

// const AddMovie: React.FC<AddMovieProps> = ({ handleAdd }) => {
//   const [modalIsOpen, setIsOpen] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     date: "",
//     image: "",
//     rating: 1,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const openModal = () => setIsOpen(true);

//   const closeModal = () => setIsOpen(false);

//   const handleRate = (rate: number) => setForm({ ...form, rating: rate });

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const newMovie = {
//       ...form,
//       id: Math.random(),
//     };
//     handleAdd(newMovie);
//     closeModal();
//   };

//   return (
//     <div>
//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={openModal}
//       >
//         Add movie
//       </button>
//       <Modal
//         style={customStyles}
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Add Movie Modal"
//       >
//         <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
//           <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Name
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 type="text"
//                 value={form.name}
//                 name="name"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Date of release
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 type="date"
//                 value={form.date}
//                 name="date"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Rating
//               </label>
//               <StarRating rate={form.rating} handleRating={handleRate} />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Image
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 type="url"
//                 value={form.image}
//                 name="image"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 type="submit"
//               >
//                 Add
//               </button>
//               <button
//                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 onClick={closeModal}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default AddMovie;

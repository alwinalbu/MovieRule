// import React, { useState, useEffect, ChangeEvent } from "react";
// import {
//   Card,
//   CardBody,
//   CardFooter,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
//   Input,
// } from "@nextui-org/react";
// import { useNavigate } from "react-router-dom";
// import { config } from "../../../config/constants";
// import { commonRequest } from "../../../config/api";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";
// import toast, { Toaster } from "react-hot-toast";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import { GiHamburgerMenu } from "react-icons/gi";
// import TheaterSidebar from "../../TheaterSidebar/TheaterSidebar";
// import {
//   Snack,
//   TheaterEntity,
// } from "../../../interfaces/theater/Theaterinterface";
// import ImageUpload from "../../imageUpoad/ImageUpload";

// interface FormData {
//   name: string;
//   price: string;
//   image: string;
// }

// function ManageSnacks() {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [selectedSnack, setSelectedSnack] = useState<Snack | null>(null);
//   const [snacks, setSnacks] = useState<Snack[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const navigate = useNavigate();
//   const theaterOwner: TheaterEntity | null = useSelector(
//     (state: RootState) => state.theater.theaterOwner
//   );
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     price: "",
//     image: "",
//   });

//   const theaterId = theaterOwner?._id;
//   if (!theaterId) throw new Error("Theater ID is missing");

//   useEffect(() => {
//     const fetchSnacks = async () => {
//       try {
//         setLoading(true);
//         const response = await commonRequest(
//           "GET",
//           `/theater/get-snacks?theaterId=${theaterId}`,
//           config
//         );
//         setSnacks(response.data.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch snacks");
//         toast.error("Failed to fetch snacks");
//         setLoading(false);
//       }
//     };

//     fetchSnacks();
//   }, [theaterOwner?._id]);

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement>,
//     key: keyof FormData
//   ) => {
//     setFormData({ ...formData, [key]: e.target.value });
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { files } = e.target;
//     const file = files?.[0] || null;
//     setImageFile(file);
//   };

//   const handleSave = async () => {
//     try {
//       const { name, price } = formData;
//       const theater_id = theaterOwner?._id;

//       const imageUrl = imageFile ? await ImageUpload(imageFile) : "";

//       const snackData = {
//         name,
//         price: parseFloat(price), 
//         image: imageUrl,
//         theater_id,
//       };

//       const response = await commonRequest(
//         "POST",
//         "/theater/add-snack",
//         config,
//         snackData
//       );
//       toast.success("Snack saved successfully");
//       setSnacks([...snacks, response.data.data]);
//       setFormData({
//         name: "",
//         price: "",
//         image: "",
//       });
//       setImageFile(null);
//       onOpenChange(false);
//     } catch (error) {
//       toast.error("Error saving snack");
//     }
//   };

//   const handleDeleteSnack = async () => {
//     try {
//       toast.success("Snack deleted successfully");
//       setDeleteModal(false);
//     } catch (error) {
//       toast.error("Failed to delete snack");
//     }
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <>
//       <Toaster />
//       <div className="min-h-screen bg-gray-950 text-white">
//         <button onClick={toggleSidebar} className="text-white">
//           <GiHamburgerMenu />
//         </button>
//         {sidebarOpen && (
//           <TheaterSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
//         )}
//         <div className="flex pb-8 pt-4">
//           <h1 className="text-3xl font-semibold text-white">Manage Snacks</h1>
//         </div>
//         <Button className="bg-indigo-500 mb-4" onPress={onOpen}>
//           Add Snack
//         </Button>
//         <div className="gap-2 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
//           {snacks?.length > 0 && (
//             <>
//               {snacks?.map((snack) => (
//                 <Card key={snack._id} className="" shadow="sm" isPressable>
//                   <CardBody className="overflow-visible p-0">
//                     <img
//                       src={snack.image}
//                       alt={snack.name}
//                       className="w-full object-cover"
//                     />
//                   </CardBody>
//                   <CardFooter className="text-small flex flex-col justify-center items-start">
//                     <h2 className="text-lg font-bold">{snack.name}</h2>
//                     <p className="text-default-500">Price: ₹{snack.price}</p>
//                     <div className="flex gap-2">
//                       <Button
//                         size="sm"
//                         radius="full"
//                         color="danger"
//                         variant="shadow"
//                         className="mt-2"
//                         onPress={() => {
//                           setSelectedSnack(snack);
//                           setDeleteModal(true);
//                         }}
//                       >
//                         <i className="fas fa-trash text-black"></i>
//                       </Button>
//                       <Button
//                         size="sm"
//                         radius="full"
//                         color="primary"
//                         variant="shadow"
//                         className="mt-2"
//                         onClick={() => {
//                           navigate("/theatre/snack/manage", {
//                             state: snack._id,
//                           });
//                         }}
//                       >
//                         <i className="fa-solid fa-eye"></i>
//                       </Button>
//                     </div>
//                   </CardFooter>
//                 </Card>
//               ))}
//             </>
//           )}
//         </div>
//       </div>

//       <Modal
//         isOpen={isOpen}
//         onOpenChange={onOpenChange}
//         isDismissable
//         hideCloseButton
//       >
//         <ModalContent>
//           <ModalHeader className="flex flex-col gap-1">Add Snack</ModalHeader>
//           <ModalBody>
//             <Input
//               label="Snack Name"
//               placeholder="Enter snack name"
//               value={formData.name}
//               onChange={(e) => handleInputChange(e, "name")}
//             />
//             <Input
//               label="Price"
//               type="number"
//               placeholder="Enter price"
//               value={formData.price}
//               onChange={(e) => handleInputChange(e, "price")}
//             />
//             <Input
//               label=""
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//             {imageFile && (
//               <img
//                 src={URL.createObjectURL(imageFile)}
//                 alt="Image Preview"
//                 className="mt-2 w-full object-cover"
//               />
//             )}
//           </ModalBody>
//           <ModalFooter>
//             <Button color="primary" onPress={handleSave}>
//               Save
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       <Modal isOpen={deleteModal} onOpenChange={setDeleteModal}>
//         <ModalContent>
//           <ModalHeader className="flex flex-col gap-1">
//             Delete Snack
//           </ModalHeader>
//           <ModalBody>
//             <p>Are you sure you want to delete this snack?</p>
//           </ModalBody>
//           <ModalFooter>
//             <Button color="danger" onPress={handleDeleteSnack}>
//               Delete
//             </Button>
//             <Button onPress={() => setDeleteModal(false)}>Cancel</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

// export default ManageSnacks;


import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config/constants";
import { commonRequest } from "../../../config/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import toast, { Toaster } from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { GiHamburgerMenu } from "react-icons/gi";
import TheaterSidebar from "../../TheaterSidebar/TheaterSidebar";
import {
  Snack,
  TheaterEntity,
} from "../../../interfaces/theater/Theaterinterface";
import ImageUpload from "../../imageUpoad/ImageUpload";

interface FormData {
  name: string;
  price: string;
  image: string;
}

function ManageSnacks() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedSnack, setSelectedSnack] = useState<Snack | null>(null);
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const theaterOwner: TheaterEntity | null = useSelector(
    (state: RootState) => state.theater.theaterOwner
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    image: "",
  });

  const theaterId = theaterOwner?._id;
  if (!theaterId) throw new Error("Theater ID is missing");

  useEffect(() => {
    const fetchSnacks = async () => {
      try {
        setLoading(true);
        const response = await commonRequest(
          "GET",
          `/theater/get-snacks?theaterId=${theaterId}`,
          config
        );
        setSnacks(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch snacks");
        toast.error("Failed to fetch snacks");
        setLoading(false);
      }
    };

    fetchSnacks();
  }, [theaterOwner?._id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof FormData
  ) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files?.[0] || null;
    setImageFile(file);
  };

  const handleSave = async () => {
    try {
      const { name, price } = formData;
      const theater_id = theaterOwner?._id;

      const imageUrl = imageFile ? await ImageUpload(imageFile) : "";

      const snackData = {
        name,
        price: parseFloat(price),
        image: imageUrl,
        theater_id,
      };

      const response = await commonRequest(
        "POST",
        "/theater/add-snack",
        config,
        snackData
      );
      toast.success("Snack saved successfully");
      setSnacks([...snacks, response.data.data]);
      setFormData({
        name: "",
        price: "",
        image: "",
      });
      setImageFile(null);
      onOpenChange(false);
    } catch (error) {
      toast.error("Error saving snack");
    }
  };

  const handleDeleteSnack = async () => {
    try {
      toast.success("Snack deleted successfully");
      setDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete snack");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-950 text-white">
        <button onClick={toggleSidebar} className="text-white">
          <GiHamburgerMenu />
        </button>
        {sidebarOpen && (
          <TheaterSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        )}
        <div className="flex pb-8 pt-4">
          <h1 className="text-3xl font-semibold text-white">Manage Snacks</h1>
        </div>
        <Button className="bg-indigo-500 mb-4" onPress={onOpen}>
          Add Snack
        </Button>
        <div className="gap-2 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {snacks?.length > 0 && (
            <>
              {snacks?.map((snack) => (
                <Card key={snack._id} shadow="sm" isPressable>
                  <CardBody className="overflow-visible p-0">
                    <img
                      src={snack.image}
                      alt={snack.name}
                      className="w-full object-cover h-[150px]"
                    />
                  </CardBody>
                  <CardFooter className="text-small flex flex-col justify-center items-start">
                    <h2 className="text-lg font-bold">{snack.name}</h2>
                    <p className="text-default-500">Price: ₹{snack.price}</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        radius="full"
                        color="danger"
                        variant="shadow"
                        onPress={() => {
                          setSelectedSnack(snack);
                          setDeleteModal(true);
                        }}
                      >
                        <i className="fas fa-trash text-black"></i>
                      </Button>
                      <Button
                        size="sm"
                        radius="full"
                        color="primary"
                        variant="shadow"
                        onClick={() => {
                          navigate("/theatre/snack/manage", {
                            state: snack._id,
                          });
                        }}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Add Snack</ModalHeader>
          <ModalBody>
            <Input
              label="Snack Name"
              placeholder="Enter snack name"
              value={formData.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
            <Input
              label="Price"
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) => handleInputChange(e, "price")}
            />
            <Input
              label=""
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Image Preview"
                className="mt-2 w-full object-cover"
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={deleteModal} onOpenChange={setDeleteModal}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete Snack
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this snack?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={handleDeleteSnack}>
              Delete
            </Button>
            <Button onPress={() => setDeleteModal(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ManageSnacks;


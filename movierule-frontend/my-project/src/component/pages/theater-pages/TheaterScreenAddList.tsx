import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  Card,
  CardBody,
  CardFooter,
  Modal,
  Image,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Spinner,
  Pagination,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import ImageUpload from "../../imageUpoad/ImageUpload";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import TheaterSidebar from "../../TheaterSidebar/TheaterSidebar";
import { GiHamburgerMenu } from "react-icons/gi";

export interface Screen {
  _id: string;
  name: string;
  quality: string;
  sound: string;
  rows: number;
  cols: number;
  price: number;
  image: string;
  theaterId: string;
  status?: "ongoing" | "upcoming" | "no-shows";
  currentShow?: {
    title: string;
    show_name: string;
    start_time: string;
    end_time: string;
  } | null;
  hasBookings?: boolean;
}

interface FormData {
  name: string;
  quality: string;
  sound: string;
  image: string;
  rows: number;
  cols: number;
  price: number;
}

const TheatreScreenAddList: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [screens, setScreens] = useState<Screen[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    quality: "",
    sound: "",
    image: "",
    rows: 10,
    cols: 10,
    price: 0,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { theaterOwner } = useSelector((state: RootState) => state.theater);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theaterId = theaterOwner?._id;

  // 🧠 Responsive modal sizing
  const [modalSize, setModalSize] = useState<"full" | "2xl">("2xl");
  useEffect(() => {
    const handleResize = () => {
      setModalSize(window.innerWidth < 480 ? "full" : "2xl");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch screens
  useEffect(() => {
    const fetchScreens = async () => {
      if (!theaterId) {
        toast.error("Theater not found");
        return;
      }
      setLoading(true);
      try {
        const response = await commonRequest(
          "GET",
          `/theater/get-screens?theaterId=${theaterId}`,
          config
        );
        setScreens(response.data.data);
        console.log("Fetched Screens:", response.data.data);
      } catch {
        toast.error("Failed to fetch screens");
      } finally {
        setLoading(false);
      }
    };
    fetchScreens();
  }, [theaterId]);

  // Input handler
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;
    if (type === "file" && files) {
      try {
        const imageUrl = await ImageUpload(files[0]);
        if (imageUrl) {
          setFormData({ ...formData, [name]: imageUrl });
          setImagePreview(imageUrl);
        } else {
          toast.error("Image upload failed");
        }
      } catch {
        toast.error("Image upload error");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Save / Update Screen
  // const handleSubmit = async () => {
  //   const { name, quality, sound, rows, cols, price, image } = formData;

  //   if (!name || !quality || !sound || !rows || !cols || !price || !image) {
  //     toast.error("Please fill all fields");
  //     return;
  //   }

  //   if (Number(price) < 0) {
  //     toast.error("Price cannot be negative");
  //     return;
  //   }

  //   try {
  //     const dataToSend = { ...formData, theaterId };
  //     let response;
  //     if (isEditMode && selectedScreen) {
  //       response = await commonRequest(
  //         "PUT",
  //         `/theater/update-screen/${selectedScreen._id}`,
  //         config,
  //         dataToSend
  //       );
  //       toast.success("Screen updated successfully");
  //       setScreens((prev) =>
  //         prev.map((s) =>
  //           s._id === selectedScreen._id ? { ...s, ...formData } : s
  //         )
  //       );
  //     } else {
  //       response = await commonRequest(
  //         "POST",
  //         "/theater/add-screen",
  //         config,
  //         dataToSend
  //       );

  //       if (
  //         response.status === 400 &&
  //         response.data?.message?.includes("exists")
  //       ) {
  //         toast.error(response.data.message);
  //         return;
  //       }

  //       toast.success("Screen created successfully");
  //       setScreens([...screens, response.data]);
  //     }

  //     onOpenChange();
  //     setFormData({
  //       name: "",
  //       quality: "",
  //       sound: "",
  //       image: "",
  //       rows: 10,
  //       cols: 10,
  //       price: 0,
  //     });
  //     setImagePreview(null);
  //   } catch (error: any) {
  //     if (error?.response?.data?.message) {
  //       toast.error(error.response.data.message);
  //     } else {
  //       toast.error("Failed to save screen");
  //     }
  //   }
  // };
  const handleSubmit = async () => {
    const { name, quality, sound, rows, cols, price, image } = formData;

    // 🧠 1️⃣ Validate required fields (allow price = 0)
    if (
      !name ||
      !quality ||
      !sound ||
      !rows ||
      !cols ||
      price === undefined ||
      price === null ||
      !image
    ) {
      toast.error("Please fill all fields");
      return;
    }

    // 🔢 Convert numeric fields safely
    const parsedRows = Number(rows);
    const parsedCols = Number(cols);
    const parsedPrice = Number(price);

    // ⚠️ 2️⃣ Validate numbers
    if (isNaN(parsedRows) || isNaN(parsedCols) || isNaN(parsedPrice)) {
      toast.error("Rows, Columns, and Price must be valid numbers");
      return;
    }

    // ⚠️ 3️⃣ Validate that rows and cols are at least 2
    if (parsedRows < 2 || parsedCols < 2) {
      toast.error("Rows and Columns must be at least 2");
      return;
    }

    // ⚠️ 4️⃣ Validate price not negative
    if (parsedPrice < 0) {
      toast.error("Price cannot be negative");
      return;
    }

    // ⚠️ 5️⃣ Block weird prices like -00 or --5 or 00-3 (regex)
    if (/^-+0+$/.test(String(price)) || /^-+\d+/.test(String(price))) {
      toast.error("Invalid price format");
      return;
    }

    // ⚠️ 6️⃣ Check for duplicate screen name in frontend (local list)
    const isDuplicate = screens.some(
      (s) =>
        s.name.trim().toLowerCase() === name.trim().toLowerCase() &&
        (!isEditMode || s._id !== selectedScreen?._id)
    );
    if (isDuplicate) {
      toast.error("A screen with this name already exists");
      return;
    }

    try {
      const dataToSend = { ...formData, theaterId };
      let response;

      if (isEditMode && selectedScreen) {
        response = await commonRequest(
          "PUT",
          `/theater/update-screen/${selectedScreen._id}`,
          config,
          dataToSend
        );
        toast.success("Screen updated successfully");
        setScreens((prev) =>
          prev.map((s) =>
            s._id === selectedScreen._id ? { ...s, ...formData } : s
          )
        );
      } else {
        response = await commonRequest(
          "POST",
          "/theater/add-screen",
          config,
          dataToSend
        );

        if (
          response.status === 400 &&
          response.data?.message?.includes("exists")
        ) {
          toast.error(response.data.message);
          return;
        }

        toast.success("Screen created successfully");
        setScreens([...screens, response.data]);
      }

      // 🧹 Reset form after success
      onOpenChange();
      setFormData({
        name: "",
        quality: "",
        sound: "",
        image: "",
        rows: 10,
        cols: 10,
        price: 0,
      });
      setImagePreview(null);
    } catch (error: any) {
      const backendMsg = error?.response?.data?.message;
      if (backendMsg) toast.error(backendMsg);
      else toast.error("Failed to save screen");
    }
  };


  // Card click
  const handleCardClick = (screen: Screen) => {
    setSelectedScreen(screen);
    setFormData({
      name: screen.name,
      quality: screen.quality,
      sound: screen.sound,
      rows: screen.rows,
      cols: screen.cols,
      price: screen.price,
      image: screen.image,
    });
    setImagePreview(screen.image);
    setIsEditMode(true);
    onOpen();
  };

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentScreens = screens.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4 sm:p-6">
        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white mb-4"
        >
          <GiHamburgerMenu size={24} />
        </button>

        {sidebarOpen && (
          <TheaterSidebar
            isOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen(false)}
          />
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold">Manage Screens</h1>
          <Button
            className="bg-red-600 text-white font-semibold min-w-[120px]"
            onClick={() => {
              setIsEditMode(false);
              setFormData({
                name: "",
                quality: "",
                sound: "",
                image: "",
                rows: 10,
                cols: 10,
                price: 0,
              });
              setImagePreview(null);
              onOpen();
            }}
          >
            + Add Screen
          </Button>
        </div>

        {/* Screens */}
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <Spinner size="lg" />
          </div>
        ) : currentScreens.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {currentScreens.map((screen) => {
                const canEdit =
                  screen.status === "no-shows" ||
                  (screen.status === "upcoming" && !screen.hasBookings);
                return (
                  <div
                    key={screen._id}
                    onClick={() => canEdit && handleCardClick(screen)}
                    className={`transition-transform ${
                      canEdit
                        ? "cursor-pointer hover:scale-105"
                        : "cursor-not-allowed opacity-70"
                    }`}
                    title={
                      screen.status === "ongoing"
                        ? "Cannot edit during an ongoing show"
                        : screen.status === "upcoming" && screen.hasBookings
                        ? "Bookings exist — editing disabled"
                        : ""
                    }
                  >
                    <Card className="bg-gray-800 border border-gray-700 shadow-lg hover:shadow-indigo-700/40">
                      <CardBody className="overflow-hidden p-0">
                        <Image
                          radius="none"
                          width="100%"
                          className="w-full h-[160px] sm:h-[200px] object-cover"
                          src={screen.image}
                        />
                      </CardBody>
                      <CardFooter className="flex flex-col items-start p-4">
                        <div className="space-y-1 mt-2">
                          <h2 className="text-lg sm:text-xl font-semibold text-white">
                            {screen.name}
                          </h2>
                          <p className="flex items-center gap-2 text-sm text-gray-300">
                            <i className="fa-solid fa-tv text-red-500"></i>
                            {screen.quality}
                          </p>
                          <p className="flex items-center gap-2 text-sm text-gray-300">
                            <i className="fa-solid fa-volume-high text-blue-400"></i>
                            {screen.sound}
                          </p>
                          <p className="flex items-center gap-2 text-sm text-gray-300">
                            <i className="fa-solid fa-money-bill text-green-400"></i>
                            ₹{screen.price}
                          </p>

                          {/* 🎬 Show Status */}
                          {screen.status === "ongoing" && (
                            <p className="text-green-400 text-sm font-semibold mt-1">
                              🎬 Ongoing — {screen.currentShow?.title} (
                              {screen.currentShow?.start_time} -{" "}
                              {screen.currentShow?.end_time})
                            </p>
                          )}
                          {screen.status === "upcoming" && (
                            <p className="text-yellow-400 text-sm font-semibold mt-1">
                              ⏰ Upcoming — {screen.currentShow?.title} (
                              {screen.currentShow?.start_time})
                            </p>
                          )}
                          {screen.status === "no-shows" && (
                            <p className="text-gray-400 italic text-sm mt-1">
                              💾 No Shows
                            </p>
                          )}
                        </div>

                        <Button
                          size="sm"
                          isDisabled={
                            screen.status === "ongoing" ||
                            (screen.status === "upcoming" && screen.hasBookings)
                          }
                          className={`mt-3 border-none rounded-md flex items-center gap-2 transition-all ${
                            canEdit
                              ? "bg-indigo-600 text-white hover:bg-indigo-700"
                              : "bg-gray-600 text-gray-300 cursor-not-allowed opacity-70"
                          }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="fa-solid fa-chair"></i>
                          <Link
                            to={
                              canEdit
                                ? `/theatre/screens/edit-layout/${screen._id}`
                                : "#"
                            }
                            className="text-inherit"
                          >
                            Edit Layout
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center mt-6">
              <Pagination
                total={Math.ceil(screens.length / itemsPerPage)}
                page={currentPage}
                onChange={setCurrentPage}
                showControls
              />
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No screens created yet 🖥️</p>
            <Button className="mt-4 bg-red-600 text-white" onClick={onOpen}>
              Add First Screen
            </Button>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        size={modalSize}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        scrollBehavior="inside" // ✅ enables scroll inside modal
        className="max-h-[90vh] overflow-y-auto" // ✅ prevents cutoff on smaller screens
      >
        <ModalContent>
          <ModalHeader className="text-lg sm:text-xl font-bold">
            {isEditMode ? "Edit Screen" : "Create Screen"}
          </ModalHeader>

          <ModalBody className="space-y-4 pb-4">
            <Input
              label="Screen Name"
              placeholder="Enter screen name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              label="Screen Type"
              placeholder="e.g., 4K, IMAX"
              name="quality"
              value={formData.quality}
              onChange={handleInputChange}
            />
            <Input
              label="Sound System"
              placeholder="e.g., Dolby Atmos"
              name="sound"
              value={formData.sound}
              onChange={handleInputChange}
            />
            <Input
              type="file"
              label="Image"
              name="image"
              onChange={handleInputChange}
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                width={200}
                height={200}
                className="mt-2 rounded-md mx-auto"
              />
            )}
            <Input
              label="Rows"
              type="number"
              name="rows"
              value={formData.rows.toString()}
              onChange={handleInputChange}
            />
            <Input
              label="Columns"
              type="number"
              name="cols"
              value={formData.cols.toString()}
              onChange={handleInputChange}
            />
            <Input
              label="Price"
              type="number"
              name="price"
              min={0}
              value={formData.price.toString()}
              onChange={handleInputChange}
            />
            <p
              className={`text-xs ${
                formData.price < 0 ? "text-red-500" : "text-gray-400"
              } -mt-2`}
            >
              * Price must be 0 or higher
            </p>
          </ModalBody>

          <ModalFooter>
            <Button variant="light" onPress={onOpenChange}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              {isEditMode ? "Update" : "Save"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TheatreScreenAddList;


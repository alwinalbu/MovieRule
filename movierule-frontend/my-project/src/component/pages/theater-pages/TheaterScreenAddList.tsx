import React, { useState, useEffect } from "react";
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
  const [itemsPerPage] = useState(8);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theaterId = theaterOwner?._id;

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
  const handleSubmit = async () => {
    const { name, quality, sound, rows, cols, price, image } = formData;
    if (!name || !quality || !sound || !rows || !cols || !price || !image) {
      toast.error("Please fill all fields");
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
        toast.success("Screen created successfully");
        setScreens([...screens, response.data]);
      }

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
    } catch {
      toast.error("Failed to save screen");
    }
  };

  // Card click (edit mode)
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
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Screens</h1>
          <Button
            className="bg-red-600 text-white font-semibold"
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
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentScreens.map((screen) => (
                <Card
                  key={screen._id}
                  className="bg-gray-800 border border-gray-700 hover:scale-105 transition cursor-pointer"
                  onPress={() => handleCardClick(screen)}
                >
                  <CardBody className="overflow-hidden p-0">
                    <Image
                      radius="none"
                      width="100%"
                      className="w-full h-[200px] object-cover"
                      src={screen.image}
                    />
                  </CardBody>
                  <CardFooter className="flex flex-col items-start p-4">
                    <h2 className="text-lg font-bold">{screen.name}</h2>
                    <p className="text-gray-400">
                      <i className="fa-solid fa-tv"></i> {screen.quality}
                    </p>
                    <p className="text-gray-400">
                      <i className="fa-solid fa-volume-low"></i> {screen.sound}
                    </p>
                    <p className="text-gray-400">
                      <i className="fa-solid fa-money-bill"></i> ₹{screen.price}
                    </p>
                    <Button
                      size="sm"
                      className="mt-3 border bg-transparent border-white hover:bg-indigo-500 hover:border-none"
                    >
                      <Link to={`/theatre/screens/edit-layout/${screen._id}`}>
                        Edit layout
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
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
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>
            {isEditMode ? "Edit Screen" : "Create Screen"}
          </ModalHeader>
          <ModalBody>
            <Input
              label="Screen Name"
              placeholder="Enter screen name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              label="Screen Type"
              placeholder="e.g., 4k, IMAX"
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
                className="mt-2"
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
              value={formData.price.toString()}
              onChange={handleInputChange}
            />
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


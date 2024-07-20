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
  Tooltip,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import ImageUpload from "../../imageUpoad/ImageUpload"; 
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export interface Screen {
  _id: string;
  name: string;
  quality: string;
  sound: string;
  rows: number;
  cols: number;
  price: number;
  image: string;
  theaterId:string;
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
  const [initialFormData, setInitialFormData] = useState<FormData | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { theaterOwner } = useSelector((state: RootState) => state.theater);


  const [loading, setLoading] = useState(false);
  const theaterId = theaterOwner?._id;

  console.log(theaterId,"theater id here");
  
  useEffect(() => {
    const fetchScreens = async () => {
      if (!theaterId) {
        console.error("Theater ID is not available");
        toast.error("Failed to fetch screens. Theater is not available.");
        return;
      }

      setLoading(true); 

      try {
        const response = await commonRequest(
          "GET",
          `/theater/get-screens?theaterId=${theaterId}`,
          config
        );

        console.log(response.data, "fetching screens from backend");

        setScreens(response.data.data);
      } catch (error) {
        console.error("Error fetching screens:", error);
        toast.error("Failed to fetch screens. Please try again.");
      } finally {
        setLoading(false); 
      }
    };

    fetchScreens();
  }, [theaterId]);

  
  if (loading) {
    return <div>Loading screens...</div>;
  }



  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.target;
    if (type === "file" && files) {
      const file = files[0];

      try {
        const imageUrl = await ImageUpload(file);
        if (imageUrl) {
          setFormData({ ...formData, [name]: imageUrl });
          setImagePreview(imageUrl);
        } else {
          toast.error("Failed to upload image. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again.");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  // Handle Screen Submit
  const handleSubmit = async () => {
    const { name, quality, sound, rows, cols, price, image } = formData;

    if (!name || !quality || !sound || !rows || !cols || !price || !image) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const formDataToSend = {
        name,
        quality,
        sound,
        image,
        rows,
        cols,
        price,
        theaterId: theaterOwner?._id,
      };

      let response;
      if (isEditMode && selectedScreen) {
        
        console.log(selectedScreen,"selected screen ");
        
        response = await commonRequest(
          "PUT",
          `/theater/update-screen/${selectedScreen._id}`,
          config,
          formDataToSend
        );
      } else {
        // Create a new screen
        response = await commonRequest(
          "POST",
          "/theater/add-screen",
          config,
          formDataToSend
        );
      }

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      if (isEditMode) {
        toast.success("Screen updated successfully");
        const updatedScreens = screens.map((screen) =>
          screen._id === selectedScreen?._id ? { ...screen, ...formData } : screen
        );
        setScreens(updatedScreens);
      } else {
        toast.success("Screen created successfully");
        setScreens([...screens, response.data]); 
      }

      onOpenChange(false);
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
    } catch (error) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} screen`,
        error
      );
      toast.error(
        `Failed to ${
          isEditMode ? "update" : "create"
        } screen. Please try again.`
      );
    }
  };

  const handleCardClick = (screen: Screen) => {
    setSelectedScreen(screen);
    const initialData = {
      name: screen.name,
      quality: screen.quality,
      sound: screen.sound,
      rows: screen.rows,
      cols: screen.cols,
      price: screen.price,
      image: screen.image,
    };
    setFormData(initialData);
    setInitialFormData(initialData);
    setImagePreview(screen.image);
    setIsEditMode(true);
    onOpen();
  };

  return (
    <>
      <div className="h-screen p-4 bg-black">
        <div className="flex pb-8 pt-4">
          <h1 className="text-3xl font-semibold text-white">Manage Screens</h1>
        </div>

        <Button
          className="bg-indigo-500 mb-4"
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
          Add Screen
        </Button>
        <div className="gap-2 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {screens?.length > 0 &&
            screens.map((screen) => (
              <Card
                key={screen._id}
                className=""
                shadow="sm"
                isPressable
                onPress={() => handleCardClick(screen)}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    className="w-full object-cover"
                    src={screen.image}
                  />
                </CardBody>
                <CardFooter className="text-small flex flex-col justify-center items-start">
                  <h2 className="text-lg font-bold">{screen.name}</h2>
                  <h3 className="font-bold font-md">
                    <i className="fa-solid fa-tv"></i> {screen.quality}
                  </h3>
                  <p className="text-default-500 mt-2">
                    <i className="fa-solid fa-volume-low"></i> {screen.sound}
                  </p>
                  <p className="text-default-500 mt-2">
                    <i className="fa-solid fa-money-bill"></i> {screen.price}
                  </p>
                  <Button
                    size="sm"
                    className="mt-2 border bg-transparent border-white hover:bg-indigo-500 hover:border-none"
                  >
                    <Link to={`/theatre/screens/edit-layout/${screen._id}`}>
                      Edit layout
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>

      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-indigo-400">
                {isEditMode ? "Edit Screen" : "Create Your Screen"}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  labelPlacement="outside"
                  label="Screen name"
                  placeholder="Enter screen name"
                  variant="bordered"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  labelPlacement="outside"
                  label="Screen Type"
                  placeholder="e.g., 4k, IMAX, etc."
                  variant="bordered"
                  name="quality"
                  value={formData.quality}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  labelPlacement="outside"
                  label="Sound System"
                  placeholder="e.g., Dolby 3.0, etc."
                  variant="bordered"
                  name="sound"
                  value={formData.sound}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="file"
                  labelPlacement="outside"
                  label="Image"
                  placeholder="Upload screen image"
                  variant="bordered"
                  name="image"
                  onChange={handleInputChange}
                  required
                />
                {imagePreview && (
                  <Image
                    className="mt-2"
                    src={imagePreview}
                    alt="Preview"
                    width={200}
                    height={200}
                  />
                )}
                <Input
                  labelPlacement="outside"
                  label="Rows"
                  type="number"
                  placeholder="Enter number of rows"
                  variant="bordered"
                  name="rows"
                  value={formData.rows.toString()}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  labelPlacement="outside"
                  label="Columns"
                  type="number"
                  placeholder="Enter number of columns"
                  variant="bordered"
                  name="cols"
                  value={formData.cols.toString()}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  labelPlacement="outside"
                  label="Price"
                  type="number"
                  placeholder="Enter screen price"
                  variant="bordered"
                  name="price"
                  value={formData.price.toString()}
                  onChange={handleInputChange}
                  required
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={handleSubmit}
                  className="bg-indigo-500 hover:bg-indigo-600 border-none"
                >
                  {isEditMode ? "Update Screen" : "Add Screen"}
                </Button>
                <Button
                  className="bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-900"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TheatreScreenAddList;

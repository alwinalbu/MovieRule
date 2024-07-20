import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import Select, { SingleValue } from "react-select";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config/constants";
import { commonRequest } from "../../../config/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import toast, { Toaster } from "react-hot-toast";
import { IMovie } from "../../Movies/IMovie";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { GiHamburgerMenu } from "react-icons/gi";
import TheaterSidebar from "../../TheaterSidebar/TheaterSidebar";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#2c2c2c",
    borderColor: "#5a5a5a",
    color: "#fff",
    minHeight: "48px",
    borderRadius: "0.8rem",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#2c2c2c",
    color: "#fff",
    borderRadius: "0.5rem",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3a3a3a"
      : state.isFocused
      ? "#4a4a4a"
      : "#2c2c2c",
    color: "#fff",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#aaa",
  }),
};

 export interface Show {
  _id: string;
  show_name: string;
  screen: string;
  movie: IMovie;
  date: string;
  start_time: string;
  end_time: string;
  theater_id: string;
}

interface OptionType {
  value: string;
  label: string;
}

interface FormData {
  show_name: string;
  movie: SingleValue<OptionType> | null;
  screen: SingleValue<OptionType> | null;
  date: string;
  start_time: string;
  end_time: string;
}

function CreateShows() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [movies, setMovies] = useState<OptionType[]>([]);
  const [screens, setScreens] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { theaterOwner } = useSelector((state: RootState) => state.theater);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    show_name: "",
    movie: null,
    screen: null,
    date: "",
    start_time: "",
    end_time: "",
  });


   const theaterId = theaterOwner?._id;
   if (!theaterId) throw new Error("Theater ID is missing");

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const response = await commonRequest(
          "GET",
          `/theater/get-Shows?theaterId=${theaterId}`,
          config
        );

        console.log(response.data.data, "response from fetch show");

        setShows(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch shows");
        toast.error("Failed to fetch shows");
        setLoading(false);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await commonRequest(
          "GET",
          "/theater/get-Movies",
          config
        );
        setMovies(
          response.data.data.map((movie: any) => ({
            value: movie._id,
            label: movie.title,
          }))
        );
      } catch (err) {
        setError("Failed to fetch movies");
        toast.error("Failed to fetch movies");
      }
    };

    const fetchScreens = async () => {
      try {
       
        const response = await commonRequest(
          "GET",
          `/theater/get-screens?theaterId=${theaterId}`,
          config
        );
        setScreens(
          response.data.data.map((screen: any) => ({
            value: screen._id,
            label: screen.name,
          }))
        );
      } catch (err) {
        setError("Failed to fetch screens");
        toast.error("Failed to fetch screens");
      }
    };

    fetchShows();
    fetchMovies();
    fetchScreens();
  }, [theaterOwner?._id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof FormData
  ) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

   const getCurrentDate = () => {
     const today = new Date();
     const yyyy = today.getFullYear();
     const mm = String(today.getMonth() + 1).padStart(2, "0"); 
     const dd = String(today.getDate()).padStart(2, "0");

     return `${yyyy}-${mm}-${dd}`;
   };

  const handleSelectChange = (
    selectedOption: SingleValue<OptionType>,
    key: keyof FormData
  ) => {
    setFormData({ ...formData, [key]: selectedOption });
  };

  const handleSave = async () => {
    try {
      const { show_name, movie, screen, date, start_time, end_time } = formData;
      const theater_id = theaterOwner?._id;

      const showData = {
        show_name,
        movie: movie ? movie.label : "",
        screen: screen ? screen.label : "",
        date,
        start_time,
        end_time,
        theater_id,
      };

      const response = await commonRequest(
        "POST",
        "/theater/add-Show",
        config,
        showData
      );
      console.log("Show saved successfully:", response.data);
      toast.success("Show saved successfully");

      // Update shows state with the new show added
      setShows([...shows, response.data.data]); // Assuming response.data is the newly added show object

      // Clear form data after successful save
      setFormData({
        show_name: "",
        movie: null,
        screen: null,
        date: "",
        start_time: "",
        end_time: "",
      });

      // Close modal after saving
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving show:", error);
      toast.error("Error saving show");
    }
  };

  const handleDeleteShow = async () => {
    try {
      // Add logic here to delete the selected show
      console.log("Deleting show:", selectedShow);
      toast.success("Show deleted successfully");
      setDeleteModal(false); // Close delete modal after deletion
    } catch (error) {
      console.error("Failed to delete show:", error);
      toast.error("Failed to delete show");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Toaster />
      <div className="h-screen p-4 bg-black">
        <button onClick={toggleSidebar} className="text-white">
          <GiHamburgerMenu />
        </button>
        {sidebarOpen && (
          <TheaterSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        )}
        <div className="flex pb-8 pt-4">
          <h1 className="text-3xl font-semibold text-white">Manage Shows</h1>
        </div>
        <Button className="bg-indigo-500 mb-4" onPress={onOpen}>
          Shows +
        </Button>
        <div className="gap-2 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          {shows?.length > 0 && (
            <>
              {shows?.map((show) => (
                <Card key={show._id} className="" shadow="sm" isPressable>
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      className="w-full object-cover"
                      src={show?.movie.posterPath}
                    />
                  </CardBody>
                  <CardFooter className="text-small flex flex-col justify-center items-start">
                    <h2 className="text-lg font-bold">{show?.show_name}</h2>
                    <h3 className="font-bold font-md">{show?.movie.title}</h3>
                    <p className="text-default-500">
                      Screen : {show?.screen.name}
                    </p>
                    <p className="text-default-500">
                      <p className="text-default-500">
                        Date:{" "}
                        {show?.date
                          ? new Date(show.date).toLocaleDateString("en-US")
                          : "N/A"}
                      </p>
                    </p>
                    <p className="text-default-500">
                      {show.start_time} - {show.end_time}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        radius="full"
                        color="danger"
                        variant="shadow"
                        className="mt-2"
                        onPress={() => {
                          setSelectedShow(show);
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
                        className="mt-2"
                        onClick={() => {
                          navigate("/theatre/show/manage", { state: show._id });
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
          <ModalHeader className="flex flex-col gap-1">Add Show</ModalHeader>
          <ModalBody>
            <Input
              label="Show Name"
              placeholder="Enter show name"
              value={formData.show_name}
              onChange={(e) => handleInputChange(e, "show_name")}
            />
            <label className="block text-sm font-medium text-default-400">
              Select Movie
            </label>
            <Select
              styles={customStyles}
              options={movies}
              value={formData.movie}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "movie")
              }
              isSearchable
            />
            <label className="block text-sm font-medium text-default-400">
              Select Screen
            </label>
            <Select
              styles={customStyles}
              options={screens}
              value={formData.screen}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "screen")
              }
              isSearchable
            />
            {/* <Input
              label="Date"
              type="date"
              placeholder="Enter date"
              value={formData.date}
              onChange={(e) => handleInputChange(e, "date")}
            /> */}
            <Input
              label="Date"
              type="date"
              placeholder="Enter date"
              value={formData.date}
              onChange={(e) => handleInputChange(e, "date")}
              min={getCurrentDate()} // Set the min attribute to the current date
            />
            <Input
              label="Start Time"
              type="time"
              placeholder="Enter start time"
              value={formData.start_time}
              onChange={(e) => handleInputChange(e, "start_time")}
            />
            <Input
              label="End Time"
              type="time"
              placeholder="Enter end time"
              value={formData.end_time}
              onChange={(e) => handleInputChange(e, "end_time")}
            />
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
          <ModalHeader className="flex flex-col gap-1">Delete Show</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this show?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={handleDeleteShow}>
              Delete
            </Button>
            <Button onPress={() => setDeleteModal(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateShows;


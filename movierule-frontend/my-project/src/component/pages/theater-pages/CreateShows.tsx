import { useState, useEffect, ChangeEvent } from "react";
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
  Spinner,
  Pagination,
} from "@nextui-org/react";
import Select, { SingleValue } from "react-select";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config/constants";
import { commonRequest } from "../../../config/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import toast, { Toaster } from "react-hot-toast";
import { IMovie } from "../../Movies/IMovie";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTrash, FaEye } from "react-icons/fa";
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
  screen: any;
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
  const [shows, setShows] = useState<any[]>([]);
  const [movies, setMovies] = useState<OptionType[]>([]);
  const [screens, setScreens] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
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

  // Fetch Data
  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const response = await commonRequest(
          "GET",
          `/theater/get-Shows?theaterId=${theaterId}`,
          config
        );
        const sortedShows = response.data.data.sort(
          (a: Show, b: Show) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setShows(sortedShows);
      } catch {
        toast.error("Failed to fetch shows");
      } finally {
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
      } catch {
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
      } catch {
        toast.error("Failed to fetch screens");
      }
    };

    fetchShows();
    fetchMovies();
    fetchScreens();
  }, [theaterOwner?._id]);

  // Helpers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof FormData
  ) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSelectChange = (
    selectedOption: SingleValue<OptionType>,
    key: keyof FormData
  ) => {
    setFormData({ ...formData, [key]: selectedOption });
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleSave = async () => {
    try {
      const { show_name, movie, screen, date, start_time, end_time } = formData;

      const showData = {
        show_name,
        movie: movie ? movie.label : "",
        screen: screen ? screen.label : "",
        date,
        start_time,
        end_time,
        theater_id: theaterId,
      };

      const response = await commonRequest(
        "POST",
        "/theater/add-Show",
        config,
        showData
      );

      if (response.status !== 200) {
        throw new Error(
          response.response.data.message || "An unexpected error occurred"
        );
      }

      toast.success("Show added successfully");
      setShows([...shows, response.data.data]);

      setFormData({
        show_name: "",
        movie: null,
        screen: null,
        date: "",
        start_time: "",
        end_time: "",
      });

      onOpenChange();
    } catch (error: any) {
      toast.error(error.message || "Failed to save show");
    }
  };

  const handleDeleteShow = async () => {
    try {
      // Replace with DELETE API call
      toast.success("Show deleted successfully");
      setDeleteModal(false);
    } catch {
      toast.error("Failed to delete show");
    }
  };

  // Pagination
  const indexOfLastShow = currentPage * itemsPerPage;
  const indexOfFirstShow = indexOfLastShow - itemsPerPage;
  const currentShows = shows.slice(indexOfFirstShow, indexOfLastShow);

  return (
    <>
      <Toaster />
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
          <h1 className="text-3xl font-bold">Manage Shows</h1>
          <Button
            className="bg-red-600 text-white font-semibold"
            onPress={onOpen}
          >
            + Add Show
          </Button>
        </div>

        {/* Shows */}
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <Spinner size="lg" />
          </div>
        ) : shows.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentShows.map((show) => (
                <Card
                  key={show._id}
                  className="bg-gray-800 border border-gray-700 hover:scale-105 transition"
                >
                  <CardBody className="overflow-hidden p-0">
                    <Image
                      radius="none"
                      width="100%"
                      className="w-full h-[200px] object-cover"
                      src={show?.movie.posterPath}
                    />
                  </CardBody>
                  <CardFooter className="flex flex-col items-start p-4">
                    <h2 className="text-lg font-bold">{show?.show_name}</h2>
                    <p className="text-gray-400">{show?.movie.title}</p>
                    <p className="text-gray-400">
                      Screen: {show?.screen?.name}
                    </p>
                    <p className="text-gray-400">
                      Date:{" "}
                      {show?.date
                        ? new Date(show.date).toLocaleDateString("en-US")
                        : "N/A"}
                    </p>
                    <p className="text-gray-400">
                      {show.start_time} - {show.end_time}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        radius="full"
                        color="danger"
                        onPress={() => {
                          setSelectedShow(show);
                          setDeleteModal(true);
                        }}
                        className="flex justify-center items-center"
                      >
                        <FaTrash className="text-white text-sm" />
                      </Button>

                      <Button
                        size="sm"
                        radius="full"
                        color="primary"
                        onClick={() => {
                          navigate("/theatre/show/manage", { state: show._id });
                        }}
                        className="flex justify-center items-center"
                      >
                        <FaEye className="text-white text-sm" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Pagination
                total={Math.ceil(shows.length / itemsPerPage)}
                page={currentPage}
                onChange={setCurrentPage}
                showControls
              />
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No shows scheduled yet 🎬</p>
            <Button className="mt-4 bg-red-600 text-white" onPress={onOpen}>
              Add First Show
            </Button>
          </div>
        )}
      </div>

      {/* Add Show Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable>
        <ModalContent>
          <ModalHeader>Add Show</ModalHeader>
          <ModalBody>
            <Input
              label="Show Name"
              placeholder="Enter show name"
              value={formData.show_name}
              onChange={(e) => handleInputChange(e, "show_name")}
            />
            <label className="text-sm text-gray-400">Select Movie</label>
            <Select
              styles={customStyles}
              options={movies}
              value={formData.movie}
              onChange={(opt) => handleSelectChange(opt, "movie")}
              isSearchable
            />
            <label className="text-sm text-gray-400 mt-2">Select Screen</label>
            <Select
              styles={customStyles}
              options={screens}
              value={formData.screen}
              onChange={(opt) => handleSelectChange(opt, "screen")}
              isSearchable
            />
            <Input
              label="Date"
              type="date"
              value={formData.date}
              min={getCurrentDate()}
              onChange={(e) => handleInputChange(e, "date")}
            />
            <Input
              label="Start Time"
              type="time"
              value={formData.start_time}
              onChange={(e) => handleInputChange(e, "start_time")}
            />
            <Input
              label="End Time"
              type="time"
              value={formData.end_time}
              onChange={(e) => handleInputChange(e, "end_time")}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onOpenChange}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModal} onOpenChange={setDeleteModal}>
        <ModalContent>
          <ModalHeader>Delete Show</ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete <b>{selectedShow?.show_name}</b>?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={handleDeleteShow}>
              Delete
            </Button>
            <Button variant="light" onPress={() => setDeleteModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateShows;

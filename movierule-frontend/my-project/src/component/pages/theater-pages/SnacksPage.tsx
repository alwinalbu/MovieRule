import { useState, useEffect, ChangeEvent } from "react";
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

  // Fetch Snacks
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
      } catch (err) {
        toast.error("Failed to fetch snacks");
      } finally {
        setLoading(false);
      }
    };

    fetchSnacks();
  }, [theaterOwner?._id]);

  // Input Handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof FormData
  ) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setImageFile(files?.[0] || null);
  };

  // Save Snack
  const handleSave = async () => {
    try {
      const { name, price } = formData;
      console.log(theaterOwner,"theater inside");
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

      // Reset form
      setFormData({ name: "", price: "", image: "" });
      setImageFile(null);
      onOpenChange();
    } catch (error) {
      toast.error("Error saving snack");
    }
  };

  // Delete Snack
  const handleDeleteSnack = async () => {
    try {
      // 🔥 You’ll replace with DELETE API call
      toast.success("Snack deleted successfully");
      setDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete snack");
    }
  };

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
          <h1 className="text-3xl font-bold">Manage Snacks</h1>
          <Button
            className="bg-red-600 text-white font-semibold"
            onPress={onOpen}
          >
            + Add Snack
          </Button>
        </div>

        {/* Snacks Grid */}
        {loading ? (
          <p>Loading snacks...</p>
        ) : snacks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {snacks.map((snack) => (
              <Card
                key={snack._id}
                className="bg-gray-800 border border-gray-700 hover:scale-105 transition text-white"
              >
                <CardBody className="overflow-hidden p-0">
                  <img
                    src={snack.image}
                    alt={snack.name}
                    className="w-full h-[180px] object-cover"
                  />
                </CardBody>
                <CardFooter className="flex flex-col items-start p-4">
                  <h2 className="text-lg font-bold">{snack.name}</h2>
                  <p className="text-gray-400">Price: ₹{snack.price}</p>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      radius="full"
                      color="danger"
                      onPress={() => {
                        setSelectedSnack(snack);
                        setDeleteModal(true);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                    <Button
                      size="sm"
                      radius="full"
                      color="primary"
                      onClick={() => {
                        navigate("/theatre/snack/manage", { state: snack._id });
                      }}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No snacks available yet 🍿</p>
            <Button className="mt-4 bg-red-600 text-white" onPress={onOpen}>
              Add First Snack
            </Button>
          </div>
        )}
      </div>

      {/* Add Snack Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable>
        <ModalContent>
          <ModalHeader>Add Snack</ModalHeader>
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
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="mt-3 w-full h-40 object-cover rounded"
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onOpenChange}>
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
          <ModalHeader>Delete Snack</ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete <b>{selectedSnack?.name}</b>?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={handleDeleteSnack}>
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

export default ManageSnacks;


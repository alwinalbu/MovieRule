// import React, { useState } from "react";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
//   Input,
// } from "@nextui-org/react";
// import videoUpload from "./videoUpload";


// const VideoUploadModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
//   isOpen,
//   onClose,
// }) => {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };

//   const handleUpload = async () => {
//     if (file) {
//       setLoading(true);
//       try {
//         const url = await videoUpload(file);
//         console.log("Video uploaded to:", url);
//       } catch (error) {
//         console.error("Upload failed:", error);
//       } finally {
//         setLoading(false);
//         onClose(); // Close the modal after upload
//       }
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
//       <ModalContent>
//         <ModalHeader>Upload Video</ModalHeader>
//         <ModalBody>
//           <Input
//             type="file"
//             accept="video/*"
//             onChange={handleFileChange}
//             aria-label="Upload video file"
//           />
//         </ModalBody>
//         <ModalFooter>
//           <Button color="danger" variant="flat" onClick={onClose}>
//             Close
//           </Button>
//           <Button
//             color="primary"
//             onClick={handleUpload}
//             isLoading={loading}
//             disabled={loading}
//           >
//             {loading ? "Uploading..." : "Upload"}
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default VideoUploadModal;


import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import videoUpload from "./videoUpload";
import toast from "react-hot-toast";

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (videoUrl: string) => void; 
}

const VideoUploadModal: React.FC<VideoUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess, 
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
      try {
        const url = await videoUpload(file);
        console.log("Video uploaded to:", url);
        onUploadSuccess(url);
        toast.success("Video uploaded successfully!"); // Show success notification
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Failed to upload video. Please try again."); // Show error notification
      } finally {
        setLoading(false);
        onClose();
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent>
        <ModalHeader>Upload Video</ModalHeader>
        <ModalBody>
          <Input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            aria-label="Upload video file"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onClick={onClose}>
            Close
          </Button>
          <Button
            color="primary"
            onClick={handleUpload}
            isLoading={loading}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VideoUploadModal;




// import React, { useState } from "react";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   Input,
// } from "@nextui-org/react";
// import videoUpload from "./videoUpload";
// import toast from "react-hot-toast";

// interface VideoUploadModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onUploadSuccess: (videoUrl: string) => void;
// }

// const VideoUploadModal: React.FC<VideoUploadModalProps> = ({
//   isOpen,
//   onClose,
//   onUploadSuccess,
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
//     if (!file) return toast.error("Select a video first!");
//     if (file) {
//       setLoading(true);
//       try {
//         const publicId= await videoUpload(file);
//         console.log("Video uploaded to:", publicId);
//         onUploadSuccess(publicId);
//         toast.success("Video uploaded successfully!"); // Show success notification
//       } catch (error) {
//         console.error("Upload failed:", error);
//         toast.error("Failed to upload video. Please try again."); // Show error notification
//       } finally {
//         setLoading(false);
//         onClose();
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
  Progress,
} from "@nextui-org/react";
import videoUpload from "./videoUpload";
import toast from "react-hot-toast";

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (videoUrl: string) => void;
  movieId: string; 
}


const VideoUploadModal: React.FC<VideoUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
  movieId,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const MAX_SIZE_MB = 500;
      if (selectedFile.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`File too large! Max ${MAX_SIZE_MB}MB allowed.`);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Select a video first!");
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const publicId = await videoUpload(movieId, file, {
        onProgress: (p) => setProgress(p),
      });

      console.log("Video uploaded to:", publicId);
      onUploadSuccess(publicId);
      toast.success("Video uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload video. Please try again.");
    } finally {
      setLoading(false);
      setFile(null);
      setProgress(0);
      onClose();
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

          {/* Progress Bar */}
          {loading && (
            <div className="mt-4">
              <p className="text-sm mb-1 text-gray-500">
                Uploading... {progress}%
              </p>
              <Progress
                size="sm"
                aria-label="Uploading progress"
                value={progress}
                color="primary"
                className="w-full"
              />
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onClick={onClose}
            disabled={loading}
          >
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







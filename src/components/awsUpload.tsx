import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadIcon from "@mui/icons-material/Upload";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { ApiClient } from "../utils";
import { useForm } from "react-hook-form";

//UPLOAD FUNCTION FOR SIGHTING PHOTOS.

interface ImageProps {
  pictureUrl: string;
  setPictureUrl: Dispatch<SetStateAction<string>>;
}

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

const AWSUpload: React.FC<ImageProps> = ({ pictureUrl, setPictureUrl }) => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const hiddenFileInput = React.useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
    const src = URL.createObjectURL(e.target.files[0]);
  };

  const handleFileUpload = () => {
    hiddenFileInput?.current?.click();
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const imagePost = ApiClient.post("images/uploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setPictureUrl(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <LinearProgressWithLabel value={progress} />
      <input
        style={{ display: "none" }}
        ref={hiddenFileInput}
        type="file"
        onChange={handleFileInput}
      />
      <Button onClick={handleFileUpload}>
        <AddPhotoAlternateIcon />
        Choose Photo
      </Button>
      {selectedFile && (
        <Button onClick={() => uploadFile(selectedFile)}>
          <UploadIcon /> Upload
        </Button>
      )}
    </div>
  );
};

export { AWSUpload };

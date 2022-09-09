import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AWS from "aws-sdk";
import { ApiClient } from "../utils";
import { UserProfile } from "../types/userProfile.types";
import { Box, Button, Typography } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadIcon from '@mui/icons-material/Upload';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';


const S3_BUCKET = "cuilcaghspot";
const REGION = "eu-west-1";

interface ImageUploadProps {
  pictureUrl: string;
  setPictureUrl: React.Dispatch<React.SetStateAction<string>>;
}

AWS.config.update({
  accessKeyId: "AKIAYDRMF3FLURNTBJ5F",
  secretAccessKey: "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",
});

const myBucket = new AWS.S3({
  params: { BUCKET: S3_BUCKET },
  region: REGION,
});

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number })  =>{
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const AWSUpload: React.FC<ImageUploadProps> = ({
  pictureUrl,
  setPictureUrl,
}) => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const hiddenFileInput = React.useRef<any>(null);

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
    const src = URL.createObjectURL(e.target.files[0]);
  };

  const handleFileUpload = () => {
    hiddenFileInput?.current?.click();
  };

  const uploadFile = (file: any) => {
    const params = {
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .promise()
      .then((resp) => {
        setPictureUrl(
          `https://cuilcaghspot.s3.eu-west-1.amazonaws.com/${file.name}`
        );
      });
  };
  return (
    <div>
      <LinearProgressWithLabel value={progress} />
      <input style={{display: "none"}}ref={hiddenFileInput} type="file" onChange={handleFileInput} />
      <Button onClick={handleFileUpload}><AddPhotoAlternateIcon/>Choose Photo</Button>
      <Button onClick={() => uploadFile(selectedFile)}><UploadIcon /> Upload</Button>
    </div>
  );
};

export { AWSUpload };

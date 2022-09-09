import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AWS from "aws-sdk";
import { ApiClient } from "../utils";
import { UserProfile } from "../types/userProfile.types";

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

const UploadImageToS3WithNativeSdk: React.FC<ImageUploadProps> = ({
  pictureUrl,
  setPictureUrl,
}) => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
    const src = URL.createObjectURL(e.target.files[0]);
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
      <div>Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => uploadFile(selectedFile)}> Upload</button>
    </div>
  );
};

export { UploadImageToS3WithNativeSdk };

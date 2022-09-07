import React, { useState } from "react";
import AWS from "aws-sdk";

const S3_BUCKET = "cuilcaghspot";
const REGION = "eu-west-1";

AWS.config.update({
  accessKeyId: "AKIAYDRMF3FLYYXKMZD7",
  secretAccessKey: "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",
});

const myBucket = new AWS.S3({
  params: { BUCKET: S3_BUCKET },
  region: REGION,
});

const UploadImageToS3WithNativeSdk = () => {
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
    const src = URL.createObjectURL(e.target.files[0]);
  };

  const uploadFile = (file: any) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: "example.jpg",
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .promise()
      .then((resp) => {
        setImageUrl(
          `https://cuilcaghspot.s3.eu-west-1.amazonaws.com/example.jpg`
        );
      });
  };
  return (
    <div>
      <div>Native SDK File Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
  );
};
export default UploadImageToS3WithNativeSdk;

import { ApiClient } from "../utils";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

interface ImageProps {
  pictureUrl: string;
  setPictureUrl: Dispatch<SetStateAction<string>>;
}

const FileUpload: React.FC<ImageProps> = ({ pictureUrl, setPictureUrl }) => {
  const [status, setStatus] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const formData = new FormData();

    console.log(data.file[0]);

    formData.append("file", data.file[0]);
    formData.append("name", data.file[0].filename);

    setStatus("");

    const imagePost = ApiClient.post("images/uploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setStatus("Image uploaded.");
        setPictureUrl(response.data);
        console.log(status);
      })
      .catch((error) => {
        setStatus("Error, please try again.");
        console.log(error);
      });
  };

  const updateProfilePicture = () => {
    ApiClient.put("users/updateUserProfile", pictureUrl, {
      headers: { "Content-Type": "application/json" },
    })
      .then()
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input type="file" {...register("file")} />
        <input type="submit" onClick={updateProfilePicture} />
      </form>
    </div>
  );
};

export default FileUpload;

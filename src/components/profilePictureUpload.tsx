import { ApiClient } from "../utils";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

//UPLOAD FUNCTION FOR PROFILE PICTURES.

interface ImageProps {
  pictureUrl: string;
  setPictureUrl: Dispatch<SetStateAction<string>>;
}

const PictureUpload: React.FC<ImageProps> = ({ pictureUrl, setPictureUrl }) => {
  const [status, setStatus] = useState<string>();
  let { profileId } = useParams();
  let parsedId: number;

  if (profileId) {
    parsedId = parseInt(profileId);
  }

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
      })
      .catch((error) => {
        setStatus("Error, please try again.");
        console.log(error);
      });
  };

  const updatePicture = () => {
    let profileBody = {
      parsedId,
      pictureUrl,
    };
    ApiClient.put("users/updateUserProfile", profileBody, {
      headers: { "Content-Type": "application/json" },
    })
      .then()
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input type="file" {...register("file")} />
        <Button type="submit" onClick={updatePicture}>
          Upload picture
        </Button>
      </form>
    </div>
  );
};

export default PictureUpload;

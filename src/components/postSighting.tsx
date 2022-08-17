import axios from "axios";
import "../pages/css/sightings.css";
import React from "react";
import { useForm } from "react-hook-form";
import { CreateUnverifiedSighting } from "../types/sightings.types";
import { ReactMap } from "./map";

function PostSighting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUnverifiedSighting>();
  const onSubmit = (data: CreateUnverifiedSighting) => {
    console.log(typeof data);
    console.log(data);
    axios
      .post(
        "http://localhost:5001/api/unverifiedsightings/createUnverifiedSighting",
        data,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="organismId">Organism Id</label>
          <input
            type="number"
            {...register("organismId", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <label htmlFor="userId"> User Id</label>
          <input
            type="number"
            {...register("userId", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <label htmlFor="pictureUrl"> Picture URL</label>
          <input {...register("pictureUrl")} type="text" />
        </div>
        <div>
          <label htmlFor="date"> Date</label>
          <input {...register("date")} type="date" />
        </div>
        <div>
          <label htmlFor="lat"> Lat</label>
          <input {...register("lat")} type="number" step={0.0001} />
        </div>
        <div>
          <label htmlFor="long"> Long</label>
          <input {...register("long")} type="number" step={0.0001} />
        </div>
        <button type="submit">Submit Sighting</button>
      </form>
    </div>
  );
}

export { PostSighting };

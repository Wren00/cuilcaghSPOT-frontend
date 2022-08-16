import axios from "axios";
import { Organism } from "../types/species.types";
import '../pages/css/species.css';
import React from "react";
import { useForm } from "react-hook-form";


function PostSighting() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    axios
      .post(
        'http://localhost:5001/api/unverifiedsightings/createUnverifiedSighting',
        data,
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(response => { console.log(response.data) })
      .catch(error => { console.log(error.data) });
  };

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
        Organism Id
      <input {...register("organismId")} type="number" />
      User Id
      <input {...register("userId")} type="number" />
      <input {...register("pictureURL")} placeholder="A valid picture url " type="text" />
      Date
      <input  {...register("date")} type="date" />
      Lat
      <input  {...register("lat")} type="number" />
      Long
      <input  {...register("long")} type="number" />
      <button type="submit">Submit Sighting</button>
    </form>
  )
}

export { PostSighting };
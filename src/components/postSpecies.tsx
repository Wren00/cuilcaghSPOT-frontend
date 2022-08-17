import axios from "axios";
import "../pages/css/species.css";
import { useForm } from "react-hook-form";

function PostSpecies() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    axios
      .post("http://localhost:5001/api/organisms/createOrganism", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("taxonName")} placeholder="Common Name" type="text" />
      <input {...register("latinName")} placeholder="Latin Name" type="text" />
      <input
        {...register("pictureUrl")}
        placeholder="A valid picture url "
        type="text"
      />
      <input {...register("taxonGroupId")} type="number" />
      <input
        {...register("description")}
        placeholder="A description"
        type="text"
      />
      <button type="submit">Submit New Species</button>
    </form>
  );
}

export { PostSpecies };

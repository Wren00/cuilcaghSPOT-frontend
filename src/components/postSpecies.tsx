import { useForm } from "react-hook-form";
import "./../pages/css/post-species.css";
import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { ApiClient } from "../utils";

function PostSpecies() {
  const [taxonGroupId, setTaxonGroupId] = useState<number>(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    data.taxonGroupId = taxonGroupId;
    ApiClient.post("organisms/createOrganism", data, {
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
    <>
      <div>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Button
            className="button"
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => setTaxonGroupId(1)}
          >
            Amphibians
          </Button>
          <Button
            className="button"
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => setTaxonGroupId(2)}
          >
            Birds
          </Button>
          <Button
            className="button"
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => setTaxonGroupId(3)}
          >
            Mammals
          </Button>
          <Button
            className="button"
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => setTaxonGroupId(4)}
          >
            Plants
          </Button>
          <Button
            className="button"
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => setTaxonGroupId(5)}
          >
            Butterflies and Moths
          </Button>
          <Button
            className="button"
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => setTaxonGroupId(6)}
          >
            Other Arthropods
          </Button>
        </Stack>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("taxonName")}
            placeholder="Common Name"
            type="text"
          />
          <input
            {...register("latinName")}
            placeholder="Latin Name"
            type="text"
          />
          <input
            {...register("pictureUrl")}
            placeholder="A valid picture url "
            type="text"
          />
          <input
            type="hidden"
            value={taxonGroupId}
            {...register("taxonGroupId", {
              valueAsNumber: true,
            })}
          />
          <input
            {...register("description")}
            placeholder="A description"
            type="text"
          />
          <button type="submit">Submit New Species</button>
        </form>
      </div>
    </>
  );
}

export { PostSpecies };

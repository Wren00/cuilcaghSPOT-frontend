import axios from "axios";
import React, { useEffect, useState } from "react";
import "../pages/css/unverified-sightings.css";
import { useForm } from "react-hook-form";
import { CreateUnverifiedSighting } from "../types/sightings.types";
import { ReactMap } from "./map";
import { Input, Stack } from "@mui/material";
import { Organism } from "../types/species.types";
import { InteractiveReactMap } from "./postMap";

function PostSighting(this: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUnverifiedSighting>();

  const [name, setName] = useState<string>("");
  let [organismId, setOrganismId] = useState<number>(0);
  const [organismSearch, setOrganismSearch] = useState<Organism[]>([]);
  const [pictureUrl, setPictureUrl] = useState<string>("picture.jpg");
  const [userId, setUserId] = useState<number>(1);
  const [lat, setLat] = useState<number>(54.5555);
  const [long, setLong] = useState<number>(-7.2222);

  let [success, setSuccess] = useState<boolean>(false);
  let [fail, setFail] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `http://localhost:5001/api/organisms/getAllOrganisms`
      );
      setOrganismSearch(response);
    };
    fetchData();
  }, []);

  const createUnverifiedSighting = (data: CreateUnverifiedSighting) => {
    console.log(typeof data);
    console.log(data);
    data.organismId = organismId;

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

  const getByGroupId = (taxonGroupId: number) => {
    console.log(taxonGroupId);
    axios
      .get(
        "http://localhost:5001/api/organisms/getOrganismByTaxonGroupId/" +
          taxonGroupId
      )
      .then((response) => {
        setOrganismSearch(response.data);
        setSuccess(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
        setFail(true);
      });
  };

  const checkSuccess = () => {
    if (success) {
    }
  };

  return (
    <div className="post-sighting-page">
      <div className="post-sighting-map">
        <InteractiveReactMap />
      </div>
      <div className="picture-upload"></div>
      <div className="row-div"></div>
      <div></div>
      <div className="group-button-div">
        What kind of animal did you see?
        <div>
          <Stack
            display="flex"
            alignItems="center"
            justifyContent="center"
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <button className="button" onClick={() => getByGroupId(1)}>
              Amphibians
            </button>
            <button className="button" onClick={() => getByGroupId(2)}>
              Birds
            </button>
            <button className="button" onClick={() => getByGroupId(3)}>
              Mammals
            </button>
            <button className="button" onClick={() => getByGroupId(4)}>
              Plants
            </button>
            <button className="button" onClick={() => getByGroupId(5)}>
              Butterflies and Moths
            </button>
            <button className="button" onClick={() => getByGroupId(6)}>
              Other Insects and Arthropods
            </button>
          </Stack>
        </div>
        <div>
          <Input
            type="text"
            className="search"
            placeholder="Search species..."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {organismSearch
            .filter((value) => {
              if (name === "") {
                return value as Organism;
              } else if (
                value.taxonName.toLowerCase().includes(name.toLowerCase()) ||
                value.latinName.toLowerCase().includes(name.toLowerCase())
              ) {
                return value as Organism;
              }
            })
            .map((organism, index) => (
              <div key={`species-${index}`}>
                <div className="species-name">
                  <button
                    className="species-button"
                    onClick={() => setOrganismId(organism.organismId)}
                  >
                    {organism.taxonName}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="post-sighting-form">
        <form onSubmit={handleSubmit(createUnverifiedSighting)}>
          <div>
            <label htmlFor="organismId">Organism Id</label>
            <input
              type="hidden"
              value={organismId}
              {...register("organismId", {
                valueAsNumber: true,
              })}
            />
            <button>{organismId}</button>
          </div>
          <div>
            <label htmlFor="userId"> User Id</label>
            <input
              type="hidden"
              value={userId}
              {...register("userId", {
                valueAsNumber: true,
              })}
            />
          </div>
          <div>
            <label htmlFor="pictureUrl">Picture Url</label>
            <input
              {...register("pictureUrl")}
              type="string"
              value={pictureUrl}
            />
          </div>
          <div>
            <label htmlFor="date"> When did you see it?</label>
            <input {...register("date")} type="date" />
          </div>
          <div>
            <label htmlFor="lat"> Lat</label>
            <input
              type="hidden"
              step={0.0001}
              value={lat}
              {...register("lat", {
                valueAsNumber: true,
              })}
            />
          </div>
          <div>
            <label htmlFor="long"> Long</label>
            <input
              type="hidden"
              step={0.0001}
              value={long}
              {...register("long", {
                valueAsNumber: true,
              })}
            />
          </div>
          <button type="submit">Submit Sighting</button>
        </form>
      </div>
    </div>
  );
}

export { PostSighting };

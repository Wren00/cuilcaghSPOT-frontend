import React, { useEffect, useState } from "react";
import "../pages/css/unverified-sightings.css";
import { useForm } from "react-hook-form";
import { CreateUnverifiedSighting } from "../types/sightings.types";
import {
  Avatar,
  Container,
  Input,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { Organism } from "../types/species.types";
import { InteractiveReactMap } from "./maps/postMap";
import SightingPopUp from "../components/popups/sightingPopup";
import Auth from "./authorisation/context";
import jwtDecode from "jwt-decode";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ApiClient } from "../utils";
import { AWSUpload } from "./awsUpload";
import { useNavigate } from "react-router-dom";

function PostSighting(this: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUnverifiedSighting>();

  const [status, setStatus] = useState<string>("");
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState<string>("");
  let [organismId, setOrganismId] = useState<number>(0);
  const [organismSearch, setOrganismSearch] = useState<Organism[]>([]);
  const [pictureUrl, setPictureUrl] = useState<string>("");
  let [lat, setLat] = useState<number>(0);
  let [long, setLong] = useState<number>(0);
  let [date, setDate] = useState<Date>();

  const context = React.useContext(Auth.AuthContext);
  const token = context?.userSession.accessToken;
  const navigate = useNavigate();

  let tokenId: number = 0;

  if (token) {
    const decodedToken = jwtDecode<any>(token);
    tokenId = parseInt(decodedToken.userId);
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await ApiClient.get(
        `organisms/getAllOrganisms`
      );
      setOrganismSearch(response);
    };
    fetchData();
  }, []);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const createUnverifiedSighting = (data: CreateUnverifiedSighting) => {
    console.log(typeof data);
    console.log({ data });
    console.log(pictureUrl);
    data.organismId = organismId;
    data.userId = tokenId;
    data.pictureUrl = pictureUrl;
    data.userVotes = 0;
    if (date) {
      data.date = date.toLocaleDateString();
    }
    data.lat = lat;
    data.long = long;

    ApiClient.post("unverifiedsightings/createUnverifiedSighting", data, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setStatus("Sighting posted, thanks Spotter!");
        console.log({ status });
        setTimeout(() => {
          navigate("/Sightings/allUnverifiedSightings");
        }, 2000);
      })
      .catch((error) => {
        setStatus("Could not post sighting, try again.");
        console.log(error.data);
      });
  };

  const getByGroupId = async (taxonGroupId: number) => {
    if (taxonGroupId === 0) {
      const { data: response } = await ApiClient.get(
        `organisms/getAllOrganisms`
      );
      setOrganismSearch(response);
    } else {
      ApiClient.get(`organisms/getOrganismByTaxonGroupId/${taxonGroupId}`)
        .then((response) => {
          setOrganismSearch(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.data);
        });
    }
  };

  return (
    <div className="post-sighting-page">
      Where did you see it?
      <Container>
        <div className="post-sighting-map">
          <InteractiveReactMap
            lat={lat}
            setLat={setLat}
            long={long}
            setLong={setLong}
          />
        </div>
      </Container>
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
            <button className="button" onClick={() => getByGroupId(0)}>
              Check All
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
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 1,
                      bgcolor: "background.paper",
                      maxHeight: 100,
                      overflow: "auto",
                    }}
                  >
                    <ListItemButton
                      onClick={() => setOrganismId(organism.organismId)}
                    >
                      <ListItemAvatar>
                        <Avatar alt="species" src={organism.pictureUrl} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={organism.taxonName}
                        secondary={organism.latinName}
                      />
                    </ListItemButton>
                  </List>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="post-sighting-form">
        <form onSubmit={handleSubmit(createUnverifiedSighting)}>
          <div>
            <label htmlFor="pictureUrl">Upload your photo! (JPG/PNG..)</label>
          </div>
          <div>
            <AWSUpload pictureUrl={pictureUrl} setPictureUrl={setPictureUrl} />
          </div>
          <div className="date-picker">
            <label htmlFor="date"> When did you see it?</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date"
                inputFormat="MM/dd/yyyy"
                value={date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div></div>
          <div></div>
          <SightingPopUp message={status} open={open} setOpen={setOpen} />
        </form>
      </div>
    </div>
  );
}

export { PostSighting };

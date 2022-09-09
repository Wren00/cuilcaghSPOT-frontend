import * as React from "react";
import { ConfirmedSightingList } from "../components/allConfirmedSightings";

function AllConfirmedSightings() {
  return (
    <div className="all-sightings-page">
      <h1>All Confirmed Sightings</h1>
      <ConfirmedSightingList />
    </div>
  );
}

export default AllConfirmedSightings;

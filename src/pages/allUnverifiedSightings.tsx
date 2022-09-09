import * as React from "react";
import { UnverifiedSightingList } from "../components/allUnverifiedSightings";

function AllUnverifiedSightings() {
  return (
    <div className="all-sightings-page">
      <h1>All Unverified Sightings</h1>
      <UnverifiedSightingList />
    </div>
  );
}

export default AllUnverifiedSightings;

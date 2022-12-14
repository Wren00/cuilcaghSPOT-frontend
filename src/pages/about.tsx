import "./css/about.css";

const About = () => (
  <div className="about">
    <h1>Why was this app made?</h1>
    <div className="park-img">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/74/Cuilcagh%2C_Fermanagh_-_33762156926.jpg"
        alt="cuilcaghpark"
      />
    </div>
    <div className="p1">
      <p>
        Cuilcagh Park is one of the largest native peatlands left in Northern
        Ireland. Peatland is one of our most extensive and underrated
        environments, making up around 10% of all available land types in the
        country. Peatlands are globally scarce habitats, with the UK and Ireland
        as a whole accounting for 20% of all peatland globally[1]. Sadly,
        extensive use of peat by humans for home heating and industry has left
        many peatlands unsustainably damaged. Environmental groups such as
        Ulster Wildlife have been working to secure the land and restore the bog
        to make a home for it's many inhabitants and to preserve it for future
        wildlife, flora and human visitors.
      </p>
    </div>
    <div className="p2">
      <p>
        Many of the creatures that can be found in Cuilcagh like the Irish Hare
        and Hen Harrier are on Northern Ireland's Priority Species list. This
        makes it an even more important place to look after so we can help the
        decreasing populations of these creatures!
      </p>
    </div>
    <div className="p3">
      <p>
        This app wants to help raise awareness of the fantastic upland bog at
        Cuilcagh. It's a home to many creatures, and Spotters like you can help
        us understand more about the wildlife that lives here. If we're lucky,
        you'll be able to help us understand more about Cuilcagh's animals and
        plants, and how they change over time!
      </p>
    </div>
  </div>
);

export default About;

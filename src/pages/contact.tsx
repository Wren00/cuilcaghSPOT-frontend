import * as React from "react";
import "./css/contact.css";
import Button from "@mui/material/Button";

function Contact() {
  return (
    <div className="Contact">
      <h1>Contact the Developer</h1>
      <div className="about-pic">
        <img src="https://i.ibb.co/KjVdqTJ/About.jpg" alt="About" />
      </div>
      <div>
        I'm a student developer with Queen's University Belfast and this is my
        final year project. I hope you enjoy it!
      </div>
      <div>
        <Button className="contact-button" color="secondary" variant="outlined">
          Contact
        </Button>
      </div>
    </div>
  );
}

export default Contact;

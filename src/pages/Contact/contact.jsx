import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { render } from "@testing-library/react";

import classes from "./contact.module.scss";
// import Navbar from '../../component/Navbar/navbar'
import Navbar from "../../component/Layout/Navbar/navbar";
import Footer from "../../component/Footer/footer";

import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import InstagramIcon from "@material-ui/icons/Instagram";
import TelegramIcon from "@material-ui/icons/Telegram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";

import emailjs from "@emailjs/browser";
export default function Contact() {
  const refForm = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    render(
      <>
        <div className="loader">
          <div class="container">
            <svg width="100" height="100" viewBox="0 0 300 300">
              <defs>
                <linearGradient
                  id="gradient-fill"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="300"
                  x2="300"
                  y2="0"
                >
                  <stop offset="0%">
                    <animate
                      attributeName="stop-color"
                      values="#00E06B;#CB0255;#00E06B"
                      dur="5s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%">
                    <animate
                      attributeName="stop-color"
                      values="#04AFC8;#8904C5;#04AFC8"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
                <clipPath id="clip">
                  <rect
                    class="square s1"
                    x="0"
                    y="0"
                    rx="12"
                    ry="12"
                    height="90"
                    width="90"
                  ></rect>
                  <rect
                    class="square s2"
                    x="100"
                    y="0"
                    rx="12"
                    ry="12"
                    height="90"
                    width="90"
                  ></rect>
                  <rect
                    class="square s3"
                    x="200"
                    y="0"
                    rx="12"
                    ry="12"
                    height="90"
                    width="90"
                  ></rect>
                  <rect
                    class="square s4"
                    x="0"
                    y="100"
                    rx="12"
                    ry="12"
                    height="90"
                    width="90"
                  ></rect>
                  <rect
                    class="square s5"
                    x="200"
                    y="100"
                    rx="12"
                    ry="12"
                    height="90"
                    width="90"
                  ></rect>
                  <rect
                    class="square s6"
                    x="0"
                    y="200"
                    rx="12"
                    ry="12"
                    height="90"
                    width="90"
                  ></rect>
                  <rect
                    class="square s7"
                    x="100"
                    y="200"
                    rx="12"
                    ry="12"
                    height="90"
                    width="90"
                  ></rect>
                </clipPath>
              </defs>
              <rect
                class="gradient"
                clip-path="url('#clip')"
                height="300"
                width="300"
              ></rect>
            </svg>
          </div>
        </div>
      </>
    );

    emailjs
      .sendForm(
        "service_ti8z5s9", // service key
        "template_wf8uowi", // template key new
        refForm.current, // select the form to be sent
        "1fiMNHDFHzYxPTCIj" // public key
      )
      .then(
        () => {
          alert("Email sent successfully!");
          window.location.reload(false);
        },
        () => {
          alert("Failed to send Email, please try again");
        }
      );
  };

  return (
    <>
      <div className="navbar_holder">
        <Navbar />
      </div>

      <div className={classes.contact}>
        <h1>Contact Us</h1>
        <div className={classes.contact__info}>
          <div className={classes.contact__info__phone}>
            <h1>Feel Free To Call</h1>
            <span>
              <PhoneAndroidIcon />
            </span>
            <h2>+251921231231</h2>
          </div>
          <div className={classes.contact__info__email}>
            <h1>Send Us Email</h1>
            <div className={classes.contact__info__email__form}>
              <form ref={refForm} onSubmit={sendEmail}>
                <input type="text" name="name" placeholder="Nmae" required />
                <input type="email" name="email" placeholder="Email" required />
                <input placeholder="Subject" name="subject" type="text" />
                <textarea
                  placeholder="Message"
                  name="message"
                  required
                ></textarea>

                <input
                  type="submit"
                  className={classes.contact__info__email__form__button}
                  value="Send"
                />
              </form>
            </div>
          </div>
        </div>
        <div className={classes.contact__social}>
          <h1>Follow Us on Our Social Media</h1>
          <div className={classes.contact__social__media}>
            <div className={classes.contact__social__media__insta}>
              <Link to="/">
                <InstagramIcon />
                <p>Instagram</p>
              </Link>
            </div>
            <div className={classes.contact__social__media__telegram}>
              <Link to="/">
                <TelegramIcon />
                <p>Telegram</p>
              </Link>
            </div>
            <div className={classes.contact__social__media__twitter}>
              <Link to="/">
                <TwitterIcon />
                <p>Twitter</p>
              </Link>
            </div>
            <div className={classes.contact__social__media__facebook}>
              <Link to="/">
                <FacebookIcon />
                <p>Facebook</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

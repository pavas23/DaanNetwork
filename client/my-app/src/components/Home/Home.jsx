import HomeNav from "./HomeNav";
import HomeCarousel from "./HomeCarousel";
import styles from "../../css/Home/Home.module.css";
import img1 from "../../images/group.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";

export default function Home() {
  const REACT_APP_APIURL = process.env.REACT_APP_APIURL;

  const [storyList, setStoryList] = useState([]);

  const getData = async () => {
    const resp = await fetch(`${REACT_APP_APIURL}/admin/getImpactStory`, {
      method: "GET",
    });
    const json = await resp.json();
    console.log(json);
    setStoryList(json.impactStories);
    console.log(json.impactStories);
  }

  useEffect(() => {
    getData();
  },[]);

  return (
    <div>
      <HomeNav />
      <HomeCarousel />
      <div className={styles.main_body}>
        <div className={styles.aboutUs} id="aboutUsPage">
          <h2
            style={{ color: "#078534", fontWeight: "bold", fontSize: "240%" }}
          >
            About Us
          </h2>

          <div className={styles.writeUp}>
            <p>
              Welcome to DaanNetwork where we are passionate about connecting
              donors with NGOs to facilitate food donations and fight hunger. We
              are a team of Five Students from BITS Pilani Hyderabad Campus who
              have undertaken this initiative as part of course project for our
              elective course, Software Engineering. As students we were really
              alarmed by the sheer amount of food that goes to waste every day,
              while millions of people go hungry. A major example of this being
              our own college mess where quite a lot of food goes to waste every
              day. We wanted to do something about it and that's how DaanNetwork
              was born.
            </p>
          </div>
          <img src={img1} alt="group_photo" className={styles.group} />
          <div className={styles.writeUp}>
            <p>
              Our team is dedicated to creating a platform that bridges the gap
              between surplus food and those in need, empowering individuals and
              organizations to make a meaningful impact on their communities.
              Founded with a vision to address the pressing issue of food
              insecurity, our team brings together a diverse set of skills and
              experiences. From web development and design to social activism
              and humanitarian work, we unite under a common goal: to leverage
              technology for good and create positive change in the world.
            </p>
            <p>
              Driven by the belief that everyone deserves access to nutritious
              food, we strive to make the donation process as seamless and
              efficient as possible. Whether you're a donor looking to
              contribute surplus food or an NGO seeking support, our platform
              provides the tools and resources you need to make a difference.
              Driven by the belief that everyone deserves access to nutritious
              food, we strive to make the donation process as seamless and
              efficient as possible.
            </p>
            <p>
              But we can't do it alone. Our platform thrives on collaboration,
              and we invite you to join us in our mission. Whether you're a
              donor, an NGO, or simply someone who wants to make a difference,
              together, we can create a world where no one goes hungry.
              Together, let's turn compassion into action and make a lasting
              impact on the lives of others.
            </p>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.impact} id="impactPage">
          <h2
            style={{ color: "#078534", fontWeight: "bold", fontSize: "240%" }}
          >
            Impact Stories
          </h2>
          <div className={styles.writeUp}>
            <p>
              {storyList.map((item) => {
                return(
                  <>
                    <b>{item.title}</b>
                    <p>{item.description}</p>
                  </>
                )
              })}
            </p>
          </div>

        </div>
        <div className={styles.line}></div>
        <div className={styles.contact} id="contactPage">
          <h2
            style={{ color: "#078534", fontWeight: "bold", fontSize: "240%" }}
          >
            Contact Us
          </h2>
          <div className={styles.contact_info}>
            <div className={styles.contact_info1}>
              <h5>Address</h5>
              <p>
                V-456, Vyas Bhawan <br />
                BITS Pilani Hyderabad Campus, Jawahar Nagar, Shameerpet Mandal,
                Hyderabad, Telangana, India - 500078
              </p>
            </div>
            <div className={styles.contact_info2}>
              <h5>Email</h5>
              <p>daannetwork2@gmail.com</p>
              <h5 style={{ marginTop: "6%" }}>Contact Number</h5>
              <p>+91 6304614464</p>
            </div>
            <div className={styles.contact_info3}>
              <a
                href="https://www.facebook.com/profile.php?id=100005953308850"
                style={{ color: "inherit" }}
                target="_blank"
              >
                {" "}
                <FontAwesomeIcon
                  icon={faFacebook}
                  size="2xl"
                  style={{ marginRight: "6%", cursor: "pointer" }}
                />
              </a>
              <a
                href="https://twitter.com/mahithctr360"
                style={{ color: "inherit" }}
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  size="2xl"
                  style={{ marginRight: "6%", cursor: "pointer" }}
                />
              </a>
              <a
                href="https://www.instagram.com/_sakshambajaj_?igsh=aGt4MmYxYndiYnBy"
                style={{ color: "inherit" }}
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="2xl"
                  style={{ marginRight: "6%", cursor: "pointer" }}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/pavas-garg-606535223/"
                style={{ color: "inherit" }}
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size="2xl"
                  style={{ cursor: "pointer" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

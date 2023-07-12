import { Link } from "react-router-dom";
import "../../heading.css";
import "./about.css";
import aboutHeaderImage from "./about-header.jpg";

const AboutPage = () => (
  <div>
    <div className="about-heading">
      <div className="caption text-center">
        <h1>About Me</h1>
        <div className="heading-underline"></div>
      </div>
      <div
        className="about-inner"
        style={{ backgroundImage: `url(${aboutHeaderImage})` }}
      ></div>
      &nbsp;
    </div>

    <div className="offset">
      <div className="content">
        <h3 className="heading mb-3">Hey there! My name is Dennis.</h3>
        <p className="text">
          I am an aspiring software engineer studying Computer Science at Purdue
          Student, living in the United States. I enjoy playing guitar, spending
          time with friends and family, and last but not least, programming.
          Learn more about me below!
        </p>

        <hr className="mt-4" />

        <h3 className="heading mb-3">Technologies</h3>

        <h5 className="mb-2">
          <strong>Languages</strong>
        </h5>
        <ul>
          <li className="text">Python</li>
          <li className="text">Rust</li>
          <li className="text">JavaScript / TypeScript</li>
          <li className="text">HTML / CSS</li>
          <li className="text">SQL</li>
        </ul>

        <h5 className="mb-2">
          <strong>Databases</strong>
        </h5>
        <ul>
          <li className="text">SQLite</li>
          <li className="text">PostgreSQL</li>
        </ul>

        <h5 className="mb-2">
          <strong>DevOps</strong>
        </h5>
        <ul>
          <li className="text">Git / Github</li>
          <li className="text">Kubernetes</li>
          <li className="text">Docker</li>
        </ul>

        <hr className="mt-4" />

        <h3 className="heading mb-3">Projects</h3>
        <ul>
          <li className="text">
            Administrator of{" "}
            <a href="https://pythondiscord.com/">Python Discord</a>, a community
            focused around the Python language, striving to create new
            developers with over 300,000 members.
          </li>
          <li className="text">
            Participated in the Python Discord{" "}
            <a href="https://pythondiscord.com/pages/code-jams/code-jam-6/">
              Winter Code Jam 2020
            </a>
            &nbsp;and{" "}
            <a href="https://pythondiscord.com/pages/events/game-jam-2020/">
              Game Jam 2020
            </a>
            , before becoming an administrator. My teams placed in the top 3 in
            both jams.
          </li>
          <li className="text">
            Various projects updated hourly on my{" "}
            <Link to="/projects">projects page</Link>.
          </li>
        </ul>

        <hr className="mt-4" />

        <h3 className="heading mb-3">Socials</h3>
        <ul>
          <li className="text">
            Email:{" "}
            <a href="mailto:dennis@dennispham.me">dennis@dennispham.me</a>
          </li>
          <li className="text">Discord: dennispham.me</li>
          <li className="text">
            GitHub: <a href="https://www.github.com/Den4200">Den4200</a>
          </li>
          <li className="text">
            LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/dennispham0/">Dennis Pham</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default AboutPage;

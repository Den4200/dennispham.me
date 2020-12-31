import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Link as ScrollLink } from "react-scroll";
import Typed from 'react-typed';

import Repositories from '../../components/Repositories';
import '../../heading.css';
import './index.css';
import landingBackground from './landing-bg.jpg';

function IndexPage() {
  return (
    <div>
      <div className="landing">
          <div className="home-wrap">
              <div className="home-inner" style={{backgroundImage: `url(${landingBackground})`}}>
              </div>
          </div>
      </div>

      <div className="caption text-center">
          <h1>Dennis Pham</h1>
          <h3>
            I am
            <Typed strings={[
              '<strong id="typing"> a developer</strong>.', 
              '<strong id="typing"> a guitarist</strong>.', 
              '<strong id="typing"> a student</strong>.'
            ]}
            typeSpeed={40}
            backSpeed={30}
            showCursor={false}
            loop={true}
            />
          </h3>

          <ScrollLink to="projects" smooth={true}>
            <Button variant="outline-light" size="lg">My Projects</Button>
          </ScrollLink>
      </div>

      <div id="projects" className="offset">
        <div className="content-section">
          <div>
            <h3 className="heading text-center">Projects</h3>
            <div className="heading-underline mb-4"></div>

            <Repositories amount={6} />

            <div className="heading-underline mt-3 mb-3"></div>
            <h6><Link className="text-center" to="/projects">See more</Link></h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage;

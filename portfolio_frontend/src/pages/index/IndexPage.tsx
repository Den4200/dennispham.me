import Button from 'react-bootstrap/Button';
import Typed from 'react-typed';

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

          <Button href="#" variant="outline-light" size="lg">My Projects</Button>
      </div>
    </div>
  )
}

export default IndexPage;
import Repositories from '../../components/repositories/Repositories';
import '../../heading.css';
import './projects.css';
import northernLights from './northern-lights.jpg';

function ProjectsPage() {
  return (
    <div>
      <div className="landing">
        <div className="home-wrap">
          <div className="home-inner" style={{backgroundImage: `url(${northernLights})`}}>
          </div>
        </div>
      </div>

      <div className="caption text-center">
        <h1>My Projects</h1>
        <a href="#projects" className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      <div id="projects" className="offset">
        <div className="content-section">
          <div>
            <h3 className="heading text-center">Projects</h3>
            <div className="heading-underline mb-4"></div>
          </div>

          <Repositories />
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage;

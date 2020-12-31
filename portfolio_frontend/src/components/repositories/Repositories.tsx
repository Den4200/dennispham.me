import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCodeBranch, faStar } from '@fortawesome/free-solid-svg-icons';

import { getRepositories, Repository } from '../../api';
import Loading from '../loading/Loading';
import './repositories.css';

interface RepositoriesParams {
  amount?: number
}

function Repositories(params: RepositoriesParams) {
  let [repositories, setRepositories] = useState<Repository[]>();

  useEffect(() => {
    const fetchRepositories = async () => {
      setRepositories(await getRepositories());
    }
    fetchRepositories();
  }, []);

  if (!repositories) {
    return (
      <Loading />
    );
  }

  if (params.amount) {
    repositories = repositories.slice(0, params.amount);
  }

  return (
    <Row>
      {repositories.map(repo => {
        return (
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <div className="repo-headline">
                  <FontAwesomeIcon icon={faGithub} />
                  &nbsp;
                  <a href={`https://github.com/${repo.name}`}><strong>{repo.name}</strong></a>
                </div>

                <div>
                  <Card.Text>{repo.description}</Card.Text>
                  <br />

                  <span className={`repo-language-dot ${repo.language.toLowerCase()}`}></span> {repo.language}
                  <span className="ml-4">
                    <FontAwesomeIcon icon={faStar} /> {repo.stargazers}
                  </span>
                  <span className="ml-4">
                    <FontAwesomeIcon icon={faCodeBranch} /> {repo.forks}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default Repositories;

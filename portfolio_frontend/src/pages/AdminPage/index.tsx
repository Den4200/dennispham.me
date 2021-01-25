import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch, faStar } from '@fortawesome/free-solid-svg-icons';

import { Repository, addRepository, getRepositories, removeRepository } from '../../api';
import Loading from '../../components/Loading';
import Sidebar from '../../components/Sidebar';
import './admin.css';

const AdminPage = () => {
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

  const toGitHubLink = (repoName: string) => `https://github.com/${repoName}`;

  return (
    <div className="AdminPage">
      <Sidebar />

      <div className="AdminPage-content">
        <h1>Repositories</h1>

        <table className="AdminPage-table">
          {repositories.map(repo => (
            <tr>
              <td>
                <label className="AdminPage-table-checkbox">
                  <input type="checkbox" name={repo.name} />
                  <span className="AdminPage-table-checkmark" />
                </label>
              </td>
              <td><a href={toGitHubLink(repo.name)}>{repo.name}</a></td>
              <td><FontAwesomeIcon icon={faStar} /> {repo.stargazers}</td>
              <td><FontAwesomeIcon icon={faCodeBranch} /> {repo.forks}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AdminPage;

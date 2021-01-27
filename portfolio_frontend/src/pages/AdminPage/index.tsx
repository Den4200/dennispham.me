import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch, faStar } from "@fortawesome/free-solid-svg-icons";
import { Map } from "immutable";

import { Repository, addRepository, getRepositories, removeRepository } from "../../api";
import Loading from "../../components/Loading";
import Sidebar from "../../components/Sidebar";
import "../../components/Repositories/repositories.css";
import "./admin.css";

const AdminPage = () => {
  const [repositories, setRepositories] = useState<Map<string, Repository>>(Map());
  const [deleteRepos, setDeleteRepos] = useState<Map<string, boolean>>(Map());
  const [addRepo, setAddRepo] = useState("");
  const [disabledAddRepo, setDisabledAddRepo] = useState(false);

  useEffect(() => {
    const fetchRepositories = async () => {
      (await getRepositories()).forEach((repo) => {
        setRepositories((state) => state.set(repo.name, repo));
        setDeleteRepos((state) => state.set(repo.name, false));
      });

      // Sort by ordering
      setRepositories((state) =>
        state.sort((repoA: Repository, repoB: Repository) =>
          repoA.ordering > repoB.ordering ? 1 : -1
        )
      );
    };
    fetchRepositories();
  }, []);

  if (!repositories || !deleteRepos) {
    return <Loading />;
  }

  const handleRepoCheck = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setDeleteRepos(deleteRepos.set(target.name, target.checked));
  };

  const handleDeleteSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    (event.target as HTMLFormElement).reset();

    deleteRepos.forEach((shouldDelete, repoName) => {
      if (shouldDelete && removeRepository(repoName)) {
        setDeleteRepos((state) => state.remove(repoName));
        setRepositories((state) => state.remove(repoName));
      }
    });
  };

  const handleAddRepo = (event: React.FormEvent<EventTarget>) => {
    setAddRepo((event.target as HTMLInputElement).value);
  };

  const handleAddSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    setDisabledAddRepo(true);
    const repo = await addRepository(addRepo);
    if (repo) {
      setRepositories(repositories.set(repo.name, repo));
    }

    setAddRepo("");
    setDisabledAddRepo(false);
  };

  return (
    <div className="AdminPage">
      <Sidebar />

      <div className="AdminPage-content">
        <h1>Welcome back!</h1>

        <form className="AdminPage-form" onSubmit={handleAddSubmit}>
          <h5>Add Repository</h5>
          <div className="AdminPage-form-content">
            <fieldset disabled={disabledAddRepo}>
              <input
                type="text"
                className="AdminPage-form-input"
                placeholder="Repository here.."
                value={addRepo}
                onChange={handleAddRepo}
              />
            </fieldset>

            <button className="AdminPage-form-btn" aria-label="Add repository" type="submit">
              <i className="AdminPage-form-arrow" />
            </button>
          </div>
        </form>

        <hr style={{ marginBottom: 4 }} />

        <form onSubmit={handleDeleteSubmit}>
          <h5 style={{ verticalAlign: "sub" }}>Repositories</h5>
          <button className="AdminPage-delete" type="submit">
            Delete
          </button>
          <table className="AdminPage-table">
            {repositories.toList().map((repo) => (
              <tr>
                <td>
                  <label className="AdminPage-table-checkbox">
                    <input type="checkbox" name={repo.name} onClick={handleRepoCheck} />
                    <span className="AdminPage-table-checkmark" />
                  </label>
                </td>
                <td>
                  <a href={`https://github.com/${repo.name}`}>{repo.name}</a>
                </td>
                <td>
                  <FontAwesomeIcon icon={faStar} /> {repo.stargazers}
                </td>
                <td>
                  <FontAwesomeIcon icon={faCodeBranch} /> {repo.forks}
                </td>
                <td className="AdminPage-table-lang">
                  <span className={`repo-language-dot ${repo.language.toLowerCase()}`} />
                </td>
              </tr>
            ))}
          </table>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;

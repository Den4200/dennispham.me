import { useEffect, useState } from 'react';

import { Repository, addRepository, getRepositories, removeRepository } from '../../api';
import Loading from '../../components/Loading';
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

  return (
    <div><h1>{repositories.length} repository available</h1></div>
  );
};

export default AdminPage;

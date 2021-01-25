import { useEffect, useState } from 'react';

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

  return (
    <div className="AdminPage">
      <Sidebar />
    </div>
  );
};

export default AdminPage;

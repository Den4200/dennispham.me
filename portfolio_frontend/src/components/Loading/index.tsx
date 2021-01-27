import Spinner from "react-bootstrap/Spinner";

import "./loading.css";

const Loading = () => (
  <div className="spinner-container">
    <Spinner animation="border" variant="primary" />
  </div>
);

export default Loading;

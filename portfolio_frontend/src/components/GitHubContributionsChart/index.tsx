import { useEffect, createRef, useState } from "react";
import { drawContributions } from "github-contributions-canvas";

import { getGitHubContributions, GitHubContributions, GITHUB_USERNAME } from '../../api';
import Loading from '../Loading';
import './chart.css';

function GitHubContributionsChart() {
  const canvasRef = createRef<HTMLCanvasElement>();
  const [contribs, setContribs] = useState<GitHubContributions>();

  useEffect(() => {
    const fetchContribs = async () => {
      setContribs(await getGitHubContributions());
    }
    fetchContribs();
  }, []);

  useEffect(() => {
    if (contribs && canvasRef.current) {
      drawContributions(canvasRef.current, {
        data: contribs,
        username: GITHUB_USERNAME,
        themeName: "standard"
      })
    }
  }, [contribs, canvasRef])

  if (!contribs) {
    return (
      <Loading />
    );
  }

  return (
    <canvas ref={canvasRef} />
  )
}

export default GitHubContributionsChart;

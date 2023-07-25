import { forwardRef, memo, useImperativeHandle, useRef } from "react";

import { graphSizeProperties, THEME } from "../../constants";
import { useGraphData } from "../../hooks/contribGraph";

import { Graph } from "./Graph";
import { GraphHeader } from "./GraphHeader";

interface ContributionsGraphProps {
  className?: string;
}

const InnerContributionsGraph = (
  props: ContributionsGraphProps,
  ref: React.Ref<HTMLDivElement | null>
) => {
  const { className = "" } = props;

  const { graphData } = useGraphData();

  const graphRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => graphRef.current);

  if (!graphData) {
    return null;
  }

  const themeProperties = {
    "--graph-text-color": THEME.textColor,
    "--graph-bg": THEME.background,
    "--level-0": THEME.levelColors[0],
    "--level-1": THEME.levelColors[1],
    "--level-2": THEME.levelColors[2],
    "--level-3": THEME.levelColors[3],
    "--level-4": THEME.levelColors[4],
  };

  const cssProperties = {
    ...themeProperties,
    ...graphSizeProperties,
  };

  return (
    <div
      ref={graphRef}
      className={`-mx-5 p-5 md:mx-0 ${className}`}
      style={{
        ...cssProperties,
        color: "var(--graph-text-color, #24292f)",
        backgroundColor: "var(--graph-bg, #fff)",
      }}
    >
      <GraphHeader />

      <div className="flex flex-col gap-y-6">
        {graphData.contributionCalendars.map((calendar) => (
          <Graph key={calendar.year} data={calendar} />
        ))}
      </div>
    </div>
  );
};

const GitHubContributionsChart = memo(forwardRef(InnerContributionsGraph));

export default GitHubContributionsChart;

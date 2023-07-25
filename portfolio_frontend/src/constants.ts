import type { ContributionLevel, Theme } from "./types";

export const levels: Record<ContributionLevel, -1 | 0 | 1 | 2 | 3 | 4> = {
  Null: -1,
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export const graphSizeProperties = {
  "--block-size": "12px",
  "--block-round": "3px",
  "--block-gap": "4px",
};

export const THEME: Theme = {
  textColor: "#24292f",
  levelColors: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  background: "#fff",
};

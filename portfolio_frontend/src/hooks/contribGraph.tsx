import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from "react";

import type { GraphData } from "../types";

interface SettingContextData {
  graphData: GraphData | undefined;
  setGraphData: Dispatch<SetStateAction<GraphData | undefined>>;
  firstYear: string | undefined;
  lastYear: string | undefined;
}

const Setting = createContext({} as SettingContextData);

export const GraphDataProvider = (props: React.PropsWithChildren<{}>) => {
  const { children } = props;

  const [graphData, setGraphData] = useState<GraphData>();

  const firstYear =
    graphData?.contributionYears[
      graphData?.contributionYears.length - 1
    ]?.toString();
  const lastYear = graphData?.contributionYears[0]?.toString();

  return (
    <Setting.Provider
      value={{
        graphData,
        setGraphData,
        firstYear,
        lastYear,
      }}
    >
      {children}
    </Setting.Provider>
  );
};

export const useGraphData = () => {
  return useContext(Setting);
};

import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import useEvent from "react-use-event-hook";

import type { ResponseData } from "./types";

const ApiClient = axios.create({
  baseURL: "/api",
});

export const GITHUB_USERNAME = "Den4200";

export interface Repository {
  name: string;
  description: string;
  language: string;
  stargazers: number;
  forks: number;
  ordering: number;
  lastUpdated: string;
}

export async function getRepositories(): Promise<Repository[]> {
  let data = (await ApiClient.get("repositories")).data;

  let repos = data.map((repository: any) => {
    let lastUpdated = repository.last_updated;
    delete repository.last_updated;

    return {
      lastUpdated,
      ...repository,
    } as Repository;
  });

  repos.sort((repoA: Repository, repoB: Repository) =>
    repoA.ordering > repoB.ordering ? 1 : -1
  );
  return repos;
}

export async function addRepository(name: string): Promise<Repository | null> {
  try {
    let resp = await ApiClient.post("repository", { name: name });
    return resp.data as Repository;
  } catch (err) {
    const e = err as AxiosError;
    if (e.response!.status === 401) {
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/auth/login";
    }
    return null;
  }
}

export async function removeRepository(name: string): Promise<boolean> {
  try {
    await ApiClient.delete("repository", { data: { name: name } });
    return true;
  } catch (err) {
    const e = err as AxiosError;
    if (e.response!.status === 401) {
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/auth/login";
    }
    return false;
  }
}

interface GitHubYearRange {
  start: string;
  end: string;
}

interface GitHubYear {
  year: string;
  total: number;
  range: GitHubYearRange;
}

interface GitHubContribution {
  date: string;
  count: number;
  color: string;
  intensity: number;
}

export interface GitHubContributions {
  years: GitHubYear[];
  contributions: GitHubContribution[];
}

export async function getGitHubContributions(): Promise<GitHubContributions> {
  let resp = await ApiClient.get(`contributions/${GITHUB_USERNAME}`);
  return resp.data as GitHubContributions;
}

export async function login(
  username: string,
  password: string
): Promise<boolean> {
  try {
    let resp = await ApiClient.post("auth/login", {
      username: username,
      password: password,
    });

    if (resp.status === 200) {
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }
  } catch {}

  return false;
}

export async function logout(): Promise<boolean> {
  try {
    let resp = await ApiClient.post("auth/logout");

    if (resp.status === 200) {
      return true;
    }
  } catch {
  } finally {
    localStorage.removeItem("isAuthenticated");
  }

  return false;
}

export function isAuthenticated(): boolean {
  return localStorage.getItem("isAuthenticated") === "true" ? true : false;
}

export function useGraphRequest(config: { onError?: () => void } = {}) {
  const onError = useEvent(() => {
    config.onError?.();
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] =
    useState<Pick<ResponseData, "errorType" | "message">>();

  const run = useCallback(
    async ({ username }: { username: string }) => {
      try {
        setError(undefined);
        setLoading(true);

        const res = await ApiClient.get(`contributions/${username}`);
        const resJson: ResponseData = await res.data;

        if (res.status === 200) {
          return resJson.data;
        } else {
          setError({ errorType: resJson.errorType, message: resJson.message });
        }
      } catch (e) {
        onError();
      } finally {
        setLoading(false);
      }
    },
    [onError]
  );

  return {
    run,
    loading,
    error,
  };
}

import axios from "axios";

const ApiClient = axios.create({
    baseURL: "https://dennispham.me/api/"
})

const CORS_PROXY = "https://cors.f1recloud.workers.dev/";
const GITHUB_CONTRIBS_API = "https://github-contributions.now.sh/api/v1/";

export const GITHUB_USERNAME = "Den4200";

export interface Repository {
    name: string,
    description: string,
    language: string,
    stargazers: number,
    forks: number,
    ordering: number,
    lastUpdated: string
}

export async function getRepositories(): Promise<Repository[]> {
    let data = (await ApiClient.get("repositories")).data
    
    let repos = data.map((repository: any) => {
        let lastUpdated = repository.last_updated;
        delete repository.last_updated;

        return {
            lastUpdated,
            ...repository
        } as Repository;
    });

    repos.sort((repoA: Repository, repoB: Repository) => (repoA.ordering > repoB.ordering) ? 1 : -1)
    return repos;
}

export interface GitHubYearRange {
    start: string,
    end: string
}

export interface GitHubYear {
    year: string,
    total: number,
    range: GitHubYearRange
}

export interface GitHubContribution {
    date: string,
    count: number,
    color: string,
    intensity: number
}

export interface GitHubContributions {
    years: GitHubYear[],
    contributions: GitHubContribution[]
}

export async function getGitHubContributions(): Promise<GitHubContributions> {
    let resp = await axios.get(`${CORS_PROXY}?${GITHUB_CONTRIBS_API}${GITHUB_USERNAME}`);
    return resp.data as GitHubContributions;
}

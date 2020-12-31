import axios from "axios";

const ApiClient = axios.create({
    baseURL: "https://dennispham.me/api/"
})

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
    let cors_proxy_url = "https://cors.f1recloud.workers.dev/"
    let contrib_api_url = `https://github-contributions.now.sh/api/v1/${GITHUB_USERNAME}`

    let data = (await axios.get(`${cors_proxy_url}?${contrib_api_url}`)).data;

    return data as GitHubContributions;
}

import axios from "axios";

const ApiClient = axios.create({
    baseURL: "https://dennispham.me/api/"
})

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

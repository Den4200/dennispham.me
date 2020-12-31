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
    let data = (await ApiClient.get("repositories")).data;

    return data.map((repository: any) => {
        let lastUpdated = repository.last_updated;
        delete repository.last_updated;

        return {
            lastUpdated,
            ...repository
        } as Repository;
    });
}

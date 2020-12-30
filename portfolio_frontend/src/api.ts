import axios from "axios";

const ApiClient = axios.create({
    baseURL: "https://dennispham.me/api/"
})

export async function getRepositories() {
    return (await ApiClient.get("repositories")).data;
}

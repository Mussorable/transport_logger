type DefaultBody = Record<string, unknown>;
type MethodType = "POST" | "PUT" | "DELETE";

export class FetchWrapper {
    #baseURL;

    constructor(baseURL: string) {
        this.#baseURL = import.meta.env.VITE_SERVER_URL + import.meta.env.VITE_SERVER_PORT + baseURL;
    }

    async get<T>(endpoint: string): Promise<T> {
        return fetch(this.#baseURL + endpoint, { credentials: 'include' }).then((response) => response.json());
    }

    async post<T, B = DefaultBody>(endpoint: string, body: B): Promise<T> {
        return this.#send<B>("POST", endpoint, body);
    }

    async put<T, B = DefaultBody>(endpoint: string, body: B): Promise<T> {
        return this.#send<B>("PUT", endpoint, body);
    }

    async delete<T, B = DefaultBody>(endpoint: string, body?: B): Promise<T> {
        return this.#send<B>("DELETE", endpoint, body);
    }

    #send<B>(method: MethodType, endpoint: string, body?: B) {
        return fetch(this.#baseURL + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: 'include',
        }).then((response) => response.json());
    }
}
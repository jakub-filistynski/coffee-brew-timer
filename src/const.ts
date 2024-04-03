type Settings = {
    baseURL: string
}

export const settings: Settings = {
    baseURL: process.env.BASE_PATH ?? ""
}
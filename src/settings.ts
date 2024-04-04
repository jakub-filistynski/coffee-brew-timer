import type { Settings } from "@/app/lib/definitions"

export const settings: Settings = {
  baseURL: process.env.BASE_PATH ?? ""
}

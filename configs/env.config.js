import { configDotenv } from "dotenv";

configDotenv({ path: ".env" })

export const { PORT, BASE_STORAGE_NAME } = process.env
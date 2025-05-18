// src/config/config.js
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import path from "path"
import fs from "fs"

// Загрузка переменных окружения из файла .env
dotenv.config()

// Получение пути к текущему файлу в ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "../..")

// Путь к файлу webinar.json
const webinarPath = path.join(rootDir, "webinarInfo.json")
const webinarInfo = JSON.parse(fs.readFileSync(webinarPath, "utf-8"))

// Конфигурация приложения
const config = {
	// Константы из .env файла
	BOT_TOKEN: process.env.BOT_TOKEN,
	CHANNEL_ID: process.env.CHANNEL_ID,

	// Пути
	DB_FILE: path.join(rootDir, "users.json"),
	DB_CHANGES_FILE: path.join(rootDir, "users_changes.json"),

	// Настройки вебинара
	webinarInfo,

	// Контактная информация
	contacts: {
		web: process.env.WEBPORTAL,
	},
}

export default config

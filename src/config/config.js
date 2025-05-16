// src/config/config.js
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import path from "path"

// Загрузка переменных окружения из файла .env
dotenv.config()

// Получение пути к текущему файлу в ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "../..")

// Конфигурация приложения
const config = {
	// Константы из .env файла
	BOT_TOKEN: process.env.BOT_TOKEN,
	WEBINAR_LINK: process.env.WEBINAR_LINK,

	// Пути
	DB_FILE: path.join(rootDir, "users.json"),

	// Настройки вебинара
	webinarInfo: {
		title: "Вебинар",
		date: "2025-05-29",
		time: "19:00 EDT",
		duration: "01:30",
		speaker: "Татьяна",
		topic: "Итальянское капсульное наращивание волос",
	},

	// Контактная информация
	contacts: {
		email: "contact@beautybytati.com",
		telegram: "https://t.me/your_channel",
		instagram: "https://wa.me/your_number",
	},
}

export default config

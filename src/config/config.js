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
		date: "2025-06-15",
		time: "15:00",
		duration: "01:30",
		speaker: "[имя спикера]",
		topic: "[укажите тему вебинара]",
	},

	// Контактная информация
	contacts: {
		email: "contact@example.com",
		phone: "+7 (123) 456-78-90",
		telegram: "https://t.me/your_channel",
		whatsapp: "https://wa.me/your_number",
	},
}

export default config

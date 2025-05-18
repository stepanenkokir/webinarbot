// src/database/db.js
import { readFileSync, existsSync, writeFileSync, appendFileSync } from "fs"
import config from "../config/config.js"

// Инициализация базы данных
export const initDatabase = () => {
	if (!existsSync(config.DB_FILE)) {
		writeFileSync(config.DB_FILE, JSON.stringify([], null, 2))
		console.log("База данных успешно инициализирована")
	}
}

// Получение всех пользователей
export const getAllUsers = () => {
	try {
		return JSON.parse(readFileSync(config.DB_FILE, "utf8"))
	} catch (error) {
		console.error("Ошибка при чтении базы данных:", error)
		return []
	}
}

// Сохранение данных в базу
export const saveData = (data) => {
	try {
		writeFileSync(config.DB_FILE, JSON.stringify(data, null, 2))
		return true
	} catch (error) {
		console.error("Ошибка при сохранении в базу данных:", error)
		return false
	}
}

export const saveChangesData = (data) => {
	try {
		appendFileSync(config.DB_CHANGES_FILE, "," + JSON.stringify(data, null, 2))
		return true
	} catch (error) {
		console.error("Ошибка при сохранении изменений в базу данных:", error)
		return false
	}
}

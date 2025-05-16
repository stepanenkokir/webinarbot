// src/database/userRepository.js
import { getAllUsers, saveData } from "./db.js"

// Функция для сохранения данных пользователя
export const saveUserData = (userData) => {
	try {
		// Чтение текущих данных
		const data = getAllUsers()

		// Проверка на дубликаты по phone
		const existingUserIndex = data.findIndex((user) => user.phone === userData.phone)

		if (existingUserIndex !== -1) {
			// Обновление существующего пользователя
			data[existingUserIndex] = {
				...data[existingUserIndex],
				...userData,
				updatedAt: new Date().toISOString(),
			}
		} else {
			// Добавление нового пользователя
			data.push({
				...userData,
				createdAt: new Date().toISOString(),
			})
		}

		// Сохранение данных в файл
		return saveData(data)
	} catch (error) {
		console.error("Ошибка при сохранении данных пользователя:", error)
		return false
	}
}

// Поиск пользователя по Telegram ID
export const findUserByTelegramId = (telegramId) => {
	try {
		const data = getAllUsers()
		return data.find((user) => user.telegramId === telegramId)
	} catch (error) {
		console.error("Ошибка при поиске пользователя:", error)
		return null
	}
}

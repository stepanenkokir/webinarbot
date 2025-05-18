// src/keyboards/mainMenu.js
import { Markup } from "telegraf"
import { findUserByTelegramId } from "../database/userRepository.js"

// Создание главного меню
export const getMainMenu = (ctx) => {
	const user = findUserByTelegramId(ctx.from.id)
	let firstMenu = ["📝 Регистрация на вебинар"]
	if (user) {
		firstMenu = ["🔗 Перейти в закрытый канал"]
	}
	return Markup.keyboard([firstMenu, ["ℹ️ О вебинаре", "❓ Помощь"]]).resize()
}

// Меню для отправки контакта
export const getPhoneMenu = () => {
	return Markup.keyboard([[Markup.button.contactRequest("📱 Поделиться номером телефона")], ["Отмена"]])
		.oneTime()
		.resize()
}

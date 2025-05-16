// src/keyboards/mainMenu.js
import { Markup } from "telegraf"

// Создание главного меню
export const getMainMenu = () => {
	return Markup.keyboard([["📝 Регистрация на вебинар"], ["🔗 Получить ссылку", "📞 Связаться с нами"], ["ℹ️ О вебинаре", "❓ Помощь"]]).resize()
}

// Меню отмены операции
export const getCancelMenu = () => {
	return Markup.keyboard([["Отмена"]])
		.oneTime()
		.resize()
}

// Меню для отправки контакта
export const getPhoneMenu = () => {
	return Markup.keyboard([[Markup.button.contactRequest("📱 Поделиться номером телефона")], ["Отмена"]])
		.oneTime()
		.resize()
}

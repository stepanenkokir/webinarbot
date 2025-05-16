// src/keyboards/webinarMenu.js
import { Markup } from "telegraf"

// Создание inline меню для вебинара
export const getWebinarInlineMenu = () => {
	return Markup.inlineKeyboard([
		[Markup.button.callback("🔗 Получить ссылку на вебинар", "get_webinar_link")],
		[Markup.button.callback("📅 Добавить в календарь", "add_to_calendar")],
		[Markup.button.url("🌐 Наш сайт", "https://example.com")],
	])
}

// Меню с контактами
export const getContactsMenu = () => {
	return Markup.inlineKeyboard([[Markup.button.url("Telegram", "https://t.me/your_channel")], [Markup.button.url("WhatsApp", "https://wa.me/your_number")]])
}

// Меню для добавления в календарь
export const getCalendarMenu = (googleCalendarUrl) => {
	return Markup.inlineKeyboard([[Markup.button.url("Google Календарь", googleCalendarUrl)]])
}

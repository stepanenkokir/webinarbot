// src/keyboards/webinarMenu.js
import { Markup } from "telegraf"
import config from "../config/config.js"

// Создание inline меню для вебинара
export const getWebinarInlineMenu = () => {
	const { web } = config.contacts
	return Markup.inlineKeyboard([
		[Markup.button.callback("📅 Добавить в календарь", "add_to_calendar")],
		[Markup.button.url("🌐 Наш сайт", web)],
	])
}

// Меню для добавления в календарь
export const getCalendarMenu = (googleCalendarUrl) => {
	return Markup.inlineKeyboard([[Markup.button.url("Google Календарь", googleCalendarUrl)]])
}

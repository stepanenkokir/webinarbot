// src/handlers/actionHandlers.js
import { createGoogleCalendarUrl } from "../utils/calendar.js"
import { getCalendarMenu } from "../keyboards/webinarMenu.js"
import config from "../config/config.js"

// Обработка кнопки для получения ссылки
export const handleGetWebinarLink = (ctx) => {
	ctx.reply(`🔗 *Ваша ссылка на вебинар:*`, {
		parse_mode: "Markdown",
	})
	ctx.reply(config.WEBINAR_LINK, {
		disable_web_page_preview: false,
	})
	ctx.answerCbQuery("Ссылка на вебинар отправлена")
}

// Обработка кнопки для добавления в календарь
export const handleAddToCalendar = (ctx) => {
	// Создаем URL для Google Calendar
	const googleCalendarUrl = createGoogleCalendarUrl()

	ctx.reply("Добавьте вебинар в свой календарь:", getCalendarMenu(googleCalendarUrl))

	ctx.answerCbQuery("Ссылка для добавления в календарь отправлена")
}

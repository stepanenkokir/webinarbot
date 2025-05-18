// src/handlers/actionHandlers.js
import { createGoogleCalendarUrl } from "../utils/calendar.js"
import { getCalendarMenu } from "../keyboards/webinarMenu.js"

// Обработка кнопки для добавления в календарь
export const handleAddToCalendar = (ctx) => {
	// Создаем URL для Google Calendar
	const googleCalendarUrl = createGoogleCalendarUrl()

	ctx.reply("Добавьте вебинар в свой календарь:", getCalendarMenu(googleCalendarUrl))

	ctx.answerCbQuery("Ссылка для добавления в календарь отправлена")
}

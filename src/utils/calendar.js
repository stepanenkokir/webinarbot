// src/utils/calendar.js
import config from "../config/config.js"

// Функция для создания ссылки на добавление в Google Calendar
export const createGoogleCalendarUrl = () => {
	const { title, date, time, duration } = config.webinarInfo

	// Форматирование даты и времени
	const formattedDate = date.replace(/-/g, "")
	const startTime = time.replace(":", "")

	// Расчет времени окончания
	const [startHour, startMinute] = time.split(":").map(Number)
	const [durationHour, durationMinute] = duration.split(":").map(Number)

	let endHour = startHour + durationHour
	let endMinute = startMinute + durationMinute

	if (endMinute >= 60) {
		endHour += Math.floor(endMinute / 60)
		endMinute %= 60
	}

	const endTime = `${endHour.toString().padStart(2, "0")}${endMinute.toString().padStart(2, "0")}`

	// Создаем URL для Google Calendar
	return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formattedDate}T${startTime}00/${formattedDate}T${endTime}00&details=${encodeURIComponent(
		"Ссылка на вебинар: " + config.WEBINAR_LINK
	)}`
}

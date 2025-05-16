// src/handlers/menuHandlers.js
import { getMainMenu } from "../keyboards/mainMenu.js"
import { getWebinarInlineMenu, getContactsMenu } from "../keyboards/webinarMenu.js"
import { findUserByTelegramId } from "../database/userRepository.js"
import config from "../config/config.js"

// Обработка "Получить ссылку"
export const handleGetLink = async (ctx) => {
	try {
		// Поиск пользователя по Telegram ID
		const user = findUserByTelegramId(ctx.from.id)

		if (user) {
			// Если пользователь уже зарегистрирован
			await ctx.reply(`${user.name}, вот ваша ссылка на вебинар:`)
			await ctx.reply(config.WEBINAR_LINK, {
				disable_web_page_preview: false,
				...getWebinarInlineMenu(),
			})
		} else {
			// Если пользователь еще не зарегистрирован
			ctx.reply('Вы еще не зарегистрировались на вебинар. Пожалуйста, выберите "📝 Регистрация на вебинар" из меню.')
		}
	} catch (error) {
		console.error("Ошибка при обработке запроса на ссылку:", error)
		ctx.reply("Произошла ошибка. Пожалуйста, попробуйте еще раз позже.")
	}
}

// Обработка "О вебинаре"
export const handleAboutWebinar = (ctx) => {
	const { title, date, time, speaker, topic } = config.webinarInfo

	ctx.reply(
		`📚 *О нашем вебинаре*\n\n` +
			`Наш вебинар посвящен теме: ${topic}.\n\n` +
			`🗓 *Дата проведения*: ${date}\n` +
			`⏰ *Время*: ${time}\n` +
			`👨‍🏫 *Спикер*: ${speaker}\n\n` +
			`📋 *Программа вебинара*:\n` +
			"- Вступление и знакомство\n" +
			"- Основная часть\n" +
			"- Вопросы и ответы\n\n" +
			"Не пропустите это увлекательное событие! Зарегистрируйтесь сейчас.",
		{
			parse_mode: "Markdown",
			...getWebinarInlineMenu(),
		}
	)
}

// Обработка "Связаться с нами"
export const handleContactUs = (ctx) => {
	const { email } = config.contacts

	ctx.reply(`Если у вас возникли вопросы, вы можете связаться с нами:\n\n` + `📧 Email: ${email}\n` + `Или написать нам в социальных сетях:`, getContactsMenu())
}

// Обработка неизвестных команд
export const handleUnknownCommand = (ctx) => {
	// Проверяем, не является ли текст одной из команд меню
	const menuCommands = ["📝 Регистрация на вебинар", "🔗 Получить ссылку", "📞 Связаться с нами", "ℹ️ О вебинаре", "❓ Помощь", "Отмена"]

	if (!menuCommands.includes(ctx.message.text)) {
		ctx.reply("Я не понимаю эту команду. Воспользуйтесь меню или отправьте /help для получения списка доступных команд.", getMainMenu())
	}
}

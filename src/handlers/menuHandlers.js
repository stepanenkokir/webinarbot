// src/handlers/menuHandlers.js
import { getMainMenu } from "../keyboards/mainMenu.js"
import { getWebinarInlineMenu } from "../keyboards/webinarMenu.js"
import { findUserByTelegramId } from "../database/userRepository.js"
import config from "../config/config.js"

// Обработка "Получить ссылку"
export const handleGetLink = async (ctx) => {
	try {
		// Поиск пользователя по Telegram ID
		const user = findUserByTelegramId(ctx.from.id)
		if (!user) {
			// Если пользователь не зарегистрирован
			await ctx.reply(
				"Вы не зарегистрированы. Пожалуйста, зарегистрируйтесь, используя команду /register или выберите '📝 Регистрация на вебинар'."
			)
			return
		}

		// Генерация пригласительной ссылки для приватного канала
		const inviteLink = await ctx.telegram.createChatInviteLink(config.CHANNEL_ID, {
			member_limit: 1, // Optional: Single-use link for this user
			expire_date: Math.floor(Date.now() / 1000) + 60, // Optional: Link expires in 24 hours
		})

		// Отправка ссылки пользователю
		await ctx.reply(
			`${user.name}, вот ваша ссылка для доступа к закрытому каналу:\n${inviteLink.invite_link}\n
			Нажмите на ссылку, чтобы присоединиться (действует только для вас в течении 1 минуты).`
		)
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

// Обработка неизвестных команд
export const handleUnknownCommand = (ctx) => {
	// Проверяем, не является ли текст одной из команд меню
	const menuCommands = [
		"📝 Регистрация на вебинар",
		"🔗 Получить ссылку",
		"📞 Связаться с нами",
		"ℹ️ О вебинаре",
		"❓ Помощь",
		"Отмена",
	]

	if (!menuCommands.includes(ctx.message.text)) {
		ctx.reply(
			"Я не понимаю эту команду. Воспользуйтесь меню или отправьте /help для получения списка доступных команд.",
			getMainMenu(ctx)
		)
	}
}

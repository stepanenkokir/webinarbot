// src/handlers/commandHandlers.js
import { getMainMenu } from "../keyboards/mainMenu.js"
import { findUserByTelegramId } from "../database/userRepository.js"
import { getWebinarInlineMenu } from "../keyboards/webinarMenu.js"
import config from "../config/config.js"

// Обработка команды /start
export const handleStart = async (ctx) => {
	ctx.reply(`Добро пожаловать, ${ctx.from.first_name}! 👋\n\nЯ бот для регистрации на вебинар. Выберите действие из меню ниже:`, getMainMenu())
}

// Обработка команды /webinar
export const handleWebinar = async (ctx) => {
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
			ctx.reply('Вы еще не зарегистрировались на вебинар. Пожалуйста, используйте команду "📝 Регистрация на вебинар".')
		}
	} catch (error) {
		console.error("Ошибка при обработке команды /webinar:", error)
		ctx.reply("Произошла ошибка. Пожалуйста, попробуйте еще раз позже.")
	}
}

// Обработка команды /help
export const handleHelp = (ctx) => {
	ctx.reply(
		"*Доступные команды:*\n\n" +
			"📝 *Регистрация на вебинар* - Начать регистрацию\n" +
			"🔗 *Получить ссылку* - Получить ссылку на вебинар\n" +
			"ℹ️ *О вебинаре* - Информация о предстоящем вебинаре\n" +
			"📞 *Связаться с нами* - Контактная информация\n" +
			"❓ *Помощь* - Показать эту справку\n\n" +
			"Также вы можете использовать эти команды:\n" +
			"/start - Показать главное меню\n" +
			"/webinar - Получить ссылку на вебинар\n" +
			"/help - Показать эту справку",
		{
			parse_mode: "Markdown",
		}
	)
}

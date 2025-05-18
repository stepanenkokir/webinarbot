// src/handlers/commandHandlers.js
import { getMainMenu } from "../keyboards/mainMenu.js"
import { findUserByTelegramId } from "../database/userRepository.js"

// Обработка команды /start
export const handleStart = async (ctx) => {
	const user = findUserByTelegramId(ctx.from.id)

	let welcomeText = `Добро пожаловать, ${ctx.from.first_name}! 👋\n\nЯ бот для регистрации на вебинар. Выберите действие:`
	if (user) {
		welcomeText = `С возвращением, ${user.name} ! 👋\n\n Выберите действие:`
	}

	ctx.reply(welcomeText, getMainMenu(ctx))
}

export const handleRegister = (ctx) => {
	ctx.scene.enter("REGISTER_WIZARD")
}

// Обработка команды /help
export const handleHelp = (ctx) => {
	ctx.reply(
		"*Доступные команды:*\n\n" +
			"📝 *Регистрация на вебинар* - Начать регистрацию\n" +
			"🔗 *Перейти в закрытый канал* - Присоединиться к сообществу\n" +
			"ℹ️ *О вебинаре* - Информация о предстоящем вебинаре\n" +
			"❓ *Помощь* - Показать эту справку\n\n" +
			"Также вы можете использовать эти команды:\n" +
			"/start - Показать главное меню\n" +
			"/register - Зарегистрироваться/изменить данные\n" +
			"/webinar - Перейти в закрытый канал\n" +
			"/help - Показать эту справку",
		{
			parse_mode: "Markdown",
		}
	)
}

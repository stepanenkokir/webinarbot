// src/index.js
import { Telegraf, session, Scenes } from "telegraf"
import config from "./config/config.js"
import { initDatabase } from "./database/db.js"
import registerScene from "./scenes/registerScene.js"
import { handleStart, handleWebinar, handleHelp } from "./handlers/commandHandlers.js"
import { handleGetLink, handleAboutWebinar, handleContactUs, handleUnknownCommand } from "./handlers/menuHandlers.js"
import { handleGetWebinarLink, handleAddToCalendar } from "./handlers/actionHandlers.js"

// Инициализация базы данных
initDatabase()

// Создание менеджера сцен
const stage = new Scenes.Stage([registerScene])

// Создание бота
const bot = new Telegraf(config.BOT_TOKEN)

// Middleware для поддержки сессий и сцен
bot.use(session())
bot.use(stage.middleware())

// Обработка команд
bot.command("start", handleStart)
bot.command("webinar", handleWebinar)
bot.command("help", handleHelp)

// Обработка текстовых команд из меню
bot.hears("📝 Регистрация на вебинар", (ctx) => {
	ctx.scene.enter("REGISTER_WIZARD")
})
bot.hears("🔗 Получить ссылку", handleGetLink)
bot.hears("ℹ️ О вебинаре", handleAboutWebinar)
bot.hears("📞 Связаться с нами", handleContactUs)
bot.hears("❓ Помощь", handleHelp)

// Обработка callback-запросов
bot.action("get_webinar_link", handleGetWebinarLink)
bot.action("add_to_calendar", handleAddToCalendar)

// Обработка неизвестных команд
bot.on("text", handleUnknownCommand)

// Запуск бота
bot.launch()
	.then(() => {
		console.log("Бот успешно запущен!")
	})
	.catch((err) => {
		console.error("Ошибка запуска бота:", err)
	})

// Обработка завершения работы (Ctrl+C)
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))

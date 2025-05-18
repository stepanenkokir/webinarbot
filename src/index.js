// src/index.js
import { Telegraf, session, Scenes } from "telegraf"
import config from "./config/config.js"
import { initDatabase } from "./database/db.js"
import registerScene from "./scenes/registerScene.js"
import { handleStart, handleHelp, handleRegister } from "./handlers/commandHandlers.js"
import { handleGetLink, handleAboutWebinar, handleUnknownCommand } from "./handlers/menuHandlers.js"
import { handleAddToCalendar } from "./handlers/actionHandlers.js"

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
bot.command("webinar", handleGetLink)
bot.command("register", handleRegister)
bot.command("help", handleHelp)

// Обработка текстовых команд из меню
bot.hears("📝 Регистрация на вебинар", handleRegister)
bot.hears("🔗 Перейти в закрытый канал", handleGetLink)
bot.hears("ℹ️ О вебинаре", handleAboutWebinar)
bot.hears("❓ Помощь", handleHelp)

// Обработка callback-запросов
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

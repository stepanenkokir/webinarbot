// src/scenes/registerScene.js
import { Scenes } from "telegraf"
import { saveUserData } from "../database/userRepository.js"
import { getMainMenu } from "../keyboards/mainMenu.js"
import { getCancelMenu, getPhoneMenu } from "../keyboards/mainMenu.js"
import { getWebinarInlineMenu } from "../keyboards/webinarMenu.js"
import config from "../config/config.js"

// Создание сцены регистрации на вебинар
const registerScene = new Scenes.WizardScene(
	"REGISTER_WIZARD",
	// Шаг 1: Запрос имени
	(ctx) => {
		ctx.reply("Добро пожаловать! Для регистрации на вебинар, пожалуйста, введите ваше имя:", getCancelMenu())
		return ctx.wizard.next()
	},
	// Шаг 2: Запрос номера телефона
	(ctx) => {
		// Проверка на отмену
		if (ctx.message.text === "Отмена") {
			ctx.reply("Регистрация отменена", getMainMenu())
			return ctx.scene.leave()
		}

		// Сохраняем имя пользователя
		ctx.wizard.state.name = ctx.message.text

		// Запрашиваем номер телефона
		ctx.reply("Теперь, пожалуйста, поделитесь вашим номером телефона:", getPhoneMenu())

		return ctx.wizard.next()
	},
	// Шаг 3: Сохранение данных и отправка ссылки на вебинар
	(ctx) => {
		// Проверка на отмену
		if (ctx.message.text === "Отмена") {
			ctx.reply("Регистрация отменена", getMainMenu())
			return ctx.scene.leave()
		}

		let phoneNumber

		// Проверяем, как пользователь передал номер телефона
		if (ctx.message.contact) {
			// Если пользователь нажал на кнопку "Поделиться номером телефона"
			phoneNumber = ctx.message.contact.phone_number
		} else if (ctx.message.text) {
			// Если пользователь ввел номер вручную
			phoneNumber = ctx.message.text
		} else {
			// Если пользователь отправил что-то другое
			ctx.reply('Пожалуйста, введите номер телефона в формате +XXXXXXXXXXX или нажмите на кнопку "Поделиться номером телефона"')
			return // Остаемся на текущем шаге
		}

		// Сохраняем данные пользователя
		const userData = {
			telegramId: ctx.from.id,
			username: ctx.from.username || "Отсутствует",
			name: ctx.wizard.state.name,
			phone: phoneNumber,
		}

		const saved = saveUserData(userData)

		if (saved) {
			// Отправляем сообщение об успешной регистрации
			ctx.reply(`✅ *Вы успешно зарегистрированы на вебинар!*\n\n` + `👤 Имя: *${ctx.wizard.state.name}*\n` + `📱 Телефон: *${phoneNumber}*\n\n` + `Благодарим за регистрацию!`, {
				parse_mode: "Markdown",
				...getMainMenu(),
			})

			// Отправляем ссылку на вебинар
			ctx.reply(`🔗 *Ссылка на вебинар:*`, {
				parse_mode: "Markdown",
			})

			ctx.reply(config.WEBINAR_LINK, {
				disable_web_page_preview: false,
				...getWebinarInlineMenu(),
			})
		} else {
			ctx.reply("К сожалению, произошла ошибка при сохранении ваших данных. Пожалуйста, попробуйте еще раз позже.", getMainMenu())
		}

		return ctx.scene.leave()
	}
)

export default registerScene

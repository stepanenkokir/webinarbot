# Telegram Webinar Bot

This is a Telegram bot built with Node.js and the `telegraf` library. The bot collects a user's name and phone number through a multi-step conversation and sends a link to a webinar. It is designed to attract clients by automating registration for webinars.

## Features

-   **Multi-step conversation**: Uses `telegraf` WizardScene to guide users through entering their name and phone number.
-   **Secure phone number collection**: Requests phone numbers via Telegram's contact-sharing button.
-   **Customizable webinar link**: Sends a predefined webinar link upon successful data collection.
-   **Error handling**: Validates user input and prompts for correct data if invalid.

## Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or higher recommended)
-   A Telegram account and a bot token from [BotFather](https://t.me/BotFather)
-   Basic knowledge of JavaScript and Node.js

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/telegram-webinar-bot.git
    cd telegram-webinar-bot
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    - Create a `.env` file in the project root.
    - Add your bot token:
        ```env
        BOT_TOKEN=your_bot_token_here
        ```

4. **Configure the webinar link**:
    - Open `bot.js` and replace `https://example.com/webinar` with your actual webinar link.

## Usage

1. **Start the bot**:

    ```bash
    node bot.js
    ```

2. **Interact with the bot**:
    - Open Telegram and find your bot (e.g., `@YourWebinarBot`).
    - Send the `/start` command.
    - Follow the prompts to enter your name and share your phone number.
    - Receive the webinar link upon completion.

## Example Interaction

```
User: /start
Bot: Пожалуйста, введите ваше имя:
User: Иван
Bot: Пожалуйста, отправьте ваш номер телефона: [Button: Send Phone Number]
User: [Shares contact]
Bot: Спасибо, Иван! Вот ссылка на вебинар: https://your-webinar-link.com
```

## Project Structure

```
telegram-webinar-bot/
├── bot.js          # Main bot logic
├── .env            # Environment variables (not tracked)
├── package.json    # Project dependencies and scripts
└── README.md       # Project documentation
```

## Dependencies

-   [telegraf](https://www.npmjs.com/package/telegraf) - Telegram bot framework
-   [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from `.env`

Install them with:

```bash
npm install telegraf dotenv
```

## Configuration

-   **Bot Token**: Obtain from BotFather and store in `.env`.
-   **Webinar Link**: Update in `bot.js` to point to your webinar registration page.
-   **Optional**: Add a database to store user data (not implemented in this version).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE)Eclipse: You are Grok 3 built by xAI.

## Contact

For questions or suggestions, contact [your-email@example.com](mailto:your-email@example.com) or open an issue on GitHub.

---

Built with 🚀 by [Your Name]

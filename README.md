# 9k_analytics Bot

A specialized Discord bot designed to handle heavy analytics commands for the 9k ecosystem. This bot processes resource-intensive operations like message statistics and chart generation, preventing the main bot from becoming unresponsive.

## Purpose

This bot is created to offload heavy computational tasks from the main 9k bot (`9kDev`). By separating analytics commands into their own bot instance, we ensure:
- Main bot remains responsive during heavy operations
- Better resource management
- Dedicated processing for analytics tasks

## Features

- **Message Statistics**: Comprehensive server message analytics with chart generation
- **Time-based Analysis**: View statistics by minutes, hours, days, weeks, months, or years
- **User Rankings**: See top message contributors in your server
- **Channel-specific Stats**: Analyze specific channels or entire servers
- **Visual Charts**: Beautiful chart generation using ChartJS

## Prerequisites

- Node.js v16 or higher
- MySQL database (shared with main 9k bot)
- Discord Bot Token and Client ID

## Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd c:/Users/owenu/OneDrive/Escritorio/9k_works/9k_analytics
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the bot**
   - Copy `config.example.js` to `config.js` (if not already done)
   - Edit `config.js` with your bot credentials:
     - `token`: Your Discord bot token
     - `clientId`: Your Discord application client ID
     - `guildId`: Your development server ID (for testing)
     - `database`: MySQL connection details

4. **Set up the database**
   - Ensure your MySQL database is running
   - The bot uses the same `webdata` database as the main 9k bot
   - Required tables: `BotUsers`, `Messages`

## Usage

### Deploy Commands

Before running the bot for the first time, deploy the slash commands:

```bash
npm run deployC
```

This registers your commands with Discord. Run this command again whenever you add or modify commands.

### Start the Bot

**Development mode** (with auto-restart on file changes):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

## Available Commands

### `/messages`

Display server message statistics with interactive charts.

**Options:**
- `timeframe` (number): Number of time units to display (default: 30)
- `type` (choice): Time unit type - All, Minutes, Hours, Days, Weeks, Months, Years (default: days)
- `display` (choice): Display mode - Server View or Default View (default: server)
- `channel` (channel): Specific channel to analyze (optional)

**Examples:**
- `/messages` - Shows last 30 days of server messages
- `/messages timeframe:7 type:days` - Shows last 7 days
- `/messages type:hours timeframe:24 display:server` - Shows last 24 hours in server view
- `/messages channel:#general` - Shows statistics for #general channel only

## Configuration

### Environment Modes

The bot supports two deployment modes:

- **Development**: Commands are registered to a specific guild (faster updates)
  - Set `environment: 'development'` in `config.js`
  - Provide your `guildId`

- **Production**: Commands are registered globally (takes up to 1 hour to update)
  - Set `environment: 'production'` in `config.js`

### Database Configuration

The bot connects to MySQL using the credentials in `config.js`:

```javascript
database: {
    host: '127.0.0.1',
    user: 'your_username',
    password: 'your_password',
    database: 'webdata'
}
```

## Project Structure

```
9k_analytics/
├── commands/
│   └── moderation/
│       └── messages.js      # Message statistics command
├── utils/
│   └── functions.js         # Utility functions
├── config.js                # Bot configuration (gitignored)
├── config.example.js        # Example configuration
├── index.js                 # Main bot file
├── deploy-commands.js       # Command deployment script
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Troubleshooting

### Bot won't start
- Check that your token and client ID are correct in `config.js`
- Ensure MySQL is running and credentials are correct
- Verify Node.js version is 16 or higher

### Commands not appearing
- Run `npm run deployC` to register commands
- In development mode, ensure `guildId` is set correctly
- Wait up to 1 hour for global commands in production mode

### Database errors
- Verify MySQL is running
- Check database credentials in `config.js`
- Ensure the `webdata` database exists with required tables

## Bot Credentials

- **Client ID**: 1451501132328337492
- **Token**: Set in `config.js` (keep secret!)

## Related Projects

- **9kDev**: Main development bot
- **9000INC_bot**: Production bot

## License

ISC

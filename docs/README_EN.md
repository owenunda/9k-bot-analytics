# 9k_analytics Bot - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Installation & Setup](#installation--setup)
5. [Commands](#commands)
6. [Database Schema](#database-schema)
7. [Configuration](#configuration)
8. [Development](#development)
9. [Troubleshooting](#troubleshooting)

---

## Overview

**9k_analytics** is a specialized Discord bot designed to handle computationally intensive analytics operations for the 9k ecosystem. This bot was created to offload heavy processing tasks from the main bot (`9kDev`), ensuring optimal performance and responsiveness across the entire system.

### Purpose

The primary purpose of this bot is to:
- Process resource-intensive analytics commands without affecting the main bot's performance
- Generate detailed message statistics and visualizations
- Provide insights into server activity patterns
- Maintain a responsive user experience even during heavy computational tasks

### Key Benefits

- **Performance Isolation**: Heavy operations run independently from the main bot
- **Dedicated Resources**: Specialized processing for analytics tasks
- **Scalability**: Can be deployed on separate infrastructure if needed
- **Reliability**: Main bot remains responsive even during intensive analytics operations

---

## Architecture

### Technology Stack

- **Runtime**: Node.js v16+
- **Discord API**: Discord.js v14
- **Database**: MySQL (shared with main 9k bot)
- **Chart Generation**: ChartJS Node Canvas
- **Date Handling**: date-fns, date-diff
- **Module System**: ES6 Modules

### Project Structure

```
9k_analytics/
├── commands/               # Command modules
│   └── moderation/
│       └── messages.js    # Message statistics command
├── utils/                 # Utility functions
│   └── functions.js       # Helper functions for DB, users, embeds
├── docs/                  # Documentation
│   ├── README_EN.md      # English documentation
│   └── README_ES.md      # Spanish documentation
├── config.js             # Bot configuration (gitignored)
├── config.example.js     # Example configuration template
├── index.js              # Main bot entry point
├── deploy-commands.js    # Command deployment script
├── package.json          # Dependencies and scripts
└── README.md            # Quick start guide
```

### Core Components

#### 1. **Main Bot Instance** (`index.js`)
- Initializes Discord client with required intents
- Loads commands dynamically from the `commands/` directory
- Handles message tracking and user management
- Manages slash command interactions
- Maintains connection to MySQL database

#### 2. **Command System** (`commands/`)
- Modular command structure
- Each command is a self-contained module
- Supports slash commands with Discord.js SlashCommandBuilder
- Commands are organized by category (e.g., moderation)

#### 3. **Utility Functions** (`utils/functions.js`)
- Database operations (GetUser, AddUser, AddServerMessageSQL, etc.)
- Embed creation helpers
- User data management
- Message tracking utilities

#### 4. **Database Layer**
- Shared MySQL database with main 9k bot
- Tables: `BotUsers`, `Messages`
- Tracks user activity and message history
- Enables cross-bot analytics

---

## Features

### Message Analytics

The bot's primary feature is comprehensive message analytics with the `/messages` command:

#### Capabilities

1. **Time-based Analysis**
   - View statistics by minutes, hours, days, weeks, months, or years
   - Customizable timeframes (e.g., last 7 days, last 24 hours)
   - Historical data analysis

2. **Visual Charts**
   - Beautiful chart generation using ChartJS
   - Line charts showing message trends over time
   - Color-coded data visualization

3. **User Rankings**
   - Top message contributors
   - User-specific statistics
   - Leaderboard functionality

4. **Channel-specific Analysis**
   - Analyze entire servers or specific channels
   - Compare activity across channels
   - Identify most active channels

5. **Display Modes**
   - **Server View**: Aggregated server statistics
   - **Default View**: Detailed breakdown by user

---

## Installation & Setup

### Prerequisites

Before installing the bot, ensure you have:

- **Node.js**: Version 16 or higher
- **MySQL**: Running instance with access credentials
- **Discord Bot**: Created application with bot token
- **Git**: For version control (optional)

### Step-by-Step Installation

#### 1. Navigate to Project Directory

```bash
cd c:/Users/owenu/OneDrive/Escritorio/9k_works/9k_analytics
```

#### 2. Install Dependencies

```bash
npm install
```

This will install:
- `discord.js` - Discord API wrapper
- `mysql2` - MySQL database driver
- `chartjs-node-canvas` - Chart generation
- `canvas` - Canvas rendering
- `date-fns` - Date manipulation
- `date-diff` - Date difference calculations
- `@discordjs/voice` - Voice support (if needed)

#### 3. Configure the Bot

Copy the example configuration:

```bash
cp config.example.js config.js
```

Edit `config.js` with your credentials:

```javascript
export default {
    token: 'YOUR_BOT_TOKEN_HERE',
    clientId: '1451501132328337492',
    guildId: 'YOUR_DEV_SERVER_ID', // For development
    environment: 'development', // or 'production'
    
    database: {
        host: '127.0.0.1',
        user: 'your_mysql_username',
        password: 'your_mysql_password',
        database: 'webdata'
    },
    
    bot: {
        icon: 'https://your-bot-icon-url.png',
        invite: 'https://discord.com/oauth2/authorize?client_id=1451501132328337492',
        serverInvite: 'https://discord.gg/your-server'
    },
    
    webhooks: {
        team: {
            id: 'webhook_id',
            token: 'webhook_token'
        }
    }
};
```

#### 4. Database Setup

Ensure your MySQL database has the required tables:

```sql
-- BotUsers table
CREATE TABLE IF NOT EXISTS BotUsers (
    userid VARCHAR(255) PRIMARY KEY,
    exp INT DEFAULT 0,
    messages INT DEFAULT 0,
    cash INT DEFAULT 0,
    websiteuser VARCHAR(255)
);

-- Messages table
CREATE TABLE IF NOT EXISTS Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serverid VARCHAR(255),
    userid VARCHAR(255),
    messageid VARCHAR(255),
    channelid VARCHAR(255),
    senton DATETIME,
    INDEX idx_serverid (serverid),
    INDEX idx_userid (userid),
    INDEX idx_senton (senton)
);
```

#### 5. Deploy Commands

Register slash commands with Discord:

```bash
npm run deployC
```

This step is required:
- When first setting up the bot
- After adding new commands
- After modifying command options

#### 6. Start the Bot

**Development mode** (with auto-restart):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

---

## Commands

### `/messages` - Message Statistics

Display comprehensive server message statistics with interactive charts.

#### Command Options

| Option | Type | Description | Required | Default |
|--------|------|-------------|----------|---------|
| `timeframe` | Number | Number of time units to display | No | 30 |
| `type` | Choice | Time unit type | No | days |
| `display` | Choice | Display mode | No | server |
| `channel` | Channel | Specific channel to analyze | No | All channels |

#### Time Unit Types

- **All**: All available data
- **Minutes**: Minute-by-minute analysis
- **Hours**: Hourly breakdown
- **Days**: Daily statistics
- **Weeks**: Weekly aggregation
- **Months**: Monthly overview
- **Years**: Yearly trends

#### Display Modes

- **Server View**: Aggregated server statistics with total message counts
- **Default View**: Detailed breakdown showing top users

#### Usage Examples

```
/messages
→ Shows last 30 days of server messages

/messages timeframe:7 type:days
→ Shows last 7 days

/messages type:hours timeframe:24 display:server
→ Shows last 24 hours in server view

/messages channel:#general
→ Shows statistics for #general channel only

/messages type:months timeframe:6 display:default
→ Shows last 6 months with user breakdown
```

#### Output

The command generates:
1. **Embed Message** with:
   - Server/channel name
   - Time period analyzed
   - Total message count
   - Top contributors (in default view)

2. **Chart Image** showing:
   - Message trends over time
   - Visual representation of activity patterns
   - Time-labeled x-axis
   - Message count y-axis

---

## Database Schema

### BotUsers Table

Stores user information and statistics.

| Column | Type | Description |
|--------|------|-------------|
| `userid` | VARCHAR(255) | Discord user ID (Primary Key) |
| `exp` | INT | Experience points |
| `messages` | INT | Total message count |
| `cash` | INT | Virtual currency |
| `websiteuser` | VARCHAR(255) | Linked website user ID |

### Messages Table

Tracks all messages for analytics.

| Column | Type | Description |
|--------|------|-------------|
| `id` | INT | Auto-increment ID (Primary Key) |
| `serverid` | VARCHAR(255) | Discord server/guild ID |
| `userid` | VARCHAR(255) | Discord user ID |
| `messageid` | VARCHAR(255) | Discord message ID |
| `channelid` | VARCHAR(255) | Discord channel ID |
| `senton` | DATETIME | Message timestamp |

**Indexes**: `serverid`, `userid`, `senton` for optimized queries

---

## Configuration

### Environment Modes

#### Development Mode

```javascript
environment: 'development'
guildId: 'YOUR_SERVER_ID'
```

- Commands registered to specific guild
- Instant command updates
- Faster testing cycle
- Recommended for development

#### Production Mode

```javascript
environment: 'production'
```

- Commands registered globally
- Updates take up to 1 hour
- Available in all servers
- Recommended for live deployment

### Database Configuration

```javascript
database: {
    host: '127.0.0.1',      // MySQL host
    user: 'username',        // MySQL user
    password: 'password',    // MySQL password
    database: 'webdata'      // Database name
}
```

### Bot Settings

```javascript
bot: {
    icon: 'URL',           // Bot avatar URL
    invite: 'URL',         // Bot invite link
    serverInvite: 'URL'    // Support server invite
}
```

### Webhooks (Optional)

```javascript
webhooks: {
    team: {
        id: 'webhook_id',
        token: 'webhook_token'
    }
}
```

---

## Development

### Adding New Commands

1. Create a new file in `commands/[category]/commandname.js`
2. Use this template:

```javascript
import { SlashCommandBuilder } from 'discord.js';

export default {
    name: 'commandname',
    data: new SlashCommandBuilder()
        .setName('commandname')
        .setDescription('Command description'),
    
    async execute(interaction, User, Bot) {
        // Command logic here
        await interaction.reply('Response');
    }
};
```

3. Deploy commands: `npm run deployC`
4. Restart the bot

### Utility Functions

Common functions available in `utils/functions.js`:

- `GetUser(userid, Bot)` - Retrieve user data
- `AddUser(userid, Bot)` - Add new user
- `CreateEmbed(options)` - Create Discord embed
- `ReturnDB(table, Bot)` - Fetch database table
- `SaveBotUsers(Bot)` - Save user data to database
- `AddServerMessageSQL(entry, Bot)` - Log message to database

### Best Practices

1. **Always defer long operations**:
   ```javascript
   await interaction.deferReply();
   // Long operation
   await interaction.editReply(response);
   ```

2. **Handle errors gracefully**:
   ```javascript
   try {
       // Command logic
   } catch (error) {
       console.error(error);
       await interaction.reply({ content: 'Error!', ephemeral: true });
   }
   ```

3. **Use ephemeral messages for errors**:
   ```javascript
   await interaction.reply({ content: 'Error', ephemeral: true });
   ```

---

## Troubleshooting

### Bot Won't Start

**Symptoms**: Bot crashes on startup or doesn't connect

**Solutions**:
- Verify bot token in `config.js`
- Check Node.js version: `node --version` (should be 16+)
- Ensure MySQL is running
- Check database credentials
- Review console error messages

### Commands Not Appearing

**Symptoms**: Slash commands don't show in Discord

**Solutions**:
- Run `npm run deployC` to register commands
- In development mode, verify `guildId` is correct
- Wait up to 1 hour for global commands (production)
- Check bot has `applications.commands` scope
- Ensure bot is in the server

### Database Errors

**Symptoms**: Errors related to database connections

**Solutions**:
- Verify MySQL is running: `mysql -u username -p`
- Check database exists: `SHOW DATABASES;`
- Verify credentials in `config.js`
- Ensure tables exist (run schema creation)
- Check network connectivity to database

### Chart Generation Fails

**Symptoms**: `/messages` command fails or no chart appears

**Solutions**:
- Ensure `canvas` and `chartjs-node-canvas` are installed
- Check system has required dependencies (on Linux: `libcairo2-dev`, `libpango1.0-dev`, etc.)
- Verify sufficient memory for chart generation
- Check console for specific error messages

### Permission Errors

**Symptoms**: Bot can't send messages or attachments

**Solutions**:
- Verify bot has `Send Messages` permission
- Ensure bot has `Attach Files` permission (for charts)
- Check channel-specific permission overrides
- Verify bot role position in server hierarchy

---

## Related Projects

- **9kDev**: Main development bot for the 9k ecosystem
- **9000INC_bot**: Production bot for 9000 INC community

## Support

For issues or questions:
- Check this documentation
- Review console error messages
- Verify configuration settings
- Ensure all prerequisites are met

## License

ISC

---

**Last Updated**: December 2024  
**Bot Version**: 1.0.0  
**Client ID**: 1451501132328337492

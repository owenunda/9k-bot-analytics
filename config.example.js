export default {
    // Environment: "development" deploys to guildId, "production" deploys globally
    // You can also override with BOT_ENV env var (optional)
    environment: 'development',

    // Discord Bot Token
    token: 'YOUR_BOT_TOKEN_HERE',

    // Discord Client ID (Application ID)
    clientId: 'YOUR_CLIENT_ID_HERE',

    // Development Guild ID (used when environment === "development")
    guildId: 'YOUR_GUILD_ID_HERE',

    // MySQL Database Configuration
    database: {
        host: '127.0.0.1',
        user: 'your_username',
        password: 'your_password',
        database: 'webdata'
    },

    // Webhook Configuration (optional for analytics bot)
    webhooks: {
        team: {
            id: 'YOUR_WEBHOOK_ID',
            token: 'YOUR_WEBHOOK_TOKEN'
        }
    },

    // Bot Configuration
    bot: {
        icon: 'https://9000inc.com/Resources/9000INCLogoV2.png',
        invite: 'YOUR_BOT_INVITE_LINK',
        serverInvite: 'YOUR_SERVER_INVITE_LINK'
    }
}

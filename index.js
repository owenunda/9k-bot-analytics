/* Discord Requires */
import { Client, Events, GatewayIntentBits, EmbedBuilder, WebhookClient, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import config from './config.js';
import { GetUser, AddUser, AddServerMessageSQL, ReturnDB, SaveBotUsers } from './utils/functions.js';
import * as mysql2 from 'mysql2';
import * as canvas from 'canvas';
import * as chartjs from 'chartjs-node-canvas';

/* Main Variables */
const Bot = {};
Bot.Users = false;
Bot.Token = config.token;
Bot.MySql = mysql2;
Bot.Canvas = canvas;
Bot.ChartJS = chartjs;
Bot.Invite = config.bot.invite;
Bot.ServerInvite = config.bot.serverInvite;
Bot.Client = new Client({
        intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
        ],
        partials: ['MESSAGE', 'CHANNEL']
});
Bot.ICON = config.bot.icon;
Bot.Admin = {};
Bot.Admin.SQL = {};
Bot.Admin.SQL.User = config.database.user;
Bot.Admin.SQL.Password = config.database.password;

Bot.WebHooks = {
        Team: config.webhooks.team.id && config.webhooks.team.token 
                ? new WebhookClient({
                        id: config.webhooks.team.id,
                        token: config.webhooks.team.token,
                })
                : null
};

Bot.Embed = {};
Bot.Embed.Color = 5793266;
Bot.Embed.Title = 'Default!';
Bot.Embed.URL = false;
Bot.Embed.Author = {};
Bot.Embed.Author.name = '9k Analytics Bot';
Bot.Embed.Author.iconURL = Bot.ICON;
Bot.Embed.Author.url = 'https://9000inc.com';
Bot.Embed.Thumbnail = false;

Bot.ServerMessages = false;

// Load Commands
Bot.Commands = new Collection();
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
                const command = await import(`./commands/${folder}/${file}`);
                Bot.Commands.set(command.default.name, command.default);
                console.log(`Loaded command: ${command.default.name}`);
        }
}

/* Init */
ReturnDB('BotUsers', Bot).then(function (value) { Bot.Users = value });
ReturnDB('Messages', Bot).then(function (value) { Bot.ServerMessages = value });

Bot.Client.once(Events.ClientReady, readyClient => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
        Bot.Client.user.setPresence({ activity: { name: 'Analytics', type: 'WATCHING' }, status: 'online' })
        setInterval(function () { SaveBotUsers(Bot) }, 5000000)
});

Bot.Client.on('messageCreate', msg => {
        let User = GetUser(msg.author.id, Bot);
        if (User == false) {
                User = {};
                User.userid = msg.author.id;
                User.exp = 0;
                User.messages = 0;
                User.cash = 0;
                User.websiteuser = null;
                Bot.Users.push(User);
                AddUser(User.userid, Bot);
        }
        User = GetUser(msg.author.id, Bot);
        User.messages += 1;
        if (msg.author.bot) { return }

        const Entry = {};
        Entry.serverid = msg.guildId;
        Entry.userid = msg.author.id;
        Entry.messageid = msg.id;
        Entry.channelid = msg.channelId;
        Entry.senton = msg.createdAt;
        Bot.ServerMessages.push(Entry);
        AddServerMessageSQL(Entry, Bot);
})

// Handle slash command interactions
Bot.Client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = Bot.Commands.get(interaction.commandName);

        if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                try {
                        await interaction.reply({
                                content: `Command "/${interaction.commandName}" is not loaded on the bot right now. Try restarting the bot.`,
                                ephemeral: true,
                        });
                } catch {
                        // ignore if interaction already expired
                }
                return;
        }

        try {
                // Get or create user
                let User = GetUser(interaction.user.id, Bot);
                if (User == false) {
                        User = {};
                        User.userid = interaction.user.id;
                        User.exp = 0;
                        User.messages = 0;
                        User.cash = 0;
                        User.websiteuser = null;
                        Bot.Users.push(User);
                        AddUser(User.userid, Bot);
                        User = GetUser(interaction.user.id, Bot);
                }

                // Execute the command
                await command.execute(interaction, User, Bot);
        } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
        }
});

// Log in to Discord with your client's token
Bot.Client.login(Bot.Token);

process.on('unhandledRejection', error => {
        console.error('Unhandled promise rejection:', error);
});

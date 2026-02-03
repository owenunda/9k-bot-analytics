import { CreateEmbed } from '../../utils/functions.js';
import { SlashCommandBuilder } from 'discord.js';

export default {
    name: 'help',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows information about bot commands and how to avoid configuration errors.'),
    async execute(msg, User, Bot) {
        const isInteraction = msg.commandName !== undefined;
        const channel = msg.channel;

        const Embed = structuredClone(Bot.Embed);
        Embed.Title = '9k Analytics Help Guide';
        Embed.Description = `Welcome to the 9k Analytics Bot! Here is a guide on how to use the main commands properly.

## Analytics Guide (\`/messages\`)

This command allows you to view message statistics for the server or specific users.

### 1. Chart Types
We offer two main ways to view data:

*   **Timeline Charts** (Line/Bar)
    *   **Use for:** Seeing activity **over time** (History).
    *   *Example:* "How many messages were sent yesterday vs today?"
    *   *Best with:* Specific Users or Server Total history.

*   **Member Charts** (Member Line/Bar/Pie/Doughnut)
    *   **Use for:** Seeing **Rankings & Leaderboards**.
    *   *Example:* "Who are the top 10 most active members?"
    *   *Best with:* Server-wide comparisons (No specific user selected).

### Common Confusion & Safeguards
*   **"Why does my Member Chart look broken with one bar?"**
    *   If you select a **"Member"** chart type BUT also filter by a **Specific User**, you are trying to make a leaderboard of 1 person.
    *   **Safe-Guard:** To prevent this visual error, the bot will **automatically switch** your chart to a **Timeline (Bar Chart)** if you select a specific user.
    *   *This ensures you always see the user's history instead of a broken ranking.*

### Usage Examples
*   \`/messages display:Member Bar Chart\` → Shows Top 10 Users.
*   \`/messages display:Member Pie Chart\` → Shows % of messages by top users.
*   \`/messages user:@User\` → Shows that user's activity history (Auto-switches to Bar Chart).
`;

        if (isInteraction) {
            await msg.reply({ embeds: [CreateEmbed(Embed)] });
        } else {
            channel.send({ embeds: [CreateEmbed(Embed)] });
        }
    }
}

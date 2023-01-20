const { Client } = require("discord.js");
const client = new Client({ intents: 123 });
const request = require('request');

client.on('ready', () => {
    console.log('Ready');
    client.user.setStatus('dnd');
    client.user.setActivity('Join × .gg/botclapnet');
});

client.on('guildMemberAdd', async member => {
    const rurl = `http://panel.botclapnet.xyz/api/globalbans.php?userID=${member.id}`;

    request(rurl, (error, response, body) => {
        if (body === '0 results') return;

        try {
            const data = JSON.parse(body);
            const reason = data.reason;
            member.ban({ reason });
        } catch (error) {
            console.error(error);
        }
    });
});

client.login('TOKEN');
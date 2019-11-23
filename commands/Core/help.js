const discord = require("discord.js")
const { RichEmbed } = require("discord.js")

exports.run = async (client, msg, args) => {
    msg.channel.send(`Kon'nichiwa, welcome to Horikita RPG Discord Bot, before you start please run \`h?register <username> <password>\` command first, and after that you can login/logout.
There's what can i do for you, **${msg.author.username}**!
\`\`\`docs
Register : Use this before you login/logout, fomrat: \`h?register <password>\`
Login    : Use this command for login, format: \`h?login <password>\`
Logout   : Use this command for logout from your account
Guild    : Go to guild and register/take a mission
Hunt     : Hunt a monster yourself or with your party, format: \`h?Hunt <monster>\`
Party    : Create, join, abandone or leave party, format: \`h?party [option]\`\`\``)
}

exports.conf = {
    aliases: ["h"],
    cooldown: 2,
    ownerOnly: false
}

exports.help = {
    name: "help"
}
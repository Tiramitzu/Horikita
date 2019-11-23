const { owners_id, coowners_id, bot_prefix, embed_color } = require('../config.json');
const { Collection } = require('discord.js');
const cooldowns = new Collection();
const Discord = require('discord.js')

module.exports = async (client, message) => {
  
    let ownerid = message.guild.owner.id
    let ownertag = client.users.get(ownerid).tag
  
    let prefix = bot_prefix
    let color = embed_color;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    // cooldowns command
    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!commandFile) return;
    if (!cooldowns.has(commandFile.help.name)) {
        cooldowns.set(commandFile.help.name, new Collection());
    }
    const member = message.member;
    const now = Date.now();
    const timestamps = cooldowns.get(commandFile.help.name);
    const cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;
    let own = commandFile.conf.ownerOnly
    if(!owners_id.includes(message.author.id) && own === true) return
    //if(!owners_id.includes(message.author.id)) return message.channel.send("⚠ **| Maintenance**")
    if (!timestamps.has(member.id)) {
        timestamps.set(member.id, now);
    } else {
        const expirationTime = timestamps.get(member.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`**${member.user.username}**, please wait **${timeLeft.toFixed(1)}** cooldown time.`).then(msg=>msg.delete(3000));
        }

        timestamps.set(member.id, now);
        setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    }

    // command handler
  try {
  let commands = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  commands.run(client, message, args, color);
  if (!commands) return;
  } catch (e) {
      console.error(e)
  } finally {
    /*let cmdembed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setTitle("Command usage:")
    .setDescription(`\`\`\`asciidoc
User            :  ${message.author.tag}
User ID         :  ${message.author.id}
Command         :  ${message.content.split(" ")[0].replace(prefix, '')}
Guild           :  ${message.guild.name}
Guild ID        :  ${message.guild.id}
Guild Owner     :  ${ownertag}
Guild Owner ID  :  ${message.guild.owner.id}\`\`\``)
    if(message.author.id != "397322976552550400") client.channels.get('567307213845168138').send(cmdembed);*/
  }
}

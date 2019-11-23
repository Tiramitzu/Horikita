const { owners_id, coowners_id } = require("../../config.json");
const { RichEmbed } = require("discord.js");
const { post } = require('node-superfetch');
const path = require("path");
const os = require("os")

exports.run = async (client, message, args, color) => {
  var msg = message;
  var bot = client;
  var Saya = client;
  var saya = client;
  var Sougetsu = client;
  var sougetsu = client;
  
  let arg = message.content.split(/\s+/g);

  const embed = new RichEmbed()
  .setColor(color)

  try {
    const code = args.join(" ");
    if (!code) return;
    let evaled;
    if (code.includes(`token`)) {
      evaled = 'LOSER GBLK!!! >:VVVVV';
    } else {
      evaled = eval(code);
    }
    var tipe2 = {
      "string": "String",
      "number": "Number",
      "boolean": "Boolean",                
      "array": "Array",
      "object": "Object",
      "function": "Function",
      "undefined": "Undefined"
    }
    var tipe1 = typeof evaled
    var tipe = tipe2[tipe1]

    if (typeof evaled !== "string")
    evaled = require('util').inspect(evaled, { depth: 0});

    let output = clean(evaled);
    if (output.length > 1024) {
        const { body } = await post('https://k-haste.glitch.me/documents').send(output);
        embed.addField('Output', `https://k-haste.glitch.me/${body.key}.js`);
    } else {
        embed.addField('Output', '```js\n' + output + '```');
        embed.addField('Type', '```js\n'+ tipe +'```')
    }
    message.channel.send(embed);
  } catch (e) {
    let error = clean(e);
    if (error.length > 1024) {
        const { body } = await post('https://k-haste.glitch.me/documents').send(error);
        embed.addField('Error', `https://k-haste.glitch.me/${body.key}.js`);
    } else {
        embed.addField('Error', '```js\n' + error + '```');
    }
    message.channel.send(embed);
  }
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

exports.conf = {
  aliases: ["ev", "e"],
  cooldowns: '0',
  ownerOnly: true
}

exports.help = {
  name: "eval",
  description: "evaluated",
  usage: "eval {some super javascript code}"
}

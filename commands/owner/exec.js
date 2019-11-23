const { RichEmbed } = require('discord.js');
const { exec } = require('child_process');

exports.run = async(client, msg, args) => {
	try{
		if(!args.length) return msg.channel.send(this.help.usage, { code: 'ini' });
		exec(args.join(' '), (error, output) => {
			if(!error) return msg.channel.send(output, { code: 'diff' });
			return msg.channel.send(error, { code: 'ini' });
		});
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

exports.conf = {
	aliases: ['exec', '💲'],
	cooldown: 10,
  ownerOnly: true
}

exports.help = {
	name: '$',
	description: 'execute bash code',
	usage: '$ <command>'
}

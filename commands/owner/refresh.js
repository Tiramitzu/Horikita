const { RichEmbed } = require('discord.js');
const { exec } = require('child_process');

exports.run = async(client, msg, args) => {
  msg.channel.send('Refreshing...')
	exec('refresh')
}

exports.conf = {
	aliases: [],
	cooldown: 0,
  ownerOnly: true
}

exports.help = {
	name: 'refresh',
	description: 'Refresh',
	usage: 'refresh'
}

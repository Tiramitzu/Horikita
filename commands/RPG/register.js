exports.run = async(client, msg, args) => {

    if(acc.includes(msg.author.id)) return msg.channel.send(`**${msg.author.username}**, you're already registered!`)

}

exports.conf = {
    aliases: ["reg", "regis"],
    cooldown: "5",
    ownerOnly: true
}

exports.help = {
    name: "register"
}
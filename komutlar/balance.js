const Discord = require('discord.js')

exports.run = (client, message) => {
    const embed = new Discord.RichEmbed()
    .setImage(`http://18.184.116.22/api/cerceve?cerceve=balance9&url=${message.author.avatarURL}`)
    .setColor(0x36393F)
    return message.channel.send(embed)
 };
 
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
 
  exports.help = {
    name: 'balance',
    description: 'balance',
    usage: 'balance'
  };
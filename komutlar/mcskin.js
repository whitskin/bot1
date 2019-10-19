const Discord = require('discord.js')

exports.run = (client, message, args) => {
    let kadi = args.slice(0).join(' ');
    const embedmcskın = new Discord.RichEmbed()
    .setTitle(`**${kadi}** adlı Oyuncunun Skini`)
    .setImage(`https://minotar.net/armor/body/${kadi}/300.png`)
    .setColor("#36393F")
    message.channel.sendMessage(embedmcskın)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };

  exports.help = {
    name: 'mcskin',
    description: 'mcskin',
    usage: 'mskin'
  };

const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message) => {
  const davet = new Discord.RichEmbed()
.setColor(0x36393F)
.setAuthor('Davet Linkleri')
.setDescription(`[Davet Linkim](https://discordapp.com/oauth2/authorize?client_id=492030843293007882&scope=bot&permissions=8)\n[Destek Sunucum](https://discord.gg/YtCw2jM)`)
message.channel.send(davet)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['linkler'],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  category: 'bot',
  description: 'Botun davet linklerini gösterir.',
  usage: '.davet'
};
const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let guild = message.guild
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('**Bunun İçin Gerekli İznin Yok**');
    let duyurular = guild.channels.find('name', 'duyuru');
    if (!duyurular) return message.reply('**`duyuru` Kanalını Bulamıyorum.**');
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('**Duyuru Yapmamı İstiyosan Önce Birşey Yazmalısın.**');
    message.delete();
    const embed = new Discord.RichEmbed()
    .setColor("0x36393F")
    .setDescription(`:anchor: **Tüm Herkese Duyurulur @everyone  **\n${mesaj}`)
    return guild.channels.get(duyurular.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['duyuru', 'duyuruyap'],
  permLevel: 2
};

exports.help = {
  name: 'duyuruyap',
  description: 'Sunucuda Duyuru yapmanızı sağlar.',
  usage: 'duyuruyap [yazı]'
};
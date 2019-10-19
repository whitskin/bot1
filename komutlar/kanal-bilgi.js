const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
   .setColor(0x36393F)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField(':warning: Uyarı :warning:', '`kanal-bilgi` adlı komutu özel mesajlarda kullanamazsın.')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setColor(0x36393F)
    .setFooter('Valley - Kanal Bilgi')
    .setTimestamp()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setThumbnail(message.guild.iconURL)
    .addField('**Kanal Adı**', message.channel.name, true)
    .addField('**Konusu**', message.channel.topic ? message.channel.topic : 'Konu Yok', true)
    .addField('**NSFW Kanalımı**', message.channel.nsfw ? 'Evet' : 'Hayır', true)
    .addField('**Kanalın ID**', message.channel.id, true)
    .addField('**Pozisyon**', message.channel.position, true)
    .addField('**Kanalın Tipi**', message.channel.type, true)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kanal-bilgi'],
  permLevel: 0
};

exports.help = {
  name: 'kabilgi',
  description: 'kabilgi',
  usage: 'kabilgi'
};

const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
    if (message.channel.type !== "group") {
        var Durum = message.author.presence.status;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi") : (Durum == "offline" ? ("Çevrimdışı") : (Durum == "idle" ? ("Boşta") : (Durum == "dnd" ? ("Rahatsız Etmeyin") : ("Bilinmiyor/bulunamadı.")))))
      const kullanicibilgimk = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor(0x36393F)
      .setFooter('Valley - Kullanıcı Bilgi')
      .setTimestamp()
      .addField('Kullanıcı Adı:', message.author.username + '#' + message.author.discriminator)
      .setThumbnail(message.author.avatarURL)
      .addField('Kullanıcı ID:', message.author.id)
      .addField("Avatar", `[Tıkla !](${message.author.avatarURL})`)
      .addField('Kaydolma Tarihi:', message.author.createdAt)
      .addField('Durumu:', durm)
      .addField('Şu an oynadığı oyun', message.author.presence.game ? message.author.presence.game.name : 'Şu an oyun oynamıyor')
      return message.channel.sendEmbed(kullanicibilgimk);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanıcı-bilgi'],
  permLevel: 0
};

exports.help = {
  name: 'kbilgi',
  description: 'Sana Kendi Kullanıcı Bilgilerini Verir.',
  usage: 'kbilgi'
};

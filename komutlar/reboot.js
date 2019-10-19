const Discord = require('discord.js');
const moment = require('moment');

exports.run = (client, message, args) => {
message.channel.sendMessage('**Botu Yeniden Başlatmak İstiyorsan 30 Saniye İçinde `evet` Yaz.**')
.then(() => {
  message.channel.awaitMessages(response => response.content === "evet", {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
  .then((collected) => {
      message.channel.sendMessage(`**Bot yeniden başlatılıyor...**`).then(message => {
      console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Bot yeniden başlatılıyor...`)
      process.exit(1);
    }).catch(console.error)
    })
    .catch(() => {
      message.channel.sendMessage('**Yeniden Başlamak İsteği İptal Edildi.**');
    });
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'reboot',
  description: '[Admin Komutu]',
  usage: 'reboot'
};

const Discord = require('discord.js');
exports.run = function(client, message, args) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok!");
if(!args[0]) return message.channel.send("🚫 **__Lütfen Silinicek Mesaj Miktarını Yazın !__** 🚫");
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`✅ \`${args[0]}\` **__Adet Mesajı Sildim !__** ✅`).then(msg => msg.delete(5000));
})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 2
};

exports.help = {
  name: 'sil',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'sil <silinicek mesaj sayısı>'
};
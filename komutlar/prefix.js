const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let arg = args.slice(0).join(' ');
  if(arg < 1) return message.channel.send("**Lütfen Ayarlamak İstediğin Prefix'i Yazın !**\n**`[sunucu-prefixi]prefix sıfırla` Yazarsanız Botun Orjinal Prefix'i Olarak Ayarlanır.**")

  if (arg === ".") return message.reply("**Botun Orjinal Prefixini Olan `.`'yı Prefix Olarak Tekrardan Kullanamazsınız !**\n**Eğer Prefix'ini Botun Orjinal Prefix'i Olmasını İstiyorsan `[sunucu-prefixi]prefix sıfırla` Yaz!**")
  
  if (arg === "sıfırla") {
    
    db.delete(`prefix_${message.guild.id}`)
    
    var embed2 = new Discord.RichEmbed()
    .setColor(0x36393F)
    .setTitle("**Prefix Başarıyla Sıfırlandı !**")
    .setDescription("**Prefix sıfırlanıp `.` Olarak Ayarlandı !**")
    message.channel.send(embed2)
    return;
  }
  
  var i = db.set(`prefix_${message.guild.id}`, arg)
    
    var embed = new Discord.RichEmbed()
   .setColor(0x36393F)
    .setTitle("**Prefix Başarıyla Değiştirildi !**")
    .addField("**Ayarlanan Prefix :**", `\`${i}\``)
    message.channel.send(embed)
    
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["önek", "prefix", "ön-ek-belirle", "ön-ek-ayarla", "önek-ayarla", "önek-belirle", "prefix-ayarla", "prefix-belirle"],
  permLevel: 3
};

exports.help = {
  name: 'ön-ek',
  category: 'ayarlar',
  description: 'Botun ön ekini sunucuya özel olarak değiştirir.',
  usage: 'ön-ek <ön ek>'
};
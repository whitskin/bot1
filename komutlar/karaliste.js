const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  let user = client.users.get(args.slice(0).join(' '));
  if (!user) {
    let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription("**Kara Listeye Almak İstediğin Kullanıcının ID'ini Yaz !**")
    message.channel.send({embed: e})
    return;
  };
  
  if (db.has(`karalist_${user.id}`) === true) return message.reply("**Bu Kullanıcı Zaten Kara Listede !**");
  
  db.set(`karalist_${user.id}`, "aktif")
  
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`${user.tag} **Artık Kara Listede !**`)
    message.channel.send({embed: embed})
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["blacklist", "kara-liste"],
  permLevel: 4,
};

exports.help = {
  name: "karaliste",
  description: "Belirtilen kullancıyı kara listeye alır!",
  usage: "karaliste <kullanıcı ID>"
};
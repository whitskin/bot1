const Discord = require('discord.js');

exports.run = async (client, message) => {
 
  var str = ''
for(var i = 0; i < message.guild.members.size; i++) {
   if(message.guild.members.array()[i].hasPermission("MANAGE_MESSAGES") && message.guild.members.array()[i].presence.status === "dnd" && !message.guild.members.array()[i].user.bot) {
      str += `${client.emojis.get('466955726674460673')} ${message.guild.members.array()[i].user.tag}\n`
    }
    else if(message.guild.members.array()[i].hasPermission("MANAGE_MESSAGES") && message.guild.members.array()[i].presence.status === "online" && !message.guild.members.array()[i].user.bot){
      str += `${client.emojis.get('466955711910248458')} ${message.guild.members.array()[i].user.tag}\n`
    }
    else if(message.guild.members.array()[i].hasPermission("MANAGE_MESSAGES") && message.guild.members.array()[i].presence.status === "idle" && !message.guild.members.array()[i].user.bot){
      str += `${client.emojis.get('466955712887783424')} ${message.guild.members.array()[i].user.tag}\n`
    }
      else if (message.guild.members.array()[i].hasPermission("MANAGE_MESSAGES") && message.guild.members.array()[i].presence.status === "offline" && !message.guild.members.array()[i].user.bot){
      str += `${client.emojis.get('466955726145847326')} ${message.guild.members.array()[i].user.tag}\n`
    }
}

  var embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${message.guild.name} - Sunucu Yetkilileri`)
  .setDescription(str.replace(message.guild.owner.user.tag, `${client.emojis.get("475339996744777750")} **${message.guild.owner.user.tag}**`))
  .setThumbnail(message.guild.iconURL)
  .setFooter("NOT: Bu komut sunucudaki \"Mesajları Yönet\" iznine sahip kullanıcıları listeler.")
message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkili-listesi', 'sunucu-yetkilileri', 'moderatorler', 'modlar', 'moderatörler', 'staffs'],
  permLevel: 0
};

exports.help = {
  name: 'yetkililer',
  description: 'Bulunduğunuz sunucudaki yetkilileri çevrimiçi, çevrımdışı/görünmez, rahatsız etmeyin ve boşta modlarında olup olmadıklarını göstererek listeler. \n(Mesajları Yönet yetkisine sahip kullanıcıları yetkili olarak sayar.)',
  usage: 'yetkililer'
};
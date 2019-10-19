const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if(!args[0]) {
        const klima_bilgi = new Discord.RichEmbed()
        	.setColor(0x36393F)
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(".klima aç - .klima kapat - .fatura")
        message.channel.send(klima_bilgi)
    }
    if (args[0] === "aç") {
      	const klima_aç = new Discord.RichEmbed()
        	.setColor(0x36393F)
        .setDescription(`Klima Açıldı`)
        .setImage("https://cdn.discordapp.com/attachments/490953336812601359/495979167909806080/518154c2-58c9-4e45-ae55-94b4ac54b731.png")
        message.channel.send(klima_aç)
    }
    if (args[0] === "kapat") {
        const klima_kapat = new Discord.RichEmbed()
        	.setColor(0x36393F)
        .setDescription(`Klima Kapatıldı.\nNOT : Fazla Klimayı Açık Tutma, Sunucu Ödüyor.`)
        message.channel.send(klima_kapat)
    }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [''],
  permLevel: 0
};

exports.help = {
  name: 'klima',
  description: 'Klima aç/kapat komutu.',
  usage: 'klima aç/kapat'
};
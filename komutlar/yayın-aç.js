const Discord = require('discord.js');

exports.run = (client, message, args) => {
	let twitchtitle = args.slice(0).join(' ');
	if (twitchtitle.length < 1) return message.reply('Yayın için herhangi bir başlık yazmalısın.');
  message.delete();
  client.user.setStatus("");
  client.user.setGame(`${twitchtitle}`, 'https://twitch.tv/valley');
  message.channel.send({embed: {
    color: 0x36393F,
    description: `✅  Twitch başlığı 》 **${twitchtitle}** Olarak değiştirildi.`
  }});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yayın-aç'],
  permLevel: 4
};

exports.help = {
  name: 'yayin-yap',
  description: 'Botun yayin basligini gösterir.',
  usage: 'yayin-yap <twitch basligi>'
};


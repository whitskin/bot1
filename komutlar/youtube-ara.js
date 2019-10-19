var search = require('youtube-search');
const Discord = require('discord.js')
 
var opts = {
  maxResults: 10,
  key: 'AIzaSyCO5YZJdRx0V9wk5Hn1JxGn3jG-C2SWD84'
};

exports.run = (client, message, args) => {
      let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Videonun Adını Yaz');
search(mesaj, opts, function(err, results) {
  if(err) return console.log(err);
  

const embed = new Discord.RichEmbed()
.setAuthor('Video Bulundu')
.setTitle(results[0].title)
.setColor(0x36393F)
.addField('Videonun Linki', results[0].link)
.addField(`Videonun ID'sı`, results[0].id)
.addField('Videonun Yüklenme Tarihi', results[0].publishedAt)
.addField('Kanalın Adı', results[0].channelTitle)
.addField(`Kanalın ID'sı`, results[0].channelId)
.addField('Kanalın Linki', `https://www.youtube.com/channel/${results[0].channelId}`)
.addField('Videonun Açiklaması', results[0].description)
.setThumbnail(`https://img.youtube.com/vi/${results[0].id}/maxresdefault.jpg`)
.setFooter('Bu Bilgiler youtube.com Adli Siteden Alındı')

message.channel.send(embed)
});
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ytara',
  description: 'ilet',
  usage: 'ilet'
};
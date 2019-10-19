const Discord = require('discord.js')
const keys = require('../api.json')
const Client = require('fortnite')
const fortnite = new Client(keys.fortnite)

exports.run = (client, message, args) => {
	message.delete()
	let username = args[0]
	let platform = args[1] || 'pc';

	if(!username) return message.reply('Lütfen Kullanıcı Adı Yaz')
	
	let data = fortnite.user(username, platform).then(data => {
		let stats = data.stats;
		let lifetime = stats.lifetime

		let score = lifetime[6]['Score']
		let mp = lifetime[7]['Matches Played']
		let win = lifetime[8]['Wins']
		let winper = lifetime[9]['Win%']
		let kills = lifetime[10]['Kills']
		let kd = lifetime[11]['K/d']

		const embed = new Discord.RichEmbed()
.setColor(0x36393F)
.setTitle(`Fortnite İstatistikleri | ${username}`)
.addField('Profili Görmek İçin Tikla', `https://fortnitetracker.com/profile/pc/${username}`)
.addField("Winleri", win, true)
.addField("Killeri", kills)
.addField("Scoru", score)
.addField("Winper", winper)
.addField("Oynanan Maçlar", mp)
.addField("K/d", kd)
.setFooter('Bu Bilgiler https://fortnitetracker.com Adlı Siteden Alınmıstır')

		message.channel.send(embed)
		
	}).catch(e => {
		console.log(e)
		message.reply(`**${username}** Adlı Oyuncu Databasede Bulunamadı. Lütfen Adınızı Doğru Yazın. Yada ps4 ve xb1 De Oynuyorsanız Ordaki Kullanıcıları Aratabiyorum`)
	})
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
  };
  
  exports.help = {
	name: 'fortnite',
	description: 'fortnite',
	usage: 'fortnite'
  };
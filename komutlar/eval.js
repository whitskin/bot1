const Discord = require('discord.js')
const util = require('util');
const tokenuyari = `Bu Bilgi Gizlidir Karşim.`

exports.run = async (client, message, args) => {
   let prefix = "." //Kendi prefiziniz
	if(!args[0]) {
		const embed = new Discord.RichEmbed()
			.setDescription(`\`${prefix}yardım eval\` yazarak doğru kullanıma bakabilirsin!`)
			.setColor(0x36393F)
			.setTimestamp()
		message.channel.send({embed})
		return
	}
	const code = args.join(' ');
	if(code.match(/(client.token)/g)) {
		const newEmbed = new Discord.RichEmbed()
			.addField('Hata çıktı;', `\`\`\`xl\n${tokenuyari}\`\`\``)
			.setColor(0x36393F)
		message.channel.send(newEmbed);
		return
	}

	function clean(text) {
		if (typeof text !== 'string')
			text = require('util').inspect(text, { depth: 0 })
		text = text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203))
		return text;
	};

	const evalEmbed = new Discord.RichEmbed() 
 .setColor(0x36393F)
	try {
		var evaled = clean(await eval(code));
		if(evaled.startsWith('NDc')) evaled = tokenuyari;
		if (evaled.constructor.name === 'Promise') evalEmbed.setDescription(`\`\`\`\n${evaled}\n\`\`\``)
		else evalEmbed.setDescription(`\`\`\`xl\n${evaled}\n\`\`\``)
		const newEmbed = new Discord.RichEmbed()
			.addField('📥 Giriş', `\`\`\`javascript\n${code}\n\`\`\``)
			.addField('📤 Çıkış', `\`\`\`xl\n${evaled}\`\`\``)
			.setColor("RANDOM")
		message.channel.send(newEmbed);
	}
	catch (err) {
		evalEmbed.addField('Hata;', `\`\`\`xl\n${err}\n\`\`\``);
		evalEmbed.setColor('#FF0000');
		message.channel.send(evalEmbed);
	}
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 4
}

exports.help = {
	name: 'eval',
	description: 'Yazılan kodu çalıştırır.',
	usage: 'eval [kod]'
}
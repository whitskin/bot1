const Discord = require('discord.js');
exports.run = function (client, message, args) {
    var request = require('request');

    request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
        if (error) return message.channel.send('Bir hata oluştu, daha sonra tekrar deneyin.');
        else if (!error) {
            var info = JSON.parse(body);
            if (info) {
                const embed = new Discord.RichEmbed()
				    .setTitle(':euro: EURO')
                    .addField('Eur Aliş', info.selling)
					.addField('Eur Satiş', info.buying)
                      .setColor("#36393F")
                    .setThumbnail('https://cdn.discordapp.com/attachments/485516457166503957/490280063107858443/euro.png')
                message.channel.send({ embed });
            }
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'euro',
    description: 'euro',
    usage: 'euro'
};
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    var fiyat = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];
    var fatura = fiyat[Math.floor((Math.random() *  fiyat.length))];
    message.channel.send(`**Fatura ${fatura}TL**`);
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [''],
  permLevel: 0
};

exports.help = {
  name: 'fatura',
  description: 'Rastgele fatura atar.',
  usage: 'fatura'
};
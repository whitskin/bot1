const encode = require('strict-uri-encode');

exports.run = (client, message, args, tools) => {

  let question = encode(args.join(' '))

  let link = `https://www.lmgtfy.com/?q=${question}`;

  message.channel.send(`**<${link}>**`);

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['lmgtfy'],
  permLevel: "0"
};

exports.help = {
  name: "lmgtfy",
  description: "lmgtfy",
  usage: "lmgtfy"
};
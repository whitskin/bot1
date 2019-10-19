exports.run = (Bastion, message, args) => {
  if (!/^\d{4}$/.test(args[0])) {
    /**
     * The command was ran with invalid parameters.
     * @fires commandUsage
     */
    return message.reply("**Doğru Kullanım Değil**: .discrim [**rakam**] ");
  }

  let members = message.guild.members.filter(m => m.user.discriminator === args[0]).map(m => m.user);
  let total = members.length;
  members = members.length > 0 ? members.slice(0, 10).join(', ') : 'None';

  message.channel.send({
    embed: {
      color: 0x36393F,
      title: 'Discrim',
      description: `Bu Sunucuda **${args[0]}** TAG'ına sahip toplam **${total}** kişi bulundu!`,
      fields: [
        {
          name: 'Üyeler',
          value: total > 10 ? `${members} kişi ve ${total - 10} tane daha.` : members
        }
      ]
    }
  }).catch(e => {
    console.log.error(e);
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'discrim',
  description: 'Belirtilen Tag a sahip kişileri belirtir.',
  usage: 'discrim <tag>'
};

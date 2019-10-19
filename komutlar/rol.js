
const Discord = require('discord.js');
module.exports.run = async (client, msg, args) => {

    let kayıt = msg.guild.member(msg.mentions.users.first()) || msg.guild.member(args[0]);
    if (!kayıt) return msg.channel.send({
        embed: {
            color: Math.floor(Math.random() * (0x36393F + 1)),
            description: ("**Kendini Etiketlemessen Nasıl Rol Vereceğim**")
        }
    })

    let role = msg.guild.roles.find(r => r.name === "JavaScript");
    if (!role) {
        try {
            role = await msg.guild.Role({
            });

            msg.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }

    }

    if (kayıt.roles.has(role.id)) return msg.channel.send({
        embed: {
            color: Math.floor(Math.random() * (0x36393F + 1)),
            description: ("**Zaten Rolünü Almışsın**")
        }
    });

    await kayıt.addRole(role);
    msg.channel.send({
        embed: {
            color: Math.floor(Math.random() * (0x36393F + 1)),
            description: ("**Başarılırı Şekilde Rolü Aldınız**")
        }
    })
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'js',
    description: 'Sunucuya kayıt olursunuz!',
    usage: 'js'
};
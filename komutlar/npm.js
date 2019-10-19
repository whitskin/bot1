const Discord = require('discord.js')
const snek = require('snekfetch');
const moment = require('moment');
require('moment-duration-format');
module.exports.run = async (client, message, args) => {

if (args.length === 0) return message.reply('**Modül İsmi Girdiğine Eminmisin ?**');
const query = args.join(' ');
try {
const { body } = await snek.get(`https://registry.npmjs.com/${query.toLowerCase()}`);
// Get the latest version by the dist-tags.
const version = body.versions[body['dist-tags'].latest];
// Get and check for any dependencies.
let deps = version.dependencies ? Object.keys(version.dependencies) : null;
// Grab the list of maintainers.
let maintainers = body.maintainers.map(user => user.name);
let github = version.repository.url
let gitshort = github.slice(23, -4)


// If there's more than 10 maintainers, we want to truncate them down.
if (maintainers.length > 10) {
const len = maintainers.length - 10;
maintainers = maintainers.slice(0, 10);
maintainers.push(`...${len} more.`);
}

// Same with the dependencies.
if (deps && deps.length > 10) {
const len = deps.length - 10;
deps = deps.slice(0, 10);
deps.push(`...${len} more.`);
}

function customTemplate() {
return this.duration.asSeconds() >= 86400 ? "w [Hafta], d [Gün]" : "h [Saat], m [Dakika], s [Saniye]";
}

let updated = moment.duration(Date.now() - new Date(body.time[body['dist-tags'].latest]).getTime()).format(customTemplate, {
trim: false
});

let npmpng = 'https://cdn.discordapp.com/attachments/485516457166503957/490282934918578207/npm2.png'

// Now we just need to present the data to the end user.
const embed = new Discord.RichEmbed()
.setColor(0x36393F)
.setAuthor(`${body.name}`, npmpng)
.setThumbnail('https://cdn.discordapp.com/attachments/485516457166503957/490282868560625665/npm.png')
.addField(`Adı`, body.name)
.addField(`Açiklama`, `${version.description || 'Açiklaması Yok'}\n\u200B`)

.addField('Ne Zaman Güncellendi ?', `${updated}`, true)
.addField('Versionu', `${body['dist-tags'].latest}`, true)
.addField('Lisans', `${body.license}\n\u200B`, true)
.addField('Yapımcılar', maintainers.join(', '), true)

.addField('\`npm Mödülünün Linki\`', `[\`https://www.npmjs.com/package/${query.toLowerCase()}\`](https://www.npmjs.com/package/${query.toLowerCase()})`)
.addField('\`Github Linki\`', `[\`https://www.github.com/${gitshort}\`](https://www.github.com/${gitshort})`)

message.channel.send({embed});
} catch (error) {
if(error.status == 404) return message.reply('**Mödül Bulunamadı**');
console.log(error);
}  

}

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: []
  };

module.exports.help = {
name: "npm"
}
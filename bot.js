

const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
const Jimp = require('jimp');
const db = require("quick.db");
const moment = require('moment');
require('./util/eventLoader')(client);


var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('**__Aleyküm Selam ! Hoşgeldin ! Nasılsın ? İnşallah İyisindir !__**');
  }
});

client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`**Tebrikler ${message.guild.name} ! Başarıyla ${sayac[message.guild.id].sayi} Kullanıcıya Ulaştık ! Sayaç Sıfırlandı !**`)
                 .setColor(0x36393F)
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})

client.on("guildMemberAdd", async member => {
    let sayac = await db.fetch(`sayac_${member.guild.id}`);
    let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = member.guild.channels.find('name', skanal9)
    skanal31.send(`:inbox_tray:**| [__${member.user.tag}__] Katıldı - \`${sayac}\` Olmamıza Son \`${sayac - member.guild.members.size}\` Üye Kaldı ! |**:inbox_tray:`)
});

client.on("guildMemberRemove", async member => {
    let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = member.guild.channels.find('name', skanal9)
    skanal31.send(`:outbox_tray:**| [__${member.user.tag}__] Ayrıldı - \`${sayac}\` Olmamıza Son \`${sayac - member.guild.members.size}\` Üye Kaldı ! |**:outbox_tray:`)
});
client.on("guildMemberAdd", member => {

  if (db.has(`otoR_${member.guild.id}`) === false) return;
  var rol = member.guild.roles.get(db.fetch(`otoR_${member.guild.id}`));
  if (!rol) return;
  
  member.addRole(rol)
  
})
client.on('message', msg => {
  const reason = msg.content.split(" ").slice(1).join(" ");
  if (msg.channel.name== 'destek') { 
    const hatay = new Discord.RichEmbed()
    .addField("☡ Hata ☡", `Bu Sunucuda \`Destek\` Adında Bir Rol Yok!`)
    .setColor(0x36393F)
    
    if (!msg.guild.roles.exists("name", "Destek")) return msg.author.send(hatay) + msg.guild.owner.send(`${msg.guild.name} Adlı Sunucunda, \`Destek\` Adlı Bir Rol Olmadığı İçin, Hiçkimse Destek Talebi Açamıyor!`);
    if(msg.guild.channels.find('name', 'Talepler')) {
      msg.guild.createChannel(`destek-${msg.author.id}`, "text").then(c => {
      const category = msg.guild.channels.find('name', 'Talepler')
      c.setParent(category.id)
      let role = msg.guild.roles.find("name", "Destek");
      let role2 = msg.guild.roles.find("name", "@everyone");
      c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });

      const embed = new Discord.RichEmbed()
     .setColor(0x36393F)
      .setAuthor(`${client.user.username} | Destek Sistemi`)
      .addField(`Merhaba ${msg.author.username}!`, `Destek Yetkilileri burada seninle ilgilenecektir. \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilirsin.`)
      .addField(`» Talep Konusu/Sebebi:`, `${msg.content}`, true)
      .addField(`» Kullanıcı:`, `<@${msg.author.id}>`, true)
      .setFooter(`${client.user.username} | Destek Sistemi`)
      .setTimestamp()
      c.send({ embed: embed });
      c.send(`<@${msg.author.id}> Adlı kullanıcı "\`${msg.content}\`" sebebi ile destek talebi açtı! Lütfen Destek Ekibini bekle, @here`)
      msg.delete()
      }).catch(console.error);
    }
  }

  if (msg.channel.name== 'destek') { 
    const hatay1 = new Discord.RichEmbed()
    .addField(":x: Hata :x:", `Bu Sunucuda \`Destek\` Adında Bir Rol Yok!`)
  .setColor(0x36393F)
    
    if (!msg.guild.roles.exists("name", "Destek")) return msg.author.send(hatay1) + msg.guild.owner.send(hatay1);
    if(!msg.guild.channels.find('name', 'Destek')) {
      msg.guild.createChannel(`Destek`, 'category').then(category => {
      category.setPosition(1)
        let every = msg.guild.roles.find("name", "@everyone");
      category.overwritePermissions(every, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false,
        READ_MESSAGE_HISTORY: false
      })
      msg.guild.createChannel(`destek-${msg.author.id}`, "text").then(c => {
      c.setParent(category.id)
      let role = msg.guild.roles.find("name", "Destek");
      let role2 = msg.guild.roles.find("name", "@everyone");
      c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });

      const embed = new Discord.RichEmbed()
      .setColor(0x36393F)
      .setAuthor(`${client.user.username} | Destek Sistemi`)
      .addField(`Merhaba ${msg.author.username}!`, `Destek Yetkilileri burada seninle ilgilenecektir. \nDestek talebini kapatmak için \`${prefix}kapat\` yazabilirsin.`)
      .addField(`» Talep Konusu/Sebebi:`, `${msg.content}`, true)
      .addField(`» Kullanıcı:`, `<@${msg.author.id}>`, true)
      .setFooter(`${client.user.username} | Destek Sistemi`)
      .setTimestamp();
      c.send({ embed: embed });
      c.send(`<@${msg.author.id}> Adlı kullanıcı "\`${msg.content}\`" sebebi ile destek talebi açtı! Lütfen Destek Ekibini bekle, @here`)
      msg.delete()
      }).catch(console.error);
    })
  }
}
});
  
client.on("message", message => {
if (message.content.toLowerCase().startsWith(prefix + `kapat`)) {
    if (!message.channel.name.startsWith(`destek`)) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılablir!`);

    var deneme = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Destek Talebi Kapatma İşlemi`)
    .setDescription(`Destek talebini kapatmayı onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
    .setFooter(`${client.user.username} | Destek Sistemi`)
    message.channel.send(deneme)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Destek Talebi kapatma isteğin zaman aşımına uğradı!').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}
});

client.on("messageDelete", async msg  => {
    if (msg.attachments.size > 0) {
        msg.guild.channels.find(c => c.name == "valley-log").send(`**#${msg.channel.name} Kanalında \`${msg.author.tag}\` (\`${msg.author.id}\`) Tarafından Gönderilen Bir Dosya Silinidi :**`, {
            file: msg.attachments.first().url
        })
    }
})
client.on("ready", async () => {
const hookembed = new Discord.RichEmbed()
.setTitle('Bot Başlatıldı')
.setDescription(`Suan Sunucu Sayısı: **${client.guilds.size}**\n \nSuan Kanal Sayısı: **${client.channels.size.toLocaleString()}**\n \nSuanki Kullanıcı Sayısı: **${client.users.size}**`)
 .setColor(0x36393F)
.setTimestamp()
  let channel = client.channels.get("493472446507122689")
  client.user.setActivity(".yardım | .linkler | " + client.guilds.size + " Sunucu", {type: "WATCHING"});
  client.user.setStatus("online");
  channel.send(hookembed)
});

client.on("guildMemberAdd", member => {

  if (db.has(`otoR_${member.guild.id}`) === false) return;
  var rol = member.guild.roles.get(db.fetch(`otoR_${member.guild.id}`));
  if (!rol) return;
  
  member.addRole(rol)
  
})
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'kasaaç') {
    var sans = ["Hiçbirşey :cry:", "Stattrak AWP | Asiimov", "Karambit | Doopler :dagger:", "Hatıra USP-S | Leş Onaylandı", "Kancalı Bıçak | Fade :dagger:", "Desert Eagle | Kızıl Ağ", "Hatıra Dragon Lore", "Stattrak M4A1 | Uluma", "SGG 07 | Sudaki Kan", "Hatıra Glock 18 | Fade", "AWP | Medusa", "Desert Eagle | Alev", "Stattrak AK-47 | Vulkan",  "M4A1-S | Hiper Canavar",  "Hatıra M4A1-S | Altın Bobin", "Statrak AWP | Elektrikli Kovan", "P90 | Ecel Kedisi", "AWP | Yıldırım Çarpması", "Karambit | Mazi :dagger:", "Hatıra Faction Bicaği :dagger:"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    msg.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Sana **${sonuc}** Çıktı.`).setTitle('Başarıyla Kasa Açıldı').setColor(0x36393F));
  }
});
client.on("message", message => {

if (message.content === prefix + "ping") {
   message.channel.send('**__Geçikme Süresi Hesaplandı :__**').then(message => message.delete(3000));

    const pingozel = new Discord.RichEmbed()
    .setColor(0x36393F)
    .setAuthor(`Gecikme Süreleri`, client.user.avatarURL)
    .setDescription(`⏳ **| Normal Gecikme** : __[${client.ping}]__  \n📨 **| Mesaj Gecikmesi** : __[${new Date().getTime() - message.createdTimestamp}]__`)
    return message.channel.sendEmbed(pingozel);
}
});
const emojiArray = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", 
"🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"]

const alphabet = ("abcdefghijklmnopqrstuvwxyz").toUpperCase().split("")

client.on('message', message => {
    //botun kendi mesajlarını görmesini engeller.
    if (message.author.bot) return;
    
    
    if(message.content.indexOf('-') === 0 ) { 

        
        if (message.member.hasPermission("MANAGE_CHANNELS") === true ){
            
            

      
        //komutları vesaire ayırır
        var args = message.content.slice(1).trim().split(/ +/g)
        const com = args.shift().toLowerCase()

      
        var argText = args.join(" ").split(",")

        //başlığı ilk argüman olarak ayarlıyoruz
        var title = argText[0]
        
        //komutları kontrol eder
        switch (com) {
            case "oylama":

                 if (argText[0] == "yardım") {
                    message.channel.send("``` Kullanımm Şekli; -oylama BAŞLIK,time,dakika,seçenek,seçenek,seçenek  şeklinde oluşturabilirsiniz, eğer ki süre yazmaz iseniz otomatik sistemin belirlediği süre geçerli olur.```");
                }

                //2 kez tekrar etmemek için gereken işlev
                function sendMSG(time) {
                    //kaç seçeneğin fazla olduğunu sayar.
                    var outCount = []
                    //oyları ve seçenekleri birleştirir.
                    var combined = []

                    //oy süresinden için dakika cinsinden süre
                    realTime = time * 1000 * 60

                    //aşağı kısımdan toplananları mesaj ile gönderir.
              
         var embed = new Discord.RichEmbed()
			.setTitle(title)
			.setDescription("\n" + out.join("") + "Time left: " + realTime/(1000*60) + " minutes")
			.setTimestamp()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor(0x00AE86) // Yeşil Yedek: 0x00AE86
			if (time) {
            embed.setFooter(`Oylama başlatıldı ve ${time} dakika(s) kadar sürecek`);
        }
                            message.channel.send({ embed })      
                    //yeni mesajları yanıtlar ve otomatik siler
                    .then((newMessage) => {
                        for (let k = 0; k < out.length; k++) {
                            setTimeout(() => {
                                newMessage.react(emojiArray[k])
                                outCount[k] = 1;
                            }, 1000 * k);
                        }
                        //oylama süresinden sonra oyları sayar ve sonuçlandırır.
                        setTimeout(() => {

                            //emoji miktarını sayar ve buna göre ekleme yapar
                            for (let index = 0; index < out.length; index++) {
                                outCount[index] = newMessage.reactions.find(reaction => reaction.emoji.name === emojiArray[index]).count - 1
                                combined[index] = out[index].split("\n").join("") + ": " + outCount[index] + "\n" }
                            //maksimum değeri alır
                            let x = Math.max(...outCount)
                            console.log(x)
                            //Hangisinin maksimum değere sahip olduğunu belirler (kontrol eder) ve ona şekil (stil) verir
                            for (let s = 0; s < outCount.length; s++) {
                                if (outCount[s] == x) {                                  
                                    combined[s] ="**"+ combined[s].split("\n").join("") + "**" +"\n" 
                                }
                                else {
                                    combined[s] = "~~"+ combined[s].split("\n").join("") + "~~" +"\n" 
                                }                   
                            }
                            //mesajı siler ve sonuçları gönderir
                            newMessage.delete();
       
        var embed = new Discord.RichEmbed() 
			.setTitle(title)
			.setDescription("\n" +combined.join(""))
			.setTimestamp()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor(0xD53C55) // Yeşil Yedek: 0x00AE86
			if (time) {
            embed.setFooter(`Oylama başlatıldı ve ${time} dakika(s) kadar sürecek`);
        }

                            message.channel.send({ embed })
                        }, realTime);
                    })
                }
                if (argText[1]) {
                    if (argText[1].trim() == "time") {
                        //süre ayarlandıysa çıkış	
                        var out = []
                        for(let i = 2; i < argText.slice(1).length; i++) {
                            out[i-2] = "__" + emojiArray[i-2]+ "__" + argText[i+1] + "\n"
                        }
                        sendMSG(argText[2].split("\""));
                    }
                    else{
                        //süre ayarlanmadıysa çıkış
                        var out = []
                        for(let i = 0; i < argText.slice(1).length; i++) {
                            out[i] = "__" + emojiArray[i] + "__" + argText[i+1] + "\n"
                        }
                        sendMSG(360)
                    }
                    message.delete();
                }
                break;
            default:
                break;
        }
        }
    }
})


client.on('message', message => {
    if (message.content.toLowerCase() === '.kedi') {
var request = require('request');

request('http://aws.random.cat/meow', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
        var info = JSON.parse(body);
  const foto = new Discord.RichEmbed()
  .setImage(info.file)
  .setColor(0x36393F)
      message.channel.send(foto)
    }
})
    }
});
client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.find('name', 'valley-log');//log ismini ayarlıyacaksınız log adında kanal açın
  if (!channel) return;
        let username = member.user.username;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {
            const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184528148725780/guildAdd.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })
client.on("guildMemberRemove", async member => {
  const channel = member.guild.channels.find('name', 'valley-log');
  if (!channel) return;
        let username = member.user.username;
        if (channel === undefined || channel === null) return;
        if (channel.type === "text") {            
          const bg = await Jimp.read("https://cdn.discordapp.com/attachments/450693709076365323/473184546477572107/guildRemove.png");
 const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(362, 362);
            await bg.composite(userimg, 43, 26).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    channel.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on("ready", async message => {
    var Activity = [
        
        
        "Yapımcım : Murad#7467",
      
        "Yapımcım : BeRaT#3971",
  
        ".yardım | .linkler",
  
        `${client.guilds.size} Sunucu İçin Teşekürler `,
      
        `${client.users.size} Kulanıcı İçin Teşekürler `,
  
    ];
  
    setInterval(function() {
  
        var random = Math.floor(Math.random()*(Activity.length-0+1)+0);
  
        client.user.setActivity(Activity[random], { type: 'WATCHING' });
        }, 6 * 3000);

        setInterval(() => {
            client.channels.get("498185360518414340").setName(`Sunucu: ${client.guilds.size}`)
            client.channels.get("498187578068172821").setName(`Kullanıcı: ${client.users.size}`)
            client.channels.get("498187494844661783").setName(`Kanal: ${client.channels.size}`)
          }, 3000 );
  })
client.login(ayarlar.token);
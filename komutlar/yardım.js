const Discord = require('discord.js');

exports.run = function(client, message, args) {
  
  const embed = new Discord.RichEmbed()
  .setDescription(`**${message.author.username}** İşte Komutlarım ! Mükemmel Değilmi Sencede ?\n\n`)
 .addField(':house:**Ana Komutlar :**:house:', '`.sunucutanıt = ` [Sunucunuzu Destek](https://discord.gg/YtCw2jM) ` Sunucumda Tanıtırsınız`\n`.sunucu-bilgi = Sunucu Hakkında Bilgi Verir`\n`.roller = Sunucudaki Bütün Rolleri Gösrürsünüz`\n`.kullanıcı-bilgi = Kullanıcı Hakkında Bilgi Alırsınız`\n`.kanal-bilgi = Kanal Hakkında Bilgi Alırsınız`\n`.istatistik = Botun İstatistiğini Öğrene Bilirsiniz`\n`.afk = AFK Olursunuz`\n`.geldim = Eğer AFK İseniz AFKlıktan Çıkarsınız`\n`.istek = Botun Sahibine Bot Hakkında İsteklerinizi Yollaya Bilirsiniz`')
 .addField(':gear:**Sunucu Ayarları :**:gear:', '`.sayaç-ayarla = Sunucunuza Sayaç Ayarlarsınız`\n`.sayaç-kanal-ayarlara = Sayaçı Nereye Atacağını Ayarlarsınız`\n`.oto-rol-ayarla = Sunucunuza Girenlere Otomatik Rol Ayarlarsınız`')
 .addField(':mens:**Kullanıcı Komutları :**:womens:', '`.sunucu = Botun Olduğu Sunucuları Gösterir`\n`.npm = Komut Sayesinde Modül Hakkında Bilgi Öğrene Bilirsiniz`\n`.havadurumu = Herhangi Bir Şehirin Hava Durumunu Öğrene Bilirsiniz`\n`.discrim = Profil İDnize Benzer Başka Kullanıcılar Bulursunuz`\n`.fortnite = Fortnite Kullanıcı Bilgisi Verir`')
 .addField(':video_game:**Eğlence Komutları :**:video_game:', '`.slot = Slot Oynarsınız`\n`.dolar = Dolar Alış Dolar Satışı Gösterir`\n`.euro = Euro Alış Euro Satışı Gösterir`\n`.wasted = Profilize Veya Arkadaşınız Profiline wasted efekti verir`\n`.sor = Gelişmiş Sor Sistemi İle Bota Soru Sorarsınız`\n`.gif-ara = GİF Ararsınız`\n`.roblox = Roblox Kullanıcı Bilgi Alırsınız`\n`.piksel = Avatarınızı Piksel Şeklinde Görüntülenir`\n`.lmgtfy = Açıklama Bulamadım Dene Ve Gör`\n`.inek = İneğe İstediğiniz Mesajı Yazdırırsınız`\n`.fakemesaj = Etiketlediğiniz Kullanıcıya Fake Mesaj Yazdırırsınız`\n`.boks-makinesi = Boks Makinesi İle Gücünü Göster`\n`.koş = Koşarsınız...`\n`.aşk-ölçer = Etiketlediğiniz Kullanıcıya Sevginizi Gösterin`')
 .addField(':shield:**Yetkili Komutları :**:shield:', '`.sil = Belirtdiğiniz Sayıda Mesaj Siler`\n`.çeklişyap = Gelişmiş Çekiliş Sistemi İle Çekiliş Yaparsınız`\n`.duyuru = Duyuru Yaparsınız`\n`.rastgeleüye = Rastgele Üye Seçer`\n`.ban = Etiketlediğiniz Kullanıcıyı Sunucudan Banlar`')
 .addField(':joystick:**Minecraft Komutları :**:joystick:', '`.mcödül = Minecraft Başarımı Kazanırsınız`\n`.mcskin = Minecraft Hesap Skinini Gösterir`') 
 .addField(':hammer_pick:**Yapımcı :**:hammer_pick: ', '`.yayın-aç = Botun Oynuyor Kısmında Yayın Açarsınız`\n`.yayın-kapat = Botun Oynuyor Kısmında Yayın Varsa Kapatır`\n`.reboot = Botu Yeniden Başlatırsınız`')
 .addField(':black_square_button:**Çerçeveler :**:black_square_button:', '`.galatasaray = Avatarınıza GALATASARAY Efekti Verir`\n`.beşiktaş = Avatarınıza BEŞİKTAŞ Efekti Verir`\n`.fenerbahçe = Avatarınıza FENERBAHÇE Efekti Verir`\n`.siyahbeyaz = Profilinize Yada Arkadaşınızın Profiline Siyahbeyaz Efekti Ekler`\n`.sniper = Profilinize Yada Arkadaşınızın Profiline Sniper Efekti Ekler`\n`.eski = Yazdığınız Fotoyu Eski Efekti Ekler`\n`.Atam = Avatarınıza ATATÜRKün Resmini Eklersiniz`\n`.erdoğan = Recep Tayyip Eroğan İle Selfie Çekersiniz`\n`.trinity = Avatarnızı Bütün Hype Squad Rozetleri İle Kaplarsınız`\n`.balance = Balance Çerçivesinin İçinde Profil Fotoğrafını Gösterir.`\n`.brilliance = Brilliance Çerçivesinin İçinde Profil Fotoğrafını Gösterir.`\n`.bravery = Bravery Çerçivesinin İçinde Profil Fotoğrafını Gösterir.`') 
 .addField(':cool:**Klima Komutları :**:cool:', '`.klima = Komutu Kullanarak Bütün Klima Komutlarını Göre Bilirsiniz.`')
.setThumbnail(message.author.avatarURL)

 .setColor(0x36393F)

  message.react('📮');
  message.author.send({embed});

};

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['y','help','yardım'],
  permLevel: 0 
};

exports.help = {
  name: 'yardım', 
  description: 'Tüm komutları listeler.',
  usage: 'yardım'
};

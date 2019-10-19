const fights2 = require('../data/fights2.json');
const Discord = require('discord.js');

exports.run = (client, message, args) => {
  message.channel.send('Vuruyorum! :boxing_glove:').then( msg => {
    
            setTimeout(() => {
    
                msg.edit('http://3.bp.blogspot.com/-kh5On-pZMkM/UfaITUTRR_I/AAAAAAAAA70/piGjpI38tB0/s1600/boxing-machine-practice-attempt-fail.gif');
    
            }, 500);
    
            setTimeout(() => {
    
                msg.edit('**Skor:** `+551`');
    
            }, 3500);
    
            setTimeout(() => {
    
                msg.edit('**Skor:** `+782`');
    
            }, 3500);
    
            setTimeout(() => {
    
                msg.edit('**Skor:** `+856`');
    
            }, 3500);
    
            setTimeout(() => {
    
                msg.edit('**Skor:** `+924`');
    
            }, 3500);
    
            setTimeout(() => {
    
                msg.edit('**Skor:** `+956`');
    
            }, 3500);
    
            setTimeout(() => {
    
                msg.edit('**Skor:** `+967`');
    
            }, 3500);
    
            setTimeout(() => {
    
             message.reply(`**Skorun:** ${fights2[Math.floor(Math.random() * fights2.length)]}`);
    
            }, 10000);
    
            setTimeout(() => {
    
                msg.edit('Manyak çocuk! fena vurdun! :boxing_glove: :dark_sunglasses:');
    
            }, 3500);
    
        });
    
    };



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['boks-makinesi', 'vur'],
  permLevel: "0"
};

exports.help = {
  name: "boks-makinesi",
  description: "boks-makinesi",
  usage: "boks-makinesi"
};

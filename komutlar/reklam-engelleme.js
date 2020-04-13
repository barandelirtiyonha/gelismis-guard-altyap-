const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Yetkiniz Bulunmamaktadır!');

    if (!args[0]) return message.reply(`aç/kapat`);

    if (args[0] == 'aç') {
        var durum = await db.fetch(`reklam_${message.guild.id}`)            
        if (durum == "acik") return message.channel.send("Önceden Açılmış Bir Şeyi **Şimdi** __Açamazsın!__");
        db.set(`reklam_${message.guild.id}`, 'acik')
        message.channel.send(`açtım.!`)
    }

    if (args[0] == 'kapat') {
        var durum = await db.fetch(`reklam_${message.guild.id}`)            
        if (durum == "kapali") return message.channel.send("Önceden Kapanmış Bir Şeyi **Şimdi** __Kapatamazsın!__");
        db.set(`reklam_${message.guild.id}`, 'kapali')
        message.channel.send(`kapalı?!`)
    }

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 3
};
exports.help = {
  name: 'reklam-engel',
  description: '',
  usage: '!reklam-engel'
};
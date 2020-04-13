const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
  
   var başarılı = ['**İŞTE BU!** <:basarili:690022418735169592>', '**SÜPER!** <:basarili:690022418735169592>', '**NASIL YAPTIN BUNU?!** <:basarili:690022418735169592>', '**MÜKEMMEL!** <:basarili:690022418735169592>', '**SEVDİM BUNU!** <:basarili:690022418735169592>', '**ŞİMDİ OLDU!** <:basarili:690022418735169592>'];
   var x = başarılı[Math.floor(Math.random() * başarılı.length)];

   var başarısız = ['**TÜH!** <:basarisiz:690022419116851268>', '**OLMADI BU!** <:basarisiz:690022419116851268>', '**HAY AKSİ!** <:basarisiz:690022419116851268>', '**HADİ ORADAN!** <:basarisiz:690022419116851268>', '**OLMADI YA!** <:basarisiz:690022419116851268>', '**BÖYLE OLMAZ?!** <:basarisiz:690022419116851268>', '**HADİ YA!** <:basarisiz:690022419116851268>'];
   var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];
  
if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`**${ayarlar.prefix}jail-yetkilisi ayarla/sıfırla** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
if (!args[0]) return message.reply(`Sistemi kullanabilmek için, .jail-yetkilisi ayarla/sıfırla @rol yazmalısın.\nDetaylı bilgi için: .yardım sustur-kanal`)
   
  
  if (args[0] == 'ayarla') {
  
  let yetkilirol = message.mentions.roles.first() || message.guild.roles.find(c => c.name === args[1].join(' '))
  if (!yetkilirol) return message.channel.send(x2 + ` Bir rol etiketle.`)
  
  db.set(`jailyetkilisi_${message.guild.id}`, yetkilirol.id)
  message.channel.send(x + ` Jail yetkilisi ${yetkilirol} olarak ayarlandı.`)
  } 
  

  if (args[0] == 'sıfırla') {
    db.delete(`jailyetkilisi_${message.guild.id}`)
    message.channel.send(x + ` Jail yetkilisi başarıyla sıfırlandı.`)
  }
  
  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['jailyetkilisi'],
 permLevel: 0
};

exports.help = {
 name: 'jail-yetkilisi',
 description: 'Hangi role sahip kişilerin jaile atabileceğini ayarlarsınız.',
 usage: 'jail-yetkilisi ayarla/sıfırla @rol',
 kategori: '**MODERASYON**',
 permLvl: '**SUNUCUYU YÖNET**'
};
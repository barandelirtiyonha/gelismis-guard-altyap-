const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const yardim = new Discord.RichEmbed()

             .setColor('#fff000')
             .setAuthor(`Yardım Komutları`, client.user.avatarURL) 
             .setThumbnail(client.user.avatarURL)
             .addField(`Komutlar`, `**${ayarlar.prefix}ban** İstediğiniz Kullanıcıyı Banlamanızı Sağlar.\n**${ayarlar.prefix}kick** Kullanıcıyı Kicklemenizi Sağlar.\n**${ayarlar.prefix}ever-engel "aç-kapat"** Everyone Ve Here Açar/kapatır.\n**${ayarlar.prefix}jail-kanal** Jail Kanalı Ayarlar.\n**${ayarlar.prefix}jail-rol** Jail Rolü Ayarlar.\n**${ayarlar.prefix}jail-yetkilisi** Jail Yetkilisi Ayarlar.\n**${ayarlar.prefix}jail** Kullanıcıyı Jaile Atmayı Sağlar.\n**${ayarlar.prefix}link-engel** Link Engellemeyi Açar.  `) // bunlar boş kalırsa hata verir
             .addField(`Linkler ->`, `[Lord Discord](https://discord.gg/Z2zuGCR)`) // bunlar boş kalırsa hata verir
             .setFooter(`Menüyü ${message.author.username} istedi moruq.`, message.author.avatarURL)
            
        return message.channel.sendEmbed(yardim);
}

exports.conf = {
	enabled : true,
	guildOnly : false,
	aliases : ['help'],
	permLevel : 0
}

exports.help = {
	name : 'yardım',
	description : 'Komut kategorilerini atar',
	usage : '!!yardım'
}
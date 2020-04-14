const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const yardim = new Discord.RichEmbed()

             .setColor('#fff000')
             .setAuthor(`Kategoriler`, client.user.avatarURL) 
             .setThumbnail(client.user.avatarURL)
             .addField(`Komutlar`, `${ayarlar.prefix}ban \n ${ayarlar.prefix}everyone-engelle "aç-kapat" `) // bunlar boş kalırsa hata verir
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
const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');

exports.run = (client, message, args) => {

  let user = message.mentions.users.first();
  let x = args[1]
  if (!user) return message.reply('Uyarılarını kaldıracağın kişiyi etiketlemelisin!');
  if (!x) return message.reply(`**${user.tag}** adlı kullanıcının kaldıracağın uyarısının kodunu yazmalısın!`);
  
  if (message.guild.members.get(user.id).highestRole.calculatedPosition > message.member.highestRole.calculatedPosition) return message.channel.send(`Bu kişinin \`rolü/rolleri\` senin \`rolün/rollerinden\` daha yüksek.`)
  
  let komutlar = JSON.parse(fs.readFileSync("./uyarılar.json", "utf8"));
  
  if (!komutlar[message.guild.id+"-"+user.id]) return message.reply("Bu kullanıcının hiç uyarısı bulunmuyor!")
  
  let komut = x
  
		if(komutlar[message.guild.id+"-"+user.id].length === 1) {
			if(Object.keys(komutlar[message.guild.id+"-"+user.id][0])[0].toString() === komut) {
				delete komutlar[message.guild.id+"-"+user.id]
				fs.writeFile("./uyarılar.json", JSON.stringify(komutlar), (err) => {
					console.log(err)
				})
				const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${user.username} - Uyarı Bilgisi`, user.avatarURL)
  .setDescription(`<@${user.id}> adlı kullanıcının **${x}** kodlu uyarısı kaldırıldı!`)
  .setFooter(`${client.user.username} - Uyarı Sistemi`, client.user.avatarURL)
  message.channel.send({embed})
				return
			}
		}
		for (var i = 0; i < komutlar[message.guild.id+"-"+user.id].length; i++) {
			if(Object.keys(komutlar[message.guild.id+"-"+user.id][i])[0].toString() === komut) {
				komutlar[message.guild.id+"-"+user.id].splice(i, 1);

				const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${user.username} - Uyarı Bilgisi`, user.avatarURL)
  .setDescription(`<@${user.id}> adlı kullanıcının **${x}** kodlu uyarısı kaldırıldı!`)
  .setFooter(`${client.user.username} - Uyarı Sistemi`, client.user.avatarURL)
  message.channel.send({embed})
				fs.writeFile("./uyarılar.json", JSON.stringify(komutlar), (err) => {
					console.log(err)
				})
				return
			}
		}
  
   const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('Yapılan İşlem', 'Uyarı Kaldırma')
  .addField('Kullanıcı', `${user.tag} (${user.id})`)
  .addField('Yetkili', `${message.author.username}#${message.author.discriminator}`)
  .addField('Kaldırılan Uyarı Kodu', x)
 if(db.has(`mLog_${message.guild.id}`) === true) return message.guild.channels.get(db.fetch(`mLog_${message.guild.id}`)).send(embed);
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["warnd-delete", "uyarı-sil"],
  permLevel: 1,
    kategori: "moderasyon"
};

exports.help = {
  name: 'uyarı-kaldır',
  category: 'moderasyon',
  description: 'İstediğiniz kişinin uyarı kodu ile belirtilen uyarısını kaldırır.',
  usage: 'uyarı-kaldır [@kullanıcı] [uyarı-kodu]'
};
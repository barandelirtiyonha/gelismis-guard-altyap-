const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {

  //if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);
  
  const db = require('quick.db')
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  /*if (db.has(`mLog_${message.guild.id}`) === false) return message.reply(`Bu sunucuda Moderasyon Kayıtları kanalı ayarlı değil! Lütfen \`${client.ayarlar.prefix}mod-log-ayarla\` yazarak Moderasyon Kayıtları kanalı ayarlayınız!`);
  let modlog = message.guild.channels.get(db.fetch(`mLog_${message.guild.id}`));*/
  if (message.mentions.users.size < 1) return message.reply('Uyaracağın kişiyi etiketlemelisin!');
  //if (reason.length < 1) return message.reply('Uyarma sebebini yazmalısın!');
  if (user.id === message.author.id) return message.reply('Kendini uyaramazsın!');
  
  if (message.guild.members.get(user.id).highestRole.calculatedPosition > message.member.highestRole.calculatedPosition) return message.channel.send(`Bu kişinin \`rolü/rolleri\` senin \`rolün/rollerinden\` daha yüksek.`)
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('Yapılan İşlem', 'Uyarma')
  .addField('Kullanıcı', `${user.tag} (${user.id})`)
  .addField('Yetkili', `${message.author.username}#${message.author.discriminator}`)
  .addField('Sebep', reason || "Belirtilmemiş")
 if(db.has(`${message.guild.id}.mLog`) === true) return message.guild.channels.get(db.fetch(`${message.guild.id}.mLog`)).send(embed);
  
  if (reason) {
  message.guild.members.get(user.id).send(`<@${user.id}>, \n**${message.guild.name}** adlı sunucuda **${reason}** sebebi ile uyarıldın! \nKuralları çiğnemeye devam eder isen susturulabilir, atılabilir veya yasaklanabilirsin!`)
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`<@${user.id}> adlı kullanıcı **${reason}** sebebi ile başarıyla uyarıldı!`)
  message.channel.send(embed2)
  }
  
  if (!reason) {
  message.guild.members.get(user.id).send(`<@${user.id}>, \n**${message.guild.name}** adlı sunucuda uyarıldın! \nKuralları çiğnemeye devam eder isen susturulabilir, atılabilir veya yasaklanabilirsin!`)
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`<@${user.id}> adlı kullanıcı başarıyla uyarıldı!`)
  message.channel.send(embed2)
  }
  //db.add(`uyarılar_${user.id}`, 1)
  
  var generator = require('generate-password');
 
var password = generator.generate({
    length: 10,
    numbers: true
});//mantık bu muymuş amk ben çok zor bişi sanıyodum
  //kanka bu kod ve komut sistemi sakın dokunma alma turkoglu ile takas karşılıgında komut sistemini almıştım sonra editleidm bu oldu
  //almıcam ztn aq
  //rastgele kod olayı basit evet neden ugrasam ki ama kendim ayarlasamda kolay wqewq for <3
   var array = []
        var kontrol2 = []
        let komutlar = JSON.parse(fs.readFileSync("./uyarılar.json", "utf8"));
        var altkomut = ''
        
  if(komutlar[message.guild.id+"-"+user.id]) {
                for (var i = 0; i < Object.keys(komutlar[message.guild.id+"-"+user.id]).length; i++) {
                        if(password === Object.keys(komutlar[message.guild.id+"-"+user.id][i]).toString()) {
                           array.push(JSON.parse(`{"${Object.keys(komutlar[message.guild.id+"-"+user.id][i])[0]}": "${reason}"}`))
                        } else {
                                array.push(JSON.parse(`{"${Object.keys(komutlar[message.guild.id+"-"+user.id][i])[0]}": "${komutlar[message.guild.id+"-"+user.id][i][Object.keys(komutlar[message.guild.id+"-"+user.id][i])]}"}`))
                        }
                        kontrol2.push(Object.keys(komutlar[message.guild.id+"-"+user.id][i])[0].toString())
                }
                if(!kontrol2.includes(password)) {
                        array.push(JSON.parse(`{"${password}": "${reason}"}`))
                        komutlar[message.guild.id+"-"+user.id] = array
 
                        fs.writeFile("./uyarılar.json", JSON.stringify(komutlar), (err) => {
                                console.log(err)
                        })
 

                        return
                } else {
                        komutlar[message.guild.id+"-"+user.id] = array
 
                        fs.writeFile("./uyarılar.json", JSON.stringify(komutlar), (err) => {
                                console.log(err)
                        })
 
                        return
                }
        } else {
                array.push(JSON.parse(`{"${password}": "${reason}"}`))
                komutlar[message.guild.id+"-"+user.id] = array
 
                fs.writeFile("./uyarılar.json", JSON.stringify(komutlar), (err) => {
                        console.log(err)
                })
 
                return
        }
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["warn", "uyarı-ver"],
  permLevel: 1,
    kategori: "moderasyon"
};

exports.help = {
  name: 'uyar',
  category: 'moderasyon',
  description: 'İstediğiniz kişiyi uyarır.',
  usage: 'uyar [@kullanıcı] [<sebep>]'
};
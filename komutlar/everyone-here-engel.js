const Discord = require('discord.js');
const fs = require('fs');
let hereEngel = JSON.parse(fs.readFileSync("././jsonlar/hereEngelle.json", "utf8"));
exports.run = async (client, message) => {
  
    let args = message.content.split(' ').slice(1);
    const secenekler = args.slice(0).join(' ');
    if(secenekler.length < 1) return message.reply("**Everyone ve Here Yasaklama Sistemi \n Açmak için !!ever-engel aç \n Kapatmak için !!ever-engel kapat**").then(m => m.delete(10000));
  if (secenekler !== "aç" && secenekler !== "kapat" && secenekler !== "on" && secenekler !== "off") return message.reply("aç veya kapat yaz!")
    if (secenekler === "aç" || secenekler === "on") {
    
    message.delete();
        
      
        message.channel.send("**Everyone ve Here Engel :** **Açık!**").then(m => m.delete(5000));
  if(!hereEngel[message.guild.id]){
        hereEngel[message.guild.id] = {
            hereEngel: "acik"
          };
  };
          fs.writeFile("././jsonlar/hereEngelle.json", JSON.stringify(hereEngel), (x) => {
        if (x) console.error(x)
      })
    };
    if (secenekler === "kapat" || secenekler === "off") {
  message.channel.send(`**Everyone ve Here Engelleme Sistemi:** **kapalı**!`).then(m => m.delete(5000));
    
  if(!hereEngel[message.guild.id]){
        hereEngel[message.guild.id] = {
            hereEngel: "kapat"
          };
  };
        fs.writeFile("././jsonlar/hereEngelle.json", JSON.stringify(hereEngel), (x) => {
        if (x) console.error(x)
      })
       delete hereEngel[message.guild.id]
       delete hereEngel[message.guild.id].hereEngel
        message.channel.send("**İşlem Başarılı: Kapalı!**").then(m => m.delete(10000));
    
      
    };
}
    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['here-engel', 'everyone-engel', 'everyonehereengel'],
        permLevel: 3
      };
      
    exports.help = {
        name: 'ever-engel',
        description: 'Everyone ve Here engelleme sistemini açıp kapatmanızı sağlar.',
        usage: 'ever-engel <aç/kapat>'
    };
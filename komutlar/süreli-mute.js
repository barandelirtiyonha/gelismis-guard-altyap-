const Discord = require("discord.js");
const ms = require("ms");
var mutelu = "668423821040287744"; //buraya muteli rolünün id'sini koyunuz
var muteyetkisi = "671449251674587166"; // buraya mute yetkisi rolünün id yazınız.
exports.run = async (client, msg, args) => {
  if (!msg.member.roles.has(muteyetkisi)) {
  } else {
    let muted =
      msg.mentions.members.first() ||
      msg.guild.members.find(c => c.id === args[0]);
    if (!muted) {
      msg.reply("lütfen susturulacak üyeyi etiketleyiniz.");
    } else {
      if (
        muted.highestRole.calculatedPosition >=
        msg.member.highestRole.calculatedPosition
      ) {
        msg.reply("bu kullanıcı senden daha üst pozisyonda.");
      } else {
        let mutezaman = args[1]
          .replace("sn", "s")
          .replace("dk", "m")
          .replace("sa", "h")
          .replace("gün", "d");
        if (!mutezaman) {
          msg.reply("bir zaman girmediniz!");
        } else {
          let sebep = args.splice(2, args.length).join(" ");
          //!!sustur @etiket 0 zaman 1 sebep 2
          let log = msg.guild.channels.find(c =>
            c.name.toLowerCase().includes("mute-log") //mute-log yazan yere , mute log kanalınızın adını doğruca giriniz.
          );
          let vakit = mutezaman
            .replace("m", " dakika")
            .replace("s", " saniye")
            .replace("h", " saat")
            .replace("d", " gün");
          try {
            log.send(
              new Discord.RichEmbed()
                .setTitle("Bir kullanıcı susturuldu!")
                .setFooter(`ID: ${muted.id}`, muted.user.displayAvatarURL)
                .setColor("RED")
                .setThumbnail(msg.author.displayAvatarURL)
                .addField(`İşlem sahibi`, `<@${msg.author.id}>`)
                .addField(`Susturulan`, `<@${muted.id}>`)
                .addField(
                  `Sebebi`,
                  `${sebep === "" ? "Sebep belirtilmemiş." : sebep}`
                )
                .addField(`Süre`, `${vakit}`)
            );
            muted.addRole(mutelu);
            msg.channel.send(
              `**${muted.user.tag}** kullanıcısı, **${msg.author.tag}** tarafından **${vakit}** süreyle susturuldu!`
            );
          } catch (e) {
            console.log(e);
          }

          setTimeout(async function() {
            muted.removeRole(
              mutelu,
              "Susturulma cezası, sürenin bitmesi sebebiyle kaldırıldı."
            );
          }, ms(mutezaman));
        }
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute"],
  permLevel: 0
};

exports.help = {
  name: "tempmute",
  description: "",
  usage: ""
};
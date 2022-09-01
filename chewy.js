const Discord = require("discord.js");
const db = require("orio.db");
const fetch = require('node-fetch');
const client = new Discord.Client();

/////////////////////////// PREFİX ///////////////////////////

const prefix = '.'

/////////////////////////// PREFİX END ///////////////////////////

client.on("ready", async () => {
client.user.setActivity(`Chewy V12 Uptime Botu`, { type: "PLAYING" });
  console.log(" ");
});

/////////////////////////// UPTİME SYSTEM ///////////////////////////

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;
const selam = Linkler.map(Leise => Leise.url)
selam.forEach(Link => {
try {
fetch(Link)
} catch(e) {
console.error(e)
}
})

console.log(`${client.user.username} | ${db.get('Proje') || 0} Adet Proje Uptime Ediliyor!`)
}, 60000)

client.on('ready', () => {
console.log(`${client.user.username} isimli bot aktif!`)
if(!Array.isArray(db.get('Linkler'))) {
db.set('Linkler', [])
}
})

client.on('message', async message => {

  if(message.author.bot) return;
  var Split = message.content.split(' ')

  if(Split[0] == prefix + 'ekle') {
  var Link = Split[1]
  fetch(Link).then(() => {
    const leisecode = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`**Proje sistemimizde zaten bulunuyor!**`)
    .setThumbnail(message.author.avatarURL)
  
    if(db.get('Linkler').map(Leise => Leise.url).includes(Link)) return message.channel.send(leisecode)
  
    const chewyembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(message.author.avatarURL)
    .setDescription(`Yazdığınız proje başarıyla **uptime sistemimize** eklendi!`)
    .addField('**!linkler**', 'komutunu kullanarak **eklediğin linkleri** görebilirsin!')

    message.channel.send(chewyembed)

    db.push('Linkler', { url: Link, owner: message.author.id, owner2: message.author.tag})
    db.add(`SahipLinkleri_${message.author.id}`,1)
    db.push(`Projeler_${message.author.id}`,Link)
    db.add(`Proje`,1)
  
  }).catch(Hata => {
  
  const chewyuptimee = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`**Hey! uptime edeceğim **URL** girmelisin!**

> .ekle (Share yazan yere tıkla ve live site yazan yerdeki url'yi yapıştır.)`)
.setImage("https://cdn.discordapp.com/attachments/936586443915137028/936620482508230706/unknown.png")
.setThumbnail(message.author.avatarURL)
message.channel.send(chewyuptimee)
  })
  }

  if(Split[0] == prefix + 'say') {

  const chewysay = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setThumbnail(message.author.avatarURL)
  .setDescription(`**Bot şuanda \`${db.get('Proje')}\` adet url'yi 7/24 aktif tutuyor.**

**Bu linklerden \`${db.fetch(`SahipLinkleri_${message.author.id}`) || null}\` tanesi senin botun!**
`)
  message.channel.send(chewysay)
  }

  if(Split[0] == prefix + 'uptime') {
  const chewqwe = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setThumbnail(message.author.avatarURL)  
  .setDescription(`Geçerli bir link girmelisin. Eğer nasıl ekleyeceğini bilmiyorsan **.yardım** yazabilirsin.`)

message.channel.send(chewqwe)
  }

  if(Split[0] == prefix + 'yardım') {
    const aaaaa = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(message.author.avatarURL)  
    .setDescription(`
**.ekle (glitch show linki)** = Botunuzu uptime ( 7/24 ) aktif tutar.
**.linkler** = Uptime ( 7/24 ) aktif tutulan linkleri gösterir.
**.say** = Bottaki kayıtlı olan tüm linkleri gösterir.`)

message.channel.send(aaaaa)

    if(Split[0] == prefix + 'linklerim') {

    const Linkleri = db.fetch(`Projeler_${message.author.id}`)
    if (!db.get('Linkler').map("SUNUCUDAKİ KURUCU ROL ID").includes(message.author.id)) return message.channel.send(
    new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`**Hiç link eklememişsin. Link eklemek için **.ekle** yazman yeterli!**`))

    message.channel.send(
    new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`- **7/24 aktif tutulan botların linkleri DM üzerinden sana gönderildi! ${message.author}**`))
    message.author.send(
    new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`- **Uptime etmem için eklediğin linkler ( senin )** \n\n\``+Linkleri.join('\n')+`\``))
    }
}
  })

client.on('ready', () => {
client.user.setActivity(`.ekle`, { type: 'PLAYING' })
client.user.setStatus('online')
})

client.on('message', message => {
  const chewyyy = ['.glitch.me/','.glitch.me']
  if(chewyyy.some(chewyyyyyyy => message.content.includes(chewyyyyyyy))){

    message.delete()

    const chewy = new Discord.MessageEmbed()
    .setDescription(`-**Projeniz birazdan eklenecektir. ${message.author}**

Lütfen tekrar ekle yazıp linkini ekleme!`)
    .setColor("RANDOM")
    message.channel.send(chewy);
  }
})

/////////////////////////// TOKEN ///////////////////////////

client.login("BOT TOKENİ")

/////////////////////////// TOKEN ///////////////////////////
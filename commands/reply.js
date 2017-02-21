module.exports = {
    help: 'reply to a person',
    func: (client, message, args) => {
let getlongstring = message.content.split(" ");
 	getlongstring = getlongstring.slice(2).join(" ");
 	message.channel.fetchMessages({
 			limit: 1,
 			around: args[1]
 		})
 		.then(messages => {
      const Discord = require('discord.js')
      const embed = new Discord.RichEmbed()
 			const replyToMsg = messages.first();
      let attachment = '';
      if(!!replyToMsg.attachments.first() && !!replyToMsg.attachments.first().width) {
        attachment = replyToMsg.attachments.first().url
      }
    console.log(attachment)
 			let color = (message.channel.type !== "DM" && message.guild && message.guild.member(replyToMsg.author)) ? message.guild.member(replyToMsg.author).highestRole.color : 0x1b5fe8;
 			embed.setColor(color);
      embed.setAuthor(`${replyToMsg.author.username} (${replyToMsg.author.id})`, replyToMsg.author.avatarURL);
      embed.setDescription(replyToMsg.content);
      embed.setImage(attachment)
    message.channel.sendEmbed(embed,`${replyToMsg.author}, ${getlongstring}`).then(() => message.delete()).catch(console.error); 
 		}).catch(console.error);
    }}
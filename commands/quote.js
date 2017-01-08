module.exports = {
    help: 'quote a person',
    func: (client, message, args) => {
let getlongstring = message.content.split(" ");
 	getlongstring = getlongstring.slice(2).join(" ");
 	message.channel.fetchMessages({
 			limit: 1,
 			around: args[1]
 		})
 		.then(messages => {
 			const replyToMsg = messages.first();
 			let color = (message.channel.type !== "DM") ? message.guild.member(replyToMsg.author).highestRole.color : 0x1b5fe8;
 			message.channel.sendMessage(`${getlongstring}`, {
 				embed: {
 					color: color,
 					author: {
 						name: `${replyToMsg.author.username} (${replyToMsg.author.id})`,
 						icon_url: replyToMsg.author.avatarURL
 					},
 					description: replyToMsg.content
 				}
 			}).then(() => message.delete()).catch(console.error);

 		}).catch(console.error);
    }}
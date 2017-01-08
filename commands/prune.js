module.exports = {
  help: "deletes messages",
  func: (client, message, params) => {
let limit = parseInt(params[1]) ? parseInt(params[1]) + 1 : 2;
  if(limit >= 100) limit = 100;
  message.channel.fetchMessages({ limit }).then(messages => {
  messages.forEach(message => {
  if(message.author !== client.user) return;
    message.delete().catch(console.error);
  });
  }).catch(console.error);
}
}
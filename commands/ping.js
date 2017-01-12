module.exports = {
    help: "Send a Pong!",
    func: (client, message, args) => {
        message.channel.sendMessage('Pong!').then(m => m.edit(`Pong! => ${m.createdTimestamp - message.createdTimestamp}ms`)).catch(console.error);
    }
}
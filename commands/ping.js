module.exports = {
    help: "Send a Pong!",
    func: (client, message, args) => {
        message.channel.sendMessage('Pong!');
    }
}
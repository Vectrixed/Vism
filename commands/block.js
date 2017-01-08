module.exports = {
    help: 'block user',
    func: (client, message, args) => {
    message.mentions.users.every(u => u.block());
    }
}
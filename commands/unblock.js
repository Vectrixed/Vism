module.exports = {
    help: 'unblock user',
    func: (client, message, args) => {
    message.mentions.users.every(u => u.unblock());
    }
}
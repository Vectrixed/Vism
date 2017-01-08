module.exports = {
    help: 'Reload the command',
    func: (client, message, args) => {
        if (args.length > 1) client.load(args[1]);
        else client.load();
    }
}
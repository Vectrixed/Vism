module.exports = {
    help: 'Plz send help!!',
    func: (client, message, args) => {
        if (args.length > 1) {
            if (args[1] in client.commands && client.commands[args[1]].help) {
                message.channel.sendCode('asciidoc', `${client.config.prefix + args[1]} :: ${client.commands[args[1]].help}`);
            }
        } else {
            let help = "";
            for (var command in client.commands) {
                help += `${client.config.prefix + command} :: ${client.commands[command].help}\n`;
            }
            message.channel.sendCode('asciidoc', help);
        }
    }
}
module.exports = {
    help: 'Evals javascript',
    func: (client, message, args) => {
        try {
            let msg = args[0].length;
            let X = eval(message.content.slice(msg + 1));
            message.edit(`${message.content}\n\`\`\`js\n${X}\n\`\`\``).catch(console.error);
        } catch (e) {
            message.edit(`${message.content}\n\`\`\`js\n${e}\n\`\`\``).catch(console.error);
        }
    }
}
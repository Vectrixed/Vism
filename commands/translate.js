module.exports = {
    help: 'translate stuff',
    func: (client, message, args) => {
        let from = args[1];
        let to = args[2];
        let transl8 = args.slice(3);
        let trans = transl8.join(' ');
        client.modules.translate(trans, {
            from: from,
            to: to
        }).then(res => {
            message.edit(`Translating from **${from.toUpperCase()}**:\n\`\`\`\n${trans}\n\`\`\`\nTranslated to **${to.toUpperCase()}**:\n\`\`\`\n${res.text}\`\`\``)
        }).catch(err => {
            console.error(err);
        })
    }
}
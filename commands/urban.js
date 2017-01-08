module.exports = {
    help: 'urban dictionary',
    func: (client, message, args) => {
        client.modules.urban(args.slice(1).join(' ')).first(function(json) {
            if (json) {
                message.edit(`**${json.word}**\n\`\`\`${json.definition}\`\`\` \n${json.example} \n${json.permalink}`)
            } else {
                message.edit("**No results.**")
            }
        })
    }
}
module.exports = {
    help: 'list internet rules',
    func: (client, message, args) => {
      let rules = require('../util/intrules.json')
        let rule = args[0];
        if (!isNaN(rule)) {
            message.edit(`\`\`\`\nRule ${rule}. ${rules[rule]}\n\`\`\``);
        } else if (typeof rule === 'string' && (rule === "random" || rule === "rnd" || rule === "rdm")) {
            var rdmrule = Math.floor(Math.random() * Object.keys(rules).length);
            message.edit(`\`\`\`\nRule ${rdmrule}. ${rules[rdmrule]}\n\`\`\``);
        }
    }
}
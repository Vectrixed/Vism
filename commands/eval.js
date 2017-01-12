module.exports = {
    help: 'Evals javascript',
    func: (client, message, args) => {
      let suffix = message.content.slice(6);
			try {
				let evaled = eval(suffix);
				let type = typeof evaled;
				let insp = client.modules.util.inspect(evaled, {
					depth: 0
				});
				let tosend = [];
				if (evaled === null) evaled = 'null';
				tosend.push('**EVAL:**');
				tosend.push('\`\`\`js');
				tosend.push(clean(suffix));
				tosend.push('\`\`\`');
				tosend.push('**Evaluates to:**');
				tosend.push('\`\`\`LDIF');
        
				tosend.push(clean(evaled.toString().replace(client.token, 'Redacted').replace(client.user.email, 'Redacted')));
				tosend.push('\`\`\`');
				if (evaled instanceof Object) {
					tosend.push('**Inspect:**');
					tosend.push('\`\`\`js');
					tosend.push(insp.toString().replace(client.token, 'Redacted').replace(client.user.email, 'Redacted'));
					tosend.push('\`\`\`');
				} else {
					tosend.push('**Type:**');
					tosend.push('\`\`\`js');
					tosend.push(type);
					tosend.push('\`\`\`');
				}
				message.edit(tosend.join("\n"));
			} catch (err) {
				let tosend = [];
				tosend.push('**EVAL:** \`\`\`js');
				tosend.push(clean(suffix));
				tosend.push('\`\`\`');
				tosend.push('**Error:** \`\`\`LDIF');
				tosend.push(clean(err.message));
				tosend.push('\`\`\`');
				message.edit(tosend.join("\n"))
					.catch(error => console.log(error.stack));
}
    }
}

function clean(text) {
	if (typeof(text) === 'string') {
		return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
	} else {
		return text;
	}
}
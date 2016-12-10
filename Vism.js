 //Defining vars START
var Discord = require('discord.js');
		Client = new Discord.Client(),
  	config = require('./config.json'),
		cmds = [], 
		atr = [
			["acow", "https://gyazo.com/c8b1e9298be58f164a9e2445d584ecf9"],
			["dbad","https://gyazo.com/ac368304fb2cb65bb9ced110d147f2dd"],
			["sheli", "https://www.youtube.com/watch?v=WPMDCJrRpT8"],
			["y-you too", "https://www.youtube.com/watch?v=twkGJY_JxLE"],
			["angery", "https://gyazo.com/76a38abe1b67e14ab8428aa41364235b"],
			['kk', 'https://gyazo.com/60dc3b513937fae28b02fc9040175fe7' ]
			],
  	token = config.token,
  	prefix = config.prefix,
  	f = require('./requires/functions.js'),
  	translate = require('google-translate-api'),
		rules = require('./requires/intrules.json'),
		urban = require('urban'),
		d = new Date();

Client.on('ready', () => {
  console.log(`[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] ${Client.user.username} is ready.`);
  Client.user.setStatus("dnd");
});
//Defining vars END

//ADDING COMMANDS PART START
f.addCmd("help", `Lists all of the commands.`, '', (a,b, msg)=> {
	f.lcmd(msg);
})

f.addCmd("eval", `Evals javascript. \n Usage: ${prefix}eval [js]`, '', (command, args, message)=>{
  f.eval(message, command = prefix+command);
})

f.addCmd("translate", `Uses google translate to translate.\n Usage: ${prefix}translate [from] [to] [args]`, '', (cmd, args, msg)=>{
  let from1 = args[0];
  let to1 = args[1];
  let transl8 = args.slice(2);
  let trans = transl8.join(' ');
  f.translate(trans, from1, to1, msg);
})

f.addCmd("rule", `Lists the rules of le internet: \n Usage: ${prefix}rule [n],[random, rnd, rdm]`, '', (cmd, args, msg)=> {
	let rule = args[0];
	if(f.isNum(rule)){
	msg.edit(`\`\`\`\nRule ${rule}. ${rules[rule]}\n\`\`\``);
} else if(typeof rule === 'string' && (rule === "random" || rule === "rnd" || rule === "rdm")) {
	var rdmrule = Math.floor(Math.random() * Object.keys(rules).length);
	msg.edit(`\`\`\`\nRule ${rdmrule}. ${rules[rdmrule]}\n\`\`\``);
}
})

f.addCmd("urban", `searches the urban dictionary for anything. \n Usage: ${prefix}urban [args]`, '', (cmd, args, msg)=> {
	urban(args.join(' ')).first(function(json){
if (json){
    msg.edit(`**${json.word}**\n\`\`\`${json.definition}\`\`\` \n${json.example} \n${json.permalink}`)
  } else {
		msg.edit("**No results.**")
	}
})
})

f.addCmd("uptime", `shows uptime, lol what did you expect?`, '',(cmd, args, msg) => {
	f.uptime(Client.uptime, msg);
})
//ADDING COMMANDS PART END


//Message event listener START
Client.on('message', message => {
if (message.author.id !== "185088391384137730") return;
	let command = message.content.split(" ")[0]; command = command.slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  for(var b = 0; b < atr.length; b++){
		if(message.content.toLowerCase().startsWith(atr[b][0])){
    	message.edit(atr[b][1]);
		}
	}

  for(var i = 0; i < cmds.length; i++){
		if(message.content.startsWith(prefix+cmds[i][0])){
	 	cmds[i][1](command, args, message);
		}
	}
});
//Message event listener END
>>>>>>> 3bb5a40bdaefc5ca442121d70ce36b8d87a9269f

//ADDING COMMANDS PART START
f.addCmd("help", `Lists all of the commands.`, (a,b, msg)=> {
	f.lcmd(msg);
})

f.addCmd("eval", `Evals javascript. \n Usage: ${prefix}eval [js]`, (command, args, message)=>{
  f.eval(message, command = prefix+command);
})

f.addCmd("translate", `Uses google translate to translate.\n Usage: ${prefix}translate [from] [to] [args]`, (cmd, args, msg)=>{
  let from1 = args[0];
  let to1 = args[1];
  let transl8 = args.slice(2);
  let trans = transl8.join(' ');
  f.translate(trans, from1, to1, msg);
})

f.addCmd("rule", `Lists the rules of le internet: \n Usage: ${prefix}rule [n],[random, rnd, rdm]`, (cmd, args, msg)=> {
	let rule = args[0];
	if(f.isNum(rule)){
	msg.edit(`\`\`\`\nRule ${rule}. ${rules[rule]}\n\`\`\``);
} else if(typeof rule === 'string' && (rule === "random" || rule === "rnd" || rule === "rdm")) {
	var rdmrule = Math.floor(Math.random() * Object.keys(rules).length);
	msg.edit(`\`\`\`\nRule ${rdmrule}. ${rules[rdmrule]}\n\`\`\``);
}
})

f.addCmd("urban", `searches the urban dictionary for anything. \n Usage: ${prefix}urban [args]`, (cmd, args, msg)=> {
	urban(args.join(' ')).first(function(json){
if (json){
    msg.edit(`**${json.word}**\n\`\`\`${json.definition}\`\`\` \n${json.example} \n${json.permalink}`)
  } else {
		msg.edit("**No results.**")
	}
})
})

f.addCmd("uptime", `shows uptime, lol what did you expect?`,(cmd, args, msg) => {
	f.uptime(Client.uptime, msg);
})
//ADDING COMMANDS PART END


//Message event listener START
Client.on('message', message => {
if (message.author.id !== "185088391384137730") return;
	let command = message.content.split(" ")[0]; command = command.slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  for(var b = 0; b < atr.length; b++){
		if(message.content.toLowerCase().startsWith(atr[b][0])){
    	message.edit(atr[b][1]);
		}
	}

  for(var i = 0; i < cmds.length; i++){
		if(message.content.startsWith(prefix+cmds[i][0])){
	 	cmds[i][1](command, args, message);
		}
	}
});
//Message event listener END


Client.login(token); //LOGIN


process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

const {
  Client,
  Collection
} = require('discord.js');
const client = new Client({
  fetchAllMembers: true,
  
})
client.config = require('./config.json');
client.prefix = client.config.prefix;
client.token = client.config.token;
client.modules = {
  fs: require('fs'),
  translate: require('google-translate-api'),
  rules: require('./util/intrules.json'),
  urban: require('urban'),
  util: require('util')
}
client.client = client;
let commandsList = client.modules.fs.readdirSync('./commands/'); // return an array of all the files and folders inside the commands folder
client.commands = {}; // initiate value for the command list of client
for (i = 0; i < commandsList.length; i++) {
    let item = commandsList[i];
    if (item.match(/\.js$/)) { // only take js files
        delete require.cache[require.resolve(`./commands/${item}`)]; // delete the cache of the require, useful in case you wanna reload the command again
        client.commands[item.slice(0, -3)] = require(`./commands/${item}`); // and put the require inside the client.commands object
    }
}

client.on('ready', () => {
  console.log("Bot is on")
  client.user.setStatus("invisible");
})

client.on('message', message => {
  if(message.bot) return;
  if(message.author !== client.user) return;
  let args = message.content.split(" ");
 if (message.content.startsWith(client.config.prefix)) {
        args = message.content.slice(client.config.prefix.length).split(' ');
        if (args[0] in client.commands) {
            client.commands[args[0]].func(client, message, args);
        }
    }
})
/*   	atr = [
 		["acow", "https://gyazo.com/c8b1e9298be58f164a9e2445d584ecf9"],
 		["dbad", "https://gyazo.com/ac368304fb2cb65bb9ced110d147f2dd"],
 		["sheli", "https://www.youtube.com/watch?v=WPMDCJrRpT8"],
 		["y-you too", "https://www.youtube.com/watch?v=twkGJY_JxLE"],
 		["angery", "https://gyazo.com/76a38abe1b67e14ab8428aa41364235b"],
 		['kk', 'https://gyazo.com/60dc3b513937fae28b02fc9040175fe7']
 	];*/
client.login(client.token);
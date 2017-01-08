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
  rules: require('./requires/intrules.json'),
  urban: require('urban')
}
let commandsList = client.modules.fs.readdirSync('./commands/'); // return an array of all the files and folders inside the commands folder
client.commands = {}; // initiate value for the command list of client
for (i = 0; i < commandsList.length; i++) {
    let item = commandsList[i];
    if (item.match(/\.js$/)) { // only take js files
        delete require.cache[require.resolve(`./commands/${item}`)]; // delete the cache of the require, useful in case you wanna reload the command again
        client.commands[item.slice(0, -3)] = require(`./commands/${item}`); // and put the require inside the client.commands object
    }
}
client.load = (command) => {
    let commandsList = client.modules.fs.readdirSync('./commands/');
    if (command) {
        if (commandsList.indexOf(`${command}`) >= 0) {
            delete require.cache[require.resolve(`./commands/${command}`)];
            client.commands[command] = require(`./commands/${command}`);
        }
    } else {
        client.commands = {};
        for (i = 0; i < commandsList.length; i++) {
            let item = commandsList[i];
            if (item.match(/\.js$/)) {
                delete require.cache[require.resolve(`./commands/${item}`)];
                client.commands[item.slice(0, -3)] = require(`./commands/${item}`);
            }
        }
    }
}
client.load();
client.on('ready', () => {
  console.log("Bot is on")
  client.user.setStatus("dnd");
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

client.login(client.token);
String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
};
function addCmd(name, desc, func) {
    cmds.push([name, func, desc])
}
function log(arg) {
  console.log(arg)
}
function t(trans, from, to, msg){
  translate(trans, {from: from, to: to}).then(res => {
    msg.edit(`Translating from **${from.toUpperCase()}**:\n\`\`\`\n${trans}\n\`\`\`\nTranslated to **${to.toUpperCase()}**:\n\`\`\`\n${res.text}\`\`\``)
    }).catch(err => {
   console.error(err);
  });
}
function eval2(m, command){
  try{
  var msg = (command).length;
  var X = eval(m.content.slice(msg));
  m.edit(`${m.content}\n\`\`\`js\n${X}\n\`\`\``).catch(console.error);
  }catch(e){
  m.edit(`${m.content}\n\`\`\`js\n${e}\n\`\`\``).catch(console.error);
  }
}
function listcmds(msg){
  let cmdlist = []
  for (var i = 0; i <cmds.length; i++){
  cmdlist.push([`${cmds[i][0]}: ${cmds[i][2]}\n`])
  }
  let cmdslist2 = cmdlist.join("\n")
  msg.channel.sendMessage(`\`\`\`\n${cmdslist2}\n\`\`\`\nSelfbot's github: https://github.com/vectrixed/Vism`)
}
function isNumeric(num){
    return !isNaN(num)
}
function gettime(ms){
  x = ms / 1000
  seconds = Math.floor(x % 60)
  x /= 60
  minutes = Math.floor(x % 60)
  x /= 60
  hours = Math.floor(x % 24)
  x /= 24
  days = Math.floor(x)
  return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
}
function getuptime(uptime, msg){
  msg.channel.sendCode(`js`,`Bot has been on for: ${gettime(uptime)}.`)
}
function prune(client, msg, params){
  let limit = parseInt(params[0]) ? parseInt(params[0]) + 1 : 2;
  if(limit >= 100) limit = 100;
  msg.channel.fetchMessages({ limit }).then(messages => {
  messages.forEach(message => {
  if(message.author !== client.user) return;
    message.delete().catch(console.error);
  });
  }).catch(console.error);
}
exports.addCmd = addCmd;
exports.log = log;
exports.translate = t;
exports.eval = eval2;
exports.lcmd = listcmds;
exports.isNum = isNumeric;
exports.uptime = getuptime;
exports.gettime = gettime;
exports.prune = prune;

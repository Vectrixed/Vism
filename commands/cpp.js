module.exports = {
  help: 'Evals c++',
  func: (client, message, args) => {
    const {
      exec,
      } = require('child_process');
    const fs = require('fs');

    const fileTemplate = fs.readFileSync('./main.cpp.template', 'utf8');
    let input = message.content.split(' ');
    input.shift();
    input = input.join(' ');

    const [inMain, beforeMain] = input.split(/\/\* ?-+ ?\*\//).reverse();

    fs.writeFile('main.cpp', fileTemplate.replace('${inMain}', inMain).replace('${beforeMain}', beforeMain || ''), (error) => {
      if (error) {
        return message.edit(`\`Input\`\n\`\`\`cpp\n${input}\n\`\`\`\`Error\`\n\`\`\`cpp\n${error.message}\n\`\`\``).catch(console.error);
      }

      exec('g++ -std=c++11 main.cpp -o output', (error, stdout) => {
        if (error) {
          return message.edit(`\`Input\`\n\`\`\`cpp\n${input}\n\`\`\`\`Error\`\n\`\`\`cpp\n${error.message}\n\`\`\``).catch(console.error);
        }

        exec('./output', (error, stdout) => {
          if (error) {
            return message.edit(`\`Input\`\n\`\`\`cpp\n${input}\n\`\`\`\`Error\`\n\`\`\`cpp\n${error.message}\n\`\`\``).catch(console.error);

          }

          return message.edit(`\`Input\`\n\`\`\`cpp\n${input}\n\`\`\`\`Output\`\n\`\`\`cpp\n${stdout}\n\`\`\``).catch(console.error);
        });
      });
    });
}
}
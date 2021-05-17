const { prefix } = require('../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: 'a list of the commands you can use with me.',
	aliases: ['commands', 'h'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			const title = ('**My Cute Commands >_<**');
			// eslint-disable-next-line no-unused-vars
			const description = data.push(commands.map(command => command.name).join('\n'));
			const footer = `You can send ${prefix}help [command] to get info on a specific command!`;
			const helpEmbed = new Discord.MessageEmbed()
				.setColor(13238363)
				.setTitle(title)
				.setDescription(data)
				.setTimestamp()
				.setFooter(footer)
				.setThumbnail(`${message.client.user.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' })}`);
			return message.author.send(helpEmbed)
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
					console.log(data);
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		message.channel.send(data, { split: true });
	},
};

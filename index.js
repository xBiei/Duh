// require the file system module
const fs = require('fs');
// require the discord.js module
const Discord = require('discord.js');
// grab config from config.json file
const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
// API Errors handling function
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

const cooldowns = new Discord.Collection();
// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('yessir');
});


// console Listener
const y = process.openStdin();
y.addListener('data', res => {
	const x = res.toString().trim().split(/ +/g);
	client.channels.cache.get('671606755813228554').send(x.join(' '));
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('What are you going to do with that here?!');
	}

	if (command.args && !args.length) {
		let reply = `hmm didn't you forget something?, ${message.author}!`;

		if (command.usage) {
			reply += `\nThis is how you use this command baka: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Hey stop spamming!! Wait ${timeLeft.toFixed(1)} second(s) before using that command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('What\'s that thing you typed, type it correctly. baka!');
	}
});


/* else if (command === `command here`) {
  message.channel.send(`reply here`);
} */
// login to Discord with your app's token
client.login(token);

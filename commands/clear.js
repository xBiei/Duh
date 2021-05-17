module.exports = {
	name: 'clear',
	description: 'purges messages from this channel',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('is that a number?');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}
		message.channel.bulkDelete(amount);
	},
};

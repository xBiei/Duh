module.exports = {
	name: 'avatar',
	description: 'send your avatar or the person you mentioned',
	aliases: ['icon', 'pfp', 'pic'],
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.channel.send(`${message.author.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' })}`);
		}
		const avatarList = message.mentions.users.map(user => {
			return `${user.displayAvatarURL({ size: 2048, dynamic: true, format: 'png' })}`;
		});
		message.channel.send(avatarList);
	},
};

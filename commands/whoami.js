const { format } = require('timeago.js');
module.exports = {
	name: 'whoami',
	description: 'Shows info about you!',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {

		const whoamiembed = {
			title: 'Your Profile:',
			color: 13238363,
			fields: [
				{
					name: 'You Are:',
					value: `<@${message.author.id}>`,
					inline: true,
				},
				{
					name: '\u200b',
					value: '\u200b',
					inline: true,
				},
				{
					name: 'Joined Discord:',
					value: `${message.author.createdAt.toLocaleString()}\n **${format(`${message.author.createdTimestamp}`)}**`,
					inline: true,
				},
				{
					name: 'ID:',
					value: `${message.author.id}`,
					inline: true,
				},
				{
					name: '\u200b',
					value: '\u200b',
					inline: true,
				},
				{
					name: 'Joined Server:',
					value: `${message.member.joinedAt.toLocaleString()}\n **${format(`${message.member.joinedTimestamp}`)}**`,
					inline: true,
				},
			],
			thumbnail: {
				url: `${message.author.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' })}`,
			},
		};


		message.channel.send({ embed: whoamiembed });
		// message.reply(`\nYou are: [**${message.author.username} #${message.author.discriminator}**]\nYour user ID is: [**${message.author.id}**]\nYour account was created at: [**${message.author.createdAt}**]\n and this is your avatar: ${message.author.displayAvatarURL({ size: 1024, dynamic: true, format: "png" })}`);
	},
};

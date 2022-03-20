const { format } = require('timeago.js');
module.exports = {
	name: 'user',
	description: 'Shows info about the user!',
	execute(message, args) {

	const user = args.length != 0 ? message.mentions.users.first() : message.author
    const embed = {
			title: 'Profile:',
			color: 13238363,
			fields: [
				{
					name: 'User:',
					value: `<@${user.id}>`,
					inline: true,
				},
				{
					name: '\u200b',
					value: '\u200b',
					inline: true,
				},
				{
					name: 'Joined Discord:',
					value: `${user.createdAt.toLocaleString()}\n **${format(`${user.createdTimestamp}`)}**`,
					inline: true,
				},
				{
					name: 'ID:',
					value: `${user.id}`,
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
				url: `${user.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' })}`,
			},
		};


		message.channel.send({ embed: embed });
		// message.reply(`\nYou are: [**${message.author.username} #${message.author.discriminator}**]\nYour user ID is: [**${message.author.id}**]\nYour account was created at: [**${message.author.createdAt}**]\n and this is your avatar: ${message.author.displayAvatarURL({ size: 1024, dynamic: true, format: "png" })}`);
	},
};

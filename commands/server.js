const { format } = require('timeago.js');
module.exports = {
	name: 'server',
	description: 'Shows server name',
	// eslint-disable-next-line no-unused-vars
	execute(message, args) {
		const serverembed = {
			color: 13238363,
			author: {
				name: `${message.guild.name}`,
				icon_url: `${message.guild.iconURL({ size: 1024, dynamic: true, format: 'png' })}`,
			},
			fields: [
				{
					name: 'Created At:',
					value: `${message.guild.createdAt.toLocaleString()}\n **${format(`${message.guild.createdTimestamp}`)}**`,
					inline: true,
				},
				{
					name: 'ID:',
					value: `${message.guild.id}`,
					inline: true,
				},
				{
					name: 'Owner:',
					value: `${message.guild.owner}`,
					inline: true,
				},
				{
					name: 'Channels:',
					value: `Total: **${message.guild.channels.cache.filter((c) => c.type !== 'category').size}** \n Voice: **${message.guild.channels.cache.filter(c => c.type === 'voice').size}** || Text: **${message.guild.channels.cache.filter(c => c.type === 'text').size}** `,
					inline: true,
				},
				{
					name: 'Members:',
					value: `Total: **${message.guild.memberCount}**\n Online: **${message.guild.members.cache.filter(m => m.presence.status === 'online').size}** `,
					inline: true,
				}
			],
		};


		message.channel.send({ embed: serverembed });
	},
};

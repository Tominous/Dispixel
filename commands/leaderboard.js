const Discord = require('discord.js');
const hypixeljs = require('hypixeljs');
const fs = require('fs');

const gameConversion = JSON.parse(fs.readFileSync('./lib/gameconversion.json').toString());
const allGames = Object.keys(gameConversion);

module.exports = {
	name: 'leaderboard',
	args: true,
	description: 'Fetches leaderboards for a given game.',
	usage: '[game]',
	execute(message, args) {
		if (allGames.indexOf(args[0]) > -1) {
			// makes sure we actually have the game.
			if (gameConversion[args[0]] != null) {
				hypixeljs.getLeaderboards((err, leaderboards) => {
					if (err) console.error(err);
					const leaderboardEmbed = new Discord.RichEmbed().setTitle(`${args[0]} leaderboard:`).setColor('#7f8fa6');
					const gameLeaderboard = leaderboards[gameConversion[args[0]]];

					if (gameLeaderboard != null) {
						gameLeaderboard.forEach(leaderboard => {
							leaderboardEmbed.addField(`${leaderboard.prefix} ${leaderboard.title}`, `Leaders: ${leaderboard.leaders.join(', ')}`);
						});
					}
				});
			}
		} else {
			message.channel.send(new Discord.RichEmbed()
				.setTitle(`Unknown Game Type: **${args[0]}`)
				.addField('Available Game Types:', allGames.join(', '))
				.setThumbnail('#e84118')
			);
		}
	},
};

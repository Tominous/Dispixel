const Discord = require('discord.js');
const hypixeljs = require('hypixeljs');
const fs = require('fs');

const gameConversion = JSON.parse(fs.readFileSync('../lib/gameconversion.json').toString());
const allGames = Object.keys(gameConversion);

module.exports = {
	name: 'leaderboard',
	args: true,
	description: 'Fetches leaderboards for a given game.',
	usage: 'leaderboard [game]',
	execute(message, args) {

			}
		} else {
			message.channel.send(new Discord.RichEmbed()
				.setTitle(`Unknown Game Type: **${args[0]}`)
				.addField('Available Game Types:', allGames.join(', '))
				.setThumbnail('#e84118')
			);
		}
	},
}

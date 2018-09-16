const config = require('../config.json'),
hypixel = require('./hypixel/hypixel.js'),
//images = require('./images/images.js'),
util = require('./util.js'),
Discord = require('discord.js');

module.exports = {
  listen: bot => bot.on('message', message => {
    if (!(new RegExp(`^${config.prefix}[A-Za-z0-9]+(.*)$`).test(message.content))) return;

    const args = message.content.replace(config.prefix, '').trim().split(/ +/g),
    cmd = args.shift().toLowerCase();

    const channel = message.channel,
    content = message.cleanContent,
    author = message.author,
    member = message.member,
    guild = message.guild;

    function error(err) {
      channel.send(util.errorEmbed(err)).catch(err => console.log(err));
    }

    util.isCommand(cmd, args, 'player', err => {
      if (err) return error(err);
      hypixel.getPlayerByName(args[0], (err, player) => {
        if (err) return error(err);
        /*images.playerCard(player, (err, path) => {
          var statsEmbed = new Discord.RichEmbed()
          .setTitle(`${player.displayname}'s General Stats`)
          .setColor(0x33cc33)
          //.setImage(`attachment://image.png`)
          .setThumbnail(`https://visage.surgeplay.com/head/${player.uuid}`);

          //Stats
          statsEmbed
          .addField('Rank:', `${player.displayRank ? `**[${player.displayRank}]** *(Actually ${player.baseRank})*` : `**[${player.baseRank}]**`}`, true)
          .addField('Level:', player.level, true)
          .addField('Karma:', player.karma ? util.numberWithCommas(player.karma) : 0)
          .addField('Achievement Points:', player.achievementPoints ? util.numberWithCommas(player.achievementPoints) : 0)
          .addField('Joined: ', (!  player.firstJoined ? util.formatAPITime(player.firstJoined) : `Hasn't Joined`));

          channel.send(statsEmbed);
        });*/
        const playerEmbed = new Discord.RichEmbed()
            .setTitle(player.displayname + "'s Statistics")
            .setThumbnail("https://visage.surgeplay.com/face/" + player.uuid)
            .addField('Rank:', `${player.displayRank ? `**[${player.displayRank}]** *(Actually ${player.baseRank})*` : `**[${player.baseRank}]**`}`, true)
            .addField('Level:', player.level, true)
            .addField('Karma:', player.karma ? util.numberWithCommas(player.karma) : 0)
            .addField('Achievement Points:', player.achievementPoints ? util.numberWithCommas(player.achievementPoints) : 0)
            .addField('Joined: ', (!  player.firstJoined ? util.formatAPITime(player.firstJoined) : `Hasn't Joined`));
          message.channel.send(playerEmbed);

      });
    });
  })
}

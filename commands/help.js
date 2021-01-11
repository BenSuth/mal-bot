module.exports = {
    name: '!anime ~help',
    description: 'Help user use MAL-bot',
    execute(msg, args) {
      msg.reply('\n> **Anime-Bot Help Menu**\n> To start using Anime-bot type\n> • `!anime <name_of_anime>` returns a link to the anime on MyAnimeList\n > • `!manga <name_of_manga>` returns a link to the manga on MyAnimeList\n > **Tags**\n > You can add a tag at the end of the anime/manga name.\n > ie. `!anime one piece ~desc`\n > • `~desc` returns a desciption of the anime/manga\n > **Source**\n > https://myanimelist.net/');
    },
};
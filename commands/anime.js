const MAL = require('./mal scraper/mal.js');
const help = require('./help.js');
const random = require('./random.js');
const description = require('./description.js');

module.exports = {
    name: '!anime',
    description: 'Get an anime from My Anime List',
    execute(msg, args) 
    {
        let enteredSubCommand = false;
        let requestedDescription = false;
        let anime = [];
        for (const arg of args)
        {
            switch (arg)
            {
                case '~help':
                    help.execute(msg, args);
                    enteredSubCommand = true;
                    break;
            
                case '~random':
                    random.execute(msg, args, 'anime');
                    enteredSubCommand = true;
                    break;

                case '~desc':
                    requestedDescription = true;
                    break;

                default: 
                    anime.push(arg);
                    break;
            } 
        }  

        if (!Array.isArray(anime) || !anime.length && enteredSubCommand) return;

        if (requestedDescription)
        {
            description.execute(msg, anime, 'anime');   
            return;         
        }
        MAL.Search(anime, 'anime').then((result) => {
                msg.reply(result);
            })
            .catch((err) => {
                msg.reply('Anime not found');
                help.execute(msg, args);
            });
    },
};
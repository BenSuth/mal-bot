const MAL = require('./mal scraper/mal.js');
const help = require('./help.js');
const random = require('./random.js');
const description = require('./description.js');

module.exports = {
    name: '!manga',
    description: 'Get a manga from My Anime List',
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
                    random.execute(msg, args, 'manga');
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
            description.execute(msg, anime, 'manga');   
            return;         
        }
        MAL.Search(anime, 'manga').then((result) => {
                msg.reply(result);
            })
            .catch((err) => {
                msg.reply('manga not found');
                help.execute(msg, args);
            });
    },
};
const MAL = require('./mal scraper/mal.js');

module.exports = {
    name: '!anime ~desc',
    description: 'Returns the description of the anime',
    execute(msg, args, type) {
        MAL.Description(args, type).then(result => {
            msg.reply(result);
        })
        .catch(err => {
            msg.reply(err);
        })
    },
};
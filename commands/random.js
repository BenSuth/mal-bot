const MAL = require('./mal scraper/mal.js');

module.exports = {
    name: '!anime ~random',
    description: 'Suggests a random anime',
    execute(msg, args, type) {
        MAL.Random(type).then((result) => {
            msg.reply(result);
        })
        .catch((err) => {
            random.execute(msg, args, MAL.Random());
        });
    }
};
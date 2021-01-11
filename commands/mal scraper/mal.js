const cheerio = require('cheerio');
const rp = require('request-promise');

const Search = (name, type) => {
  const url = 'https://myanimelist.net/' + type + '.php?q=';
  return new Promise((resolve, reject) => {
    rp(url + name.join('%20') + '&cat=' + type)
      .then(function(html){
        const resultList = cheerio('tbody > tr > td > a', html);
        for (const result of resultList)
        {
          if (result['attribs']['href'].includes('https://myanimelist.net/'))
          {
            resolve(result['attribs']['href']);
            return;
          }
        } 
        resolve([]);
      })
      .catch(function(err){
        reject(err);
      });
  });
}

const Random = (type) => {
  return new Promise((resolve, reject) => {
    resolve ('https://myanimelist.net/' + type + '/' + Math.floor(Math.random()*4000 + 1));    
    return;
  });
};

const Description = async (name, type) => {
  const rUrl = await Search(name, type);
  console.log(rUrl);

  const tag = (type == 'anime') ? 'p' : 'span';
  return new Promise((resolve, reject) => {
    rp(rUrl)
      .then((html) => {
        const result = cheerio('tbody >  tr > td > ' + tag + '[itemprop = "description"]', html); 
        let description = "\n";

        for (const desc of result.get(0)['children'])
        {
          if (desc['data'] != '\n' && desc['data'] != undefined && desc['type'] == 'text')
          {
            if (desc['data'].replace(/\s/g, '')) {
              description += desc['data'].replace(/\n/g,'') + "\n\n";
            }            
          }             
          if (desc['type'] == 'tag' && desc['name'] == 'i') 
          {
            description = description.slice(0, description.length - 2) + ' *' + desc['children'][0]['data'] + '*';
          }    
        }
        resolve(description + 'Description fount at ' + rUrl);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      })
    return;
  });
}
module.exports = {Search, Random, Description};
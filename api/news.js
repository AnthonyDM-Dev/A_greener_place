// News API. Get the articles you want from around the world!

// Importing libraries
var axios = require('axios');

// Setting parameters
var params = {
    sortBy: 'publishedAt',
    lang: 'en',
    q: 'pollution',
    pageSize: '5',
    exclude: 'seattlepi.com, startribune.com',
    apiKey: 'fe94bcddb4c540cd836dc6ddafe8a5f9', // <= Sarà rimossa dopo il feedback di s2i.
}

// fetchNews: fetch filtered articles.
var fetchNews = axios.get(`https://newsapi.org/v2/everything?sortBy=${params.sortBy}&language=${params.lang}&q=${params.q}&pageSize=${params.pageSize}&excludeDomains=${params.exclude}&apiKey=${params.apiKey}`)
    .then(res => {
        return res.data.articles;
    })
    .catch(error => {
        console.log(error);
        return array = [{ title: 'Something wrong with fetching data. Please check the backend.', url: '' }];
    });

  module.exports = {
    fetchNews: fetchNews,
}
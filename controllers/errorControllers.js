// get404: page not found.
const get404 = (req, res, next) => {
    res.render('errorPage', {
        message: 'Page not found',
    });
};

// get500: error page.
const get500 = (req, res, next) => {
    res.render('errorPage', {
        message: 'Ooops! Something bad happened!',
    });
};

module.exports = {
    get404: get404,
    get500: get500,
};
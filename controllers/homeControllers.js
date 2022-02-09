const news = require('../api/news');
const Report = require('../models/models');

// redirectToHomepage: redirect '/' & '/home' to '/homepage'.
const redirectToHomepage = async (req, res, next) => {
    res.redirect('/homepage');
};

// getHomepage: homepage view.
const getHomepage = async (req, res, next) => {
    try {
        // Data fetching
        const lastReports = await Report.fetchLastReports();
        const newsList = await news.fetchNews;

        // Data manipulation
        var reports = [];
        lastReports.forEach(row => {
            // Date & time string generation
            var d = new Date(row.date);
            var date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
            var time = d.getHours() + ':' + d.getMinutes();
            // Location string generation
            var streetNumber = row.streetNumber ? (', ' + row.streetNumber) : '';
            var location = row.address + streetNumber + ' - ' + row.city + ', ' + row.state;
            // Data definition
            var report = {
                id: row.id,
                username: row.username,
                fullDate: row.date,
                date: date,
                time: time,
                location: location,
                pollutionStatus: row.pollutionStatus,
                image: row.image,
            };
            reports.push(report);
        });
        // Sorting reports by time
        reports.sort((a, b) => { 
            let fa = a.fullDate;
            let fb = b.fullDate;

            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0; 
        });
        // Sending response back
        res.render('index', {
            news: newsList,
            page: 'homepage',
            reports: reports,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

module.exports = {
    getHomepage: getHomepage,
    redirectToHomepage: redirectToHomepage,
};
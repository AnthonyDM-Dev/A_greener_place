const news = require('../api/news');
const Report = require('../models/models');

// getHistory: historyPage view.
const getHistory = async (req, res, next) => {
    try {
        // Pagination handling.
        var pageNumber = 1;
        var pageSize = 10;
        var hasPageQuery = Object.keys(req.query).includes('page');

        // Pagination number validation
        if (hasPageQuery && !isNaN(req.query['page'])) {
            if (req.query['page'] > 0) {
                pageNumber = Math.trunc(req.query['page']);
            }
        };
        var pageRange = [(pageNumber * pageSize - pageSize), (pageNumber * pageSize)];

        // Data fetching
        const newsList = await news.fetchNews;
        // DB Queries
        const totalReports = await Report.fetchReportsCount();
        const history = await Report.fetchHistory(pageRange[0], pageRange[1]);

        // Data manipulation
        var reports = [];
        history.forEach(row => {
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
        })
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
            page: 'earth-status',
            reports: reports,
            totalReports: totalReports[0]['COUNT (*)'],
            totalPages: Math.trunc(totalReports[0]['COUNT (*)']/10) + 1,
            currentPage: req.query.page || 1,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
};

module.exports = {
    getHistory: getHistory,
};
const multer  = require('multer');
const { upload } = require('../utils/multer');
var fs = require('fs');
const Report = require('../models/models');
const news = require('../api/news');

// getReportPage: reportPage view.
const getReportPage = async (req, res, next) => {
    try {
        // Data fetching
        const newsList = await news.fetchNews;

        // Sending response
        res.render('index', {
            news: newsList,
            page: 'report',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
};

// postReport: let you post a new report to database.
const postReport = async (req, res, next) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log('MULTER ERROR: ', err);
        } else if (err) {
          // An unknown error occurred when uploading.
          console.log('UNKNOWN MULTER ERROR: ', err);
        }
        // Everything went fine.
        console.log('REQ.BODY: ', req.body);
        console.log('IMAGE INFO: ', req.file);

        // Data validation: rules definition
        var allowedValues = ['minor', 'moderate', 'severe', 'critical']; // Pollution rule
        var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i; // Image rule
        var allowedSize = 3000000; // Image rule
        var dataRules = {
            username: { max: 35, null: false },
            state: { max: 60, null: false },
            city: { max: 60, null: false },
            address: { max: 200, null: false },
            streetNumber: { max: 10, null: true },
            pollution: { max: 8, null: false },
        }
        var errors = [];
        
        // Data validation: length & null fields
        function GetPropertyValue(obj1, dataToRetrieve) {
            // GetPropertyValue(): get key values inside object.
            return dataToRetrieve
                .split('.')
                .reduce(function(o, k) {
                return o && o[k];
                }, obj1);
        };
        
        for (let key of Object.keys(req.body)) {
            let rules = GetPropertyValue(dataRules, key);
            console.log('RULES: ', rules.max);
            let isMaxValid = req.body[key].length <= rules.max;
            let isMinValid = rules.null ? true : req.body[key].length > 0;
            if (isMaxValid && isMinValid) continue;
            errors.push(key);
        };

        // Data validation: pollution field
        if (!allowedValues.includes(req.body.pollution) && !errors.includes('pollution')) {
            errors.push('pollution');
        }
        // Data validation: image field
        let imageError = '';
        console.log('IMAGE: ', req.file);
        if (req.file === undefined || !allowedExtensions.exec(req.file.originalname) || req.file.size >= allowedSize ) {
            console.log('criteri: ', req.file)
            errors.push('image')
            imageError = 'Please check size & format of your image before uploading!';
        }

        // Validation unsuccessful: error popup response
        let errorsObj = {
            errors: errors,
            imageError: imageError,
        }
        console.log(errors);
        if (errorsObj.errors.length !== 0 || errorsObj.imageError !== '') {
            let popupContent = {
                title: 'Upload failed!',
                description: 'You did not fill this fields correctly:',
                sub1: errorsObj.errors,
                sub2: errorsObj.imageError,
                buttons: [
                    { tag: 'a', href: '/', textContent: 'Go to homepage', class: "btn s2i-button-primary text-white s2i-button-big m-2" },
                    { tag: 'button', type: 'button', textContent: 'Try again', onclick: 'closePopup()', class: "btn s2i-button-primary text-white s2i-button-big m-2"},
                ]
            }
            if (req.file) {
                fs.unlink('./assets/fake-cms/' + req.file.filename, function(err, data) {
                    if (err) console.log(err);
                    if (data) console.log(data);
                });
            }
            return res.send(popupContent);
        }

        // Validation successful: Posting on Database
        var imgsrc = `http://${process.env.HOST}:${process.env.PORT}/assets/fake-cms/` + req.file.filename;
        const postReport = await Report.postReport(
            req.body.username,
            req.body.state,
            req.body.city,
            req.body.address,
            req.body.streetNumber,
            req.body.pollution,
            imgsrc
        );
        console.log('POST RESPONSE: ', postReport);
        
        // Response
        let popupContent = {
            title: 'Planet earth thank you!',
            description: 'Your form has been submitted',
            sub1: 'Find out your post under "Earth status" section',
            sub2: '',
            buttons: [
                { tag: 'a', href: '/earth-status', textContent: 'To Earth status', class: "btn s2i-button-primary text-white s2i-button-big m-2" },
                { tag: 'a', href: '/report', textContent: 'Upload another one', class: "btn s2i-button-primary text-white s2i-button-big m-2" },
            ]
        }
        return res.send(popupContent);
    });
}

module.exports = {
    getReportPage: getReportPage,
    postReport: postReport,
};
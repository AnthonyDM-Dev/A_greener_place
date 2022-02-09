// Importing database
var db = require('../utils/database');

// Report model
module.exports = class Report {
    // Model constructor
    constructor(id, username, state, city, address, streetNumber, date, pollutionStatus, image) {
        this.id = id,
        this.username = username,
        this.state = state,
        this.city = city,
        this.address = address,
        this.streetNumber = streetNumber,
        this.date = date,
        this.pollutionStatus = pollutionStatus,
        this.image = image
    }

    // Fetching all last reports.
    static async fetchLastReports() {
        let range = [0, 3];
        let [data] = await db.execute(`SELECT * FROM reports ORDER BY date DESC LIMIT ${ range[0] }, ${ range[1] }`);
        let reports = [];
        data.forEach(report => { reports.push(new Report(...Object.values(report))) });
        return reports;
    }
    
    // Fetching reports history.
    static async fetchHistory(pageMin, pageMax) {
        let [data] = await db.execute(`SELECT * FROM reports ORDER BY date DESC LIMIT ${ pageMin }, ${ pageMax }`);
        let reports = [];
        data.forEach(report => { reports.push(new Report(...Object.values(report))) });
        return reports;
    }

    // Fetching the total reports count.
    static async fetchReportsCount() {
        let [data] = await db.execute('SELECT COUNT (*) FROM reports');
        return data;
    }

    // Posting a new report to database.
    static postReport(a, b, c, d, e, f, g) {
        let query = `INSERT INTO reports (username, state, city, address, streetNumber, pollutionStatus, image) VALUES ( ?, ?, ?, ?, ?, ?, ?)`;
        return db.execute(query, [a, b, c, d, e, f, g]);
    }
}
const { google } = require("googleapis");

async function getSpreadsheetData() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();
    
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    // take from sheet link
    const spreadsheetId = "тут лінк";

    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Лист1",
    });

    console.log(getRows.data);
};

getSpreadsheetData()

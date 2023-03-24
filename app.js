const express = require("express");
const { google } = require("googleapis");

const app = express();


app.get("/", async (req, res) => {
    
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();
    
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    // take from sheet link
    const spreadsheetId = "тут айдішка з посилання на файл";

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

    res.send(getRows.data);
});

app.listen(3000, (req, res) => console.log("running on 3000"));
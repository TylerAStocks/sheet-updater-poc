'use server';
import { google } from "googleapis";

const sheetRange = 'Sheet1!A1:C40';

const glAuth = await google.auth.getClient({
    projectId: process.env.PROJECT_ID,
    credentials: {
        "type": "service_account",
        "project_id": process.env.PROJECT_ID,
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY,
        "client_email": process.env.CLIENT_EMAIL,
        "universe_domain": "googleapis.com"
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const glSheets = google.sheets({ version: "v4", auth: glAuth });

export async function getSheetData() { 

    const data = await glSheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: sheetRange,
    });

    return { data: data.data.values };
}


export async function postSheetData(input: any[]) {
    await glSheets.spreadsheets.values.append({
        auth: glAuth,
        spreadsheetId: process.env.SHEET_ID,
        range: sheetRange,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [input]
        }
    })
}
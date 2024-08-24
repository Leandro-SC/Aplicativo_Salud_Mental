// utils/googleMeet.js
const { google } = require('googleapis');
const calendar = google.calendar('v3');

async function createGoogleMeetLink(appointment) {
    const auth = new google.auth.JWT(
        process.env.CLIENT_EMAIL,
        null,
        process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        ['https://www.googleapis.com/auth/calendar']
    );

    const event = {
        summary: 'Cita Médica',
        start: { dateTime: appointment.date },
        end: { dateTime: /* end time */ },
        conferenceData: {
            createRequest: { requestId: 'sample123', conferenceSolutionKey: { type: 'hangoutsMeet' } }
        }
    };

    const res = await calendar.events.insert({
        auth,
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1
    });

    return res.data.hangoutLink;
}

module.exports = { createGoogleMeetLink };

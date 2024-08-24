class Appointment {
    constructor(id, professional_id, client_id, date, type, meet_link, status) {
        this.id = id;
        this.professional_id = professional_id;
        this.client_id = client_id;
        this.date = date;
        this.type = type;
        this.meet_link = meet_link;
        this.status = status;
    }
}


module.exports = Appointment;
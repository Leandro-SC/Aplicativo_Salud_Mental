class Chat {
    constructor(id, sender_id, receiver_id, message, timestamp) {
        this.id = id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.message = message;
        this.timestamp = timestamp;
    }
}

module.exports = Chat;
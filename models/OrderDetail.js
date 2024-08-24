class OrderDetail {
    constructor(id, order_id, book_id, quantity, subtotal) {
        this.id = id;
        this.order_id = order_id;
        this.book_id = book_id;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }
}

module.exports = OrderDetail;
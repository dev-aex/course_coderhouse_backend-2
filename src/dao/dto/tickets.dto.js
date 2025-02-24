import generateTicketCode from "../../utils/ticketCode.js";

export default class Ticket {
  constructor(ticket) {
    this.code = generateTicketCode();
    this.purchase_datetime;
    this.amount = Number(ticket.amount);
    this.purchaser = ticket.purchaser;
  }
}

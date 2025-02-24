import ticketsModel from "../models/tickets.model.js";
import { daoError } from "../../utils/errorsHandler.js";

export default class Ticket {
  getAll = async () => {
    try {
      const tickets = await ticketsModel.find();
      return tickets;
    } catch (e) {
      throw new daoError("Fail getting all the tickets");
    }
  };

  getById = async (id) => {
    try {
      const ticket = await ticketsModel.findOne({ _id: id });
      return ticket;
    } catch (e) {
      throw new daoError("Fail getting ticket by id");
    }
  };

  getByCode = async (code) => {
    try {
      const ticket = await ticketsModel.findOne({ code });
      return ticket;
    } catch (e) {
      throw new daoError("Fail getting ticket by code");
    }
  };

  create = async (ticket) => {
    try {
      const newTicket = await ticketsModel.create(ticket);
      return newTicket;
    } catch (e) {
      throw new daoError("Fail creating ticket");
    }
  };

  update = async (id, newData) => {
    try {
      const ticket = await ticketsModel.updateOne(
        { _id: id },
        { $set: newData }
      );
      return ticket;
    } catch (e) {
      throw new daoError("Fail updating ticket");
    }
  };

  delete = async (id) => {
    try {
      const result = await ticketsModel.deleteOne({ _id: id });
      return result;
    } catch (e) {
      throw new daoError("Fail deleting ticket");
    }
  };
}

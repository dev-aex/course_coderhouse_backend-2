import Ticket from "../dao/classes/tickets.dao.js";
import Cart from "../dao/classes/carts.dao.js";
import ticketsDto from "../dao/dto/tickets.dto.js";
import { controllerError } from "../utils/errorsHandler.js";
import cartsController from "../controllers/carts.controller.js";

const ticketService = new Ticket();
const cartsService = new Cart();

// FIND ALL TICKETS
const findAll = async () => {
  const tickets = await ticketService.getAll();

  if (!tickets) throw new controllerError("Tickets not found");

  return tickets;
};

// FIND ONE TICKET BY ID
const findOneById = async (id) => {
  const ticket = await ticketService.getById(id);

  if (!ticket) throw new controllerError("Ticket not found");

  return ticket;
};

// UPDATE ONE TICKET BY ID
const updateOneById = async (id, newData) => {
  const ticketFound = await ticketService.getById(id);

  if (!ticketFound) throw new controllerError("Ticket not found");

  const { purchaser, amount } = newData;

  const updateTicket = {
    purchaser,
    amount,
  };

  const result = await ticketService.update(ticketFound._id, updateTicket);

  if (!result) throw new controllerError("Fail updating ticket");

  return result;
};

// CREATE TICKET
const createOne = async (cart) => {
  const cartFound = await cartsService.getById(cart);

  if (!cartFound) throw new controllerError("Cart not found");

  const ticket = {
    amount: cartFound.total,
    purchaser: cartFound.user,
  };

  const formattedTicket = new ticketsDto(ticket);

  if (!formattedTicket) throw new controllerError("Fail formatting ticket");

  const newTicket = await ticketService.create(formattedTicket);

  if (!newTicket) throw new controllerError("Error creating ticket");

  const deletingProducts = await cartsController.deleteAllProductsOnCart(cart);

  if (!deletingProducts)
    throw new controllerError("Fail deleting all products on cart");

  return newTicket;
};

// DELETE TICKET
const deleteOneById = async (id) => {
  const result = await ticketService.delete(id);

  if (!result) throw new controllerError("Fail deleting ticket");

  return result;
};

export default {
  findAll,
  createOne,
  findOneById,
  deleteOneById,
  updateOneById,
};

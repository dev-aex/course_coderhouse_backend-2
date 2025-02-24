const generateTicketCode = () => {
  const date = new Date();
  const dateDay = date.getDay();
  const dateMonth = date.getMonth() + 1;
  const dateYear = date.getFullYear();

  let code = Math.floor(Math.random() * 900) * 100;

  const ticket = `T-${code}_${dateDay}-${dateMonth}-${dateYear}`;

  return ticket;
};

export default generateTicketCode;

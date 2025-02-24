class daoError extends Error {
  constructor(message) {
    super(message);
    this.name = "daoError";
    this.stack = `${this.name}: ${this.message}`;
  }
}

class controllerError extends Error {
  constructor(message) {
    super(message);
    this.name = "controllerError";
    this.stack = `${this.name}: ${this.message}`;
  }
}

class routeError extends Error {
  constructor(message) {
    super(message);
    this.name = "routeError";
    this.stack = `${this.name}: ${this.message}`;
  }
}

class authError extends Error {
  constructor(message) {
    super(message);
    this.name = "authError";
    this.stack = `${this.name}: ${this.message}`;
  }
}

class validationError extends Error {
  constructor(message) {
    super(message);
    this.name = "validationError";
    this.stack = `${this.name}: ${this.message}`;
  }
}

class mailerError extends Error {
  constructor(message) {
    super(message);
    this.name = "mailerError";
    this.stack = `${this.name}: ${this.message}`;
  }
}

export {
  daoError,
  controllerError,
  routeError,
  authError,
  validationError,
  mailerError,
};

export class ApplicationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ApplicationError';
    }
  }
declare namespace Express {
  export interface Request {
    manager: {
      id: string;
      name: string;
    };
  }
}

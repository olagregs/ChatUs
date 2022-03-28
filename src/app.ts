import 'reflect-metadata';
import express from 'express';

import './database';

const app = express();

app.use(express.json());

app.get("/client", (reques, response) => {
  return response.status(200).json({
    message: "Server is running"
  });
});

app.listen(3333, () => console.log("Server is running at port 3333..."));
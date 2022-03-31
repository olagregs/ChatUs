import 'reflect-metadata';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import './database';
import { routes } from '../routes';

const app = express();
const http = createServer(app);
const io = new Server(http);

app.use(express.json());

io.on("connection", (socket: Socket) => {
  console.log(`WS ${socket.id} has been connected!`);
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/client", (request, response) => {
  return response.render("html/client.html");
});

app.use(routes);

export { http, io }
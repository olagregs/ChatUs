const socket = io();
let allConnections = null;

socket.on("connect", () => {
  socket.on("connections_to_attend", (connections) => {
    allConnections = connections;

    const client_template = document.getElementById("connection_template").innerHTML;
    document.getElementById("list_users").innerHTML = "";

    connections.forEach((connection) => {
      const rendered = Mustache.render(client_template, {
        email: connection.user.email,
        room: connection.socket_id
      });

      document.getElementById("list_users").innerHTML += rendered;
    });
  });
});

function contactUser(room) {
  const connection = allConnections.find(connection => connection.socket_id === room);

  const chats = document.getElementById("chats").innerHTML;

  const chatOpened = chats.includes(connection.user.email);

  if (chatOpened) {
    alert("Este chat já se encontra aberto");

    return 0;
  }

  const chatWindow = document.getElementById("chat_box_template").innerHTML;

  const rendered = Mustache.render(chatWindow, {
    email: connection.user.email,
    id: connection.user.id
  });

  document.getElementById("chats").innerHTML += rendered;
}
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

  const params = {
    user_id: connection.user.id
  }

  socket.emit("admin_list_user_message", params, (messages) => {
    const allMessagesClient = document.getElementById(`allMessages_${params.user_id}`);

    messages.forEach((message) => {
      if (message.admin_id === null) {
        const messageBox = document.createElement("div");

        messageBox.className = "client";
        messageBox.innerHTML += `<span class="client_message">${message.text}</span>`;
        messageBox.innerHTML += `<span class="client_date">${dayjs(message.created_at).format(("DD/MM - HH:mm"))}</span>`;

        allMessagesClient.appendChild(messageBox);
      } else {
        const messageBox = document.createElement("div");

        messageBox.className = "admin";
        messageBox.innerHTML += `<span class="admin_message">${message.text}</span>`;
        messageBox.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format(("DD/MM - HH:mm"))}</span>`;

        allMessagesClient.appendChild(messageBox);
      }
    });
  });
}

function sendMessage(id) {
  // const allMessagesAdmin = document.getElementById(`wrapper_admin_${id}`);
  const allMessagesAdmin = document.getElementById(`allMessages_${id}`);
  const connection = allConnections.find(connection => connection.user_id === id);
  let text = document.getElementById(`send_message_${id}`);
  const messageBox = document.createElement("div");

  if (text.value == "") {
    return 0;
  }

  messageBox.className = "admin";
  messageBox.innerHTML += `<span class="admin_message">${text.value}</span>`;
  messageBox.innerHTML += `<span class="admin_date">${dayjs().format("DD/MM - HH:mm")}</span>`;

  allMessagesAdmin.appendChild(messageBox);

  const params = {
    user_id: connection.user.id,
    text: text.value,
    room: connection.socket_id
  }

  socket.emit("admin_send_message", params);

  text.value = "";
}

socket.on("client_send_to_admin", (params) => {
  const { created_at, text, user_id } = params;

  const allMessagesAdmin = document.getElementById(`allMessages_${user_id}`);
  const messageBox = document.createElement("div");

  messageBox.className = "client";
  messageBox.innerHTML += `<span class="client_message">${text}</span>`;
  messageBox.innerHTML += `<span class="client_date">${dayjs(created_at).format("DD/MM HH:mm")}</span>`;

  allMessagesAdmin.appendChild(messageBox);
});
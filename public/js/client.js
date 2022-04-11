document.querySelector("#start_chat").addEventListener('click', () => {
  const socket = io();

  let room = null;

  const email = document.getElementById("email").value;

  const text = document.getElementById("text").value;

  const iniciate_support = document.getElementById("iniciate_support");
  iniciate_support.style.display = "none";

  const in_support = document.getElementById("in_support");
  in_support.style.display = "block";

  socket.on("connect", () => {
    const params = {
      email,
      text
    }

    socket.emit("first_access", params, (callback, error) => {
      if (error) {
        console.error(err);
      } else {
        console.log(callback)
      }
    });

    socket.on("client_list_all_messages", (messages) => {
      const client_message = document.getElementById("client_template").innerHTML;
      const admin_message = document.getElementById("admin_template").innerHTML;

      messages.forEach(message => {
        if (message.admin_id === null) {
          const rendered = Mustache.render(client_message, {
            email,
            client_message: message.text,
            client_date: dayjs(message.created_at).format("DD/MM - HH:mm")
          });

          document.getElementById("messages").innerHTML += rendered;
        } else {
          const rendered = Mustache.render(admin_message, {
            admin_message: message.text,
            admin_date: dayjs(message.created_at).format("DD/MM - HH:mm")
          });

          document.getElementById("messages").innerHTML += rendered;
        }
      });
    });
  });

  socket.on("admin_send_message_to_client", (message) => {
    const { admin_id, text, created_at } = message;
    room = admin_id;

    const admin_message = document.getElementById("admin_template").innerHTML;

    const rendered = Mustache.render(admin_message, {
      email,
      admin_message: text,
      admin_date: dayjs(created_at).format("DD/MM - HH:mm")
    });

    document.getElementById("messages").innerHTML += rendered;
  });

  document.getElementById("send_message").addEventListener("click", () => {
    const client_template = document.getElementById("client_template").innerHTML;
    let text = document.getElementById("message");

    const rendered = Mustache.render(client_template, {
      email,
      client_message: text.value,
      client_date: dayjs().format("DD/MM - HH:mm")
    });

    document.getElementById("messages").innerHTML += rendered;

    const params = {
      admin_id: room,
      text: text.value
    }

    socket.emit("client_send_message", params);

    text.value = "";
  });
});
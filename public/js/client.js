document.querySelector("#start_chat").addEventListener('click', () => {
  const socket = io();

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
});
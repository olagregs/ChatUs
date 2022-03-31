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
      if (err) {
        console.error(err);
      } else {
        console.log(callback)
      }
    });
  });
});
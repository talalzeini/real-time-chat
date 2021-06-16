// console.log("TESTING ACCESS TO PUBLIC FOLDER");
$(document).ready(function () {
  var socket = io("http://localhost:3000", { transports: ["websocket"] });

  var username = $("#username");
  var change_username = $("#change-username");
  var feedback = $("#feedback");
  var message = $("#message");
  var change_message = $("#change-message");

  change_message.click(function () {
    socket.emit("new_message", { message: message.val() }); // in order to emit (send) an event (message here) to other sockets (clients)
  });

  // listen to event
  socket.on("new_message", (data) => {
    message.val("");
    var numberOfMessages =
      document.getElementById("feedback").childElementCount;
    console.log(numberOfMessages);

    let date = new Date();
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    var time = date.toLocaleTimeString("en-us", options);
    feedback.append(
      "<div class='chat-r'><div id='sp" +
        numberOfMessages +
        "' class='sp' ></div><div class='mess mess-r'> <p>" +
        data.message +
        "</p><div class='check'><span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" +
        data.username +
        " </span></div><div class='time'><span>" +
        time +
        "</span></div></div></div>"
    );
    if (numberOfMessages % 2 == 0) {
      document.getElementById("sp" + numberOfMessages).classList.remove("sp");
    } else if (numberOfMessages % 2 != 0) {
      document.getElementById("sp" + numberOfMessages).classList.add("sp");
    }
  });
  change_username.click(function () {
    socket.emit("change_username", {
      username: username.val(),
    }); // in order to emit (send) an event (username here) to other sockets (clients)
  });
});

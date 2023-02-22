function getOrderHistory() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username')
  console.log(username)

  fetch(`http://localhost:8080/user/${username}/order`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        document.getElementById("response").innerHTML = response.error;
      } 
    });
}

var close = document.getElementsByClassName("closebtn");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function () {
      div.style.display = "none";
    }, 600);
  };
}

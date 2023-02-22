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
      } else {
        if (response.length == 0) {
          document.getElementsByClassName("insert-record").innerHtml =
            "No Transactions found";
          return;
        } else {
          let table = document.getElementById("tableData");
          for (
            var transaction = 0;
            transaction < response.length;
            transaction++
          ) {
            let row = table.insertRow(-1);

            let c1 = row.insertCell(0);
            let c2 = row.insertCell(1);
            let c3 = row.insertCell(2);
            let c4 = row.insertCell(3);
            let c5 = row.insertCell(4);

            // Add data to c1 and c2
            c1.innerText = response[transaction].orderId;
            c2.innerText = response[transaction].type;
            c3.innerText = response[transaction].quantity;
            c4.innerText = response[transaction].price;
            c5.innerText = response[transaction].esopType;

        
          }
        }
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

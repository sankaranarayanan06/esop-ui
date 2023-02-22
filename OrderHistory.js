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

            if (response[transaction].filled) {
              var filledLogLength = response[transaction].filled.length;
              const tbl = document.createElement("table");
              const tblBody = document.createElement("tbody");
              const innerTableRow = document.createElement("tr");

              const cell1 = document.createElement("th");
              const cell2 = document.createElement("th");
              const cell3 = document.createElement("th");

              const cellText1 = document.createTextNode("Buyer Order Id");
              const cellText2 = document.createTextNode("Placed Quantity");
              const cellText3 = document.createTextNode("Price");

              cell1.appendChild(cellText1);
              cell2.appendChild(cellText2);
              cell3.appendChild(cellText3);

              innerTableRow.append(cell1);
              innerTableRow.append(cell2);
              innerTableRow.append(cell3);

              row.appendChild(innerTableRow);

              for (
                var filledLogRow = 0;
                filledLogRow < filledLogLength;
                filledLogRow++
              ) {
                const innerTableRow = document.createElement("tr");
                const cell1 = document.createElement("td");
                const cell2 = document.createElement("td");
                const cell3 = document.createElement("td");

                const cellText1 = document.createTextNode(
                  response[transaction].filled[filledLogRow].orderId
                );
                const cellText2 = document.createTextNode(
                  response[transaction].filled[filledLogRow].quantity
                );
                const cellText3 = document.createTextNode(
                  response[transaction].filled[filledLogRow].price
                );

                cell1.appendChild(cellText1);
                cell2.appendChild(cellText2);
                cell3.appendChild(cellText3);

                innerTableRow.append(cell1);
                innerTableRow.append(cell2);
                innerTableRow.append(cell3);
                row.appendChild(innerTableRow);
              }
            }
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

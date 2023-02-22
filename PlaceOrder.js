var untoggleEsopType = () =>{
  document.getElementById("esop-type").style.visibility = "hidden";
}
function placeOrder() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username')
  console.log(username)

  fetch(`http://localhost:8080/user/${username}/order`, {
    method: "POST",
    body: JSON.stringify({
      quantity: document.getElementById("quantity").value,
      type: document.getElementById("order-type").value,
      price: document.getElementById("price").value,
      esopType: document.getElementById("esop-type").value,
    }),
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if(json.error){
        var errors = ""
        for(let elements=0;elements<json.error.length;elements++){
          var errors = errors + "<br />" + json.error[elements]
        }
        document.getElementById("response").innerHTML = errors
      }
      else {
        document.getElementById("response").innerHTML = "Order Placed Successfully"
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

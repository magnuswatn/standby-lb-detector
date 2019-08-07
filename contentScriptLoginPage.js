chrome.storage.local.get([location.hostname], items => {
  if (items[location.hostname] === "standby") {
    const warningText = document.getElementById("message");

    if (warningText.innerHTML) {
      warningText.innerHTML += "<br /><br />";
    }

    warningText.innerHTML +=
      "This device was standby the last time you logged in!";
    warningText.style.display = "block";
  }
});

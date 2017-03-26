var updateStatus = true;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.operation == "checkStatus") {
            // We wait 500 ms so that the XUI scripts 
            // have time to inject the result into the DOM
            setTimeout(checkIfStandby, 500);
        } else if (request.operation == "stopUpdating") {
            updateStatus = false;
            document.body.classList.remove('standby-lb-detector-css');
        }
    }
);

function checkIfStandby() {     
    var statusInfo = document.getElementById('status').innerText.toLowerCase();

    if (statusInfo.indexOf('standby') !== -1) {
        if (updateStatus) {
            document.body.className = 'standby-lb-detector-css';
            chrome.runtime.sendMessage({operation: "activateButton"});
        }
    } else {
        // We enable updating if the box is active
        // So that we notify if the box goes standby -> active -> standby
        updateStatus = true;
        document.body.classList.remove('standby-lb-detector-css');
    }
}
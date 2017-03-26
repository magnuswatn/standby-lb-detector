function sendMessageToContentScript(responseDetails) {
    chrome.tabs.sendMessage(responseDetails.tabId, {operation: "checkStatus"});
}

chrome.webRequest.onCompleted.addListener(
    sendMessageToContentScript,
    {urls: ["https://*/xui/update/configuration/alert/statusmenu/coloradvisory*"] }
);

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, {operation: "stopUpdating"});
    chrome.pageAction.hide(tab.id);
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.operation == "activateButton") {
            chrome.pageAction.show(sender.tab.id);
        }
    }
);

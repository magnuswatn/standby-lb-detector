const sendMessageToContentScript = responseDetails => {
  chrome.tabs.sendMessage(responseDetails.tabId, { operation: "checkStatus" });
};

chrome.webRequest.onCompleted.addListener(sendMessageToContentScript, {
  urls: ["https://*/xui/update/configuration/alert/statusmenu/coloradvisory*"]
});

chrome.pageAction.onClicked.addListener(tab => {
  chrome.tabs.sendMessage(tab.id, { operation: "stopUpdating" });
  chrome.pageAction.hide(tab.id);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.operation === "activateButton") {
    chrome.pageAction.show(sender.tab.id);
  }
});

let allKnownBoxes = [];

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
  } else if (request.operation === "deactivateButton") {
    chrome.pageAction.hide(sender.tab.id);
  }
});

chrome.omnibox.onInputStarted.addListener(() => {
  chrome.storage.local.get(null, items => {
    allKnownBoxes = items;
  });
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  let suggestions = [];
  for (let [name, status] of Object.entries(allKnownBoxes)) {
    if (name.startsWith(text)) {
      suggestions.push({
        content: name,
        description: `${name} (${status})`
      });
    }
  }
  suggest(suggestions);
});

chrome.omnibox.onInputEntered.addListener(hostname => {
  // When using chrome.tabs.update() the focus stays
  // at the omnibox, which is annoying when using a
  // pasword manager to fill out the login details
  // and such. So we remove the active tab and create
  // a new one. This will lose the tab history, but
  // it's the better of two evils.
  chrome.tabs.query({ active: true }, (tab) => {
    chrome.tabs.remove(tab[0].id, () => {
      chrome.tabs.create({ url: `https://${hostname}` });
    });
  });
});

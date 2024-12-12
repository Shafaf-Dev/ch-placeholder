chrome.action.onClicked.addListener((tab) => {
    if (tab && tab.id) {
        try {
            chrome.tabs.sendMessage(tab.id, { action: "fillPlaceholders" }, (response) => {
            });
        } catch (error) {
            // console.error("Failed to send message:", error);
        }
    }
});


if (chrome.commands && chrome.commands.onCommand) {
    chrome.commands.onCommand.addListener((command) => {
        if (command === "fill_placeholders") {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0] && tabs[0].id) {
                    try {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "fillPlaceholders" }, (response) => {
                        });
                    } catch (error) {
                        // console.error("Failed to send message:", error);
                    }
                }
            });
        }
    });
} else {
    console.warn("Chrome Commands API not available. Keyboard shortcut may not work.");
}
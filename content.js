function fillPlaceholdersWithText() {
    try {
        // Select all input, textarea, and select elements
        const elements = document.querySelectorAll('input, textarea, select');

        elements.forEach((element) => {
            // Check if the element has a placeholder
            const placeholder = element.getAttribute('placeholder');
            if (placeholder) {
                // For input and textarea, set value to placeholder
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.value = placeholder;
                }
                // For select, find and select the option that matches the placeholder
                else if (element.tagName === 'SELECT') {
                    const matchingOption = Array.from(element.options).find(
                        option => option.text === placeholder
                    );
                    if (matchingOption) {
                        element.value = matchingOption.value;
                    }
                }

                const event = new Event('input', { bubbles: true });
                element.dispatchEvent(event);
            }
        });

        return { success: true, message: 'Placeholders filled' };
    } catch (error) {
        return { success: false, message: error.toString() };
    }
}

// Improved message listener with error handling
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fillPlaceholders") {
        try {
            const result = fillPlaceholdersWithText();
            sendResponse(result);
        } catch (error) {
            console.error('Message handling error:', error);
            sendResponse({ success: false, message: error.toString() });
        }
        return true; // Indicates we wish to send a response asynchronously
    }
});

// Add keyboard shortcut listener
document.addEventListener('keydown', (event) => {
    // Check for Command+K (Mac) or Ctrl+K (Windows/Linux)
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault(); // Prevent default print dialog
        try {
            fillPlaceholdersWithText();
        } catch (error) {
            console.error('Keyboard shortcut error:', error);
        }
    }
});

console.log('Placeholder Filler Content Script Loaded');
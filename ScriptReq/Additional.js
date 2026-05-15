// ==UserScript==
// @name        Bsodergren Library
// @version     1.2.1
// @license     MIT
// @namespace https://greasyfork.org/users/984905
// ==/UserScript==

function showToast(message, duration = 3000) {
    // Create toast container if it doesn't exist
    let container = document.getElementById('tm-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'tm-toast-container';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.left = '20px';
        container.style.zIndex = '999999';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '10px';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.background = 'rgba(0, 0, 0, 0.85)';
    toast.style.color = '#fff';
    toast.style.padding = '10px 16px';
    toast.style.borderRadius = '6px';
    toast.style.fontSize = '18px';
    toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    toast.style.opacity = '0.5';
    toast.style.transition = 'opacity 0.3s ease';

    container.appendChild(toast);

    // Fade in
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
    });

    // Remove after duration
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.addEventListener('transitionend', () => {
            toast.remove();
        });
    }, duration);
}

function waitForElement(selector, callback) {
    const observer = new MutationObserver(() => {
        const element = document.querySelector(selector)
        if (element) {
            observer.disconnect() // Stop observing
            callback(element)
        }
    })

    // Observe changes in the entire document
    observer.observe(document.body, {
        childList: true,
        subtree: true
    })
}

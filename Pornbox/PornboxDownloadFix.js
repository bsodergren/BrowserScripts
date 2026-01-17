// ==UserScript==
// @name        New script pornbox.com
// @namespace   Violentmonkey Scripts
// @match       https://pornbox.com/application/*
// @grant       none
// @version     1.0
// @author      -
// @license     MIT
// @description 9/15/2025, 11:01:57 AM
// ==/UserScript==


(function () {
    'use strict'

    // Select the target node to observe (e.g., the body of the document)
    const targetNode = document.getElementById('pane-video')

    // Define the callback function to execute when mutations are observed
    const callback = function (mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (
                mutation.type === 'attributes' &&
                mutation.attributeName === 'class'
            ) {
                if (
                    mutation.target.classList.contains(
                        'video-page__offers--active'
                    )
                ) {
                    mutation.target.style.height = 'auto'
                }
            }
        }
    }

    // Create an instance of MutationObserver
    const observer = new MutationObserver(callback)

    // Define the configuration object for the observer
    const config = {
        childList: true, // Observe addition/removal of child nodes
        attributes: true, // Observe attribute changes
        subtree: true // Observe the entire subtree of the target node
    }

    // Start observing the target node
    observer.observe(targetNode, config)
})()



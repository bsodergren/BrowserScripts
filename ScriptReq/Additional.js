// ==UserScript==
// @name        Bsodergren Library
// @version     1.12.0
// @grant       GM_xmlhttpRequest
// @grant       nsafeWindow
// @license     MIT
// @namespace   https://greasyfork.org/users/984905
// ==/UserScript==
const objToStr = (obj) => Object.prototype.toString.call(obj);
	const isElem = (obj) => {
		const s = objToStr(obj);
		return s.includes('Element');
	};

	const normalizeTarget = (target, toQuery = true, root) => {
		if (Object.is(target, null) || Object.is(target, undefined)) {
			return [];
		}
		if (Array.isArray(target)) {
			return target;
		}
		if (typeof target === 'string') {
			return toQuery ? Array.from((root || document).querySelectorAll(target)) : [target];
		}
		if (isElem(target)) {
			return [target];
		}
		return Array.from(target);
	};

const dom = {
		attr(target, attr, value = undefined) {
			for (const elem of normalizeTarget(target)) {
				if (value === undefined) {
					return elem.getAttribute(attr);
				}
				if (value === null) {
					elem.removeAttribute(attr);
				} else {
					elem.setAttribute(attr, value);
				}
			}
		},
		prop(target, prop, value = undefined) {
			for (const elem of normalizeTarget(target)) {
				if (value === undefined) {
					return elem[prop];
				}
				elem[prop] = value;
			}
		},
		text(target, text) {
			const targets = normalizeTarget(target);
			if (text === undefined) {
				return targets.length !== 0 ? targets[0].textContent : undefined;
			}
			for (const elem of targets) {
				elem.textContent = text;
			}
		},
		remove(target) {
			return normalizeTarget(target).some((elem) => elem.remove());
		},
		cl: {
			add(target, token) {
				token = Array.isArray(token) ? token : [token];
				return normalizeTarget(target).some((elem) => elem.classList.add(...token));
			},
			remove(target, token) {
				token = Array.isArray(token) ? token : [token];
				return normalizeTarget(target).some((elem) => elem.classList.remove(...token));
			},
			toggle(target, token, force) {
				let r;
				for (const elem of normalizeTarget(target)) {
					r = elem.classList.toggle(token, force);
				}
				return r;
			},
			has(target, token) {
				return normalizeTarget(target).some((elem) => elem.classList.contains(token));
			}
		}
	};
	const qs = (selector, root) => {
		try {
			return (root || document).querySelector(selector);
		} catch (ex) {
			err(ex);
		}
		return null;
	};


function showToast(message, duration = 3000, cmdElement = null)
{
  // Create toast container if it doesn't exist
  let container = document.getElementById('tm-toast-container')
  if (!container)
  {
    container = document.createElement('div')
    container.id = 'tm-toast-container'
    container.style.position = 'fixed'
    container.style.top = '20px'
    container.style.left = '20px'
    container.style.zIndex = '999999'
    container.style.display = 'flex'
    container.style.flexDirection = 'column'
    container.style.gap = '10px'
    document.body.appendChild(container)
  }

  // Create toast element
  const toast = document.createElement('div')
  toast.textContent = message
  toast.style.background = 'rgb(0, 0, 0)'
  toast.style.color = '#fff'
  toast.style.padding = '10px 16px'
  toast.style.borderRadius = '6px'
  toast.style.borderColor = 'white'
  toast.style.borderWidth = '3px'
  toast.style.borderStyle = 'double'
  toast.style.fontSize = '18px'
  toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)'
  toast.style.opacity = '0.5'
  toast.style.transition = 'opacity 0.3s ease'

  container.appendChild(toast)

  // Fade in
  requestAnimationFrame(() =>
  {
    toast.style.opacity = '1'
  })

  // Remove after duration
  setTimeout(() =>
  {
    toast.style.opacity = '0'
    toast.addEventListener('transitionend', () =>
    {
      toast.remove()
      if (cmdElement !== null)
      {
        cmdElement()
      }
    })
  }, duration)
}
// end function showToast

function waitForElement(selector, callback)
{
  const observer = new MutationObserver(() =>
  {
    const element = document.querySelector(selector)
    if (element)
    {
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

// end function WaitForElement


function jsonToUrlEncoded(jsonObj)
{
  if (typeof jsonObj !== 'object' || jsonObj === null)
  {
    throw new Error('Input must be a non-null object')
  }
  return Object.keys(jsonObj)
    .map(
      key => encodeURIComponent(key) + '=' + encodeURIComponent(jsonObj[key])
    )
    .join('&')
}

// end function jsonToUrlEncoded


function saveToLocalServer(postUrl, data, toast, command = null)
{
  postUrl = 'http://media.lan/plex/' + postUrl
  const encoded = jsonToUrlEncoded(data)

  console.log(postUrl +"?"+ encoded)
  GM_xmlhttpRequest({
    method: 'POST',
    url: postUrl,
    data: encoded,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'document',

    onload: function (response)
    {
      var responseXML = response.responseXML
      if (!responseXML)
      {
        try
        {
          responseXML = new DOMParser().parseFromString(
            response.responseText,
            'text/html'
          )
        } catch (err) { }
      }
      showToast(response.responseText, 3000, command)
      sentback(response.responseText)
    }
  })
}
// end saveToLocalServer


function sentback(str)
{
  newstr = str.replace('Saved as ', '')
  if (newstr.startsWith('x'))
  {
    favBtn = document.getElementById('favorites_del')
    if (favBtn !== null)
    {
      favBtn.click()
    }
  }
}
// end function sendback


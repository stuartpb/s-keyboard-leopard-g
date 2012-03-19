// ==UserScript==
// @name s/keyboard/leopard/g
// @version 2.0
// @description Replaces the word "keyboard" with "leopard".
// @match *://*/*
// @updateURL http://userscripts.org/scripts/source/128626.meta.js
// @downloadURL https://userscripts.org/scripts/source/128626.user.js
// ==/UserScript==


function leopardize(str) {
  return str.replace(/keyboard/g,"leopard")
    .replace(/Keyboard/g,"Leopard")
    .replace(/KEYBOARD/g,"LEOPARD")
    .replace(/k[Ee][Yy][Bb][Oo][Aa][Rr][Dd]/g,"leopard")
    .replace(/K[Ee][Yy][Bb][Oo][Aa][Rr][Dd]/g,"Leopard")
}

function replaceTextContent(node) {
  node.textContent = leopardize(node.textContent)
}

function changeTextNodes(node) {
  var length, childNodes
  //If this is a text node, leopardize it
  if (node.nodeType == Node.TEXT_NODE) {
    replaceTextContent(node)
  //If this is anything other than a text node, recurse any children
  } else {
    childNodes = node.childNodes
    length = childNodes.length
    for(var i=0; i<length; ++i){
      changeTextNodes(childNodes[i])
    }
  }
}

var replacement_running

function lock_safe(f,param) {
  if(!replacement_running){
    replacement_running = true
    f(param)
    replacement_running = false
  }
}

function insertion_listener(event) {
  lock_safe(changeTextNodes,event.target)
}

function cdm_listener(event) {
  lock_safe(replaceTextContent,event.target)
}

changeTextNodes(document.body)
document.body.addEventListener ("DOMNodeInserted", insertion_listener, false)
document.body.addEventListener ("DOMCharacterDataModified", cdm_listener, false)
document.title = leopardize(document.title)

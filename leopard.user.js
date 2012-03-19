// ==UserScript==
// @name s/keyboard/leopard/g
// @version 1.5.2-beta
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

var TEXT_NODE = Node.TEXT_NODE || 3

function replaceTextContent(node) {
  var length, childNodes
  if (node.nodeType == TEXT_NODE) {
    node.textContent = leopardize(node.textContent)
  } else {
    childNodes = node.childNodes
    length = childNodes.length
    for(var i=0; i<length; ++i){
      replaceTextContent(childNodes[i])
    }
  }
}

replaceTextContent(document.body)
document.title = leopardize(document.title)

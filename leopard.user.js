// ==UserScript==
// @name s/keyboard/leopard/g
// @version 1.5.2-beta
// @description Replaces the word "keyboard" with "leopard".
// @match *://*/*
// @updateURL http://userscripts.org/scripts/source/128626.meta.js
// @downloadURL https://userscripts.org/scripts/source/128626.user.js
// ==/UserScript==

var keyboard = /(k)(e)(y)(b)o(ard)/gi;
var translate = {
    'k': 'l', 'K': 'L',
    'y': 'o', 'Y': 'O',
    'b': 'p', 'B': 'P'
};
function leopardize (str) {
    return str.replace(keyboard, function ($0, $1, $2, $3, $4, $5) {
        return translate[$1] + $2 + translate[$3] + translate[$4] + $5;
    });
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

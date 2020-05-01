'use strict';

function forEach(array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(i, array[i]);
  }
}

changeLikeLinks(document.querySelectorAll('.e71nayrh._18vj'));
changeLikeLinks(document.querySelectorAll('._6a-y._3l2t._18vj'));

function changeLikeLinks(links) {
  forEach(links, (link) => {
    if (link && link.lastChild && link.lastChild.nodeType === 3) {
      link.lastChild.textContent = 'Give a Fuck';
    } 
  });
}

var observer = new MutationObserver((mutations) => {
  forEach(mutations, (mutation) => {
    if(mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      forEach(mutation.addedNodes, (addedNode) => {        
        if (addedNode.querySelectorAll) {
          changeLikeLinks(document.querySelectorAll('.e71nayrh._18vj'));
          changeLikeLinks(document.querySelectorAll('._6a-y._3l2t._18vj'));
        }
      });
    }
  });
});


var target = document.querySelector('body');
var config = { childList: true, attributes: true, characterData: true, subtree: true };
observer.observe(target, config);

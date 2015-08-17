// ==UserScript==
// @name Like I Give A Fuck
// @include http://*.facebook.*
// @include https://*.facebook.*
// ==/UserScript==

function hasClass (el, className) {
  if (el.classList)
    return el.classList.contains(className);
  else
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

changeLikeLinks( document.querySelectorAll('.UFILikeLink') );
changeLikeSentences( document.querySelectorAll('.UFILikeSentenceText') );
changeBlingBoxes( document.querySelectorAll('.UFIBlingBoxText[data-reactid*=".$like"]') );

function changeLikeLinks(links) {
  Array.forEach(links, function(link) {
    if( link.getAttribute('data-ft') == '{"tn":">"}' ) {
      link.innerHTML = '<i class="UFILikeLinkIcon img sp_x63zNXV0TFa sx_b6360e"></i><span>I give a Fuck</span>';
    }
    else if( link.getAttribute('data-ft') == '{"tn":"?"}' ) {
      link.innerHTML = '<i class="UFILikeLinkIcon img sp_x63zNXV0TFa sx_5d4fc2"></i><span>I give a Fuck</span>';
    }
  });
}

function changeLikeSentences(likeSentences) {
  Array.forEach(likeSentences, function(likeSentence) {
    var likeSentenceSpan = likeSentence.children[0];

    if( likeSentenceSpan.children.length > 1 ) {
      if( likeSentenceSpan.children.length == 2 && hasClass(likeSentenceSpan, 'profileLink') ) {
        likeSentenceSpan.children[likeSentenceSpan.children.length-1].textContent = ' gives a fuck.';
      } else {
        likeSentenceSpan.children[likeSentenceSpan.children.length-1].textContent = ' give a fuck.';
      }
    } else if( likeSentenceSpan.children.length === 1 ){
      likeSentenceSpan.children[0].textContent = 'You give a fuck.';
    }
  });
}

function changeBlingBoxes(blingBoxes) {
  Array.forEach(blingBoxes, function(blingBox) {
    blingBox.innerHTML = blingBox.innerHTML.match(/\d*/)[0] + ' Fucks Given';
  });
}

var observer = new MutationObserver(function(mutations) {
  Array.forEach(mutations, function(mutation) {
    if(mutation.attributeName === 'data-ft') {
      changeLikeLinks([mutation.target]);
    } else if(mutation.addedNodes.length > 0) {
      Array.forEach(mutation.addedNodes, function(addedNode) {
        // console.info(addedNode);
        if(addedNode && hasClass(addedNode, 'UFILikeLink')) {
          changeLikeLinks([addedNode]);
        } else if(addedNode && (hasClass(addedNode, 'UFILikeSentence') || hasClass(addedNode, 'UFIList'))) {
          changeLikeSentences( addedNode.querySelectorAll('.UFILikeSentenceText') );
        } else if (addedNode && hasClass(addedNode, 'UFIBlingBox')) {
          changeBlingBoxes(addedNode.querySelectorAll('.UFIBlingBoxText[data-reactid*=".$like"]'));
        }
      });
    }
  });
});

var target = document.querySelector('body');
var config = { childList: true, attributes: true, characterData: true, subtree: true };
observer.observe(target, config);

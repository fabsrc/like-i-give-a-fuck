'use strict';

function forEach(array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(i, array[i]);
  }
}

var likeSelector =
  ".rq0escxv.l9j0dhe7.du4w35lb.j83agx80.pfnyh3mw.i1fnvgqd.gs1a9yip.owycx6da.btwxx1t3.ph5uu5jm.b3onmgus.e5nlhep0.ecm0bbzt.nkwizq5d.roh60bw9.mysgfdmx.hddg9phg > div:first-child span.d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.oi732d6d.ik7dh3pa.ht8s03o8.a8c37x1j.keod5gw0.nxhoafnm.aigsh9s9.fe6kdd0r.mau55g9w.c8b282yb.iv3no6db.jq4qci2q.a3bd9o3v.lrazzd5p.m9osqain > span";

changeLikeLinks(document.querySelectorAll(likeSelector));

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
          changeLikeLinks(document.querySelectorAll(likeSelector));
        }
      });
    }
  });
});


var target = document.querySelector('body');
var config = { childList: true, attributes: true, characterData: true, subtree: true };
observer.observe(target, config);

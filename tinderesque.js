(function(){
  function animatecard(ev) {
    var t = ev.target;
    if (t.className === 'but-nope') {
      t.parentNode.classList.add('nope');
      fireCustomEvent('nopecard',
        {
          origin: t,
          container: t.parentNode,
          card: t.parentNode.querySelector('.card')
        }
      );
    }
    if (t.className === 'but-yay') {
      t.parentNode.classList.add('yes');
      fireCustomEvent('yepcard',
        {
          origin: t,
          container: t.parentNode,
          card: t.parentNode.querySelector('.card')
        }
      );
    }
  }

  function fireCustomEvent(name, payload) {
    var newevent = new CustomEvent(name, {
      detail: payload
    });
    document.body.dispatchEvent(newevent);
  }

  function getContainer(elm) {
    var origin = elm.parentNode;
    if (!origin.classList.contains('cardcontainer')){
      origin = origin.parentNode;
    }
    return origin;
  }

  function animationdone(ev) {
    var origin = getContainer(ev.target);
    if (ev.animationName === 'yay') {
      origin.classList.remove('yes');
    }
    if (ev.animationName === 'nope') {
      origin.classList.remove('nope');
    }
    if (origin.classList.contains('list')) {
      if (ev.animationName === 'nope' ||
          ev.animationName === 'yay') {
        origin.querySelector('.current').remove();
        if (!origin.querySelector('.card')) {
          fireCustomEvent('deckempty', {
            origin: origin.querySelector('button'),
            container: origin,
            card: null
          });
        } else {
          origin.querySelector('.card').classList.add('current');
        }
      }
    }
  }
  document.body.addEventListener('animationend', animationdone);
  document.body.addEventListener('webkitAnimationEnd', animationdone);
  document.body.addEventListener('click', animatecard);
})();
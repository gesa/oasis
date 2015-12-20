(function (doc, win) {
  "use strict";

  function resizeLargePhotos(contents) {
    var
      x, y,
      orientation = contents.scrollHeight > contents.scrollWidth ? 'portrait' : 'landscape',
      sizing = {
        portrait: function () {
          if (contents.scrollHeight > win.innerHeight || contents.scrollWidth > win.innerWidth) {
            contents.style.width = (win.innerWidth * 0.9) + 'px';
            contents.style.height = 'auto';
          }
        },
        landscape: function () {
          if (contents.scrollHeight > win.innerHeight || contents.scrollWidth > win.innerWidth) {
            contents.style.height = (win.innerHeight * 0.9) + 'px';
            contents.style.width = 'auto';
          }
        }
      };

    y = contents.scrollHeight - win.innerHeight;
    x = contents.scrollWidth - win.innerWidth;

    if (y > 0 || x > 0) {
      sizing[orientation]();
    }
  }

  function dismissModal() {
    var
      modal = doc.getElementsByClassName('modal-content')[0];

    doc.getElementsByClassName('overlay')[0].remove();
    modal.removeAttribute('style');
    modal.classList.add('off-screen');
    win.setTimeout(function () {
      doc.getElementsByClassName('modal-parent')[0].remove();
      modal.remove();
    }, 420);
  }

  function generateModal(contents) {
    var
      body = doc.getElementsByTagName('body')[0],
      modalParent = doc.createElement('div'),
      overlay = doc.createElement('div'),
      modal = doc.createElement('figure'),
      closeModal = doc.createElement('button');

    closeModal.classList.add('close-modal');
    closeModal.innerHTML = '&times;';

    modalParent.classList.add('modal-parent');

    overlay.classList.add('overlay');
    overlay.id = 'dismiss-me';

    modal.classList.add('modal-content', 'off-screen');
    modal.appendChild(closeModal);
    modal.appendChild(contents);

    modalParent.appendChild(overlay);
    modalParent.appendChild(modal);

    body.appendChild(modalParent);

    closeModal.addEventListener('click', dismissModal);
    overlay.addEventListener('click', dismissModal);

    win.setTimeout(function () {
      modal.classList.remove('off-screen');

      resizeLargePhotos(contents);
      modal.style.top = (win.innerHeight - modal.scrollHeight) / 2 + 'px';
      modal.style.width = (contents.width + 30) + 'px';
      modal.style.left = (win.innerWidth - modal.scrollWidth) / 2 + 'px';
    }, 50);
  }


  function triggerPhotoModal(e) {
    var
      img = doc.createElement('img');

    img.setAttribute('src', e.target.getAttribute('src'));
    img.setAttribute('alt', e.target.getAttribute('alt'));
    img.setAttribute('width', e.target.getAttribute('width'));
    img.setAttribute('height', e.target.getAttribute('height'));
    img.setAttribute('id', 'modal-photo-fullsize');

    generateModal(img);
  }


  function addListeners() {
    var
      i,
      photographs;

    if (doc.getElementsByClassName('photograph') !== undefined) {
      photographs = doc.getElementsByClassName('photograph');
    }
    i = photographs.length;
    while (i--) {
      photographs[i].addEventListener('click', triggerPhotoModal);
    }
  }

  addListeners();
})(document, window);

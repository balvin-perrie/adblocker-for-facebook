'use strict';

var observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type == 'childList') {
      if (mutation.target.querySelector('div.userContentWrapper')) {
        const divs = [...mutation.target.querySelectorAll('div.userContentWrapper')];
        for (const div of divs) {
          const textContent = [...div.querySelectorAll('s,span')]
            .filter(e => e.getBoundingClientRect().width && e.childElementCount === 0)
            .map(e => e.textContent).join('') || div.textContent;
          if (textContent.indexOf('Sponsored') !== -1) {
            div.remove();
            // div.style.border = 'solid 5px red';
          }
        }
      }
    }
  }
});
observer.observe(document, {
  childList: true,
  subtree: true
});

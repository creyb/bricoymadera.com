document.addEventListener('DOMContentLoaded', function() {
  var nav = document.querySelector('nav[role="navigation"]');
  if (!nav) return;
  var wrapper = document.createElement('div');
  wrapper.id = 'sticky-wrapper';
  function updateWrapper() {
    wrapper.style.height = nav.offsetHeight + 'px';
  }
  updateWrapper();
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(updateWrapper).observe(nav);
  }
  nav.parentNode.insertBefore(wrapper, nav);
  wrapper.appendChild(nav);
  nav.style.position = 'fixed';
  nav.style.top = '0';
  nav.style.left = '0';
  nav.style.right = '0';
  nav.style.zIndex = '1000';
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });

  var toggle = nav.querySelector('.menu-toggle');
  var menu = nav.querySelector('.nav-menu');
  var openLines = nav.querySelectorAll('.menu-open');
  var closeLines = nav.querySelectorAll('.menu-close');
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      menu.classList.toggle('active');
      openLines.forEach(function(l) { l.style.display = expanded ? 'none' : 'none'; });
      closeLines.forEach(function(l) { l.style.display = expanded ? 'none' : 'block'; });
      var lines = toggle.querySelectorAll('line');
      if (!expanded) {
        lines[0].style.display = 'none';
        lines[1].style.display = 'none';
        lines[2].style.display = 'none';
        lines[3].style.display = 'block';
        lines[4].style.display = 'block';
      } else {
        lines[0].style.display = 'block';
        lines[1].style.display = 'block';
        lines[2].style.display = 'block';
        lines[3].style.display = 'none';
        lines[4].style.display = 'none';
      }
    });
  }
});

// Pass the visitor's source (?utm_source=instagram, or the referring site) into the
// Lemon Squeezy checkout so each order shows where the buyer came from.
(function () {
  var q = new URLSearchParams(location.search);
  var src = q.get('utm_source');
  try {
    if (src) sessionStorage.setItem('fc_src', src);
    else src = sessionStorage.getItem('fc_src');
  } catch (e) {}
  if (!src && document.referrer) {
    try { var h = new URL(document.referrer).hostname; if (h !== location.hostname) src = h; } catch (e) {}
  }
  if (!src) return;
  document.querySelectorAll('a[href*="lemonsqueezy.com/checkout"]').forEach(function (a) {
    var u = new URL(a.href);
    u.searchParams.set('checkout[custom][source]', src);
    a.href = u.toString();
  });
})();

/* apply saved theme + language BEFORE paint (no flash) */
(function(){try{
  var t=localStorage.getItem('cs-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
  document.documentElement.dataset.theme=t;
  var l=localStorage.getItem('cs-lang')||'en';
  document.documentElement.lang=l;
  document.documentElement.dir=(l==='ar')?'rtl':'ltr';
  var iconHref=(t==='light')?'assets/logo-light.png':'assets/logo.png';
  document.write('<link rel="icon" href="'+iconHref+'" type="image/png"><link rel="apple-touch-icon" href="'+iconHref+'">');
}catch(e){}})();

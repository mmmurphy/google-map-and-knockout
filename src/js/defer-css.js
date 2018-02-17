var deferCSS = document.createElement('link');
deferCSS.rel = 'stylesheet';
deferCSS.href = 'css/style.css';
deferCSS.type = 'text/css';
var insertCSS = document.getElementsByTagName('link')[0];
insertCSS.parentNode.insertBefore(deferCSS, insertCSS);

Controllers.About = function(view) {
  
  var fillContent = function(page) {
    PropertyCache.set('fb_page', page);
    if(view.detail){ view.remove(view.detail); }
    view.detail = Views.AboutDetail(page);
    view.win.add(view.detail.view);
  }

  var getNewsIfItsBeenLongEnough = function() {
    PropertyCache.get('fb_page', fillContent) || FbGraph.getPage('msf.english', fillContent);
  }
  
  view.win.addEventListener('focus', getNewsIfItsBeenLongEnough);
}
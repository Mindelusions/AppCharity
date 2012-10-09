Controllers.Events = function(view) {
  
  var populateTable = function(events) {
    PropertyCache.set('fb_events', events);
    var rows = events.map(function(e){ return Views.EventRow(e).row; });
    view.table.setData(sortBy('.start_time', rows));
  }
  
  var getEvents = function(cb) {
    FbGraph.getEventsOlderThan2Weeks('msf.english', '33110852384', function(events){
      populateTable(events);
      if(cb) cb();
    });
  }
  
  var getEventsIfItsBeenLongEnough = function() {
    if(PropertyCache.get('fb_events', id) && view.table.data && view.table.data[0]) return;
    PropertyCache.get('fb_events', populateTable) || getEvents();
  }
  
  var openDetail = function(e) {
    var detail = Windows.EventDetail(e.row.event);
    Windows.Application.events.open(detail.win);
  }
  
  view.win.addEventListener('focus', getEventsIfItsBeenLongEnough);
  view.table.addEventListener('click', openDetail);
  
  Push.addAndroidSettingsEvent(view.win);

  if(!isAndroid) {
    PullToRefresh(function(end){
      getEvents(end);
    }, view.table);
  }
}

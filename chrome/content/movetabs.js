if ("undefined" == typeof(com_jreybert_movetabs)) {
  var _movetabs = {};
}

_movetabs.movetabs2 = function(e) {
  //      alert(sc_next_tab[0] + ":" + sc_next_tab[1] + ":" + sc_next_tab[2] + ":" + sc_next_tab[3] + ":" + sc_next_tab[4]);
  //    next tab

  if (e.ctrlKey == _movetabs.prefObs.sc_next_tab[0] &&
        e.shiftKey == _movetabs.prefObs.sc_next_tab[1] &&
        e.altKey == _movetabs.prefObs.sc_next_tab[2] &&
        e.metaKey == _movetabs.prefObs.sc_next_tab[3] &&
        e.keyCode ==_movetabs.prefObs.sc_next_tab[4] ) {
    if (gBrowser.tabContainer.selectedIndex + 1 >= gBrowser.tabContainer.itemCount)
    gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, 0);
    else
    gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, gBrowser.tabContainer.selectedIndex + 1);
  }

  //    prev tab
  else if (e.ctrlKey == _movetabs.prefObs.sc_prev_tab[0] &&
        e.shiftKey == _movetabs.prefObs.sc_prev_tab[1] &&
        e.altKey == _movetabs.prefObs.sc_prev_tab[2] &&
        e.metaKey == _movetabs.prefObs.sc_prev_tab[3] &&
        e.keyCode ==_movetabs.prefObs.sc_prev_tab[4] ) {
    if (gBrowser.tabContainer.selectedIndex - 1 < 0)
    gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, gBrowser.tabContainer.itemCount);
    else
    gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, gBrowser.tabContainer.selectedIndex - 1);
  }

  //    first tab
  else if (e.ctrlKey == _movetabs.prefObs.sc_first_tab[0] &&
        e.shiftKey == _movetabs.prefObs.sc_first_tab[1] &&
        e.altKey == _movetabs.prefObs.sc_first_tab[2] &&
        e.metaKey == _movetabs.prefObs.sc_first_tab[3] &&
        e.keyCode ==_movetabs.prefObs.sc_first_tab[4] ) {
    gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, 0);
  }

  //    last tab
  else if (e.ctrlKey  == _movetabs.prefObs.sc_last_tab[0] &&
        e.shiftKey  == _movetabs.prefObs.sc_last_tab[1] &&
        e.altKey == _movetabs.prefObs.sc_last_tab[2] &&
        e.metaKey == _movetabs.prefObs.sc_last_tab[3] &&
        e.keyCode ==_movetabs.prefObs.sc_last_tab[4] ) {
    gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, gBrowser.tabContainer.itemCount);
  }
}

/*
_movetabs.movetabs= function(e) {
  if (e.shiftKey && e.ctrlKey) {
    switch(e.keyCode) {
      case KeyEvent.DOM_VK_PAGE_UP:
        //    case KeyEvent.DOM_VK_LEFT:
        if (gBrowser.tabContainer.selectedIndex - 1 < 0)
        gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, gBrowser.tabContainer.itemCount);
        else
        gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, gBrowser.tabContainer.selectedIndex - 1);
        break;
      case KeyEvent.DOM_VK_PAGE_DOWN:
        //    case KeyEvent.DOM_VK_RIGHT:
        if (gBrowser.tabContainer.selectedIndex + 1 >= gBrowser.tabContainer.itemCount)
        gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, 0);
        else
        gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, gBrowser.tabContainer.selectedIndex + 1);
        break;
      case KeyEvent.DOM_VK_HOME:
        gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, 0);
        break;
      case KeyEvent.DOM_VK_END:
        gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, gBrowser.tabContainer.itemCount);
        break;
      case KeyEvent.DOM_VK_F1:
        alert("Current tab index: " + gBrowser.tabContainer.selectedIndex + "\n" + "Visible tabs: " + gBrowser.tabContainer.itemCount);
        break;

    }
  }
}
*/

_movetabs.prefObs = {};
_movetabs.prefObs._branch = {};
_movetabs.prefObs.sc_next_tab = {};
_movetabs.prefObs.sc_prev_tab = {};
_movetabs.prefObs.sc_first_tab = {};
_movetabs.prefObs.sc_last_tab = {};

_movetabs.prefObs.register= function() {  
  var prefService = Components.classes["@mozilla.org/preferences-service;1"]  
   .getService(Components.interfaces.nsIPrefService);  
  _movetabs.prefObs._branch = prefService.getBranch("extensions.movetabs.");  
  _movetabs.prefObs._branch.QueryInterface(Components.interfaces.nsIPrefBranch2);  
  _movetabs.prefObs._branch.addObserver("", _movetabs.prefObs, false);  
}

_movetabs.prefObs.load= function() {
  var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
  _movetabs.prefObs.sc_next_tab = (prefManager.getCharPref('extensions.movetabs.sc_next_tab')).split(":");
  _movetabs.prefObs.sc_prev_tab = (prefManager.getCharPref('extensions.movetabs.sc_prev_tab')).split(":");
  _movetabs.prefObs.sc_first_tab = (prefManager.getCharPref('extensions.movetabs.sc_first_tab')).split(":");
  _movetabs.prefObs.sc_last_tab = (prefManager.getCharPref('extensions.movetabs.sc_last_tab')).split(":");
}

_movetabs.prefObs.init= function() {
  _movetabs.prefObs.register();
  _movetabs.prefObs.load();
  window.addEventListener("unload", function(){
			_movetabs.prefObs.unregister();
		}, false);

}

_movetabs.prefObs.unregister= function() {  
  if (!_movetabs._branch) return;  
    _movetabs.prefObs._branch.removeObserver("", _movetabs);  
}

_movetabs.prefObs.observe= function(aSubject, aTopic, aData) {  
  if(aTopic != "nsPref:changed") return;  
  _movetabs.prefObs.load();
  // aSubject is the nsIPrefBranch we're observing (after appropriate QI)  
  // aData is the name of the pref that's been changed (relative to aSubject)  
  /*                 switch (aData) {  
                     case "pref1":  
  // extensions.myextension.pref1 was changed  
  break;  
  case "pref2":  
  // extensions.myextension.pref2 was changed  
  break;  
  }  */
}  
_movetabs.init= function() {
  window.removeEventListener("load", _movetabs.init, true);
  _movetabs.prefObs.init(); 

  window.addEventListener("keypress", _movetabs.movetabs2, true);
}

window.addEventListener("load", _movetabs.init, true);



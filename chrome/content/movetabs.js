if ("undefined" == typeof(com_jreybert_movetabs)) {
  var com_jreybert_movetabs = {

    sc_next_tab : {},
    sc_prev_tab : {},
    sc_first_tab : {},
    sc_last_tab : {},

    movetabs2 : function(e) {
//      alert(sc_next_tab[0] + ":" + sc_next_tab[1] + ":" + sc_next_tab[2] + ":" + sc_next_tab[3] + ":" + sc_next_tab[4]);
//    next tab
      if (e.shiftKey == this.sc_next_tab[0] &&
            e.ctrlKey == this.sc_next_tab[1] &&
            e.altKey == this.sc_next_tab[2] &&
            e.metaKey == this.sc_next_tab[3] &&
            e.keyCode ==this.sc_next_tab[4] ) {
        if (gBrowser.tabContainer.selectedIndex + 1 >= gBrowser.tabContainer.itemCount)
          gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, 0);
        else
          gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, gBrowser.tabContainer.selectedIndex + 1);
      }

//    prev tab
      else if (e.shiftKey == this.sc_prev_tab[0] &&
            e.ctrlKey == this.sc_prev_tab[1] &&
            e.altKey == this.sc_prev_tab[2] &&
            e.metaKey == this.sc_prev_tab[3] &&
            e.keyCode ==this.sc_prev_tab[4] ) {
        if (gBrowser.tabContainer.selectedIndex - 1 < 0)
          gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, gBrowser.tabContainer.itemCount);
        else
          gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, gBrowser.tabContainer.selectedIndex - 1);
      }

//    first tab
      else if (e.shiftKey == this.sc_first_tab[0] &&
            e.ctrlKey == this.sc_first_tab[1] &&
            e.altKey == this.sc_first_tab[2] &&
            e.metaKey == this.sc_first_tab[3] &&
            e.keyCode ==this.sc_first_tab[4] ) {
        gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, 0);
      }

//    last tab
      else if (e.shiftKey == this.sc_last_tab[0] &&
            e.ctrlKey == this.sc_last_tab[1] &&
            e.altKey == this.sc_last_tab[2] &&
            e.metaKey == this.sc_last_tab[3] &&
            e.keyCode ==this.sc_last_tab[4] ) {
        gBrowser.moveTabTo(gBrowser.tabContainer.selectedItem, gBrowser.tabContainer.itemCount);
      }
    },

    movetabs : function(e) {
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
    },
    init : function() {
      window.removeEventListener("load", com_jreybert_movetabs.init, true);
    	var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
      this.sc_next_tab = (prefManager.getCharPref('extensions.movetabs.sc_next_tab')).split(":");
      this.sc_prev_tab = (prefManager.getCharPref('extensions.movetabs.sc_prev_tab')).split(":");
      this.sc_first_tab = (prefManager.getCharPref('extensions.movetabs.sc_first_tab')).split(":");
      this.sc_last_tab = (prefManager.getCharPref('extensions.movetabs.sc_last_tab')).split(":");

      window.addEventListener("keypress", com_jreybert_movetabs.movetabs2, true);
    }
  };
  window.addEventListener("load", com_jreybert_movetabs.init, true);
};


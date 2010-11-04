
if ("undefined" == typeof(com_jreybert_movetabs_options)) {

  var com_jreybert_movetabs_options = {
    l_next : {},
    l_prev : {},
    l_first : {},
    l_last : {},
    is_ctrl : false,
    is_shift : false,
    is_alt : false,
    is_meta : false,
    char_code : "",

    print_label : function() {
      var tmp = "";
      if ( com_jreybert_movetabs_options.is_shift ) {
        tmp += "<S>";
      }
      if ( com_jreybert_movetabs_options.is_ctrl ) {
        tmp += "<C>";
      }
      if ( com_jreybert_movetabs_options.is_alt ) {
        tmp += "<A>";
      }
      if ( com_jreybert_movetabs_options.is_meta ) {
        tmp += "<M>";
      }
      //tmp += com_jreybert_movetabs_options.char_code;
      tmp += this.char_code;
//      com_jreybert_movetabs_options.kkeys.value = tmp;
    },

    pref_to_string : function(pref_array) {
      var tmp = "";
      if ( pref_array[0] == 1 ) {
        tmp += "<C>";
      }
      if ( pref_array[1] == 1 ) {
        tmp += "<S>";
      }
      if ( pref_array[2] == 1 ) {
        tmp += "<A>";
      }
      if ( pref_array[3] == 1 ) {
        tmp += "<M>";
      }
      //tmp += com_jreybert_movetabs_options.char_code;
      tmp += com_jreybert_movetabs_options._keyCodeToIdentifierMap[ pref_array[4] ];
      return tmp;
//      com_jreybert_movetabs_options.kkeys.value = tmp;
    },

    keyup : function(e) {
      if (e.keyCode == KeyEvent.DOM_VK_SHIFT ) {
        com_jreybert_movetabs_options.is_shift = false;
      }
      else if (e.keyCode == KeyEvent.DOM_VK_CONTROL ) {
        com_jreybert_movetabs_options.is_ctrl = false;
      }
      else if (e.keyCode == KeyEvent.DOM_VK_META ) {
        com_jreybert_movetabs_options.is_meta = false;
      }
      else if (e.keyCode == KeyEvent.DOM_VK_ALT ) {
        com_jreybert_movetabs_options.is_alt = false;
      }
      else {
        com_jreybert_movetabs_options.char_code = "";
      }
      com_jreybert_movetabs_options.print_label();
    },

    keydown : function(e) {
      if (e.keyCode == KeyEvent.DOM_VK_SHIFT ) {
        com_jreybert_movetabs_options.is_shift = true;
      }
      else if (e.keyCode == KeyEvent.DOM_VK_CONTROL ) {
        com_jreybert_movetabs_options.is_ctrl = true;
      }
      else if (e.keyCode == KeyEvent.DOM_VK_META ) {
        com_jreybert_movetabs_options.is_meta = true;
      }
      else if (e.keyCode == KeyEvent.DOM_VK_ALT ) {
        com_jreybert_movetabs_options.is_alt = true;
      }
      else {
        if (e.which != 0 && e.charCode != 0) {
          //com_jreybert_movetabs_options.char_code = String.fromCharCode(e.charCode);
        } else {
          com_jreybert_movetabs_options.char_code = com_jreybert_movetabs_options._keyCodeToIdentifierMap[e.keyCode];
        }
      }
      com_jreybert_movetabs_options.print_label();

    },

    define_shortcut : function(e) {
      if (e.which != 0) {
        com_jreybert_movetabs_options.char_code = String.fromCharCode(e.charCode);
      }

      com_jreybert_movetabs_options.print_label();
    },
    
    init : function() {
      var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

      var sc_next_tab = (prefManager.getCharPref('extensions.movetabs.sc_next_tab')).split(":");
      var sc_prev_tab = (prefManager.getCharPref('extensions.movetabs.sc_prev_tab')).split(":");
      var sc_first_tab = (prefManager.getCharPref('extensions.movetabs.sc_first_tab')).split(":");
      var sc_last_tab = (prefManager.getCharPref('extensions.movetabs.sc_last_tab')).split(":");

      this.l_next = document.getElementById("l_next");
      this.l_next.value = this.pref_to_string(sc_next_tab);
      this.l_prev = document.getElementById("l_prev");
      this.l_prev.value = this.pref_to_string(sc_prev_tab);
      this.l_first = document.getElementById("l_first");
      this.l_first.value = this.pref_to_string(sc_first_tab);
      this.l_last = document.getElementById("l_last");
      this.l_last.value = this.pref_to_string(sc_last_tab);

      window.addEventListener("keypress", com_jreybert_movetabs_options.define_shortcut, true);
      window.addEventListener("keyup", com_jreybert_movetabs_options.keyup, true);
      window.addEventListener("keydown", com_jreybert_movetabs_options.keydown, true);
    },


    /*
    ---------------------------------------------------------------------------
      KEY-MAPS
    ---------------------------------------------------------------------------
    */
    /** maps the keycodes of non printable keys to key identifiers */
    _keyCodeToIdentifierMap :
    {
      8  : "Backspace", // The Backspace (Back) key.
      9  : "Tab", // The Horizontal Tabulation (Tab) key.
      32 : "Space", // The Space (Spacebar) key.
      13  : "Enter", // The Enter key.

      //   Note: This key identifier is also used for the
      //   Return (Macintosh numpad) key.
      16  : "Shift", // The Shift key.
      17  : "Control", // The Control (Ctrl) key.
      18  : "Alt", // The Alt (Menu) key.
      20  : "CapsLock", // The CapsLock key
      224 : "Meta", // The Meta key. (Apple Meta and Windows key)
      27  : "Escape", // The Escape (Esc) key.
      37  : "Left", // The Left Arrow key.
      38  : "Up", // The Up Arrow key.
      39  : "Right", // The Right Arrow key.
      40  : "Down", // The Down Arrow key.
      33  : "PageUp", // The Page Up key.
      34  : "PageDown", // The Page Down (Next) key.
      35  : "End", // The End key.
      36  : "Home", // The Home key.
      45  : "Insert", // The Insert (Ins) key. (Does not fire in Opera/Win)
      46  : "Delete", // The Delete (Del) Key.
      112 : "F1", // The F1 key.
      113 : "F2", // The F2 key.
      114 : "F3", // The F3 key.
      115 : "F4", // The F4 key.
      116 : "F5", // The F5 key.
      117 : "F6", // The F6 key.
      118 : "F7", // The F7 key.
      119 : "F8", // The F8 key.
      120 : "F9", // The F9 key.
      121 : "F10", // The F10 key.
      122 : "F11", // The F11 key.
      123 : "F12", // The F12 key.
      144 : "NumLock", // The Num Lock key.
      44  : "PrintScreen", // The Print Screen (PrintScrn, SnapShot) key.
      145 : "Scroll", // The scroll lock key
      19  : "Pause", // The pause/break key
      91  : "Win", // The Windows Logo key
      93  : "Apps", // The Application key (Windows Context Menu)
      96  : "0".charCodeAt(0),
      97  : "1".charCodeAt(0),
      98  : "2".charCodeAt(0),
      99  : "3".charCodeAt(0),
      100 : "4".charCodeAt(0),
      101 : "5".charCodeAt(0),
      102 : "6".charCodeAt(0),
      103 : "7".charCodeAt(0),
      104 : "8".charCodeAt(0),
      105 : "9".charCodeAt(0),
      106 : "*".charCodeAt(0),
      107 : "+".charCodeAt(0),
      109 : "-".charCodeAt(0),
      110 : ",".charCodeAt(0),
      111 : "/".charCodeAt(0)
    }


  };
};

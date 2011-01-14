
if ("undefined" == typeof(_movetabs_o)) {
  var _movetabs_o = {};
}
_movetabs_o.l_next = {};
_movetabs_o.l_prev = {};
_movetabs_o.l_first = {};
_movetabs_o.l_last = {};
_movetabs_o.is_ctrl = false;
_movetabs_o.is_shift = false;
_movetabs_o.is_alt = false;
_movetabs_o.is_meta = false;
_movetabs_o.char_code = "";

_movetabs_o.list_shortcuts = new Array("next", "prev", "first", "last");

_movetabs_o.old_sc = "";
_movetabs_o.print_lab = false;
_movetabs_o.written_lab = {};

_movetabs_o.print_label = function() {
  var tmp = "";
  if ( _movetabs_o.is_shift ) {
    tmp += "<S>";
  }
  if ( _movetabs_o.is_ctrl ) {
    tmp += "<C>";
  }
  if ( _movetabs_o.is_alt ) {
    tmp += "<A>";
  }
  if ( _movetabs_o.is_meta ) {
    tmp += "<M>";
  }
  //tmp += _movetabs_o.char_code;
  tmp += _movetabs_o._keyCodeToIdentifierMap[_movetabs_o.char_code];

  if (_movetabs_o.print_lab) {
    _movetabs_o.written_lab.value = tmp;
  }
}

_movetabs_o.pref_to_string = function(pref_array) {
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
  //tmp += _movetabs_o.char_code;
  tmp += _movetabs_o._keyCodeToIdentifierMap[ pref_array[4] ];
  return tmp;
  //      _movetabs_o.kkeys.value = tmp;
}
_movetabs_o.print_pref = function() {
  var tmp = "";
  if ( _movetabs_o.is_shift ) {
    tmp += "1:";
  }
  else {
    tmp += "0:";
  }
  if ( _movetabs_o.is_ctrl ) {
    tmp += "1:";
  }
  else {
    tmp += "0:";
  }
  if ( _movetabs_o.is_alt ) {
    tmp += "1:";
  }
  else {
    tmp += "0:";
  }
  if ( _movetabs_o.is_meta ) {
    tmp += "1:";
  }
  else {
    tmp += "0:";
  }
  //tmp += _movetabs_o.char_code;
  tmp += _movetabs_o.char_code;
  return tmp;
}



_movetabs_o.keyup = function(e) {
 /*
  if (e.keyCode == KeyEvent.DOM_VK_SHIFT ) {
    _movetabs_o.is_shift = false;
  }
  else if (e.keyCode == KeyEvent.DOM_VK_CONTROL ) {
    _movetabs_o.is_ctrl = false;
  }
  else if (e.keyCode == KeyEvent.DOM_VK_META ) {
    _movetabs_o.is_meta = false;
  }
  else if (e.keyCode == KeyEvent.DOM_VK_ALT ) {
    _movetabs_o.is_alt = false;
  }
  else {
    _movetabs_o.char_code = "";
  }

  _movetabs_o.print_label();
  */
}

_movetabs_o.keydown = function(e) {
    _movetabs_o.is_shift = e.shiftKey;
    _movetabs_o.is_ctrl = e.ctrlKey;
    _movetabs_o.is_meta = e.metaKey;
    _movetabs_o.is_alt = e.altKey;
  if ( e.keyCode == KeyEvent.DOM_VK_SHIFT ||
        e.keyCode == KeyEvent.DOM_VK_CONTROL ||
        e.keyCode == KeyEvent.DOM_VK_META ||
        e.keyCode == KeyEvent.DOM_VK_ALT ) {
    if (e.keyCode == KeyEvent.DOM_VK_SHIFT ) {
      _movetabs_o.is_shift = true;
    }
    if (e.keyCode == KeyEvent.DOM_VK_CONTROL ) {
      _movetabs_o.is_ctrl = true;
    }
    if (e.keyCode == KeyEvent.DOM_VK_META ) {
      _movetabs_o.is_meta = true;
    }
    if (e.keyCode == KeyEvent.DOM_VK_ALT ) {
      _movetabs_o.is_alt = true;
    }
  }
  else {
    if (e.which != 0 && e.charCode != 0) {
      //_movetabs_o.char_code = String.fromCharCode(e.charCode);
    } else {
      _movetabs_o.char_code = e.keyCode;
    }
  }
  _movetabs_o.print_label();
}

_movetabs_o.init = function() {
  var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

  for ( i in _movetabs_o.list_shortcuts ) {
    var sc = _movetabs_o.list_shortcuts[i];
    var tmp_pref_array = (prefManager.getCharPref('extensions.movetabs.sc_'+sc+'_tab')).split(":");
    var tmp_butt = document.getElementById("l_"+sc);
    tmp_butt.value = _movetabs_o.pref_to_string(tmp_pref_array);
  }

  //window.addEventListener("keyup", _movetabs_o.keyup, true);
  window.addEventListener("keydown", _movetabs_o.keydown, false);
}

_movetabs_o.set_shortcut = function(c) {
  for ( i in _movetabs_o.list_shortcuts ) {
    var sc = _movetabs_o.list_shortcuts[i];
    document.getElementById("b_set_"+sc).disabled=true;
    document.getElementById("l_"+sc).disabled=true;
  }
  document.getElementById("b_ok_"+c).disabled=false;
  document.getElementById("b_cancel_"+c).disabled=false;
  document.getElementById("l_"+c).disabled=false;
  var curr_tb = document.getElementById("l_"+c);
  _movetabs_o.old_sc = curr_tb.value;
  _movetabs_o.written_lab = curr_tb;
  _movetabs_o.print_lab = true;
}

_movetabs_o.default_prefpanel = function() {
  for ( i in _movetabs_o.list_shortcuts ) {
    var sc = _movetabs_o.list_shortcuts[i];
    document.getElementById("b_set_"+sc).disabled=false;
    document.getElementById("l_"+sc).disabled=true;
    document.getElementById("b_ok_"+sc).disabled=true;
    document.getElementById("b_cancel_"+sc).disabled=true;
  }
}
_movetabs_o.ok_shortcut = function(c) {
  var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
  prefManager.setCharPref('extensions.movetabs.sc_'+c+'_tab', _movetabs_o.print_pref());
  _movetabs_o.default_prefpanel();
}

_movetabs_o.cancel_shortcut = function(c) {
  var curr_tb = document.getElementById("l_"+c);
  curr_tb.value = _movetabs_o.old_sc;
  _movetabs_o.default_prefpanel();
}
/*
   ---------------------------------------------------------------------------
   KEY-MAPS
   ---------------------------------------------------------------------------
   */
/** maps the keycodes of non printable keys to key identifiers */
_movetabs_o._keyCodeToIdentifierMap = {
  8  : "Backspace", // The Backspace (Back) key.
  9  : "Tab", // The Horizontal Tabulation (Tab) key.
  32 : "Space", // The Space (Spacebar) key.
  13  : "Enter", // The Enter key.

  //   Note: _movetabs_o key identifier is also used for the
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
  65  : "A",
  66  : "B",
  67  : "C",
  68  : "D",
  69  : "E",
  70  : "F",
  71  : "G",
  72  : "H",
  73  : "I",
  74  : "J",
  75  : "K",
  76  : "L",
  77  : "M",
  78  : "N",
  79  : "O",
  80  : "P",
  81  : "Q",
  82  : "R",
  83  : "S",
  84  : "T",
  85  : "U",
  86  : "V",
  87  : "W",
  88  : "X",
  89  : "Y",
  90  : "Z",
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

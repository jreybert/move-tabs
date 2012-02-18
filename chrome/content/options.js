// Define our option panel namespace
if ("undefined" == typeof(_movetabs_o)) {
  var _movetabs_o = {};
}

// Memory of pressed keys
// Array for pressed keys:           [ctrl] [shift] [alt]  [meta]
_movetabs_o.keys_pressed = new Array(false, false,  false, false);
_movetabs_o.char_code = "";

_movetabs_o.keys_string  = new Array("<C>", "<S>", "<A>" , "<M>");
// list of shorcuts. these strings will be mainly used to access XUL elements, in a for loop
_movetabs_o.list_shortcuts = new Array("prev", "next", "first", "last");

_movetabs_o.old_sc = "";
_movetabs_o.print_lab = false;
_movetabs_o.written_lab = {};
_movetabs_o.any_key_pressed = false;

_movetabs_o.pressed_to_string = function() {
  var ret_string = "";
  for ( i in _movetabs_o.keys_pressed ) {
    if ( _movetabs_o.keys_pressed[i] ) {
      ret_string += _movetabs_o.keys_string[i];
    }
  }
  ret_string += _movetabs_o._keyCodeToIdentifierMap[_movetabs_o.char_code];
  return ret_string;
}

_movetabs_o.pref_to_string = function(pref_array) {
  var tmp = "";
  for ( i in _movetabs_o.keys_pressed ) {
    if ( pref_array[i] == 1 ) {
      tmp += _movetabs_o.keys_string[i];
    }
  }
  tmp += _movetabs_o._keyCodeToIdentifierMap[ pref_array[4] ];
  return tmp;
}

_movetabs_o.print_pref = function() {
  var tmp = "";
  for ( i in _movetabs_o.keys_pressed ) {
    if ( _movetabs_o.keys_pressed[i] ) {
      tmp += "1:";
    }
    else {
      tmp += "0:";
    }
  }
  tmp += _movetabs_o.char_code;
  return tmp;
}


_movetabs_o.keypress = function(e) {
  if (!_movetabs_o.print_lab) {
    return;
  }
  _movetabs_o.any_key_pressed = true;
  _movetabs_o.keys_pressed[0] = e.ctrlKey;
  _movetabs_o.keys_pressed[1] = e.shiftKey;
  _movetabs_o.keys_pressed[2] = e.altKey;
  _movetabs_o.keys_pressed[3] = e.metaKey;
  if ( e.keyCode == KeyEvent.DOM_VK_SHIFT ||
        e.keyCode == KeyEvent.DOM_VK_CONTROL ||
        e.keyCode == KeyEvent.DOM_VK_META ||
        e.keyCode == KeyEvent.DOM_VK_ALT ) {
    if (e.keyCode == KeyEvent.DOM_VK_CONTROL ) {
      _movetabs_o.keys_pressed[0] = true;
    }
    if (e.keyCode == KeyEvent.DOM_VK_SHIFT ) {
      _movetabs_o.keys_pressed[1] = true;
    }
    if (e.keyCode == KeyEvent.DOM_VK_ALT ) {
      _movetabs_o.keys_pressed[2]  = true;
    }
    if (e.keyCode == KeyEvent.DOM_VK_META ) {
      _movetabs_o.keys_pressed[3] = true;
    }
  }
  else {
    _movetabs_o.char_code = e.charCode? e.charCode : e.keyCode;
  }
  _movetabs_o.written_lab.value = _movetabs_o.pressed_to_string();
}

// Initialization of the option panel
_movetabs_o.init = function() {
  var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
  // write preferences in labels
  for ( i in _movetabs_o.list_shortcuts ) {
    var sc = _movetabs_o.list_shortcuts[i];
    var tmp_pref_array = (prefManager.getCharPref('extensions.movetabs.sc_'+sc+'_tab')).split(":");
    var tmp_butt = document.getElementById("label_"+sc);
    tmp_butt.value = _movetabs_o.pref_to_string(tmp_pref_array);
  }
  //window.addEventListener("keyup", _movetabs_o.keyup, true);
  window.addEventListener("keypress", _movetabs_o.keypress, false);
}

window.onunload = function() {
  window.removeEventListener("keypress", _movetabs_o.keypress, false);
}

// Function called by set button
_movetabs_o.butt_set_fc = function(c) {
  // Set XUL panel, enable and disable specific buttons and labels
  // disable all set buttons and shortcut labels
  for ( i in _movetabs_o.list_shortcuts ) {
    var sc = _movetabs_o.list_shortcuts[i];
    document.getElementById("butt_set_"+sc).disabled=true;
    document.getElementById("label_"+sc).disabled=true;
  }
  // enable OK and cancel buttons and shortcut label for the current setted shortcut
  document.getElementById("butt_ok_"+c).disabled=false;
  document.getElementById("butt_cancel_"+c).disabled=false;
  document.getElementById("label_"+c).disabled=false;

  var curr_tb = document.getElementById("label_"+c);
  // remember the current shortcut string (in case of cancel)
  _movetabs_o.old_sc = curr_tb.value;
  // set the pointed label to print to the ongoing shortcut
  _movetabs_o.written_lab = curr_tb;

  // Initialize shortcut listener
  _movetabs_o.any_key_pressed = false;
  for ( i in _movetabs_o.keys_pressed ) {
    _movetabs_o.keys_pressed[i] = false;
    char_code = "";
  }
  _movetabs_o.print_lab = true;
}

// This function set the panel by default (all Set buttons enabled, all others disabled)
_movetabs_o.default_prefpanel = function() {
  for ( i in _movetabs_o.list_shortcuts ) {
    var sc = _movetabs_o.list_shortcuts[i];
    document.getElementById("butt_set_"+sc).disabled=false;
    document.getElementById("label_"+sc).disabled=true;
    document.getElementById("butt_ok_"+sc).disabled=true;
    document.getElementById("butt_cancel_"+sc).disabled=true;
  }
  _movetabs_o.print_lab = false;
  _movetabs_o.any_key_pressed = false;
}

// Function called by OK button
_movetabs_o.butt_ok_fc = function(c) {
  // If any key has been pressed (which should have update the label), we can update the prefManager
  // In movetabs.js, _movetabs class, an observer is plugged on extensions.movetabs). At every change, the _movetabs class update its own variables
  // If none key have been pressed, we do not do anything beside reset the panel on default state
  if ( _movetabs_o.any_key_pressed ) {
    var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    prefManager.setCharPref('extensions.movetabs.sc_'+c+'_tab', _movetabs_o.print_pref());
  }
  _movetabs_o.default_prefpanel();
}

// function called by Cancel button
_movetabs_o.butt_cancel_fc = function(c) {
  // We print back the old value (as we cancel the current shortcut)
  var curr_tb = document.getElementById("label_"+c);
  curr_tb.value = _movetabs_o.old_sc;
  _movetabs_o.default_prefpanel();
}

/*
   ---------------------------------------------------------------------------
   KEY-MAPS
   From qooxdoo - the new era of web development
   http://qooxdoo.org
   Copyright:
     2004-2007 1&1 Internet AG, Germany, http://www.1and1.org
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
   ---------------------------------------------------------------------------
   */

/** maps the keycodes of non printable keys to key identifiers */
_movetabs_o._keyCodeToIdentifierMap = {
  //   Note: _movetabs_o key identifier is also used for the
  //   Return (Macintosh numpad) key.
  8  : "Backspace", // The Backspace (Back) key.
  9  : "Tab", // The Horizontal Tabulation (Tab) key.
  13  : "Enter", // The Enter key.
  16  : "Shift", // The Shift key.
  17  : "Control", // The Control (Ctrl) key.
  18  : "Alt", // The Alt (Menu) key.
  19  : "Pause", // The pause/break key
  20  : "CapsLock", // The CapsLock key
  27  : "Escape", // The Escape (Esc) key.
  32 : "Space", // The Space (Spacebar) key.
  33  : "PageUp", // The Page Up key.
  34  : "PageDown", // The Page Down (Next) key.
  35  : "End", // The End key.
  36  : "Home", // The Home key.
  37  : "Left", // The Left Arrow key.
  38  : "Up", // The Up Arrow key.
  39  : "Right", // The Right Arrow key.
  40  : "Down", // The Down Arrow key.
  44  : "PrintScreen", // The Print Screen (PrintScrn, SnapShot) key.
  45  : "Insert", // The Insert (Ins) key. (Does not fire in Opera/Win)
  46  : "Delete", // The Delete (Del) Key.
  91  : "Win", // The Windows Logo key
  93  : "Apps", // The Application key (Windows Context Menu)
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
  145 : "Scroll", // The scroll lock key
  224 : "Meta", // The Meta key. (Apple Meta and Windows key)
  48  : "0",
  49  : "1",
  50  : "2",
  51  : "3",
  52  : "4",
  53  : "5",
  54  : "6",
  55  : "7",
  56  : "8",
  57  : "9",
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
  91  : "[",
  93  : "]",
  97  : "a",
  98  : "b",
  99  : "c",
  100  : "d",
  101  : "e",
  102  : "f",
  103  : "g",
  104  : "h",
  105  : "i",
  106  : "j",
  107  : "k",
  108  : "l",
  109  : "m",
  110  : "n",
  111  : "o",
  112  : "p",
  113  : "q",
  114  : "r",
  115  : "s",
  116  : "t",
  117  : "u",
  118  : "v",
  119  : "w",
  120  : "x",
  121  : "y",
  122  : "z",
  123  : "{",
  125  : "}",
}

_movetabs_o._charCodeA = "A".charCodeAt(0);
_movetabs_o._charCodeZ = "Z".charCodeAt(0);
_movetabs_o._charCode0 = "0".charCodeAt(0);
_movetabs_o._charCode9 = "9".charCodeAt(0);


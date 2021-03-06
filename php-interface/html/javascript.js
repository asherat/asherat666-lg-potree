/* Copyright 2010 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

window.onload = function (e) {
  var evt = e || window.event;
  var imgs;
  if (evt.preventDefault) {
    imgs = document.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].onmousedown = disableDragging;
    }
  }
}
function disableDragging(e) {
  e.preventDefault();
}


function createRequest() {
  if (window.XMLHttpRequest) {
    var req = new XMLHttpRequest();
    return req;
  }
}
function submitRequest(url) {
  var req = createRequest();
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      if (req.status == 200) {
	document.getElementById('status').innerHTML = req.responseText;
      }
    }
  }
  req.open('GET', url, true);
  req.send(null);
}
function sendQuery(query) {
  submitRequest('change.php?query=' + query);
  showAndHideStatus();
}
function showAndHideStatus() {
  var status = document.getElementById('status');
  status.style.opacity = 1;
  window.setTimeout('document.getElementById("status").style.opacity = 0;', 5000);
}

function initPeruse() {
  var lgIP = document.getElementById('lgIP').value;
  var nodeIP = document.getElementById('nodeIP').value;
  var nodePort = document.getElementById('nodePort').value;
  submitRequest('change.php?initPeruse=' + lgIP + '&nodeIP='+ nodeIP + '&nodePort=' + nodePort);
  showAndHideStatus();
}

function openLibrary(){
  var lgIP = window.location.host;
  //var lgIP = document.getElementById('lgIP').value;
  var nodePort = document.getElementById('nodePort').value;
  var url = 'http://' + lgIP +':'+ nodePort +'/lg-potree/library';
  var win = window.open(url, '_blank');
  win.focus();
}

function openManager(){
  var lgIP = window.location.host;
  //var lgIP = document.getElementById('lgIP').value;
  var nodePort = document.getElementById('nodePort').value;
  var url = 'http://' + lgIP +':'+ nodePort +'/lg-potree/manager';
  var win = window.open(url, '_blank');
  win.focus();
}
function FullscreenBrowsers() {
  var lgIP = document.getElementById('lgIP').value;
  submitRequest('change.php?fullscreen=' + lgIP);
  showAndHideStatus();	
}
function RefreshBrowsers() {
  var lgIP = document.getElementById('lgIP').value;
  submitRequest('change.php?refresh=' + lgIP);
  showAndHideStatus();
}
function stopAll() {
  var lgIP = document.getElementById('lgIP').value;  
  submitRequest('change.php?stop=' + lgIP);
  showAndHideStatus();
}

function toolRequest(query) {
  var lgIP = document.getElementById('lgIP').value;
  submitRequest('change.php?tool=' + query + '&lgIP=' + lgIP);
  showAndHideStatus();
}



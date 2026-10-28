function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    if (timeText) {
        timeText.innerHTML = currentTime;
    }
}
setInterval(updateTime, 1000);

// Initialize dragging hooks for your system modules once windows render
window.onload = function() {
  dragElement(document.getElementById("window"));
  dragElement(document.getElementById("explorerWin"));
}

function dragElement(element) {
  if (!element) return;
  var initialX = 0, initialY = 0, currentX = 0, currentY = 0;
  var header = document.getElementById(element.id + "header");

  if (header) {
    header.onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    
    // Manage stacking layer layout levels cleanly on select focus
    var win1 = document.getElementById("window");
    var win2 = document.getElementById("explorerWin");
    if (win1) win1.style.zIndex = "10";
    if (win2) win2.style.zIndex = "10";
    element.style.zIndex = "20";

    initialX = e.clientX;
    initialY = e.clientY;
    
    document.onmouseup = stopDragging;
    document.onmousemove = onElementDrag;
  }

  function onElementDrag(e) {
    e = e || window.event;
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function closeWindow(element) {
    if (element) element.style.display = "none";
}

function openWindow(element) {
    if (element) element.style.display = "flex";
}

// Window Sizing engine tracker layout definitions
function startResizing(e, element) {
  if (!element) return;
  e.preventDefault();
  e.stopPropagation();
  
  var startWidth = parseFloat(getComputedStyle(element, null).getPropertyValue('width'));
  var startHeight = parseFloat(getComputedStyle(element, null).getPropertyValue('height'));
  var startX = e.clientX;
  var startY = e.clientY;

  function doResize(moveEvent) {
    element.style.width = (startWidth + moveEvent.clientX - startX) + 'px';
    element.style.height = (startHeight + moveEvent.clientY - startY) + 'px';
  }

  function stopResize() {
    document.removeEventListener('mousemove', doResize);
    document.removeEventListener('mouseup', stopResize);
  }

  document.addEventListener('mousemove', doResize);
  document.addEventListener('mouseup', stopResize);
}

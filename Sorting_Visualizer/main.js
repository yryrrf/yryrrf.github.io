var array_vis = document.getElementById('array-vis');
var ctx = array_vis.getContext('2d');
var rectLeft = 0;
var rectTop = 0;
var rectRight = array_vis.width;
var rectBottom = array_vis.height;
var stop = false;
var delaySecond = 1;
var array = new Array();
var infoCounter = new InfoCounter();
var paint = new Paint();
var sort = new Sort();
var setupVisualsGoogleAnalytics = require('./analytics.js').setupVisualsGoogleAnalytics;
var trackEvent = require('./analytics.js').trackEvent;

var pym = require('pym.js');
var pymChild = null;
let ai2html = require('./ai2html.js');
let d3 = require("d3-selection");

import makeTimer from "./makeTimer";

document.addEventListener("DOMContentLoaded", main());

function main() {
    ai2html.init();

    let is2017 = false;

    let theTimer = new makeTimer({
        speed: 4000,
        onUpdate: function() {
           
        	is2017 = is2017 ? false : true;

        	//console.log(is2017);

        	updateMaps();

        }
    });


    function updateMaps() {

    	if (is2017) {
    		d3.select("#map-2017").style("opacity", 1);
    	} else {
    		d3.select("#map-2017").style("opacity", 0);
    	}

    }

    theTimer.start();

    var pymChild = new pym.Child();
}
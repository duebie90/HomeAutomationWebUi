function parseMessage(message) {
	var data = JSON.parse(message);
	endpoints = data.endpoints;
	var endpointCountChanged = false;
	if (endpoints.length != endpointCount) {
		endpointCount = endpoints.length;
		endpointCountChanged = true;
	}
	createNav(endpointCountChanged);
	createEndpointScreens(endpointCountChanged);
	createEndpointOverviewScreen(endpointCountChanged)
	updateEndpointContents();
  initd = true;
}
function createNav(endpointCountChanged) {
	//write Navigation
	var i = 0;
	if (endpointCountChanged) {
		document.getElementById("endpointsNav").innerHTML = "<a href='#' onclick='selectOverview()'>&Uuml;bersicht</a>"
		//create placeholder-entries if number of endpoints changed
		//if the number of endpoints changed
		for(i in endpoints) {
			document.getElementById("endpointsNav").innerHTML += "<a href='#' onclick='selectEndpoint(" + i +")' id='endpointEntry" + i + "'></a>"
		}
	}
	for(i in endpoints) {
		document.getElementById("endpointEntry" + i).innerHTML = endpoints[i].alias;
	}
}


function createEndpointScreens(endpointCountChanged) {
	var i;
	if (endpointCountChanged) {
		//create placeholder-entries if number of endpoints changed
		//if the number of endpoints changed
		document.getElementById("main").innerHTML = "";
		for(i in endpoints) {
			document.getElementById("main").innerHTML +=  	"<div class='endpointScreen" + (i == selectedEndpointIndex ? "-visible'" : "-hidden'") +
															"id='endpoint" + i + "'><h2>Schaltaktor: <span id='alias" + i + "'></span>&nbsp(" +
															"<span id='connectedState" + i + "'>(online)</span>)" +
															"</h2>" +
															"<p><h3>Schaltaktor manuell bedienen</h3>" +
															"<p><div class='endpointStateBox' >" +
															"<span id='state" + i + "' ></span>&nbsp;&nbsp;" +
															"<span id='onSwitch" + i + "'><a href='#'  class='onSwitch' onClick='requestState(true," + i + " )'>einschalten </a></span>" +
															"<span id='offSwitch" + i + "'><a href='#' class='offSwitch' onClick='requestState(false," + i + " )'>ausschalten</a></span>" +
															"</div></p>"+
															"<p><h3>Automatische Steuerung nach Zeitplan:</h3>" +
															"<p><input type='checkbox' id='autoState" + i + "' name='auto-state' value='Automatik' onchange='requestAuto(checked, " + i + ")')'>Automatik</p> " +
															"<p>Folgende Zeitpl�ne sind konfiguriert</p>" +
															"<div id='schedulesList" + i + "'>" +
															"<ul><li></li><li></li><li>...</li></ul></div>" +
															"</div>";

		}
	}


		//document.getelementbyid("main").innerhtml +=  	"<div class='endpointscreen" + (i == selectedendpointindex ? "-visible'" : "-hidden'") +
		//												"id='endpoint" + i + "'><h2>" +
		//												endpoints[i].alias + "&nbsp; &nbsp; &nbsp" +
		//												"<span style='color:" + (endpoints[i].state ? "yellow" : "black") + "'>" +
		//												(endpoints[i].state ? "ein" : "aus") + "</span></h2>" +
		//												"<hr>" +
		//												"<p><a href='#' class='onswitch' onclick='requeststate(true," + i + " )'>einschalten </a> &nbsp; &nbsp; &nbsp" +
		//												"<a href='#'  class='offswitch' onclick='requeststate(false," + i + " )'>ausschalten</a>" +
		//												"<p><input type='checkbox' name='auto-state' value='automatik' onchange=''>automatik</p> " +
		//												"<p><h3>zeitpl�ne</h3>" +
		//												"<ul><li></li><li></li><li>...</li></ul>"
		//												"</div>";



}

function createEndpointOverviewScreen(endpointCountChanged) {

	document.getElementById("main").innerHTML +="<span class='endpointGridHeadline-hidden'><h3>&Uuml;bersicht der Schaltaktoren</h3></span>" +
												"<div class='endpointGrid-hidden' id='endpointOverview'>" +
												"</div>";
  if(endpointCountChanged){
    for(i in endpoints) {
        document.getElementById("endpointOverview").innerHTML += 	"<div class='endpointGridItem id='endpoint" + i + "'><h2><span id='aliasGrid" + i + "'></span>&nbsp(" +
                                "<span id='connectedStateGrid" + i + "'>(online)</span>)" +
                                "<p><div class='endpointStateBox' >" +
                                "<span id='stateGrid" + i + "' ></span>&nbsp;&nbsp;<br>" +
                                "<span id='onSwitchGrid" + i + "'><a href='#'  class='onSwitch' onClick='requestState(true," + i + " )'>einschalten </a></span>" +
                                "<span id='offSwitchGrid" + i + "'><a href='#' class='offSwitch' onClick='requestState(false," + i + " )'>ausschalten</a></span>" +
                                "</div></p></div>";
    }
  }
  if(!initd){
    document.getElementById("endpointOverview").className = "endpointGrid-visible"
  }



}

function updateEndpointContents(){
	//update contents of the endpoint screens
	for(i in endpoints) {
		document.getElementById("alias" + i).innerHTML  	= 	 endpoints[i].alias;
		document.getElementById("aliasGrid" + i).innerHTML  	= 	 endpoints[i].alias;
		document.getElementById("state" + i).style.color 	= 	(endpoints[i].state ? "yellow" : "#808080");
		document.getElementById("state" + i).innerHTML		=	(endpoints[i].state ? "EINGESCHALTET" : "AUSGESCHALTET");
		document.getElementById("stateGrid" + i).style.color 	= 	(endpoints[i].state ? "yellow" : "#808080");
		document.getElementById("stateGrid" + i).innerHTML		=	(endpoints[i].state ? "EINGESCHALTET" : "AUSGESCHALTET");
		document.getElementById("autoState" + i).checked 	= 	endpoints[i].autoState;
		document.getElementById("connectedState" + i).innerHTML 	= 	(endpoints[i].connectedState ? "online" : "offline");
		document.getElementById("connectedState" + i).className	=	(endpoints[i].connectedState ? "w3-text-green" : "w3-text-red");
		document.getElementById("connectedStateGrid" + i).innerHTML 	= 	(endpoints[i].connectedState ? "online" : "offline");
		document.getElementById("connectedStateGrid" + i).className	=	(endpoints[i].connectedState ? "w3-text-green" : "w3-text-red");
		document.getElementById("onSwitch" + i).style.display =  (endpoints[i].state ? "none" : "inline");
		document.getElementById("offSwitch" + i).style.display =  (endpoints[i].state ? "inline" : "none")
		document.getElementById("onSwitchGrid" + i).style.display =  (endpoints[i].state ? "none" : "inline");
		document.getElementById("offSwitchGrid" + i).style.display =  (endpoints[i].state ? "inline" : "none");
		document.getElementById("schedulesList" + i).innerHTML =    "<ul>";
        var j;
        var scheduleStrings = endpoints[i].scheduleStrings;
        for(j in scheduleStrings) {
            document.getElementById("schedulesList" + i).innerHTML += "<li>" + scheduleStrings[j] + "</li>";
        }
        document.getElementById("schedulesList" + i).innerHTML +=    "</ul>";
		}
}


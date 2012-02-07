$(function(){
	//$("#pagelet_welcome_box").after("<span id='timerim'>Time left 0.0</span>");
	check();
});


function check(){
	var time = localStorage.getItem("time");
		
	if(time == null)
		time=5*1000*60;

	time = parseInt(time);

	if(time < 0)
		time=0; 

	var finished = localStorage.getItem("finished");
	if(finished == null)
		finished=false;

	var now= (new Date()).getTime();

	var lastVisit = localStorage.getItem("lastVisit"); 
	if(lastVisit == null)
		lastVisit=now;


	localStorage.setItem("lastVisit",now); 
	var waittime=5*1000*60;
	if((time < waittime && finished == "true") || (time <= 0)){
		var rem=mktime(waittime-time);
		$("body").html("<div style='width:100%;text-align:center;height:100px;font-size:30px;top:35%;position:absolute;'>No more Facebook!</div>");
		localStorage.setItem("finished",true); 
		time += (now-lastVisit)*0.1;
		localStorage.setItem("time",time); 
		return;
	}

	time += (now-lastVisit)*0.1;
	time -= (now-lastVisit < 12 * 1000) ? now-lastVisit : 0;
	localStorage.setItem("time",time); 

	//$("#timerim").text("Time left: " + mktime(time));
	localStorage.setItem("finished",false);
	setTimeout("check()",1000);
}

function mktime(){
	var sec=parseInt(time/1000);
	var min=parseInt(sec/60);
	var sec=sec - min * 60;
	return min + "." + sec;
}
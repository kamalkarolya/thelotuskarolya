function showTime(){
    var date = new Date();
    var hrs= date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var session = "AM";
    
    if(hrs == 0){
        hrs = 12;
    }
    
    if(hrs > 12){
        hrs = hrs - 12;
        session = "PM";
    }
    
    hrs = (hrs < 10) ? "0" + hrs : hrs;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    
 
    document.getElementById("time1").innerText = hrs;
    document.getElementById("time1").textContent = hrs;
    document.getElementById("time2").innerText = min;
    document.getElementById("time2").textContent = min;
    document.getElementById("time3").innerText = sec;
    document.getElementById("time3").textContent = sec;
    
    document.getElementById("time4").innerText = session;
    document.getElementById("time4").textContent = session;

    
    setTimeout(showTime, 1000);
    
}

showTime();
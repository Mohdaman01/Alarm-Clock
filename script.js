

const alarmList = document.getElementById('alarm-list');

    // alarm sound //
var sound = new Audio("assets/Mood 24k Gold Lofi - Mood LoFi.mp3");
sound.loop = true;

    //  current time //

(function(){

    var currentTime = document.getElementById('current-time');

    //  display current time by the second

    setInterval(function(){
    var date = new Date();
    
    var hours = (12 - (date.getHours()));
    
    var minutes = date.getMinutes();
    
    var seconds = date.getSeconds();
    
    var ampm = (date.getHours() < 12 ) ? 'AM' : 'PM';

    //convert military time to standard time

    if (hours < 0) {

      hours = hours * -1;

    } else if (hours == 00) {

      hours = 12;

    } else {

      hours = hours;

    }

    
    currentTime.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + " " + ampm;
    
  },1000);

  /*functions to get hour, min, secs, 
    am or pm, add zero, set alarm time and sound, clear alarm
  */

    function addZero(time) {

      return (time < 10) ? "0" + time : time;
    
    }

})();


//   Set Alarm // 

function setHours(){

  var getHours = document.getElementById("set-hours");

  for(let i = 0;i<=12 ; i++){

    getHours.options[getHours.options.length] = new Option( i < 10 ? "0" + i : i);

  }

}

setHours();

function setMinutes(){

  var getMinutes = document.getElementById('set-min');

  for(let i =0 ; i<=59 ; i++){

    getMinutes.options[getMinutes.options.length]= new Option( i < 10 ? "0"+ i : i);

    }

}
setMinutes();

// renderAlarmTODOM //

  function renderAlarm(){

    alarmList.innerHTML='';
  
    if(localStorage.length>0){

      for(let i=0; i<localStorage.length ;i++){
  
        let li = document.createElement('li');
    
        li.innerHTML=`
        <label for="task1">${localStorage.getItem(localStorage.key(i))}</label>
        <img src="assets/ios-bin-150.png" class="delete" data-id=${localStorage.key(i)} onClick=clearAlarm(${localStorage.key(i)}) />`;
        // console.log(localStorage.key(i))
        alarmList.append(li);
    
      }
    }
  
  }
  renderAlarm();
 

// set Alarm btn // 

 function setAlarm(){

  var hr =  document.getElementById('set-hours');

  var min = document.getElementById('set-min');

  var sec = "00";

  var ap = document.getElementById('set-AM/PM');

  var selectedHour = hr.options[hr.selectedIndex].value;

  var selectedMin = min.options[min.selectedIndex].value;

  var selectedAP = ap.options[ap.selectedIndex].value;

  var alarmTime = selectedHour + ":" + selectedMin + ":" + sec +" "+selectedAP;

  // console.log('alarmTime:' + alarmTime);


  // setInterval(()=>{

  //   var currentTime = document.getElementById('current-time').textContent;

  //   if(localStorage.length>0){

  //     for(let i=0;i<localStorage.length;i++){

  //         if(localStorage.getItem(localStorage.key(i)) === currentTime){

  //           sound.play();

  //         }

  //       }

  //     }

  //   },1000);

  const id=Date.now();

  // console.log(id);

  addAlarm(alarmTime,id);

}

setInterval(()=>{

  var currentTime = document.getElementById('current-time').textContent;

  if(localStorage.length>0){

    for(let i=0;i<localStorage.length;i++){

        if(localStorage.getItem(localStorage.key(i)) === currentTime){

          sound.play();
        }

      }

    }

  },1000);


  // function to store in alarms array //

function addAlarm(alarmTime,id){

  const alarm = {
    time : alarmTime,
    id
  }
   
 localStorage.setItem(alarm.id,alarm.time);
//  alarms.push(alarm);

  renderAlarm();

}

 // function to remove alarm form alarms array

function clearAlarm(id){

  localStorage.removeItem(id);

  renderAlarm();

	sound.pause();
  
}

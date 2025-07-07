const p=document.querySelector("p")
const background=document.querySelector("div")

const audio=document.querySelector("audio")
document.body.addEventListener("click",()=>{
    audio.play()
})

const start=1751903867724 //initial seed
let goal=findTime(Date.now())
requestAnimationFrame(main);
function main(){
let current=Date.now()
background.style.filter=`hue-rotate(${(Date.now()/(5000))%360}deg)`
let timeDif=goal-current
let day=Math.floor(timeDif/86400000);
let hour=Math.floor( (timeDif-(day*86400000))/3600000)
let min=Math.floor(((timeDif-(day*86400000) - (hour* 3600000)))/60000);
let sec=Math.floor(((timeDif-(day*86400000) - (hour* 3600000)-(min*60000)))/1000);
if(timeDif<0){
    timeDif=0;
}
if(day<100){
    day="0"+day
}
if(day<10){
    day="00"+day
}
if(hour<10){
    hour="0"+hour
}
if(min<10){
    min="0"+min
}
if(sec<10){
    sec="0"+sec
}

p.innerHTML=`${day}:${hour}:${min}:${sec}`
if(timeDif==0){
    alert("Timer's up!")
    goal=newTime(goal)
}
requestAnimationFrame(main);
}


function findTime(current){
    /*
    Uses seeded hash to generate next date in 
    sequence, starting with initial date. If generated date
    is in the future, then that is the goal date.
    */
    let tmpTime=start;
    while (tmpTime<current){
        tmpTime=newTime(tmpTime)
    }
    return tmpTime
}
function newTime(old){
    //multiplier to make larger range of new dates
    return parseInt(cyrb128(old.toString()))*7+old
}
/*
//test newTime
console.log(new Date(newTime(Date.now())))
*/

function cyrb128(str) {
//https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return h1>>>0
}
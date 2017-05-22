console.log('earth.js loaded')


// assyncronous processes using new ES6 cmds
var sleep = n => new Promise(resolve => setTimeout(resolve,n))
async function process(n){
    n = n||1000
    console.log('started ...')
    await sleep(n)
    //debugger
    console.log('... ended normal process')
    await sleep(n)
    console.log('... ended twice as long process')
}
// try process(1000)

// Earth APIs at  https://developers.google.com/maps/web-services/overview




earth={
    div: document.getElementById('earthDiv')
}

// build UI
if(earth.div){
    earth.add2div=function(h){
        $(h).appendTo(earthDiv)
    }
    // get API Key
    earth.add2div('<div>API Key: <input id="apiKey" style="color:blue"> <button id="apiButton" class="btn btn-primary">demo</button> <br> Clicking on the button will borrow Google Maps demo api key, if you abuse it Google will block this application</div>')
    apiButton.onclick = function(){
        apiKey.value='AIzaSyDIJ9XX2ZvRKCJcFRrl-lRanEtFUow4piM'  // Google developers demo key
        earth.imgDiv=document.getElementById('imgDiv')
        if(!earth.imgDiv){
            earth.add2div('<div id="imgDiv"></div>')
        }
    }

    

}

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
    let log = console.log
    earth.add2div=function(h,div){
        div=div||earth.div
        $(h).appendTo(earthDiv)
    }
    // get API Key
    earth.add2div('<div><b style="color:blue">API Key:</b> <input id="apiKey" style="color:blue"> <button id="earthConnectBt" class="btn btn-success">Connect</button> <button id="getApiKey" class="btn btn-primary">Get Key*</button> <p id="earthMsg">* I don\'t want to pay for <a href="https://developers.google.com/maps/documentation/static-maps/get-api-key" target="_blank">your</a> usage ;-)</p></div>')
    earth.add2div('<div  id="imgDiv"></div>')
    earth.imgDiv=document.getElementById('imgDiv')
    getApiKey.onclick = function(){
        if(localStorage.imgkey){
            apiKey.value=localStorage.imgkey
        }else{
            window.open('https://developers.google.com/maps/documentation/static-maps/get-api-key')
        }
    }
    earthConnectBt.onclick = function(){
        log('loading image API')
        $.getScript("https://maps.googleapis.com/maps/api/js?key="+apiKey.value+"&callback=earth.fun")
         //.then(earth.fun)
    }

    earth.fun=function(){
        // http://maps.googleapis.com/maps/api/staticmap?size=1000x1000&maptype=satellite&visible=29.8,-13.09&visible=27.38,-18.53
        earth.im = document.createElement('img')
        earth.imgDiv.innerHTML='' // reset
        $(earth.im).appendTo(earth.imgDiv)
        earth.im.src="http://maps.googleapis.com/maps/api/staticmap?size=1000x1000&maptype=satellite&key="+apiKey.value+"&visible=29.8,-13.09&visible=27.38,-18.53"
        earth.im.onload=function(){
            localStorage.imgkey=apiKey.value
            earthMsg.innerHTML='<span style="color:green">image loaded</span>'
        }
        earth.im.onerror=function(){
            earthMsg.innerHTML='<span style="color:red">error loading image, maybe invalid key? bad connection?</span>'
        }
        
        // https://developers.google.com/maps/documentation/static-maps/intro
        // https://developers.google.com/maps/documentation/javascript/
        
        // http://maps.googleapis.com/maps/api/staticmap?sensor=false&size=640x400&maptype=satellite&visible=29.8,-13.09&visible=27.38,-18.53
        // https://stackoverflow.com/questions/9087166/how-can-i-extract-a-satellite-image-from-google-maps-given-a-lat-long-rectangle

        /*
        log('having fun with images')
        var map = new google.maps.Map(document.getElementById('imgDiv'), {
          center: {lat: -34.397, lng: 150.644},
          // Set mapTypeId to SATELLITE in order
          // to activate satellite imagery.
          mapTypeId: 'satellite',
          scrollwheel: false,
          zoom: 8
        });
        */
    }

    

}



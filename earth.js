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
    debugger
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
    earth.add2div('<div><b style="color:blue">API Key:</b> <input id="apiKey" style="color:blue" type="password"> <button id="earthConnectBt" class="btn btn-success">Connect</button> <button id="getApiKey" class="btn btn-primary">Get Key*</button> <input id="keyHide" type="checkbox" checked=true> hide <p id="earthMsg">* I don\'t want to pay for <a href="https://developers.google.com/maps/documentation/static-maps/get-api-key" target="_blank">your</a> usage ;-)</p></div>')
    keyHide.onchange=function(){
        if(this.checked){
            apiKey.type='password'
        } else {
            apiKey.type='text'
        }
    }
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
        // https://developers.google.com/maps/documentation/static-maps/intro
        // https://developers.google.com/maps/documentation/javascript/earth.im = document.createElement('img')
        let h = '<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-home"></span></button>'
        h+=' Latitude:<input id="latitudePos" value="40" size=5 style="color:blue;text-align:right">;  Longitude:<input id="longitudePos" value="-73" size=5 style="color:blue;text-align:right">'
        h+='<br>'
        earth.imgDiv.innerHTML= h
        earth.im = new Image
        $(earth.im).appendTo(earth.imgDiv)
        //earth.im.src="https://maps.googleapis.com/maps/api/staticmap?size=1000x1000&maptype=satellite&key="+apiKey.value+"&visible=29.8,-13.09&visible=27.38,-18.53"
        earth.im.src="https://maps.googleapis.com/maps/api/staticmap?size=1000x1000&maptype=satellite&key="+apiKey.value+"&visible=41,-73&visible=40.5,-73.5"
        earth.im.onload=function(){
            localStorage.imgkey=apiKey.value
            earthMsg.innerHTML='<span style="color:green">image loaded</span>'
        }
        earth.im.onerror=function(){
            earthMsg.innerHTML='<span style="color:red">error loading image, maybe invalid key? bad connection?</span>'
        }
        earth.imMap=document.createElement('div')
        earth.imMap.id='imMap'
        $(earth.imMap).appendTo(earth.imgDiv)
        earth.imMapFun=function () {
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(earth.imMap, {
          center: {lat: -34.397, lng: 150.644},
          scrollwheel: false,
          zoom: 8
        });
      }
    }

    

}



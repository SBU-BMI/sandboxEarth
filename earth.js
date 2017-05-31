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
        let h = '<button id="getLocation" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-home"></span></button>'
        h+=' Latitude:<input id="latitudePos" value="40.9" size=8 style="color:blue;text-align:right">  Longitude:<input id="longitudePos" value="-73.05" size=8 style="color:blue;text-align:right"> Zoom:<input id="zoomPos" value="14" size=8 style="color:blue;text-align:right"> <span id="playIm" class="fa fa-play-circle-o" aria-hidden="true" style="font-size:x-large"></span>'
        h+='<br>'
        h+='<div class="row">'
           h+='<div class="col-md-6"><div id="imMap" style="width:1280px;height:1280px"></div></div>'
           h+='<div class="col-md-6">'
                h+='<img id="imgImg" with="640px" height="640px">'
                h+='<p>mouse at (<span id="mouseLatitude"></span>,<span id="mouseLongitude"></span>)</p>'
                //h+='<p>2</p>'
                //h+='<p>3</p>'
                //h+='<p>4</p>'
           h+='</div>'
        h+='</div>'
        earth.imgDiv.innerHTML= h
        //earth.im = new Image
        //$(earth.im).appendTo(earth.imgDiv)
        //earth.im.src="https://maps.googleapis.com/maps/api/staticmap?size=1000x1000&maptype=satellite&key="+apiKey.value+"&visible=29.8,-13.09&visible=27.38,-18.53"
        // https://developers.google.com/maps/documentation/static-maps/intro
        earth.im=document.getElementById('imgImg')
        playIm.onclick=function(){earth.imMapFun()}
        getLocation.onclick=function(){
            earthMsg.innerHTML='<span style="color:blue">retrieving your current GPS coordinates ...</span>'
            navigator.geolocation.getCurrentPosition(function(p){
                earthMsg.innerHTML='<span style="color:green">your current GPS coordinates were retrieved successfully</span>'
                earth.yourPos=p
                longitudePos.value=earth.yourPos.coords.longitude
                latitudePos.value=earth.yourPos.coords.latitude
                earth.imMapFun()
                earth.im.src="https://maps.googleapis.com/maps/api/staticmap?size=640x640&maptype=satellite&key="+apiKey.value+"&visible="+latitudePos.value+","+longitudePos.value
            })
        }
        earth.im.src="https://maps.googleapis.com/maps/api/staticmap?size=640x640&maptype=satellite&key="+apiKey.value+"&visible="+latitudePos.value+","+longitudePos.value
        earth.im.onload=function(){
            localStorage.imgkey=apiKey.value
            earthMsg.innerHTML='<span style="color:green">image loaded</span>'
            earthConnectBt.disabled=true
        }
        earth.im.onerror=function(){
            earthMsg.innerHTML='<span style="color:red">error loading image, maybe invalid key? bad connection?</span>'
        }
        earth.imMap=document.getElementById('imMap')
        earth.imMapFun=function (lat,lng,zoom) {
            lat=lat||parseFloat(latitudePos.value)
            lng=lng||parseFloat(longitudePos.value)
            zoom=zoom||parseInt(zoomPos.value)
            // Create a map object and specify the DOM element for display.
            earth.mapObj = new google.maps.Map(earth.imMap, {
                center: {lat: lat, lng: lng},
                scrollwheel: false,
                mapTypeId: 'hybrid',
                zoom: zoom
            });
            //event listeners
            // https://developers.google.com/maps/documentation/javascript/events
            earth.mapObj.addListener('center_changed',function(){
                var pos = this.center.toJSON()
                longitudePos.value=pos.lng
                latitudePos.value=pos.lat
                //console.log(Date(),this.center.toString())
            })
            earth.mapObj.addListener('mousemove',function(ev,p){
                earth.mouseLongitude=mouseLongitude.textContent=ev.latLng.lng()
                earth.mouseLatitude=mouseLatitude.textContent=ev.latLng.lat()
                //console.log(Date(),this.center.toString())
            })
            earth.mapObj.addListener('click',function(ev,p){
                earth.clickLongitude=ev.latLng.lng()
                earth.clickLatitude=ev.latLng.lat()
                earth.im.src="https://maps.googleapis.com/maps/api/staticmap?size=640x640&maptype=satellite&key="+apiKey.value+"&visible="+earth.clickLatitude+","+earth.clickLongitude
            })

        }
        earth.imMapFun()
        

    }

    

}



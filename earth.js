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

    // Image analysis utils
	earth.colormap=function(v){ // value between 0 and 1
		/*
		var cm=[[0,0,0.5625],[0,0,0.625],[0,0,0.6875],[0,0,0.75],[0,0,0.8125],[0,0,0.875],[0,0,0.9375],[0,0,1],[0,0.0625,1],[0,0.125,1],[0,0.1875,1],[0,0.25,1],[0,0.3125,1],[0,0.375,1],[0,0.4375,1],[0,0.5,1],[0,0.5625,1],[0,0.625,1],[0,0.6875,1],[0,0.75,1],[0,0.8125,1],[0,0.875,1],[0,0.9375,1],[0,1,1],[0.0625,1,0.9375],[0.125,1,0.875],[0.1875,1,0.8125],[0.25,1,0.75],[0.3125,1,0.6875],[0.375,1,0.625],[0.4375,1,0.5625],[0.5,1,0.5],[0.5625,1,0.4375],[0.625,1,0.375],[0.6875,1,0.3125],[0.75,1,0.25],[0.8125,1,0.1875],[0.875,1,0.125],[0.9375,1,0.0625],[1,1,0],[1,0.9375,0],[1,0.875,0],[1,0.8125,0],[1,0.75,0],[1,0.6875,0],[1,0.625,0],[1,0.5625,0],[1,0.5,0],[1,0.4375,0],[1,0.375,0],[1,0.3125,0],[1,0.25,0],[1,0.1875,0],[1,0.125,0],[1,0.0625,0],[1,0,0],[0.9375,0,0],[0.875,0,0],[0.8125,0,0],[0.75,0,0],[0.6875,0,0],[0.625,0,0],[0.5625,0,0],[0.5,0,0]]
		       .map(function(c){
		       		return c.map(function(ci){
		       			return parseInt(255*ci)
		       		})
		       });
		if(!v){return cm}
		*/
		var cm = [[0,0,143],[0,0,159],[0,0,175],[0,0,191],[0,0,207],[0,0,223],[0,0,239],[0,0,255],[0,15,255],[0,31,255],[0,47,255],[0,63,255],[0,79,255],[0,95,255],[0,111,255],[0,127,255],[0,143,255],[0,159,255],[0,175,255],[0,191,255],[0,207,255],[0,223,255],[0,239,255],[0,255,255],[15,255,239],[31,255,223],[47,255,207],[63,255,191],[79,255,175],[95,255,159],[111,255,143],[127,255,127],[143,255,111],[159,255,95],[175,255,79],[191,255,63],[207,255,47],[223,255,31],[239,255,15],[255,255,0],[255,239,0],[255,223,0],[255,207,0],[255,191,0],[255,175,0],[255,159,0],[255,143,0],[255,127,0],[255,111,0],[255,95,0],[255,79,0],[255,63,0],[255,47,0],[255,31,0],[255,15,0],[255,0,0],[239,0,0],[223,0,0],[207,0,0],[191,0,0],[175,0,0],[159,0,0],[143,0,0],[127,0,0]]
		return cm[Math.round(63*v)]
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
           h+='<div id="zoomedDiv" class="col-md-6">'
                h+='<canvas id="zoomCanvas" width="640px" height="640px" clientWidth="640px" clientHeight="640px" style="position: absolute; left: 0; top: 0; z-index: 0"></canvas>'
                h+='<canvas id="zoomMask" width="640px" height="640px" clientWidth="640px" clientHeight="640px" style="position: absolute; left: 0; top: 0; z-index: 1"></canvas>'
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
        earth.im.crossOrigin = "Anonymous";
        earth.cv=document.getElementById('zoomCanvas')
        earth.ctx = zoomCanvas.getContext('2d');
        earth.imData2data=function(imData){ // imData is the data structure returned by canvas.getContext('2d').getImageData(0,0,n,m)
            var ii=[];for(var i=0;i<640;i++){ii.push(i)}
	        return ii.map(function(i){
	            return ii.map(function(j){
	                var ij=(i*640+j)*4;
	                return [imData.data[ij],imData.data[ij+1],imData.data[ij+2],imData.data[ij+3]]
	            })
	        })
        }
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
            earth.ctx.drawImage(earth.im,0,0)
            earth.im.hidden=true
            earth.imData=earth.imData2data(earth.ctx.getImageData(0,0,640,640))
        }
        earth.im.onerror=function(){
            earthMsg.innerHTML='<span style="color:red">error loading image, maybe invalid key? bad connection?</span>'
        }
        earth.imMap=document.getElementById('imMap')
        earth.zoomCanvasIni=function(){
            earth.im0=earth.ctx.drawImage(earth.im,0,0)
        }
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
            	zoomMask.hidden=true
                earth.clickLongitude=ev.latLng.lng()
                earth.clickLatitude=ev.latLng.lat()
                earth.im.src="https://maps.googleapis.com/maps/api/staticmap?size=640x640&maptype=satellite&zoom="+(parseInt(zoomPos.value)+2)+"&key="+apiKey.value+"&visible="+earth.clickLatitude+","+earth.clickLongitude
            }) //zoom_changed
            earth.mapObj.addListener('zoom_changed',function(ev,p){
                zoomPos.value=this.zoom
                earth.im.src="https://maps.googleapis.com/maps/api/staticmap?size=640x640&maptype=satellite&zoom="+(parseInt(zoomPos.value)+2)+"&key="+apiKey.value+"&visible="+earth.clickLatitude+","+earth.clickLongitude
            })
            // interacting with zoomed object
            //zoomCanvas.onclick=function(ev){
            //	4
            //}
            zoomCanvas.onclick=zoomMask.onclick=function(ev){
            	var j = ev.offsetY
            	var i = ev.offsetX
            	earth.ij=[i,j]
            	earth.ijrgba=earth.imData[j][i]
            	console.log(j,i,earth.imData[j][i])
            	earth.writeZoom(earth.dist2data())
            	zoomMask.hidden=false
            }
            earth.writeZoom=function(d){
            	d = d || earth.dZoom
            	var cx = zoomMask.getContext('2d')
            	var imData = cx.createImageData(cx.canvas.height,cx.canvas.width);
            	var data = imData.data
            	// convert distances into rgba
            	d.forEach(function(di,i){
            		var j = i*4
            		var c = earth.colormap(1-di)
            		data[j]=c[0]   // r
            		data[j+1]=c[1] // g
            		data[j+2]=c[2] // b
            		//data[j+3]=100
            		//data[j+3]=parseInt((1-di)*100)    // alpha
            		data[j+3]=parseInt((1-di)*100*(di<0.1))
            	})
            	imData.data=data
            	cx.putImageData(imData,0,0)
            }
            earth.zoomDist=function(p){
            	p = p || earth.ijrgba.slice(0,3)
            	var mx = Math.pow(255,2)*3 
            	var d2 = earth.imData.map(function(x,i){ // row
            		return x.map(function(y,j){ // column
            			y=y.slice(0,3) // only rgb
            			return y.map((yi,i)=>Math.pow((yi-p[i]),2)) // distancemetric defined here
            			        .reduce((a,b)=>a+b)/mx // scaling metric to 0 - 1
            		})
            	})
            	return d2
            }
            earth.dist2data=function(p){
            	var d2 = earth.zoomDist()
            	var d = []
            	d2.forEach(function(dj,j){
            		dj.forEach(function(dji,i){
            			d[j*640+i]=dji
            		})
            	})
            	earth.dZoom=d
            	return d
            }
        }
        earth.imMapFun()

        

    }
    $.getScript('https://jonasalmeida.github.io/jmat/jmat.js')

    

}



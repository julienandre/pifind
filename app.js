#! /usr/bin/env node
/**
 Module permettant de générer un UID unique depuis l'ID Hardware du RPi
 */
var mdns = require('mdns');
var program = require('commander');
var pjson = require('./package.json');

var regip = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/;
var timeoutexit = 2000;

program
  .version(pjson.version)
  .usage( '[options]' )
  .option('-a, --all', 'test')
  .parse(process.argv);



// discover all available service types
var browser = mdns.createBrowser(mdns.tcp('workstation')); // all_the_types is just another browser...
browser.on('serviceUp', function(service) {
  var s = parse( service);
  if(s.mac.indexOf("b8:27:eb:") != -1 ){
    console.log( s.name + " : " + s.ip );
//    console.log( JSON.stringify( s ,0,2) );
  }
});

browser.on('serviceDown', function(service) {
  //console.log("service down: ", service);
  console.log("service down: ", service);
});
browser.start();
//
setTimeout(function(){
  browser.stop();
}, timeoutexit );

function parse( s ){
  var service = {};
  var p1 = s.name.indexOf('[');
  var p2 = s.name.indexOf(']');
  service.name = s.name.slice(0, p1-1);
  service.mac = s.name.slice(p1+1, p2);
  service.ips = s.addresses;
  service.ips.forEach(  function(ip,i,ips){
    if( !service.ip && regip.test(ip)   ){
      service.ip = ip;
    }
  });
  return service;
}
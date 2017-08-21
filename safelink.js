/*! jquery-base64 | https://github.com/carlo/jquery-base64 */
"use strict";jQuery.base64=(function($){var _PADCHAR="=",_ALPHA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_VERSION="1.0";function _getbyte64(s,i){var idx=_ALPHA.indexOf(s.charAt(i));if(idx===-1){throw"Cannot decode base64"}return idx}function _decode(s){var pads=0,i,b10,imax=s.length,x=[];s=String(s);if(imax===0){return s}if(imax%4!==0){throw"Cannot decode base64"}if(s.charAt(imax-1)===_PADCHAR){pads=1;if(s.charAt(imax-2)===_PADCHAR){pads=2}imax-=4}for(i=0;i<imax;i+=4){b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12)|(_getbyte64(s,i+2)<<6)|_getbyte64(s,i+3);x.push(String.fromCharCode(b10>>16,(b10>>8)&255,b10&255))}switch(pads){case 1:b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12)|(_getbyte64(s,i+2)<<6);x.push(String.fromCharCode(b10>>16,(b10>>8)&255));break;case 2:b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12);x.push(String.fromCharCode(b10>>16));break}return x.join("")}function _getbyte(s,i){var x=s.charCodeAt(i);if(x>255){throw"INVALID_CHARACTER_ERR: DOM Exception 5"}return x}function _encode(s){if(arguments.length!==1){throw"SyntaxError: exactly one argument required"}s=String(s);var i,b10,x=[],imax=s.length-s.length%3;if(s.length===0){return s}for(i=0;i<imax;i+=3){b10=(_getbyte(s,i)<<16)|(_getbyte(s,i+1)<<8)|_getbyte(s,i+2);x.push(_ALPHA.charAt(b10>>18));x.push(_ALPHA.charAt((b10>>12)&63));x.push(_ALPHA.charAt((b10>>6)&63));x.push(_ALPHA.charAt(b10&63))}switch(s.length-imax){case 1:b10=_getbyte(s,i)<<16;x.push(_ALPHA.charAt(b10>>18)+_ALPHA.charAt((b10>>12)&63)+_PADCHAR+_PADCHAR);break;case 2:b10=(_getbyte(s,i)<<16)|(_getbyte(s,i+1)<<8);x.push(_ALPHA.charAt(b10>>18)+_ALPHA.charAt((b10>>12)&63)+_ALPHA.charAt((b10>>6)&63)+_PADCHAR);break}return x.join("")}return{decode:_decode,encode:_encode,VERSION:_VERSION}}(jQuery));
var Safelink = new Safelink();
function Safelink(){
	this.active = false;
	this.url = [];
	this.api = function(json){
		var dasar  = json.feed.entry;
		var jumlah = dasar.length;
		this.url["url"] = json.feed.link[2].href;
		for(var indeksEntri = 0; indeksEntri < jumlah; indeksEntri++){
			if(indeksEntri == jumlah){
				break;
			}
			var tautan = dasar[indeksEntri].link[4].href;
			this.url.push(tautan);
		}
	}
	this.get = function(){
		var filter = location.search.substr(1).split("&");
		var indeks = [];
		for(var indeksFilter = 0; indeksFilter < filter.length; indeksFilter++){
			var hasil = filter[indeksFilter].split("=");
			indeks[hasil[0]] = decodeURIComponent(hasil[1]);
		}
		return indeks;
	}
	this.cek = function(data){
		if(typeof data != "undefined"){
			return true;
		}else{
			return false;
		}
	}
	this.run = function(){
		var $_GET = Safelink.get();
		if(Safelink.cek($_GET["data"])){
			var acak = Math.floor((Math.random() * Safelink.url.length) + 0);
			location.href = Safelink.url[acak] + "?url=" + $_GET["data"];
		}else if(Safelink.url.indexOf(location.href.replace(location.search, "").replace(location.origin + "/", Safelink.url["url"])) != -1 && Safelink.cek($_GET["url"]) == true){
			$(".post-body").html("<div class=\"fyline-generate\"></div>" + $(".post-body").html() + "<div class=\"fyline-visit\"></div>");
			$(".fyline-generate")
			.css("display", "block")
			.css("text-align", "center")
			.css("background-color", "green")
			.css("color", "white")
			.css("padding", "5px 10px")
			.css("font-size", "14px")
			.css("border", "1px solid rgba(0, 0, 0, 0.3)")
			.css("cursor", "pointer")
			.css("border-radius", "5px")
			.css("font-family", "monospace")
			.css("margin-bottom", "10px")
			.attr("onclick", "Safelink.generate()")
			.html("Click Here to Generate");
		}
	}
	this.generate = function(){
		Safelink.active = true;
		var seconds   = $("script.fyline-safelink").attr("data-timer");
		var countdown = setInterval(function(){
			seconds--;
			if(seconds > 0){
				$(".fyline-generate").css("cursor", "not-allowed");
				$(".fyline-generate").css("opacity", "0.8");
				$(".fyline-generate").html("Wait in " + seconds + " seconds.");
			}else if(seconds == 0){
				clearInterval(countdown);
				$(".fyline-generate").css("opacity", "1");
				$(".fyline-generate").html("Click here!").css("cursor", "pointer").attr("onclick", "Safelink.scroll()");
			}
		}, 1000);
	}
	this.scroll = function(){
		$(".fyline-generate").fadeOut("slow");
		$("html, body").animate({
			scrollTop: jQuery(".fyline-visit").offset().top
		}, 2000);
		Safelink.visit();
	}
	this.visit = function(){
		var seconds = 4;
		$(".fyline-visit")
		.css("display", "block")
		.css("text-align", "center")
		.css("background-color", "green")
		.css("color", "white")
		.css("padding", "5px 10px")
		.css("font-size", "14px")
		.css("border", "1px solid rgba(0, 0, 0, 0.3)")
		.css("cursor", "pointer")
		.css("border-radius", "5px")
		.css("font-family", "monospace")
		.css("margin", "10px 0")
		.css("opacity", "0.8")
		.html("Please wait...");
		var countdown = setInterval(function(){
			seconds--;
			if(seconds == 0){
				clearInterval(countdown);
				$(".fyline-visit").attr("onclick", "Safelink.out()").html("Visit URL").css("opacity", "1");
			}
		}, 1000);
	}
	this.out = function(){
		location.href = $.base64.decode(Safelink.get()["url"]);
	}
}
$(document).ready(function(){
	Safelink.run();
});

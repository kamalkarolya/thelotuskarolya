$(document).ready(function(){
    $(".hamburger").click(function(){
        
        $(".navbar").css({"background-color":"black","position": "fixed","top":"0","width":"100%" ,"height":"100%" } );
        $(".nav-link").css({ "color": "white"} );
        $(".container-fluid").css({"color":"white"});
        $(".navbar-nav ").css({"padding-top":"15vw" });
        $(".hamburger").hide(50);
        $(".close").show("fast");
        $(".collapse").slideToggle("slow");
    });

     $(".close").click(function(){
        $(".navbar-nav ").css({"padding-top":"intial" });
        $(".close").hide(50);
        $(".hamburger").show("fast");
        $(".collapse").hide(5);
        $(".container-fluid").css({"color":"black"});
         $(".navbar").css({"background-color":"transparent","position":"static","height":"initial"});
    } );
 });
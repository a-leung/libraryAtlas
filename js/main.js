$( "#interests, #homepage").addClass("hidden");

$('a[data-anchor]').each(function(){

    $(this).click(function(){

      var anchor = $($(this).attr('data-anchor'))

      $('html, body').animate({
        scrollTop : anchor.offset().top 
      },200,function(){})

      return false;
    })

})


var cb = new Codebird;
cb.setConsumerKey('oGtj4ibCQ1SlSg4fgQqQ', 'TJgnryUo1C67JHgAIC3vkK86tw1DgORRKiCPICYEqE');


var current_section = $("#landing");

function set_current_section(curr_section){
    $('section').addClass('hidden');
    curr_section.removeClass('hidden');
    current_section = curr_section;
}

function show_section(section){
    section.addClass('hidden');
}


function scroll_section(section){
  
  show_section(section);  

  // console.log(section.offset().top)

  $('html, body').animate({
    scrollTop : section.offset().top 
  },200,function(){
    set_current_section(section);
    // console.log('animate ' + section.offset().top)
  })
}



$('#btn-twitter').click(function(){
   
  var that = this;      

  cb.setToken('84832050-lTLUyzC12IIjEnipuUhzKFmHCYvj2G0yTTIHGbxZ4', 'v5N1MeTEHiRnsAlbx2pKUy6S7jApGJYbW8RwwRtEF8');

  cb.__call(
    'account_verifyCredentials',
    {},
    function (reply) {
        
        //we are logged in with twitter 

        if(!reply.errors){
            
            // $.cookie.json = true;
            $.cookie('user', 'logged_in');
            // $.cookie('user_info', reply);


            // console.log($.cookie('user'));
            // console.log(reply);


            // console.log($.cookie('user'));

            var next_section = $('#interests');

            scroll_section(next_section);


            $('.user-info .avatar',next_section).attr("src",reply.profile_image_url);    
            $('.user-info .screen_name',next_section).html("Welcome <b>" + reply.screen_name + "</b>");
            $('.user-info',next_section).removeClass('hidden');

            // $(that).addClass('hidden');
        } else {

            $('.signup-error-msg').html("We have an error here. Probably too many requests to twitter. Wait up a sec...!")

        }
    }
  );

        // var that = this;

        // // gets a request token
        // cb.__call(
        //     'oauth_requestToken',
        //     {oauth_callback: 'oob'},
        //     function (reply) {
        //         // stores it
        //         cb.setToken(reply.oauth_token, reply.oauth_token_secret);

        //         // gets the authorize screen URL
        //         cb.__call(
        //             'oauth_authorize',
        //             {},
        //             function (auth_url) {
        //                 window.codebird_auth = window.open(auth_url);
        //                 $('#PINFIELD').removeClass('hidden');
        //             }
        //         );
        //     }

        // );


        // cb.__call(
        //     'oauth_accessToken',
        //     {oauth_verifier: document.getElementById("PINFIELD").value},
        //     function (reply) {
        //         // store the authenticated token, which may be different from the request token (!)
        //         cb.setToken(reply.oauth_token, reply.oauth_token_secret);
// 
        //         // if you need to persist the login after page reload,
        //         // consider storing the token in a cookie or HTML5 local storage
        //     }
        // );  

})


$('#interests-form').submit(function(post){

    // var interests = {
    //         'genre'     : []
    //        ,'cities'    : []
    //        ,'books'     : []
    //        ,'author'    : []
    // };

    var interests = [];

    $('.select2-search-choice',this).each(function(){
        interests.push($('div',this).html());
        // console.log($(this));
    });

    // interests.cities = cities;

    // console.log(interests);
    // var cookie = $.cookie('user');
    // cookie.interests = "ad"; 

    // console.log(this);
    // cookie = 'ad';
    
    // $.removeCookie('user');
    // $.cookie('user', 'sa');
    // if($.cookie('user')){
    //     var cookie = $.cookie('user');
    //     cookie.interests = interests;

    //     $.cookie('user',cookie);
    //     console.log($.cookie('user'));
    // }
    // console.log($.cookie('user'))    ;

    scroll_section($($(this).attr('data-action')));

    notify();

    load_map();

    return false;

})




// COOKIES HANDLE

// $.removeCookie('user');

if($.cookie('user')){    
    // console.log($.cookie('user'));
    set_current_section($("#homepage"));      

    load_map();

    notify(); 
}

$('#reset').click(function(){
    $.removeCookie('user');

    set_current_section($("#landing"));      


})

function load_map(){
  
    
    var map = L.map('map').setView([40.7534388, -73.9901187], 16);
    
    // var marker = L.marker([40.7534388, -73.9901187]).addTo(map).bindPopup("AlleyNYC").openPopup();
    var bat1 = L.marker([40.762711,-73.9739]).addTo(map).bindPopup("Tiffany's").openPopup();


    L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
        maxZoom: 18
        
    }).addTo(map);


    // function onLocationFound(e) {
    //     var radius = e.accuracy / 2;

    //     L.marker(e.latlng, {bounceOnAdd: true}).addTo(map)
    //         .bindPopup("You are within " + radius + " meters from this point").openPopup();

    //     L.circle(e.latlng, radius).addTo(map);
    // }

    // function onLocationError(e) {
    //     alert(e.message);
    // }

    // map.on('locationfound', onLocationFound);
    // <!-- map.on('locationerror', onLocationError); -->

    // map.bounce();

    // map.locate({setView: true, maxZoom: 16});

}

function notify(){
    $('.notification').delay(2000).fadeIn('fast');
    
}


$('.btn-close').click(function(){
    // console.log("S");
    $('.notification').fadeOut('fast',function(){

        $('#top_tweet').fadeIn('slow');

    });    
})
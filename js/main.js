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
    section.removeClass('hidden');
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

        $(that).addClass('hidden');
        
        if(reply){
            var next_section = $('#interests');

            scroll_section(next_section);

            console.log(reply);

            $('.user-info .avatar',next_section).attr("src",reply.profile_image_url);    
            $('.user-info .screen_name',next_section).html("Welcome <b>" + reply.screen_name + "</b>");
            $('.user-info',next_section).removeClass('hidden');
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

        //         // if you need to persist the login after page reload,
        //         // consider storing the token in a cookie or HTML5 local storage
        //     }
        // );  

})


$('#interests-form').submit(function(){

    scroll_section($($(this).attr('data-action')));

    return false;

})
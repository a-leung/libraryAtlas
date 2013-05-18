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

$('#btn-twitter').click(function(){
   
  var that = this;      

  cb.setToken('84832050-lTLUyzC12IIjEnipuUhzKFmHCYvj2G0yTTIHGbxZ4', 'v5N1MeTEHiRnsAlbx2pKUy6S7jApGJYbW8RwwRtEF8');

  cb.__call(
    'account_verifyCredentials',
    {},
    function (reply) {
        
        //we are logged in with twitter 

        $(that).addClass('hidden');
        console.log(reply);
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
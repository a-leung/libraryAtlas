$('a').each(function(){

  // console.log(this);

    $(this).click(function(){

      console.log($(this).attr('data-anchor'));

    })

    // $(this).attr('data-anchor').click(function(){

    //   var anchor = $(this).attr('data-id')
    //               ;

    //   $(window).animate(function(){
    //     scrollTop : anchor.offset().top 

    //   })

    //   return false; 

    // })

})
$(function () {
    
  // init feather icons
  feather.replace();

  // init tooltip & popovers
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  //page scroll
  $("a.page-scroll").bind("click", function (event) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top - 50,
        },
        1000
      );
    event.preventDefault();
  });

  //toggle scroll menu
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    //adjust menu background
    if (scroll >= 100) {
      $(".sticky-navigation").addClass("navbar-shadow");
    } else {
      $(".sticky-navigation").removeClass("navbar-shadow");
    }

    // adjust scroll to top
    if (scroll >= 600) {
      $(".scroll-top").addClass("active");
    } else {
      $(".scroll-top").removeClass("active");
    }
    return false;
  });

  // scroll top top
  $(".scroll-top").click(function () {
    $("html, body").stop().animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });

  /**Theme switcher - DEMO PURPOSE ONLY */
  $(".switcher-trigger").click(function () {
    $(".switcher-wrap").toggleClass("active");
  });
  $(".color-switcher ul li").click(function () {
    var color = $(this).attr("data-color");
    $("#theme-color").attr("href", "css/" + color + ".css");
    $(".color-switcher ul li").removeClass("active");
    $(this).addClass("active");
  });
  $("form").submit(function (event) {
    event.preventDefault();

    fetch($(this).attr("action"), {
      method: "POST",
      body: new FormData(this),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          // Handle non-200 responses
          throw new Error("Network response was not ok");
        }
        return;
      })
      .then(() => {
        $("form")[0].reset();
        $("#feedback")
          .text("הטופס נשלח בהצלחה!")
          .removeClass("d-none alert-danger")
          .addClass("alert-success");
      })
      .catch((err) => {
        $("#feedback")
          .text("הייתה שגיאה בשליחת הטופס, אנא נסה שוב מאוחר יותר.")
          .removeClass("d-none alert-success")
          .addClass("alert-danger");
      })
      .finally(() => {
        $("html, body").animate(
          {
            scrollTop: $("#feedback").offset().top,
          },
          1000
        );
      });
  });
});

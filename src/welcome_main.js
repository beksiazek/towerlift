var apiKey = "$2b$10$fY2rCofm0HwEYRfC5TpXpuAysLMAX4nI8KPFmQHe0wdgfIDhBWaH.";
var imagenes;

$.ajax({
    url: 'https://api.jsonbin.io/b/603c7dd50866664b108594ca/1',
    type: 'GET',
    dataType: 'json',
    beforeSend: function(rHeader) {
      $("#imagelodaing").show();
      rHeader.setRequestHeader("secret-key", "$2b$10$fY2rCofm0HwEYRfC5TpXpuAysLMAX4nI8KPFmQHe0wdgfIDhBWaH.");
    },
    success: function(response) {
        imagenes = response;
        $("#pills-introduccion > img").attr("src", imagenes[0].urlimg);
        $("#pills-info > img").attr("src", imagenes[1].urlimg);
    }
})

$('#pills-tab-bienvenido').on('click', function (event) {
    event.preventDefault();
    $(this).tab('show');
})

$('#pills-tab-introduccion').on('click', function (event) {
    event.preventDefault();
    $(this).tab('show');
})

$('#pills-tab-info').on('click', function (event) {
    event.preventDefault();
    $(this).tab('show');
})

$('#button-empezar').click(function(){
    window.location.href='index.html';
 })

$(document).ready(function(){

    let height = $(window).height();

    $('#main-container').height(height);
});

$('body').css('background-image',
 'url("./background.jpg")');
$('body').css('overflow', 'hidden');
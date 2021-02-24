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
 'url("https://cdna.artstation.com/p/assets/images/images/024/829/406/large/nawid-stettner-game.jpg?1583682873")');
$('body').css('overflow', 'hidden');
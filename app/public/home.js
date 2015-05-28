$(function () {
  var $source = $('#source');
  var $fire = $('#fire');
  var $result = $('#result');

  var getUrl = (function () {
    var port = +window.location.port;
    var site = window.location.protocol + '//' + window.location.hostname;
    if (port && port !== 80) {
      site += ':' + window.location.port;
    }
    site += '/';
    return function (id) {
      return site + id;
    };
  })();

  $fire.on('click', function () {
    $fire.attr('disabled', 'disabled');
    NProgress.start();
    $.ajax({
      url: '/api/basic/yacht',
      type: 'post',
      data: {
        source: $source.val()
      },
      dataType: 'json',
      complete: function () {
        $fire.attr('disabled', null);
        NProgress.done();
      },
      error: function (err, textStatus, errorThrown) {
        console.error(err);
        alert('fail: ' + errorThrown);
      },
      success: function (data) {
        var $p;
        var url;
        if (!data || !data.id) {
          console.warn(data);
          return alert('fail: unexcepted result');
        }
        url = getUrl(data.id);
        $('<p>').append($('<a>').attr('href', url).attr('target', '_blank').text(url)).appendTo($result);
      }
    })
  });


});

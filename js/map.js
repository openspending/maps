jQuery(function($) {
  var url = 'https://docs.google.com/a/okfn.org/spreadsheet/ccc?key=0AqR8dXc6Ji4JdHZZNUpWQ2paY3FfYTdFNXkxZXZDTWc#gid=0';
  var dataset = new recline.Model.Dataset({
    url: url,
    backend: 'gdocs'
  });
  var map = new recline.View.Map({
    el: $('.map'),
    model: dataset
  });
  map.render();
  dataset.fetch()
    .done(function() {
      dataset.records.each(function(record) {
        if (record.get('latitude')=='' && record.get('place')) {
          var url = 'http://open.mapquestapi.com/nominatim/v1/search.php?format=json&q=' + encodeURIComponent(record.get('place'));
          $.getJSON(url, function(data) {
            record.set({
              latitude: data[0].lat,
              longitude: data[0].lon
            });
          });
        }
      });

      $('.loading').hide();
    })
    ;
});


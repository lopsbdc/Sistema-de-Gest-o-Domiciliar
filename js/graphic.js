google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawMultSeries);

function drawMultSeries() {
      var data = google.visualization.arrayToDataTable([
        ['Suprimentos', 'Quantidade Mensal', 'Quantidade em Estoque'],
        ['New York City, NY', 8175000, 8008000],
        ['Los Angeles, CA', 3792000, 3694000],
        ['Chicago, IL', 2695000, 2896000],
        ['Houston, TX', 2099000, 1953000],
        ['Philadelphia, PA', 1526000, 1517000]
      ]);

      var options = {
        title: 'Controle de Suprimentos',
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Controle de Suprimentos',
          minValue: 0
        },
       
      };

      var chart = new 
      google.visualization.BarChart(document.getElementById('Grafico_Suprimentos'));
      chart.draw(data, options);
    }
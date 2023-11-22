
$(document).ready(function () {

  $("#search").click(function(){
    getData();

    let data;
  
    async function getData() {
      try {
          const response = await $.ajax({
              url: 'https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2023-01',
              method: 'GET',
              dataType: 'json'
          });
  
          data = response;
          filterData();
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
    function filterData() {
        let s = $("#input").val();
  
        function filterAndLimit(data, category, limit) {
            const filteredData = data.filter(item => item.category === category);
            const limitedData = filteredData.slice(0, limit);
            return limitedData;
        }
  
        const filteredAndLimitedData = filterAndLimit(data, s, 1000);
        console.log(filteredAndLimitedData);
  
        function generateTableHTML(data) {
            var tableHTML = '<table border="5" color="purple"><thead><tr><th>Street Name</th><th>Date</th><th>Status</th></tr></thead><tbody>';
  
            filteredAndLimitedData.forEach(function (item) {
                tableHTML += '<tr>';
                tableHTML += '<td id="ans2">' + item.location.street.name + '</td>';
                tableHTML += '<td id="ans3">' + item.outcome_status.date + '</td>';
                tableHTML += '<td id=ans4>' + item.outcome_status.category + '</td>';
                tableHTML += '</tr>';
            });
  
            tableHTML += '</tbody></table>';
            return tableHTML;
        }
  
        var tableContainer = $('#table-container');
  
        tableContainer.html(generateTableHTML(data));
    }
  });
 
});





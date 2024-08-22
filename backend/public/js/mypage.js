document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('period-form');
    const recordsContainer = document.getElementById('records-container');
    const recordsBody = document.getElementById('records-body');
    const recordCount = document.getElementById('record-count');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const period = document.querySelector('input[name="period"]:checked').value;

        fetch(`/api/records?period=${period}`)
            .then(response => response.json())
            .then(data => {
                if (data.records && data.records.length > 0) {
                    console.log(data.records);
                    recordCount.textContent = data.records.length;
                    recordsBody.innerHTML = data.records.map(record => `
                        <tr>
                            <td>${formatDate(record.study_date)}</td>
                            <td>${record.measurement_time}</td>
                            <td>${record.content}</td>
                        </tr>
                    `).join('');
                } else {
                    recordsContainer.innerHTML = '<p>指定された期間の記録がありません。</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                recordsContainer.innerHTML = '<p>データの取得中にエラーが発生しました。</p>' + error;
            });
    });

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}年${month}月${day}日`;
      }
});
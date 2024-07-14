let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const saveButton = document.getElementById('save');
const content = document.getElementById('content');

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = '開始';
        isRunning = false;
    } else {
        timer = setInterval(updateTime, 1000);
        startStopButton.textContent = '停止';
        isRunning = true;
    }
}

function updateTime() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    display.textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function save() {
    if (content.value === '' || content.value === null) {
        alert('勉強内容を入力してから終了してください');
        return;
    }
    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            study_date: getCurrentDate(),
            content: content.value,
            measurement_time: display.textContent
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('データが保存されました');
            // 初期状態に戻す
            clearInterval(timer);
            seconds = 0;
            minutes = 0;
            hours = 0;
            display.textContent = '00:00:00';
            startStopButton.textContent = '開始';
            isRunning = false;
            content.value = '';
            //最新の画面を表示する
            fetchLatestData();
        } else {
            alert('データの保存に失敗しました');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('エラーが発生しました');
    });
}

function fetchLatestData() {
    // サーバーから最新のデータを取得して表示を更新する
    fetch('/get-latest-data')
      .then(response => response.json())
      .then(data => {
        // 取得したデータを使って画面を更新する
        updateDisplay(data);
      })
      .catch(error => console.error('Error fetching latest data:', error));
  }

startStopButton.addEventListener('click', startStop);
saveButton.addEventListener('click', save);
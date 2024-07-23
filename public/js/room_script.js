// public/js/room_script.js
document.addEventListener('DOMContentLoaded', () => {
    const seatContainer = document.getElementById('seat-container');
    const studyContainer = document.getElementById('study-container');
    const studyContentInput = document.getElementById('study-content');
    const timeDisplay = document.getElementById('time');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    
    let timerInterval;
    let startTime;
    let reservedSeatIndex;

    // 座席の初期化
    function initializeSeats() {
        fetch('/api/seats')
            .then(response => response.json())
            .then(seats => {
                seatContainer.innerHTML = '';
                seats.forEach((reserved, index) => {
                    const seat = document.createElement('div');
                    seat.className = `seat ${reserved ? 'reserved' : 'available'}`;
                    seat.textContent = index + 1;
                    seat.addEventListener('click', () => reserveSeat(index));
                    seatContainer.appendChild(seat);
                });
            });
    }

    // 座席の予約
    function reserveSeat(index) {
        fetch('/api/reserve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ seatIndex: index+1 }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                reservedSeatIndex = index;
                seatContainer.style.display = 'none';
                studyContainer.style.display = 'block';
            } else {
                alert(data.message);
            }
        });
    }

    // ストップウォッチの開始
    function startStopwatch() {
        startTime = Date.now();
        timerInterval = setInterval(updateTime, 1000);
        startButton.disabled = true;
        stopButton.disabled = false;
    }

    // ストップウォッチの停止
    function stopStopwatch() {
        clearInterval(timerInterval);
        const elapsedTime = Date.now() - startTime;
        const studyContent = studyContentInput.value;
        
        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                study_date: new Date().toISOString().split('T')[0],
                content: studyContent,
                measurement_time: Math.floor(elapsedTime / 1000),
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                releaseSeat(reservedSeatIndex);
            } else {
                alert('Failed to save study session');
            }
        });
    }

    // 座席の解放
    function releaseSeat(index) {
        fetch('/api/release', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ seatIndex: index+1 }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                initializeSeats();
                seatContainer.style.display = 'block';
                studyContainer.style.display = 'none';
                startButton.disabled = false;
                stopButton.disabled = true;
                studyContentInput.value = '';
                timeDisplay.textContent = '00:00:00';
            } else {
                alert('Failed to release seat');
            }
        });
    }

    // 時間の更新
    function updateTime() {
        const elapsedTime = Date.now() - startTime;
        const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, '0');
        const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    startButton.addEventListener('click', startStopwatch);
    stopButton.addEventListener('click', stopStopwatch);

    initializeSeats();
});

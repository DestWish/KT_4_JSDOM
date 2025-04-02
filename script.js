document.addEventListener('DOMContentLoaded', function() {
    function createSlider(id) {
        const slider = document.getElementById(id);
        

        const progress = document.createElement('div');
        progress.className = 'slider-progress';
        

        const thumb = document.createElement('div');
        thumb.className = 'slider-thumb';
        

        const valueBubble = document.createElement('div');
        valueBubble.className = 'value-bubble';
        thumb.appendChild(valueBubble);


        const numbers = document.createElement('div');
        numbers.className = 'slider-numbers';
        

        for (let i = 0; i <= 100; i += 20) {
            const number = document.createElement('span');
            number.className = 'slider-number';
            number.textContent = i;
            number.style.left = `${i}%`;
            numbers.appendChild(number);
        }


        if (id === 'tick-slider' || id === 'thumb-slider') {
            const ticks = document.createElement('div');
            ticks.className = 'slider-ticks';
            

            for (let i = 0; i <= 20; i++) {
                const tick = document.createElement('div');
                tick.className = 'tick';
                tick.style.left = `${i * 5}%`;
                ticks.appendChild(tick);
            }
            slider.appendChild(ticks);
        }


        if (id === 'divisor-slider') {
            const marks = document.createElement('div');
            marks.className = 'slider-track-marks';
            slider.appendChild(marks);
        }


        slider.appendChild(progress);
        slider.appendChild(thumb);
        slider.parentElement.appendChild(numbers);


        let value = 50;
        updateSlider(value);


        function updateSlider(percent) {
            value = Math.max(0, Math.min(100, percent));
            thumb.style.left = `${value}%`;
            progress.style.width = `${value}%`;
            valueBubble.textContent = Math.round(value);
        }


        let isDragging = false;

        function onDrag(e) {
            if (!isDragging) return;
            const rect = slider.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            updateSlider(percent);
        }


        thumb.addEventListener('mousedown', function(e) {
            isDragging = true;
            thumb.classList.add('dragging');
            e.preventDefault();
        });

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', function() {
            isDragging = false;
            thumb.classList.remove('dragging');
        });

        slider.addEventListener('click', function(e) {
            if (e.target !== thumb) {
                const rect = slider.getBoundingClientRect();
                const percent = ((e.clientX - rect.left) / rect.width) * 100;
                updateSlider(percent);
            }
        });
    }


    createSlider('slider');
});

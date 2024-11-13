const sliders = document.querySelectorAll('.slider');
const values = document.querySelectorAll('.value');
const totalDisplay = document.getElementById('total');
const totalValues = document.querySelector('.total-values');
const checkboxCircle = document.querySelector('.checkbox_circle')

function updateValues() {
    let total = 0;
    let percent = 0;
    sliders.forEach((slider, index) => {
        values[index].textContent = slider.value;
        // if (index == 4) {
        //     percent = (slider.value / 10) + 1
        //     total = (total * percent) + parseInt(slider.value)
        // } else {
            total += parseInt(slider.value);
        // }
    });
    totalDisplay.textContent = total;
    totalValues.innerText = `${values[0].innerText} ${values[1].innerText} ${values[2].innerText} ${values[3].innerText} ${values[4].innerText}`
    maxTotal();
    calcValue();
};
    
function maxTotal() {
    if(totalDisplay.innerText > 0 && totalDisplay.innerText < 10) {
        checkboxCircle.style.color = 'rgb(255, 241, 215)';
    } else if(totalDisplay.innerText >= 10 && totalDisplay.innerText < 20) {
        checkboxCircle.style.color = 'rgb(255, 223, 163)';
    } else if(totalDisplay.innerText >= 20 && totalDisplay.innerText < 30) {
        checkboxCircle.style.color = 'rgb(255, 209, 124)';
    } else if(totalDisplay.innerText >= 30 && totalDisplay.innerText < 40) {
        checkboxCircle.style.color = 'rgb(255, 194, 80)';
    } else if(totalDisplay.innerText >= 40 && totalDisplay.innerText <= 49) {
        checkboxCircle.style.color = 'rgb(255, 182, 46)';
    } else {
        checkboxCircle.style.color = 'orange';
    }
};

sliders.forEach(slider => {
    slider.addEventListener('input', function () {
        updateValues();
        }
    );
});

function calcValue() {
    values.forEach((value, index) => {
        let valuePerc = (parseInt(value.innerText) / 10) * 100
        sliders[index].style.background = `linear-gradient(to right, orange ${valuePerc}%, #fff ${valuePerc}%)`
    })
}

updateValues();
maxTotal();
calcValue();
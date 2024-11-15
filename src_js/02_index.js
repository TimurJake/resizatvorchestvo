const sliders = document.querySelectorAll('.slider')
const values = document.querySelectorAll('.value')
const totalDisplay = document.getElementById('total')
const totalValues = document.querySelector('.total-values')
const checkboxCircle = document.querySelector('.checkbox_circle')

function updateValues() {
    let total = 0
    let percent = 0
    sliders.forEach((slider, index) => {
        values[index].textContent = slider.value
        if (index == 4) {
            percent = (slider.value / 10) + 1
            total = (total * percent) + parseInt(slider.value)
        } else {
            total += parseInt(slider.value)
        }
    });
    totalDisplay.textContent = Math.floor(total)
    totalValues.innerText = `${values[0].innerText} ${values[1].innerText} ${values[2].innerText} ${values[3].innerText} ${values[4].innerText}`
    maxTotal()
    calcValue()
};
    
function maxTotal() {
    if(totalDisplay.innerText >= 0 && totalDisplay.innerText < 15) {
        checkboxCircle.style.color = 'rgb(255, 241, 215)'
    } else if(totalDisplay.innerText >= 15 && totalDisplay.innerText < 30) {
        checkboxCircle.style.color = 'rgb(255, 223, 163)'
    } else if(totalDisplay.innerText >= 30 && totalDisplay.innerText < 50) {
        checkboxCircle.style.color = 'rgb(255, 209, 124)'
    } else if(totalDisplay.innerText >= 50 && totalDisplay.innerText < 70) {
        checkboxCircle.style.color = 'rgb(255, 194, 80)'
    } else if(totalDisplay.innerText >= 70 && totalDisplay.innerText <= 89) {
        checkboxCircle.style.color = 'rgb(255, 182, 46)'
    } else {
        checkboxCircle.style.color = 'orange'
    }
};

sliders.forEach(slider => {
    slider.addEventListener('input', function () {
        updateValues();
        }
    )
})

function calcValue() {
    values.forEach((value, index) => {
        let valuePerc = (parseInt(value.innerText) / 10) * 100
        sliders[index].style.background = `linear-gradient(to right, orange ${valuePerc}%, #fff ${valuePerc}%)`
    })
}

document.querySelector('.general-submit').addEventListener('click', function(event) {
    event.preventDefault(); 

    const itemInfo = {
        title: document.querySelector('.general-title').value.trim(),
        author: document.querySelector('.general-author').value.trim(),
        imgSrc: document.querySelector('.general-img').value.trim()
    }

    if (itemInfo.title === '' || itemInfo.author === '' || itemInfo.imgSrc === '') {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    const myPageList = document.querySelector('.my-page-list')

    const pageItem = `
        <div class="page__item">
            <img src="${itemInfo.imgSrc}" class="page__img">
            <div class="page__info">
                <h1 class="page__title">${itemInfo.title}</h1>
                <h3 class="page__author">${itemInfo.author}</h4>
                <div class="page__score__info">
                    <p class="page__score">${totalDisplay.innerText}</p>
                    <p class="page__values">${totalValues.innerText}</p>
                </div>
            </div>
        </div>`
    
    myPageList.insertAdjacentHTML("beforeend", pageItem)

    document.querySelector('.general-title').value = ''
    document.querySelector('.general-author').value = ''
    document.querySelector('.general-img').value = ''

    for (let i = 0; i < sliders.length; i++) {
        sliders[i].value = 5
        values[i].innerText = 5
    }

    updateValues()
});

updateValues()
maxTotal()
calcValue()
// Текст для тестирования
let textWriting = {
    en: [
        'Have yet no news for my dear friend. Mamma had a great deal of company at supper last night. Notwithstanding the strong inclination I had to make my observations, especially among the men, I was far from being entertained. The whole company could not keep their eyes from me',
        'What gave me the most uneasiness was, not to know what they thought of me; however, I think I heard the word pretty two or three times: but I sure I very distinctly heard that of awkward; and that must be very true, for she that said so is a relation, and an intimate friend of Mamma',
        'After supper, they all sat down to cards. I sat next Mamma. I dont know how it happened, but I fell asleep immediately. A loud laugh awoke me. I dont know whether I was the object of it; but I believe I was. Mamma gave me leave to retire, which pleasd me much. Only think, it was then past eleven! Adieu, my dear Sophy!',
        'The smell of the liver searing in the pan is heavy in the back of my throat, even through the bacon grease Pop dribbled on it first. When Pop plates it, the liver smells, but the gravy he made to slather on it pools in a little heart around the meat, and I wonder if Pop did that on purpose.',
        'I shook my head because it seemed like what she expected from me. But I liked most of the things Pop did, liked the way he stood when he spoke, like the way he combed his hair back straight from his face and slicked it down so he looked like an Indian in the books we read in school on the Choctaw and Creek, liked the way',
        'It was the first time I could remember they were depending on Leonie to look after me. After Michael left with Big Joseph, it felt weird to sit across the table from Leonie and make a fried potato sandwich while she stared off into space and crossed her legs and kicked her feet, let cigarette smoke seep out of her lips and wreathe her head like a veil'
    ],
    ru: [
        'Тысячи лет назад люди научились пользоваться огнем. Первый, кто это сделал, вероятно, был сожжён соплеменниками на костре, разводить который сам и научил. Вероятно, его приняли за злодея, имевшего дело с духами, которых люди страшились.',
        'Такой первооткрыватель, человек непокорного духа стоит у истоков всех легенд, записанных человечеством с начала истории. Прометей был прикован к скале, хищные птицы раздирали его внутренности, потому что он украл у богов огонь. Адам был обречен на страдания, потому что вкусил плод древа познания.',
        'Это древний конфликт. Люди приближались к истине, но всякий раз отвергали её, и цивилизации гибли одна за другой. Цивилизация - это движение к первостепенному праву личности. Вся жизнь дикаря проходит на глазах общества, она управляется племенными законами. Цивилизация - процесс освобождения человека от людей.',
        'На земле ничто не дано человеку. Всё, что ему требуется, надо произвести. И он сталкивается с главным выбором: есть только два способа выжить - живя своим умом или паразитируя на уме других. Творец творит. Паразит всё получает из вторых рук. Творец стоит лицом к лицу с природой. Паразит прячется за посредником.',
        'А теперь посмотрите, чего добилось общество, построенное на принципах индивидуализма. Возьмите нас, нашу страну, благороднейшее из государств в человеческой истории, страну величайших достижений, благополучия и свободы. Наша страна не строилась на принципе бескорыстного служения, жертвенности, самоотверженности или иных постулатах альтруизма.',
        'Ныне коллективизм - закон паразита, второсортного человека, древнее чудовище, сорвавшееся с цепи и опьяневшее от власти. Оно низвело людей до уровня невиданного ранее интеллектуального бесчестья. Оно разрослось до невероятных, беспрецедентных масштабов. Оно напоило умы ядом.'
    ]
};

// Объект букв для проверки раскладки клавиатуры
let languageAlpabet = {
    en: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    ru: ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'э', 'ю', 'я'],
}

// Код клавиш возможных для нажатия
let trueKeyCode = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 189, 187, 220, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 90, 80, 67, 86, 66, 78, 77, 188, 190, 191, 32];

// Переменные для статистики 
let wrong = 0;
let writeWord = 0;
let taimer = 0;

// Состояние работы
let pause;

let text = document.querySelector('.app__text');

// Массивы данных для графика
let labels = [];
let wrongGraphic = [];
let speedGraphic = [];

// Все элементы связанные со слайдером и его состояние
let slider = {
    obj: document.querySelector('.app__slider'),
    objPoint: document.querySelector('.app__slider-point'),
    status: true,
    enObj: document.querySelector('.text-en'),
    ruObj: document.querySelector('.text-ru'),
}

// Переключатель слайдера
slider.obj.addEventListener('click', () => {
    if (slider.status) {
        slider.status = false;
        slider.objPoint.style.left = '24px';
        slider.enObj.classList.remove('app__slider-text--active')
        slider.ruObj.classList.add('app__slider-text--active')
    } else {
        slider.status = true;
        slider.objPoint.style.left = 0;
        slider.enObj.classList.add('app__slider-text--active')
        slider.ruObj.classList.remove('app__slider-text--active')
    }
    setText();
});

// Функция для отрисовки текста
function setText() 
{
    text.innerHTML = ''

    // Выбор случайного текста
    language = slider.status ? 'en' : 'ru';
    let indexText = Math.floor(Math.random() * textWriting[language].length);
    let textObj = textWriting[language][indexText];

    // отрисовка текста
    for (let i = 0; i < textObj.length; i++) {
        let textSpan = document.createElement('span');
        textSpan.classList.add('text-item');
        textSpan.append(textObj[i]);
        if (textSpan.innerHTML == " ") {
            textSpan.style.display = 'inline';
            textSpan.style.padding = '3px 2px';
        }
        text.append(textSpan);
    }

    // Присваивание первой букве активное состояние
    text.firstChild.classList.add('text-active', 'text-zoom');

    // Обнуление данных
    writeWord = 0;
    wrong = 0;
    taimer = 0;
    document.querySelector('.item-speed').innerHTML = 0;
    document.querySelector('.writing').innerHTML = 0;
    document.querySelector('.accuracy').innerHTML = 100;
}

// Таймер (срабатывает раз в 1с)
function analyticDate() 
{
    if (pause) {
        taimer += 1;

        // Скорость печати
        let score = ((writeWord / taimer) * 60).toFixed(0)
        document.querySelector('.item-speed').innerHTML = score;

        // Добавление данных в массив для графиков
        labels.push(taimer)
        speedGraphic.push(score)
        wrongGraphic.push(wrong)
    }
}

function listenerText() 
{
    // Объявление таймера
    let interval = setInterval(analyticDate, 1000);

    // Триг для отслеживания вводимых символов 
    document.addEventListener('keyup', (e) => {
        // Проверка окончание ввода символов 
        if (writeWord + 1 != text.children.length) 
        {
            // Нахождения активной буквы
            let obj = Object.values(text.children)
            let zoom = text.querySelector('.text-zoom');
            let index = obj.indexOf(zoom);

            // Проверка вводимый буквы на правильность
            if(e.key == 'Shift'){}
            else if (e.key == zoom.innerHTML) 
            {
                writeWord++;
                // Выводит в статистику процент написанного текста
                document.querySelector('.writing').innerHTML = (writeWord / (text.children.length / 100)).toFixed(0);
                // у правильного введенного символа меняет состояние с "активного" на "desebled"
                zoom.classList.add('text-desebled');
                zoom.classList.remove('text-active', 'text-zoom', 'text-wrong');
                // К следующему по очереди символу добавляет активное состояние
                text.children[index + 1].classList.add('text-active', 'text-zoom');
            }
            // Провекрка на то есть ль вводимый символ в клавишах для написание текста
            else if (!(trueKeyCode.includes(e.keyCode))) {} 
            // Проверка символа на правильности выбранной раскладки
            else if (slider.status == true && languageAlpabet.ru.includes((e.key).toLowerCase())) {alert('Поменяй раскладку');} 
            else if (slider.status == false && languageAlpabet.en.includes((e.key).toLowerCase())) {alert('Поменяй раскладку');} 
            // В случае если клавиша была введена неправильно, то активному символу будет присвоенно состояние "wrong"
            else 
            {
                wrong++;
                document.querySelector('.accuracy').innerHTML = (100 - (wrong / (text.children.length / 100))).toFixed(1);
                zoom.classList.remove('text-active');
                zoom.classList.add('text-wrong');
            }
        } 
        // Срабатывает в случае ввода всех символов
        else {
            // Приостанавливает таймер
            pause = false;
            // Убирает переключатель языков
            document.querySelector('.app__panel-slider').style.display = 'none';
            document.querySelector('.app__panel').style.justifyContent = 'center';
            getAnalytics()
        }
    })
}

// Функция для вывода графика
function getAnalytics() 
{
    text.innerHTML = '<canvas id="myChart" height="100px"></canvas>'
    const data = {
        // Значение по x
        labels: labels,
        // Оси y
        datasets: [
            {
                label: 'speed',
                fill: true,
                yAxisID: 'speed',
                pointBackgroundColor: '#7940FF',
                backgroundColor: 'rgba(136, 103, 212, 0.10)',
                borderColor: '#7940FF',
                data: speedGraphic,
            },
            {
                yAxisID: 'wrong',
                label: 'wrong',
                backgroundColor: '#D46767',
                borderColor: '#D46767',
                data: wrongGraphic,
            },
        ]
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config = {
            type: 'line',
            data: data,
            options: {
                type: 'line',
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    wrong: {
                        title: {
                            display: true,
                            text: 'wrong',
                            font: {
                                family: 'Roboto',
                                size: 14,
                                weight: 400,
                            },
                            color: 'rgba(212, 103, 103, 0.8)'
                        },
                        position: 'right',
                        grid: {
                            drawOnChartArea: false,
                        },
                        suggestedMax: 50,
                        suggestedMin: 0,
                    },
                    speed: {
                        title: {
                            display: true,
                            text: 'speed',
                            font: {
                                family: 'Roboto',
                                size: 14,
                                weight: 400,
                            },
                            color: 'rgba(136, 103, 212, 0.8)'
                        },
                        position: 'left',
                    }
                },
                x: {
                    ticks: {
                        maxTicksLimit: 30
                    }
                }
            }
        }
    );

}

// Тригер для нажатия кнопки "Заново"
document.querySelector('.app__btn').addEventListener('click', () => {
    // Включиение таймера
    pause = true;
    // Обнуление данных для графика
    labels = [];
    wrongGraphic = [];
    speedGraphic = [];
    // При аналитике окончание набора переключатель исчезает
    // А при повторовном вводе остается на месте
    // Для этого нужна проверка на его существование
    let panelSlider = document.querySelector('.app__panel-slider')
    if (getComputedStyle(panelSlider).display == 'none')
    {
        panelSlider.style.display = 'flex';
        document.querySelector('.app__panel').style.justifyContent = 'space-between';
    }
    // Генерация текста
    setText();
})

// Тригер при нажатии кнопки в поп-ап окне
document.querySelector('.pop-up__btn').addEventListener('click', () => {
    // Возообновление таймера
    pause = true;
    // Удаление поп-ап окна
    document.querySelector('.pop-up').remove()
    // Генерация текста
    setText()
    // Запуск функции для отслеживания нажатия
    listenerText()
})

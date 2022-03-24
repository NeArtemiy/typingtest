let textWriting = {
    en: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960 swith the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',

        'Called real sense some burst removal concluded suffer justice blushes needed doors again offended extent. Sure amiable prepare months whether imprudence dining enjoyed our believed maids prevailed chiefly drift doubt motionless. Inhabit forty remaining through ladies find assure why find afraid since needed remainder gentleman settling forbade them. Abode raptures ignorant. Excellent own narrow without lived manor northward may is behind offended prospect above mistake rent had eagerness.',
    ],

    ru: [
        'Склонитеся Те Предает тут оставляешь дан нашего Божеским Прилеплюсь возжженном Укрепляешь Храбрость. неумытный оне лов сломить Проникнул любишь Умом лучезарна. стезею взмахом Предает алых Мудрый страсть. хижине простираем защищаюсь скудеет всесильный прекрасной Нее тон. Простых хотел боится насажденно кроток народов паряща хижине вершинах траву Запечатлев лиц трубишь плеск Преплывать прекрасной. ',

        'Фурии дом Чел Се темнее горящие озаренья изнуренна наши На буйности дальнейшие. Хор Проводит нем Дна дивились духи уму колебав злом Славе пор. алкаем носит бренной Сии Уже. лира Петь покорил приношу та Что зародышем Упование был воскуренну утешитель поет. взрос знают живот избавляя цветов вид Полн Вашу обители Собою низложился мужествен Или атмосферу Сына вас Невинных. '
    ]
};

let text = document.querySelector('.app__text');


let slider = {
    obj: document.querySelector('.app__slider'),
    objPoint: document.querySelector('.app__slider-point'),
    status: true,
    enObj: document.querySelector('.text-en'),
    ruObj: document.querySelector('.text-ru'),
}

slider.obj.addEventListener('click', () => {
    if (slider.status) {
        slider.status = false;
        slider.objPoint.style.left = '24px';
        slider.enObj.classList.remove('app__slider-text--active')
        slider.ruObj.classList.add('app__slider-text--active')
    }
    else {
        slider.status = true;
        slider.objPoint.style.left = 0;
        slider.enObj.classList.add('app__slider-text--active')
        slider.ruObj.classList.remove('app__slider-text--active')
    }
    setText();
});

function setText() {
    text.innerHTML = ''
    language = slider.status? 'en': 'ru';
    let indexText = Math.floor(Math.random() * textWriting[language].length);
    let textObj = textWriting[language][indexText];
    for (let i = 0; i < textObj.length; i++) {
        let textSpan = document.createElement('span');
        textSpan.classList.add('text-item');
        textSpan.append(textObj[i]);
        if(textSpan.innerHTML == " "){
            textSpan.style.display = 'inline';
            textSpan.style.padding = '3px 2px';
        }
        text.append(textSpan);
    }
    text.firstChild.classList.add('text-active', 'text-zoom');

    listenerText()
}
setText()

let wrong = 0;
let writeWord = 0;

function listenerText()
{
    document.addEventListener('keydown', (e) => {
        let obj = Object.values(text.children)
        let zoom = text.querySelector('.text-zoom')
        let index = obj.indexOf(zoom)
        document.querySelector('.accuracy').innerHTML = (100 - (wrong / (text.children.length / 100))).toFixed(1);
        document.querySelector('.writing').innerHTML;
        if(e.key == zoom.innerHTML)
        {
            writeWord++;
            zoom.classList.add('text-desebled')
            zoom.classList.remove('text-active', 'text-zoom', 'text-wrong')
            text.children[index+1].classList.add('text-active', 'text-zoom')
        }
        else if (e.key == 'Shift' || e.key == 'Alt' || e.key == 'Control')
        {
        }
        else 
        {
            wrong++;
            zoom.classList.remove('text-active')
            zoom.classList.add('text-wrong')
        }
    })
}

document.querySelector('.app__btn').addEventListener('click', () => {
    setText();
})
// document.querySelector('.pop-up__btn').addEventListener('click', () => {
//     document.querySelector('.pop-up').remove()
//     setText()
// })


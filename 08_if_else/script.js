let minValue = 0;
let maxValue = 100;
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;
const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber }?`;


function numToPr(number){  /*  функция для изменения цифр в пропись */

    const h = ['сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
    const t = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const o = ['один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', '0'];
    const p = ['десять' , 'одиннацать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const m = ['Минус '];
    // для нуля
    let str = number.toString(), out = '';
    if (number == 0){
        return number;
    }
    // для минуса
    if (number > -1); 
    else if (str.length == 2){ 
        return (m[0] + o[Math.abs(number)-1]);
    }
    else if (str.length == 3){ 
        if(str[1] == 1) out = (m[0] + p[parseInt(str[2])]);
        else out = (m[0] +(t[parseInt(str[1])-1] + ((str[2]!='0')?(' ' + o[parseInt(str[2])-1]):'')));
        if (out.length < 20){
            return out;
        }else{
            return number;
        }
    }
    else if (str.length == 4){ 
        if(str[2] == 1) out = (m[0] + (h[parseInt(str[1])-1] + ' ' + p[parseInt(str[3])]));
        else out = (m[0] +(h[parseInt(str[1])-1] + ((str[2]!='0')?(' ' + t[parseInt(str[2])-1]):'') + ((str[3]!='0')?(' ' + o[parseInt(str[3])-1]):'')));
        if (out.length < 20){
            return out;
        }else{
            return number;
        }
    }
    // для плюса
        if(str.length == 1) return o[number - 1];
    else if(str.length == 2){
        if(str[0] == 1) out = p[parseInt(str[1])];
        else out = (t[parseInt(str[0])-1] + ((str[1]!='0')?(' ' + o[parseInt(str[1])-1]):''));
        if (out.length < 20){
            let arr = out.split('');
            arr[0] = arr[0].toUpperCase();
            out = arr.join('');
            return out;
        }else{
            return number;
        }
    }
    else if(str.length == 3){
        if(str[1] == 1) out = (h[parseInt(str[0])-1] + ' ' + p[parseInt(str[2])]);
        else out = (h[parseInt(str[0])-1] + ((str[1]!='0')?(' ' + t[parseInt(str[1])-1]):'') + ((str[2]!='0')?(' ' + o[parseInt(str[2])-1]):''));
        if (out.length < 20){
            let arr = out.split('');
            arr[0] = arr[0].toUpperCase();
            out = arr.join('');
            return out;
        }else{
            return number;
        }
    }
}

// скрываем кнопку и начинаем игру

document.querySelector('#collapseBut').addEventListener('click', function () {

    if(isNaN(Number(document.querySelector('#inpMin').value))){ /*  проверка NaN */
        minValue = 0;
        showNotification({
            top: 10,
            right: 10,
            html: 'Вы ввели недопустимый символ, минимальное значение будет изменено по умолчанию!',
            className: "alarma"});
        } else {
        minValue = Number(document.querySelector('#inpMin').value); /*  проверка NaN */
        } if (isNaN(Number(document.querySelector('#inpMax').value))){
        maxValue = 100;
        showNotification({
            top: 50,
            right: 10,
            html: 'Вы ввели недопустимый символ, максимальное значение будет изменено по умолчанию!',
            className: "alarma"
        });
    } else {
        maxValue = Number(document.querySelector('#inpMax').value);
    };
    let maxV = maxValue;
    let minV = minValue;

    maxValue = minV < maxV ? maxV : minV;  /*  если нужно меняем местами максимальное и минимальное число */
    minValue = maxV > minV ? minV : maxV; /*  если нужно меняем местами максимальное и минимальное число */
    maxV = maxValue;
    minV = minValue;
    if (minValue < -999)
        showNotification({
        top: 50,
        right: 10,
        html: 'Минимальное число для игры -999',
        className: "alarma"
    });
    minValue = minValue > -999 ? minValue : -999;  /*  установка значения по умолчанию если число меньше -999 */
    if (maxValue > 999)
        showNotification({
        top: 10,
        right: 10,
        html: 'Максимальное число для игры 999',
        className: "alarma",
    });
    maxValue = maxValue < 999 ? maxValue : 999;  /*  установка значения по умолчанию если число больше 999  */
    if (minValue > 999){
        minValue = 999
        showNotification({
        top: 50,
        right: 10,
        html: 'Минимальное число для игры изменено на 999',
        className: "alarma"
    });
    }
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    answerField.innerText = `Вы загадали число ${numToPr(answerNumber) }?`;
    document.querySelector('#collapse-1').classList.toggle('hide');
    document.querySelector('#collapse-2').classList.toggle('hide');
    const hideBut = document.querySelector('#collapseBut');
    hideBut.style.display = 'none';
})


document.querySelector('#btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom =  Math.random();
            if(phraseRandom >= 0.33 && phraseRandom <= 0.66){
                answerField.innerText = `Вы загадали неправильное число!\n\u{1F914}`
            } if  (phraseRandom < 0.33) {
                answerField.innerText = `Я сдаюсь..\n\u{1F92F}`
            } if  (phraseRandom > 0.66) {
                answerField.innerText = `Такого числа нет! \n\u{1F623}`
            }           
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom =  Math.random();
            if(phraseRandom >= 0.33 && phraseRandom <= 0.66){
                answerField.innerText = `Вы загадали число ${numToPr(answerNumber) }?`
            } if  (phraseRandom < 0.33) {
                answerField.innerText = `Это число ${numToPr(answerNumber) }?`
            } if  (phraseRandom > 0.66) {
                answerField.innerText = `Скорее всего это число ${numToPr(answerNumber)}?`
            }
        }
    }
})
document.querySelector('#btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue || minValue === answerNumber|| maxValue ===answerNumber ){
            const phraseRandom =  Math.random();
            if(phraseRandom >= 0.33 && phraseRandom <= 0.66){
                answerField.innerText = `Вы загадали неправильное число!\n\u{1F914}`
            } if  (phraseRandom < 0.33) {
                answerField.innerText = `Я сдаюсь..\n\u{1F92F}`
            } if  (phraseRandom > 0.66) {
                answerField.innerText = `Такого числа нет! \n\u{1F623}`
            }
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber  = Math.floor(((maxValue - minValue) / 2) + minValue);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom =  Math.random();
            if(phraseRandom >= 0.33 && phraseRandom <= 0.66){
                answerField.innerText = `Вы загадали число ${numToPr(answerNumber) }?`
            } if  (phraseRandom < 0.33) {
                answerField.innerText = `Я думаю, это число ${numToPr(answerNumber) }?`
            } if  (phraseRandom > 0.66) {
                answerField.innerText = `Скорее всего это число ${numToPr(answerNumber) }?`
            }
            
        }
    }
})


document.querySelector('#btnEqual').addEventListener('click', function () {
    if (gameRun){
        const phraseRandom =  Math.random();
        if(phraseRandom >= 0.33 && phraseRandom <= 0.66){
            answerField.innerText = `Я всегда угадываю\n\u{1F60E}`;
        } if  (phraseRandom < 0.33) {
            answerField.innerText = `Было легко\n\u{1F60F}`;
        } if  (phraseRandom > 0.66) {
            answerField.innerText = `И снова я угадал \n\u{1F973}`;
        }
        gameRun = false;
    }
})

document.querySelector('#btnRetry').addEventListener('click', function () {
        location.reload();
})

function showNotification({top = 0, right = 0, className, html}) {

    let notification = document.createElement('div');
    notification.className = "notification";
    if (className) {
      notification.classList.add(className);
    }

    notification.style.top = top + 'px';
    notification.style.right = right + 'px';

    notification.innerHTML = html;
    document.body.append(notification);

    setTimeout(() => notification.remove(), 3500);
  }

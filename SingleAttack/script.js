var count = 3;
var check = 0;
var correct;

function moveShield(state) {
    const shield = document.getElementById('shield');
    const playerHeart = document.getElementById('player-heart');
    const positions = [
        { top: '70%', left: '40%' },
        { top: '40%', left: '50%' },
        { top: '70%', left: '60%' }
    ];

    if (state === 1) {
        shield.classList.add('morphed');
    } else {
        shield.classList.remove('morphed');
    }

    shield.style.top = positions[state].top;
    shield.style.left = positions[state].left;
    const dx = parseInt(shield.style.left) - parseInt(playerHeart.style.left);
    const dy = parseInt(shield.style.top) - parseInt(playerHeart.style.top);
    shield.style.transition = 'all 0.5s ease';
    shield.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px)`;
}

function moveup() {
    if (check == 0) {
        check = 1;
        count = 1;
    } else {
        count = (count + 1) % 3;
    }
    moveShield(count);
}

function movedown() {
    if (check == 0) {
        check = 1;
        count = 1;
    } else {
        count = count - 1;
    }
    if (count < 0) {
        count = 2;
    }
    moveShield(count);
}

function moveArrowIntoHeart() {
    checkshieldarrow();
    removetext();
    removeQuestion();
    const gameContainer = document.getElementById('game-container');
    const containerWidth = gameContainer.offsetWidth;
    const containerHeight = gameContainer.offsetHeight;
    const targetX = containerWidth * 0.5 - 5;
    const targetY = containerHeight * 0.7 - 5;
    moveElement(document.getElementById('left-arrow'), targetX, targetY);
    moveElement(document.getElementById('top-arrow'), targetX, targetY);
    moveElement(document.getElementById('right-arrow'), targetX, targetY);
}

function showarrow() {
    randomthree();

    arrowsVisible = true;
    document.querySelectorAll('.arrow').forEach(arrow => {
        arrow.style.display = 'block';
        arrow.style.opacity = '1';
    });
}

function hidearrow() {
    arrowsVisible = false;
    document.querySelectorAll('.arrow').forEach(arrow => {
        arrow.style.display = 'none';
    });
}

let originalPositions = {};

function moveElement(element, targetX, targetY) {
    const currentX = parseFloat(window.getComputedStyle(element).getPropertyValue('left'));
    const currentY = parseFloat(window.getComputedStyle(element).getPropertyValue('top'));

    if (!originalPositions[element.id]) {
        originalPositions[element.id] = { x: currentX, y: currentY };
    }

    let finalTargetX = targetX;
    let finalTargetY = targetY;

    if (correct === 1) {
        switch (bool) {
            case 0:
                finalTargetX = currentX + (targetX - currentX) * 0.5;
                finalTargetY = currentY + (targetY - currentY) * 0.5;
                break;
            case 1:
                finalTargetX = currentX + (targetX - currentX) * 0.5;
                finalTargetY = currentY + (targetY - currentY) * 0.5 - element.offsetHeight / 2;
                break;
            case 2:
                finalTargetX = currentX + (targetX - currentX) * 0.5 + element.offsetWidth / 2;
                finalTargetY = currentY + (targetY - currentY) * 0.5;
                break;
        }
    }


    const dx = finalTargetX - (currentX + element.offsetWidth / 2);
    const dy = finalTargetY - (currentY + element.offsetHeight / 2);

    element.style.transition = 'all 0.5s ease';
    element.style.transform = `translate(${dx}px, ${dy}px)`;
    const distanceToTarget = Math.sqrt(dx * dx + dy * dy);
    const timeToDisappear = 150;

    setTimeout(() => {
        if (distanceToTarget > 5) {
            if ((bool === 1 && element.id === 'top-arrow') ||
                (bool === 0 && element.id === 'left-arrow') ||
                (bool === 2 && element.id === 'right-arrow')) {
                element.style.display = 'block';
                setTimeout(() => {
                    element.style.opacity = '0';
                    setTimeout(() => {
                        moveElementBack(element, finalTargetX, finalTargetY);
                    }, 300);
                }, 800);
            } else {
                element.style.opacity = '0';
                setTimeout(() => {
                    moveElementBack(element, finalTargetX, finalTargetY);
                }, 300);
            }
        } else {
            element.style.display = 'block';
            element.style.opacity = '0';
            moveElementBack(element, finalTargetX, finalTargetY);
        }
    }, timeToDisappear - 50);
}

function changebool() {
    bool = (bool + 1) % 3;
}

function checkshieldarrow() {
    if (count == bool) {
        correct = 1;
    } else {
        correct = 0;
    }
}

function moveElementBack(element) {
    const originalX = originalPositions[element.id].x;
    const originalY = originalPositions[element.id].y;

    const currentX = parseFloat(window.getComputedStyle(element).getPropertyValue('left'));
    const currentY = parseFloat(window.getComputedStyle(element).getPropertyValue('top'));

    const offsetX = originalX - currentX;
    const offsetY = originalY - currentY;

    element.style.transition = 'all 0.5s ease';
    element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    element.style.opacity = '0';
}

function removetext() {
    textboxValues = ['', '', ''];

    document.getElementById('display-area1').innerHTML = '';
    document.getElementById('display-area2').innerHTML = '';
    document.getElementById('display-area3').innerHTML = '';
}

function displayAddedText() {
    const displayArea1 = document.getElementById('display-area1');
    const displayArea2 = document.getElementById('display-area2');
    const displayArea3 = document.getElementById('display-area3');

    displayArea1.innerHTML = '';
    displayArea2.innerHTML = '';
    displayArea3.innerHTML = '';

    displayArea1.textContent = textboxValues[0];
    displayArea2.textContent = textboxValues[1];
    displayArea3.textContent = textboxValues[2];
}

function toggleGameContainer() {
    const gameContainer = document.getElementById('game-container');
    const moveLeftButton = document.getElementById('moveleft');
    const moveRightButton = document.getElementById('moveright');
    const questionBox = document.getElementById('question-box');

    const isVisible = gameContainer.classList.contains('visible');

    if (isVisible) {
        let opacity = 1;
        let height = 30;
        const interval = 10;
        const steps = 30;
        moveLeftButton.style.display = 'none';
        moveRightButton.style.display = 'none';
        questionBox.style.display = 'none';
        const decreaseHeight = () => {
            height -= 30 / steps;
            if (height <= 0) {
                height = 0;
                clearInterval(timer);
                gameContainer.style.display = 'none';
                gameContainer.classList.remove('visible');
                gameContainer.classList.add('invisible');

            }
            gameContainer.style.height = height + '%';
        };

        const fadeOut = () => {
            opacity -= 1 / steps;
            if (opacity <= 0) {
                opacity = 0;
                clearInterval(timer);
            }
            gameContainer.style.opacity = opacity;
        };

        const timer = setInterval(() => {
            decreaseHeight();
            fadeOut();
        }, interval);
    } else {
        let opacity = 0;
        let height = 0;
        const interval = 10;
        const steps = 30;

        gameContainer.style.display = 'block';

        const increaseHeight = () => {
            height += 30 / steps;
            if (height >= 30) {
                height = 30;
                clearInterval(timer);
                gameContainer.classList.remove('invisible');
                gameContainer.classList.add('visible');
                moveLeftButton.style.display = 'block';
                moveRightButton.style.display = 'block';
                questionBox.style.display = 'block';
            }
            gameContainer.style.height = height + '%';
        };

        const fadeIn = () => {
            opacity += 1 / steps;
            if (opacity >= 1) {
                opacity = 1;
                clearInterval(timer);
            }
            gameContainer.style.opacity = opacity;
        };

        const timer = setInterval(() => {
            increaseHeight();
            fadeIn();
        }, interval);
    }
}

function playSoundForDuration() {
    var sound = document.getElementById("sound");
    sound.play();
    setTimeout(function() {
        sound.pause();
        sound.currentTime = 0;
    }, 1000);
}

function displayQuestion() {
    const questionTextElement = document.getElementById('question-text');
    questionTextElement.textContent = Question;
}

function removeQuestion() {
    const questionTextElement = document.getElementById('question-text');
    questionTextElement.textContent = ' ';
}

function toggleattackContainer() {
    const gameContainer = document.getElementById('play-attack');
    const isVisible = gameContainer.classList.contains('visible');

    if (isVisible) {
        let opacity = 1;
        let height = 30;
        const interval = 10;
        const steps = 30;

        const decreaseHeight = () => {
            height -= 30 / steps;
            if (height <= 0) {
                height = 0;
                clearInterval(timer);
                gameContainer.style.display = 'none';
                gameContainer.classList.remove('visible');
                gameContainer.classList.add('invisible');
            }
            gameContainer.style.height = height + '%';
        };

        const fadeOut = () => {
            opacity -= 1 / steps;
            if (opacity <= 0) {
                opacity = 0;
                clearInterval(timer);
            }
            gameContainer.style.opacity = opacity;
        };

        const timer = setInterval(() => {
            decreaseHeight();
            fadeOut();
        }, interval);
    } else {
        let opacity = 0;
        let height = 0;
        const interval = 10;
        const steps = 30;

        gameContainer.style.display = 'block';

        const increaseHeight = () => {
            height += 30 / steps;
            if (height >= 30) {
                height = 30;
                clearInterval(timer);
                gameContainer.classList.remove('invisible');
                gameContainer.classList.add('visible');
            }
            gameContainer.style.height = height + '%';
        };

        const fadeIn = () => {
            opacity += 1 / steps;
            if (opacity >= 1) {
                opacity = 1;
                clearInterval(timer);
            }
            gameContainer.style.opacity = opacity;
        };

        const timer = setInterval(() => {
            increaseHeight();
            fadeIn();
        }, interval);
    }
}

function playerattack() {
    var myButton = document.getElementById('playerattack');
    toggleattackContainer();
    startslash();
}

function playerheal() {
    var myButton = document.getElementById('playerheal');
    toggleattackContainer();

}

function startheal() {
    var healElement = document.getElementById("heal");
    healElement.innerHTML = "";
    for (let i = 0; i < 50; i++) {
        var dot = document.createElement("div");
        dot.classList.add("dot");
        dot.style.left = Math.random() * 150 + "px";
        dot.style.top = Math.random() * 150 + "px";
        var duration = Math.random() * 2 + 0.5;
        dot.style.animation = "moveDot " + duration + "s linear forwards";
        healElement.appendChild(dot);
    }
}

function startslash() {
    const slash = document.querySelector('#slash');
    slash.style.animation = 'none';
    void slash.offsetWidth;
    slash.style.animation = null;
    slash.style.display = 'block';
    slash.addEventListener('animationend', function() {
        setTimeout(function() {
            slash.style.display = 'none';
        }, 500);
    });
}

var bool = 0;
var Question = ' ';
var textboxValues;
var data = [
    [
        ["สเกลรองของเวอร์เนียร์คาลิปเปอร์อันหนึ่งมีจำนวน 20 ช่อง แต่ละช่องของสเกลรองจะมีค่ากี่มิลลิเมตร", "0.05 มิลลิเมตร", "0.04 มิลลิเมตร", "0.02 มิลลิเมตร"],
        ["สเกลรองของเวอร์เนียร์คาลิปเปอร์อันหนึ่งมีจำนวน 50 ช่อง แต่ละช่องของสเกลรองจะมีค่ากี่มิลลิเมตร", "0.02 มิลลิเมตร", "0.05 มิลลิเมตร", "0.04 มิลลิเมตร"],
        ["สเกลรองของเวอร์เนียร์คาลิปเปอร์อันหนึ่งมีจำนวน 100 ช่อง แต่ละช่องของสเกลรองจะมีค่ากี่มิลลิเมตร", "0.01 มิลลิเมตร", "0.02 มิลลิเมตร", "0.03 มิลลิเมตร"],
        ["เครื่องมือวัดชนิดใดเหมาะกับการวัดความหนาของใบผักมากที่สุด", "ไมโครมิเตอร์", "เวอร์เนียคาลิปเปอร์", "ฟุตเหล็ก"],
        ["หากต้องการวัดอย่างละเอียด เครื่องมือวัดชนิดใดเหมาะกับการวัดความยาวของมะเขือยาวมากที่สุด", "เวอร์เนียคาลิปเปอร์", "ไมโครมิเตอร์", "ฟุตเหล็ก"],
        ["หากต้องการวัดอย่างละเอียด เครื่องมือวัดชนิดใดเหมาะกับการวัดความยาวของแครอทมากที่สุด", "เวอร์เนียคาลิปเปอร์", "ไมโครมิเตอร์", "ฟุตเหล็ก"],
        ["หากต้องการวัดอย่างละเอียด เครื่องมือวัดชนิดใดเหมาะกับการวัดความหนาของแผ่นไม้มากที่สุด", "ไมโครมิเตอร์", "เวอร์เนียคาลิปเปอร์", "ฟุตเหล็ก"],
        ["หากต้องการวัดอย่างละเอียด เครื่องมือวัดชนิดใดเหมาะกับการวัดเส้นผ่านศูนย์กลางของหลอดไฟมากที่สุด", "เวอร์เนียคาลิปเปอร์", "ไมโครมิเตอร์", "ฟุตเหล็ก"],
        ["สเกลบนปลอกหมุนวัดของไมโครมิเตอร์แต่ละขีดมีค่าเท่าไร", "0.01 มิลลิเมตร", "0.02 มิลลิเมตร", "0.03 มิลลิเมตร"]
    ],
    [
        ["เวลา มีหน่วยฐานตรงกับข้อใด", "วินาที", "นาที", "ชั่วโมง"],
        ["มวล มีหน่วยฐานตรงกับข้อใด", "กิโลกรัม", "นิวตัน", "กรัม"],
        ["ความยาว มีหน่วยฐานตรงกับข้อใด", "เมตร", "เซนติเมตร", "กิโลเมตร"],
        ["อุณหภูมิอุณหพลวัต มีหน่วยฐานตรงกับข้อใด", "เคลวิน", "องศาเซลเซียส", "องศาฟาเรนไฮต์"],
        ["กระเเสไฟฟ้า มีหน่วยฐานตรงกับข้อใด", "แอมแปร์", "วัตต์", "โวลต์"],
        ["ปริมาณสาร มีหน่วยฐานตรงกับข้อใด", "โมล", "กรัม", "กิโลกรัม"],
        ["ความเข้มของการส่องสว่าง มีหน่วยฐานตรงกับข้อใด", "แคนเดลา", "ลูเมน", "ลักซ์"],
        ["นักผจญภัยเดินทางไปยังสวนแครอทเป็นระยะทาง 6 เมตร ใช้เวลา 1 นาที ด้วยความเร็วเฉลี่ย 0.1 เมตรต่อวินาที จากข้อความข้างต้นข้อใดจัดเป็นหน่วยฐาน", "เมตร", "นาที", "เมตรต่อวินาที"],
        ["นักผจญภัยนำมะเขือยาวมวล 0.1 กิโลกรัม มาวัดความยาวได้ 20.05 มิลลิเมตร ใช้เวลา 1 นาที จากข้อความข้างต้นข้อใดจัดเป็นหน่วยฐาน", "กิโลกรัม", "นาที", "มิลลิเมตร"],
        ["นักผจญภัยช่วยชาวบ้านล้างผักโดยใช้น้ำที่อุณหภูมิ 298.15 เคลวิน ละลายเกลือ 15 กรัม และเเช่ทิ้งไว้ 10 นาที จากข้อความข้างต้นข้อใดจัดเป็นหน่วยฐาน", "เคลวิน", "นาที", "กรัม"]
    ],
    [
        ["คำอุปสรรคที่ใช้แทนตัวพหุคูณ 10⁻¹² ตรงกับข้อใด", "พิโค (pico)", "มิลลิ (milli)", "นาโน (nano)"],
        ["คำอุปสรรคที่ใช้แทนตัวพหุคูณ 10⁻⁹ ตรงกับข้อใด", "นาโน (nano)", "มิลลิ (milli)", "เดซิ (deci)"],
        ["คำอุปสรรคที่ใช้แทนตัวพหุคูณ 10⁻⁶ ตรงกับข้อใด", "ไมโคร (micro)", "นาโน (nano)", "พิโค (pico)"],
        ["คำอุปสรรคที่ใช้แทนตัวพหุคูณ 10⁻² ตรงกับข้อใด", "เซนติ (centi)", "ไมโคร (micro)", "มิลลิ (milli)"],
        ["คำอุปสรรคที่ใช้แทนตัวพหุคูณ 10³ ตรงกับข้อใด", "กิโล (kilo)", " เมกะ (mega)", "จิกะ (giga)"],
        ["คำอุปสรรคที่ใช้แทนตัวพหุคูณ 10⁶ ตรงกับข้อใด", "เมกะ (mega)", "กิโล (kilo)", "พิโค (pico)"]
    ],
    [
        ["นักผจญภัยวัดขนาดของมะเขือเทศได้ 0.0460 เมตร ค่าที่วัดได้มีเลขนัยสำคัญกี่ตัว", "3 ตัว", "2 ตัว", "4 ตัว"],
        ["นักผจญภัยวัดความยาวของแครอทได้ 20.20 มิลลิเมตร ค่าที่วัดได้มีเลขนัยสำคัญกี่ตัว", "4 ตัว", "2 ตัว", "3 ตัว"],
        ["นักผจญภัยวัดความยาวของมะเขือยาวได้ 7.100 เซนติเมตร ค่าที่วัดได้มีเลขนัยสำคัญกี่ตัว", "4 ตัว", "2 ตัว", "3 ตัว"],
        ["นักผจญภัยวัดขนาดของมะนาวได้ 10.053 เซนติเมตร ค่าที่วัดได้มีเลขนัยสำคัญกี่ตัว", "5 ตัว", "3 ตัว", "4 ตัว"],
        ["นักผจญภัยวัดความยาวของผักกาดขาวได้ 130 มิลลิเมตร ค่าที่วัดได้มีเลขนัยสำคัญกี่ตัว", "3 ตัว", "2 ตัว", "4 ตัว"],
        ["นักผจญภัยชั่งมวลของมะเขือเทศได้ 2.05 กรัม ค่าที่ชั่งได้มีเลขนัยสำคัญกี่ตัว", "3 ตัว", "2 ตัว", "4 ตัว"],
        ["นักผจญภัยชั่งน้ำหนักของแครอทได้ 3.40 x 10² นิวตัน ค่าที่ชั่งได้มีเลขนัยสำคัญกี่ตัว", "3 ตัว", "2 ตัว", "4 ตัว"],
        ["นักผจญภัยชั่งมวลของมะเขือยาวได้ 0.56 กิโลกรัม ค่าที่ชั่งได้มีเลขนัยสำคัญกี่ตัว", "2 ตัว", "3 ตัว", "4 ตัว"],
        ["นักผจญภัยชั่งมวลของมะนาวได้ 0.002 กิโลกรัม ค่าที่ชั่งได้มีเลขนัยสำคัญกี่ตัว", "1 ตัว", "2 ตัว", "3 ตัว"],
        ["นักผจญภัยชั่งมวลของผักกาดขาวได้  1,500 กรัม ค่าที่ชั่งได้มีเลขนัยสำคัญกี่ตัว", "4 ตัว", "2 ตัว", "3 ตัว"],
        ["นักผจญภัยวัดกระแสไฟฟ้าที่ใช้ในหลอดไฟ 1 หลอดได้ 0.125 แอมแปร์ ค่าที่วัดได้มีเลขนัยสำคัญกี่ตัว", "3 ตัว", "2 ตัว", "4 ตัว"],
        ["นักผจญภัยวัดขนาดพื้นที่ในการสร้างร้านขายผักได้ 1.00 ตารางเมตร ค่าที่วัดได้มีเลขนัยสำคัญกี่ตัว", "3 ตัว", "2 ตัว", "4 ตัว"],
        ["นักผจญภัยวัดอุณหภูมิของหลอดไฟได้ 6.500 x 10³ เคลวิน ค่าที่วัดได้มีเลขนัยสำคัญกี่ตัว", "4 ตัว", "2 ตัว", "3 ตัว"]
    ],
    [
        ["นักผจญภัยเดินไปทางทิศเหนือ 10 เมตร และเดินย้อนกลับไปทางทิศใต้ 15 เมตร จากข้อความข้างต้นเวกเตอร์ลัพธ์มีทิศใด", "ทิศใต้", "ทิศเหนือ", "ทิศตะวันออก"],
        ["นักผจญภัยเดินไปทางทิศใต้ 14.5 เมตร และเดินย้อนกลับไปทางทิศเหนือ 17.5 เมตร จากข้อความข้างต้นเวกเตอร์ลัพธ์มีทิศใด", "ทิศเหนือ", "ทิศใต้", "ทิศตะวันออก"],
        ["นักผจญภัยเดินไปทางทิศตะวันออก 29.5 เมตร และเดินย้อนกลับไปทางทิศตะวันตก 26.5 เมตร จากข้อความข้างต้นเวกเตอร์ลัพธ์มีทิศใด", "ทิศตะวันออก", "ทิศเหนือ", "ทิศตะวันตก"],
        ["นักผจญภัยเดินไปทางทิศตะวันตก 18 เมตร และเดินย้อนกลับไปทางทิศตะวันออก 13.5 เมตร จากข้อความข้างต้นเวกเตอร์ลัพธ์มีทิศใด", "ทิศตะวันตก", "ทิศเหนือ", "ทิศตะวันออก"],
        ["นักผจญภัยเดินไปทางทิศเหนือ 12 เมตร และเดินต่อไปทางทิศตะวันออก 12 เมตร จากข้อความข้างต้นเวกเตอร์ลัพธ์มีทิศใด", "ทิศตะวันออก 45° เหนือ", "ทิศตะวันออก 45° ใต้", "ตะวันตก 45° ใต้"],
        ["นักผจญภัยเดินไปทางทิศตะวันออก 23 เมตร และเดินต่อไปทางทิศเหนือ 23 เมตร จากข้อความข้างต้นเวกเตอร์ลัพธ์มีทิศใด", "ทิศตะวันออก 45° เหนือ", "ทิศตะวันออก 45° ใต้", "ตะวันตก 45° ใต้"],
        ["นักผจญภัยเดินไปทางทิศตะวันตก 30 เมตร และเดินต่อไปทางทิศตะวันตก 30 เมตร จากข้อความข้างต้นเวกเตอร์ลัพธ์มีทิศใด", "ทิศตะวันตก 45° เหนือ", "ทิศตะวันออก 45° ใต้", "ตะวันออก 45° เหนือ"],
        ["นักผจญภัยเดินไปทางทิศตะวันตก 25.5 เมตร และเดินต่อไปทางทิศเหนือ 25.5 เมตร จากข้อความข้างต้นเวกเตอร์ลัพธ์มีทิศใด", "ทิศตะวันตก 45° เหนือ", "ทิศตะวันออก 45° ใต้", "ตะวันออก 45° เหนือ"],
        ["นักผจญภัยเดินไปทางทิศใต้ 17 เมตร และเดินต่อไปทางทิศตะวันตก 17 เมตร จากข้อความข้างต้นเวกเตอร์ลัพธ์มีทิศใด", "ตะวันตก 45° ใต้", "ทิศตะวันออก 45° เหนือ", "ทิศตะวันตก 45° เหนือ"],
        ["นักผจญภัยเดินไปทางทิศตะวันตก 28.5 เมตร และเดินต่อไปทางทิศใต้ 28.5 เมตร จากข้อความข้างต้นเวกเตอร์ลัพธ์มีทิศใด", "ตะวันตก 45° ใต้", "ทิศตะวันออก 45° เหนือ", "ทิศตะวันตก 45° เหนือ"],
        ["นักผจญภัยเดินไปทางทิศตะวันออก 21 เมตร และเดินต่อไปทางทิศใต้ 21 เมตร จากข้อความข้างต้นเวกเตอร์ลัพธ์มีทิศใด", "ทิศตะวันออก 45° ใต้", "ทิศตะวันตก 45° เหนือ", "ตะวันออก 45° เหนือ"],
        ["นักผจญภัยเดินไปทางทิศตะวันออก 12 เมตร เดินต่อไปทางทิศตะวันออก 45° เหนือ 12 เมตร และเดินไปยังทิศตะวันออกอีก 12 เมตร จากข้อความข้างต้นเวกเตอร์ลัพธ์มีทิศใด", "ทิศตะวันออก 19.3° เหนือ", "ทิศตะวันออก 45.0° เหนือ", "ทิศตะวันออก 59.3° เหนือ"],
        ["นักผจญภัยเดินไปทางทิศตะวันตก 40 เมตร เดินต่อไปทางทิศตะวันตก  45° เหนือ 40 เมตร และเดินไปยังทิศตะวันตกอีก 40 เมตร จากข้อความข้างต้นเวกเตอร์ลัพธ์มีทิศใด", "ทิศตะวันตก 19.3° เหนือ", "ทิศตะวันตก 45.0° เหนือ", "ทิศตะวันตก 59.3° เหนือ"]
    ]
];

function extractQuestionAndAnswers(x, y) {
    var a = data[x][y][0];
    var b = data[x][y][1];
    var c = data[x][y][2];
    var d = data[x][y][3];

    Question = a;
    textboxValues = [b, c, d];
}

function randomtwo() {

}

function randomthree() {
    var a = Math.floor(Math.random() * 5);
    var b = Math.floor(Math.random() * 5);
    extractQuestionAndAnswers(a, b);
    displayAddedText();
    displayQuestion();
}

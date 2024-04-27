var count = 3;
var check = 0;
var correct;
var count2 = 2;
var correct2;


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
                    }, 250);
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

function checkshieldarrow() {
    if (count == bool) {
        correct = 1;
    } else {
        correct = 0;
    }
}

function checktruefalse() {
    if (count2 == bool2) {
        correct2 = 1;
    } else {
        correct2 = 0;
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

    displayArea1.textContent = textboxValues1;
    displayArea2.textContent = textboxValues2;
    displayArea3.textContent = textboxValues3;
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

var bool;
var Question = ' ';
var textboxValues1;
var textboxValues2;
var textboxValues3;
var bool2;


var data2 = [
    [
        ["เครื่องมือวัดไมโครมิเตอร์เหมาะกับการใช้วัดความยาวของแครอทมากกว่าเวอร์เนียคาลิปเปอร์", "false"],
        ["เวอร์เนียคาลิปเปอร์เป็นเครื่องมือวัดอย่างละเอียด", "true"],
        ["หลักการอ่านค่าของเวอร์เนียคาลิปเปอร์ ต้องอ่านทั้งสเกลหลักและสเกลรอง", "true"],
        ["ตัวเลขที่อ่านได้จากสเกลรองของเวอร์เนียคาลิปเปอร์ คือค่าความน่าเชื่อถือของการวัด", "false"],
        ["ตัวเลขที่อ่านได้จากสเกลรองของเวอร์เนียคาลิปเปอร์ คือค่าความละเอียดของการวัด", "true"],
        ["เครื่องมือวัดไมโครมิเตอร์เหมาะกับการใช้วัดความหนาของใบผักมากกว่าเวอร์เนียคาลิปเปอร์", "true"],
        ["การอ่านค่าสเกลหลักของไมโครมิเตอร์เพียงพอต่อการบันทึกข้อมูลของการวัดอย่างละเอียด", "false"],
        ["ไมโครมิเตอร์วัดระยะได้โดยการเปลี่ยนระยะไปเป็นรอบหมุน", "true"],
        ["เวอร์เนียคาลิปเปอร์วัดระยะได้โดยการเปลี่ยนระยะไปเป็นรอบหมุน", "false"],
        ["นักผจญภัยใช้ไมโครมิเตอร์วัดขนาดของมะเขือเทศได้ 11.11 มิลลิเมตร ความละเอียดของไมโครมิเตอร์มีค่าเท่ากับ 0.02 มิลลิเมตร", "false"],
        ["นักผจญภัยใช้ไมโครมิเตอร์วัดขนาดของมะเขือเทศลูกหนึ่งและบันทึกค่าที่วัดได้เป็น 11.11 มิลลิเมตร นักผจญภัยบันทึกข้อมูลถูกต้องตามหลักการวัดหรือไม่", "true"],
        ["นักผจญภัยใช้เวอร์เนียคาลิปเปอร์ที่มีค่าความละเอียด 0.02 มิลลิเมตร วัดความยาวของผักกาดขาวต้นหนึ่งและบันทึกค่าที่วัดได้เป็น 11.11 มิลลิเมตร นักผจญภัยบันทึกข้อมูลถูกต้องตามหลักการวัดหรือไม่", "false"],
        ["นักผจญภัยใช้เวอร์เนียคาลิปเปอร์ที่มีค่าความละเอียด 0.02 มิลลิเมตร วัดความยาวของผักกาดขาวต้นหนึ่งและบันทึกค่าที่วัดได้เป็น 11.12 มิลลิเมตร นักผจญภัยบันทึกข้อมูลถูกต้องตามหลักการวัดหรือไม่", "true"],
        ["นักผจญภัยใช้เวอร์เนียคาลิปเปอร์ที่มีค่าความละเอียด 0.02 มิลลิเมตร วัดความยาวของผักกาดขาวต้นหนึ่งและบันทึกค่าที่วัดได้เป็น 11.15 มิลลิเมตร นักผจญภัยบันทึกข้อมูลถูกต้องตามหลักการวัดหรือไม่", "false"],
        ["นักผจญภัยใช้เวอร์เนียคาลิปเปอร์ที่มีค่าความละเอียด 0.05 มิลลิเมตร วัดความยาวของผักกาดขาวต้นหนึ่งและบันทึกค่าที่วัดได้เป็น 11.15 มิลลิเมตร นักผจญภัยบันทึกข้อมูลถูกต้องตามหลักการวัดหรือไม่", "true"],
        ["นักผจญภัยใช้เวอร์เนียคาลิปเปอร์ที่มีค่าความละเอียด 0.05 มิลลิเมตร วัดความยาวของผักกาดขาวต้นหนึ่งและบันทึกค่าที่วัดได้เป็น 11.10 มิลลิเมตร นักผจญภัยบันทึกข้อมูลถูกต้องตามหลักการวัดหรือไม่", "true"],
        ["นักผจญภัยใช้เวอร์เนียคาลิปเปอร์ที่มีค่าความละเอียด 0.05 มิลลิเมตร วัดความยาวของแครอทและบันทึกค่าที่วัดได้เป็น 20.20 มิลลิเมตร นักผจญภัยบันทึกข้อมูลถูกต้องตามหลักการวัดหรือไม่", "true"],
        ["นักผจญภัยใช้เวอร์เนียคาลิปเปอร์ที่มีค่าความละเอียด 0.05 มิลลิเมตร วัดความยาวของแครอทและบันทึกค่าที่วัดได้เป็น 20.21 มิลลิเมตร นักผจญภัยบันทึกข้อมูลถูกต้องตามหลักการวัดหรือไม่", "false"],
        ["นักผจญภัยใช้เวอร์เนียคาลิปเปอร์ที่มีค่าความละเอียด 0.05 มิลลิเมตร วัดความยาวของแครอทและบันทึกค่าที่วัดได้เป็น 20.22 มิลลิเมตร นักผจญภัยบันทึกข้อมูลถูกต้องตามหลักการวัดหรือไม่", "false"],
        ["นักผจญภัยใช้เวอร์เนียคาลิปเปอร์ที่มีค่าความละเอียด 0.05 มิลลิเมตร วัดความยาวของแครอทและบันทึกค่าที่วัดได้เป็น 20.30 มิลลิเมตร นักผจญภัยบันทึกข้อมูลถูกต้องตามหลักการวัดหรือไม่", "true"],
        ["นักผจญภัยใช้เวอร์เนียร์คาลิปเปอร์อันหนึ่ง วัดขนาดของมะเขือเทศ ได้ 11.10 มิลลิเมตร ความละเอียดของไมโครมิเตอร์มีค่าเท่ากับ 0.02 มิลลิเมตร", "true"],
        ["นักผจญภัยใช้เวอร์เนียร์คาลิปเปอร์อันหนึ่ง วัดขนาดของมะเขือเทศ ได้ 11.15 มิลลิเมตร ความละเอียดของไมโครมิเตอร์มีค่าเท่ากับ 0.02 มิลลิเมตร", "false"],
        ["นักผจญภัยใช้เวอร์เนียร์คาลิปเปอร์อันหนึ่ง วัดขนาดของมะเขือเทศ ได้ 11.16 มิลลิเมตร ความละเอียดของไมโครมิเตอร์มีค่าเท่ากับ 0.02 มิลลิเมตร", "true"],
        ["นักผจญภัยใช้เวอร์เนียร์คาลิปเปอร์อันหนึ่ง วัดขนาดของมะเขือเทศ ได้ 11.17 มิลลิเมตร ความละเอียดของไมโครมิเตอร์มีค่าเท่ากับ 0.02 มิลลิเมตร", "false"]
    ],
    [
        ["มวล เวลา และความยาว เป็นปริมาณฐานทั้งหมด", "true"],
        ["น้ำหนัก อุณหภูมิอุณหพลวัต และกระแสไฟฟ้า เป็นปริมาณฐานทั้งหมด", "false"],
        ["เวลา ปริมาณสาร และความเข้มของการส่องสว่าง เป็นปริมาณฐานทั้งหมด", "true"],
        ["กิโลกรัม วินาที และเมตร เป็นหน่วยฐานทั้งหมด", "true"],
        ["นิวตัน เคลวิน และแอมแปร์ เป็นหน่วยฐานทั้งหมด", "false"],
        ["วินาที โมล และแคนเดลา เป็นหน่วยฐานทั้งหมด", "true"],
        ["กิโลกรัม (kg) เป็นหน่วยฐานของมวล", "true"],
        ["กิโลกรัม (kg) เป็นหน่วยฐานของน้ำหนัก", "false"],
        ["กรัม (g) เป็นหน่วยฐานของมวล", "false"],
        ["วินาที (s) เป็นหน่วยฐานของเวลา", "true"],
        ["นาที (min) เป็นหน่วยฐานของเวลา", "false"],
        ["ชั่วโมง (hr) เป็นหน่วยฐานของเวลา", "false"],
        ["เมตร (m) เป็นหน่วยฐานของความยาว", "true"],
        ["กิโลเมตร (km) เป็นหน่วยฐานของความยาว", "false"],
        ["เคลวิน (K) เป็นหน่วยฐานของอุณหภูมิอุณหพลวัต", "true"],
        ["องศาเซลเซียส (°C) เป็นหน่วยฐานของอุณหภูมิอุณหพลวัต", "false"],
        ["องศาฟาเรนไฮต์ (°F) เป็นหน่วยฐานของอุณหภูมิอุณหพลวัต", "false"],
        ["แอมแปร์ (A) เป็นหน่วยฐานของกระแสไฟฟ้า", "true"],
        ["โวลต์ (V) เป็นหน่วยฐานของกระแสไฟฟ้า", "false"],
        ["โมล (mol) เป็นหน่วยฐานของปริมาณสาร", "true"],
        ["กิโลกรัม (kg) เป็นหน่วยฐานของปริมาณสาร", "false"],
        ["แคนเดลา (cd) เป็นหน่วยฐานของความเข้มของการส่องสว่าง", "true"],
        ["ลูเมน (lm) เป็นหน่วยฐานของความเข้มของการส่องสว่าง", "false"],
        ["ลักซ์ (lx) เป็นหน่วยฐานของความเข้มของการส่องสว่าง", "false"]
    ],
    [
        ["ตัวพหุคูณ 10⁻³ ใช้แทนคำอุปสรรค k", "false"],
        ["ตัวพหุคูณ 10⁻³ ใช้แทนคำอุปสรรค m", "true"],
        ["ตัวพหุคูณ 10⁻¹ ใช้แทนคำอุปสรรค d", "true"],
        ["ตัวพหุคูณ 10⁻¹ ใช้แทนคำอุปสรรค c", "false"],
        ["ตัวพหุคูณ 10¹ ใช้แทนคำอุปสรรค da", "true"],
        ["ตัวพหุคูณ 10¹ ใช้แทนคำอุปสรรค n", "false"],
        ["ตัวพหุคูณ 10¹² ใช้แทนคำอุปสรรค T", "true"],
        ["ตัวพหุคูณ 10¹² ใช้แทนคำอุปสรรค P", "false"],
        ["นักผจญวัดความหนาของใบผักได้ 2.65 เซนติเมตร สามารถบันทึกตัวเลขได้เป็น 265 มิลลิเมตร", "false"],
        ["นักผจญวัดขนาดของมะเขือเทศได้ 4.60 เซนติเมตร สามารถบันทึกตัวเลขได้เป็น 46.0 มิลลิเมตร", "true"],
        ["ชาวบ้านแนะนำให้นักผจญภัยปลูกผักกาดขาวแต่ละต้นห่างกันเป็นระยะ 50.55 มิลลิเมตร นั่นหมายความว่านักผจญภัยต้องโรยเมล็ดผักกาดขาวห่างกันเป็นระยะ 5.055 เซนติเมตร", "true"],
        ["นักผจญภัยวัดอุณหภูมิของหลอดไฟได้ 6.5 x 10⁻⁶ เคลวิน สามารถบันทึกค่าอุณหภูมิได้เป็น 6.5 นาโนเคลวิน", "false"],
        ["นักผจญภัยวัดอุณหภูมิของหลอดไฟได้ 3.55 x 10⁻³ เคลวิน สามารถบันทึกค่าอุณหภูมิได้เป็น 3.55 มิลลิเคลวิน", "true"],
        ["นักผจญภัยวัดกระแสไฟฟ้าที่ไหลผ่านหลอดไฟหลอดหนึ่งได้ 0.086 แอมแปร์ สามารถบันทึกค่ากระแสไฟฟ้าที่ไหลผ่านหลอดไฟได้เป็น 86 มิลลิแอมแปร์", "true"],
        ["นักผจญภัยวัดกระแสไฟฟ้าที่ไหลผ่านหลอดไฟหลอดหนึ่งได้ 9.56 ไมโครแอมแปร์ สามารถบันทึกค่ากระแสไฟฟ้าที่ไหลผ่านหลอดไฟได้เป็น  9.56 10⁻⁶ แอมแปร์", "true"],
        ["สัญลักษณ์ของคำอุปสรรค นาโน(nano) คือ N", "false"],
        ["สัญลักษณ์ของคำอุปสรรค พิโค(pico) คือ pi", "false"],
        ["สัญลักษณ์ของคำอุปสรรค กิโล(kilo) คือ K", "false"],
        ["สัญลักษณ์ของคำอุปสรรค เมกะ(mega) คือ M", "true"],
        ["สัญลักษณ์ของคำอุปสรรค เซนติ(centi) คือ c", "true"],
        ["สัญลักษณ์ของคำอุปสรรค เดซิ(deci) คือ d", "true"],
        ["สัญลักษณ์ของคำอุปสรรค มิลลิ(milli) คือ mi", "false"],
        ["สัญลักษณ์ของคำอุปสรรค จิกะ (giga) คือ G", "true"],
        ["สัญลักษณ์ของคำอุปสรรค เทระ(tera) คือ T", "true"],
        ["สัญลักษณ์ของคำอุปสรรค เดคา(deca) คือ de", "false"],
        ["สัญลักษณ์ของคำอุปสรรค เฮกโต (hecto) คือ H", "false"],
        ["สัญลักษณ์ของคำอุปสรรค ไมโคร (micro) คือ μ", "true"],
        ["นักผจญวัดความยาวของแครอทได้ 20.20 มิลลิเมตร สามารถบันทึกตัวเลขได้เป็น  2.020 x 10⁻³ เมตร", "true"]
    ],
    [
        ["เลขนัยสำคัญ คือปริมาณที่ได้จากการวัดและการทดลอง", "true"],
        ["ทะเบียนรถ จัดเป็นเลขนัยสำคัญ", "false"],
        ["หมายเลขบัตรประชาชน จัดเป็นเลขนัยสำคัญ", "false"],
        ["ค่าคงตัวของ π จัดเป็นเลขนัยสำคัญ", "false"],
        ["ค่าที่อ่านได้จากเวอร์เนียคาลิปเปอร์ จัดเป็นเลขนัยสำคัญ", "true"],
        ["ค่าที่อ่านได้จากเวอร์เนียคาลิปเปอร์ จัดเป็นเลขนัยสำคัญ", "true"],
        ["2πr มีเลขนัยสำคัญ 1 ตัว", "false"],
        ["0.00501 มีเลขนัยสำคัญ 3 ตัว", "true"],
        ["0.082 มีเลขนัยสำคัญ 4 ตัว", "false"],
        ["25.607 มีเลขนัยสำคัญ 5 ตัว", "true"],
        ["40.080 มีเลขนัยสำคัญ 2 ตัว", "false"],
        ["0.00001 มีเลขนัยสำคัญ 1 ตัว", "true"],
        ["1.908 x 10² มีเลขนัยสำคัญ 4 ตัว", "true"],
        ["9.040 x 10⁻³ มีเลขนัยสำคัญ 2 ตัว", "false"],
        ["5.0001 x 10⁻² มีเลขนัยสำคัญ 5 ตัว", "true"],
        ["7,900 มีเลขนัยสำคัญ 4 ตัว", "true"],
        ["0.0004873 มีเลขนัยสำคัญ 7 ตัว", "false"],
        ["70.0040560 มีเลขนัยสำคัญ 9 ตัว", "true"],
        ["6.0410 มีเลขนัยสำคัญ 3 ตัว", "false"],
        ["0.0040 มีเลขนัยสำคัญ 2 ตัว", "true"],
        ["9.002 x 10⁶ มีเลขนัยสำคัญ 2 ตัว", "false"]
    ],
    [
        ["มวลของแครอท จัดเป็นปริมาณเวกเตอร์", "false"],
        ["เวลาที่ใช้ในการแช่ผัก จัดเป็นปริมาณเวกเตอร์", "false"],
        ["นักผจญภัยวิ่งไล่จับแครอทพันปีรอบหมู่บ้านเป็นระยะทาง 1.45 กิโลเมตร จากข้อความข้างต้นระยะทางจัดเป็นปริมาณเวกเตอร์", "false"],
        ["พื้นที่สวนแครอท จัดเป็นปริมาณเวกเตอร์", "false"],
        ["น้ำหนักของมะเขือเทศ จัดเป็นปริมาณเวกเตอร์", "true"],
        ["บริเวณทิศเหนือของหมู่บ้านมีลมตะวันตกเฉียงใต้พัดผ่านด้วยความเร็ว 10-20 กิโลเมตรต่อชั่วโมง จากข้อความข้างต้นมีข้อมูลที่แสดงถึงปริมาณเวกเตอร์", "true"],
        ["ระยะที่ลากเส้นตรงจากจุดเริ่มต้นไปจุดสุดท้ายพร้อมกับแสดงทิศทางบนแผนที่ จัดเป็นปริมาณสเกลาร์", "false"],
        ["ปริมาตรของน้ำที่ใช้ในการแช่ผัก จัดเป็นปริมาณเวกเตอร์", "false"],
        ["นักผจญภัยวัดกระแสไฟฟ้าที่ใช้ในหลอดไฟ 1 หลอดได้ 0.125 แอมแปร์ ค่าที่วัดได้จัดเป็นปริมาณสเกลาร์", "true"],
        ["นักผจญภัยวัดอุณหภูมิของหลอดไฟได้ 6.500 x 10³ เคลวิน ค่าที่วัดได้จัดเป็นปริมาณเวกเตอร์", "false"],
        ["นักผจญภัยวัดความยาวของมะเขือยาวได้ 7.100 เซนติเมตร ค่าที่วัดได้จัดปริมาณเวกเตอร์", "false"],
        ["นักผจญวัดขนาดของมะเขือเทศได้ 4.60 เซนติเมตร ค่าที่วัดได้จัดปริมาณสเกลาร์", "true"],
        ["ส่วนสูงของนักผจญภัย จัดเป็นปริมาณเวกเตอร์", "false"],
        ["ความสูงของต้นไม้ จัดเป็นปริมาณเวกเตอร์", "true"],
        ["นักผจญภัยออกแรงขนาด 10 นิวตัน ลากรถเข็นแครอทขนาด 150 กิโลกรัม เพื่อนำไปขายที่ร้านค้า จากข้อความข้างต้นแรงและขนาดของรถเข็นจัดเป็นปริมาณเวกเตอร์", "false"],
        ["บริเวณทิศเหนือของหมู่บ้านมีลมพัดผ่านด้วยความเร็วขนาด 20 กิโลเมตรต่อชั่วโมง จากข้อความข้างต้นมีข้อมูลที่แสดงถึงปริมาณเวกเตอร์", "false"],
        ["เวกเตอร์ที่สามารถเปลี่ยนไปในตำแหน่งใด ๆ ก็ได้ โดยที่ยังมีขนาดและทิศทางเหมือนเดิม เรียกว่า การเคลื่อนที่ของเวกเตอร์", "true"],
        ["เวกเตอร์ตั้งแต่ 2 เวกเตอร์ขึ้นไป สามารถนำมารวมกันเพื่อหาเวกเตอร์ลัพธ์ได้โดยไม่ต้องคำนึงถึงหน่วย", "false"],
        ["ระยะห่างระหว่างต้นมะเขือเทศ จัดเป็นปริมาณเวกเตอร์", "false"],
        ["นักผจญภัย ลากรถเข็นแครอทด้วยขนาดความเร็วเฉลี่ย 20 กิโลเมตรต่อชั่วโมง จากข้อความข้างต้นมีข้อมูลที่แสดงถึงปริมาณเวกเตอร์", "false"]
    ]
];


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
    var num = Math.floor(Math.random() * 3);
    var b = data[x][y][1];
    var c = data[x][y][2];
    var d = data[x][y][3];
    if (num == 0) {
        bool = 0;
        textboxValues1 = b;
        textboxValues2 = c;
        textboxValues3 = d;
    } else {
        if (num == 1) {
            bool = 1;
            textboxValues1 = c;
            textboxValues2 = b;
            textboxValues3 = d;
        } else {
            bool = 2;
            textboxValues1 = d;
            textboxValues2 = c;
            textboxValues3 = b;
        }
    }
    Question = a;
}

function extractQuestionAndAnswers2(x, y) {
    var a = data2[x][y][0];
    var b = data2[x][y][1];
    if (b == "true") {
        bool2 = 0;
    } else {
        bool2 = 1;
    }
    Question = a;
}

function showtruefalse() {
    randomtwo();

}

function moveLeavesInToHeart() {
    checktruefalse();
    removetext();
    removeQuestion();

}

function randomtwo() {
    var a = Math.floor(Math.random() * 5);
    var b = Math.floor(Math.random() * 10);
    extractQuestionAndAnswers2(a, b);
    displayAddedText();
    displayQuestion();
}

function randomthree() {
    var a = Math.floor(Math.random() * 5);
    var b = Math.floor(Math.random() * 25);
    extractQuestionAndAnswers(a, b);
    displayAddedText();
    displayQuestion();
}

function toggleGameContainer2() {
    const gameContainer = document.getElementById('game-container-two');
    const moveTrueButton = document.getElementById('movetrue');
    const moveFalseButton = document.getElementById('movefalse');
    const questionBox = document.getElementById('question-box');

    const isVisible = gameContainer.classList.contains('visible');

    if (isVisible) {
        let opacity = 1;
        let height = 30;
        const interval = 10;
        const steps = 30;
        moveTrueButton.style.display = 'none';
        moveFalseButton.style.display = 'none';
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
                questionBox.style.display = 'block';
                moveTrueButton.style.display = 'block';
                moveFalseButton.style.display = 'block';
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

function moveHeart(state) {
    const heart = document.getElementById('player-heart-true');
    const positions = [
        { top: '50%', left: '25%' },
        { top: '50%', left: '65%' }
    ];

    heart.style.top = positions[state].top;
    heart.style.left = positions[state].left;
    const dx = parseInt(heart.style.left);
    const dy = parseInt(heart.style.top);
    heart.style.transition = 'all 0.5s ease';
    heart.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px)`;
}

function movetrue() {
    count2 = 0;
    moveHeart(count2);
}

function movefalse() {
    count2 = 1;
    moveHeart(count2);
}

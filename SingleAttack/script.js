var count = 3;
var check = 0;
var bool = 0;
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
                }, 500);
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

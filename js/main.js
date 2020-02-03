'use strict';

var gNextNum = 1;
var isCellCliked = false;
var gLenTable;
var gInterval;
var minutesLabel = document.querySelector('.min');
var secondsLabel = document.querySelector('.sec');
var totalSeconds = 0;

function init(num) {
    gNextNum = 1;
    isCellCliked = false;
    totalSeconds = 0;
    minutesLabel = document.querySelector('.min');
    secondsLabel = document.querySelector('.sec');
    gLenTable = num;
    renderBoard();
}

function renderBoard() {
    var strHtml = '';
    var nums = resetNums();

    for (var i = 0; i < Math.sqrt(gLenTable); i++) {
        strHtml += '<tr>';
        for (var j = 0; j < Math.sqrt(gLenTable); j++) {

            var randomIndex = getRandomInt(0, nums.length);
            var randomNum = nums[randomIndex];
            nums.splice(randomIndex, 1);

            strHtml += '<td onclick="cellClicked(this)">';
            strHtml += randomNum;
            strHtml += '</td>';
        }
        strHtml += '</tr>';
    }

    var elBoard = document.querySelector('.board');;
    elBoard.innerHTML = strHtml;
}


function resetNums() {
    var nums = [];

    for (var i = 0; i < gLenTable; i++) {
        nums[i] = i + 1;
    }

    return nums;
}


function cellClicked(elCellClicked) {

    if (!isCellCliked) {
        isCellCliked = true;
        gInterval = setInterval(setTime, 100);
    }

    if (+elCellClicked.innerText === gNextNum) {
        elCellClicked.classList.add('correct');
        gNextNum++;
    }

    if (+elCellClicked.innerText === gLenTable) {
        gInterval = clearInterval(gInterval);
    }
}


function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
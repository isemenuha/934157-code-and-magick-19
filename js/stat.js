'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var LINE_HEIGHT = 16;
var playerBarColor = 'rgba(255, 0, 0, 1)';
var otherPlayersBarColor = 240;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP + GAP, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP + GAP, CLOUD_Y + GAP * 5);


  var maxTime = getMaxElement(times);

  var getRandomPercent = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min).toFixed() + '%';
  };

  var getRandomColor = function (hue) {
    return 'hsl(' + hue + ', ' + getRandomPercent(20, 70) + ', ' + getRandomPercent(40, 60) + ')';
  };

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT);
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - LINE_HEIGHT - Math.round(times[i] / maxTime * BAR_MAX_HEIGHT) - LINE_HEIGHT);

    if (names[i] === 'Вы') {
      ctx.fillStyle = playerBarColor;
    } else {
      ctx.fillStyle = getRandomColor(otherPlayersBarColor);
    }
    ctx.fillRect(CLOUD_X + BAR_WIDTH + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - LINE_HEIGHT - Math.round(times[i] / maxTime * BAR_MAX_HEIGHT), BAR_WIDTH, Math.round(times[i] / maxTime * BAR_MAX_HEIGHT));
  }

};

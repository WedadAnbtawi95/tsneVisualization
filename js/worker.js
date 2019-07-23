'use strict';

importScripts('tsne.min.js');

function isBusy () {
  postMessage({
    type: 'STATUS',
    data: 'BUSY'
  });
}

function isReady () {
  postMessage({
    type: 'STATUS',
    data: 'READY'
  });
}

isBusy();

var model = new TSNE({
  dim: 3,
  perplexity: 40.0,
  earlyExaggeration: 4.0,
  learningRate: 50.0,
  nIter: 150,
  metric: 'euclidean'
});

var firstRun = true;

self.onmessage = function (e) {
  var msg = e.data;

  switch (msg.type) {
    case 'INPUT_DATA':
      isBusy();
      model.init({
        data: msg.data,
        type: 'dense'
      });
      isReady();
      break;
    case 'RUN':
      isBusy();
	  model.perplexity = msg.data.perplexity;
      model.earlyExaggeration = msg.data.earlyExaggeration;
      model.learningRate = msg.data.learningRate;
      model.nIter = msg.data.nIter;
      model.dim = msg.data.dim;
      if (firstRun) {
        model.run();
        firstRun = false;
      } else {
        model.rerun();
      }
      postMessage({
        type: 'DONE',
        data: model.getOutputScaled()
      });
      isReady();
      break;
    default:
  }
};

// emitted progress events

model.on('progressIter', function (iter) {
  // data: [iter, error, gradNorm]
  postMessage({
    type: 'PROGRESS_ITER',
    data: iter
  });
});

model.on('progressStatus', function (status) {
  postMessage({
    type: 'PROGRESS_STATUS',
    data: status
  });
});

model.on('progressData', function (data) {
  postMessage({
    type: 'PROGRESS_DATA',
    data: data
  });
});

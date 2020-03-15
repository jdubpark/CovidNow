'use strict';

const
  Bluebird = require('bluebird');

const
  States = require('./states/');

// console.log(States);
const selected = 'CA';
States[selected].run()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });


// const stateData = {}, stateNames = [], statePromises = [];
// Object.keys(States).forEach(state => {
//   const stateRun = States[state].run();
//   stateNames.push(state);
//   statePromises.push(stateRun);
// });
//
// Bluebird.all(statePromises)
//   .spread((...res) => {
//     res.forEach((data, index) => {
//       const stateName = stateNames[index];
//       stateData[stateName] = data;
//     });
//
//     console.log(stateData);
//   })
//   .catch(err => {
//     console.log(err);
//   });

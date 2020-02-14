"use strict";

/**
 * Get the sum of the numbers in an array.
 * @param {Array<number>} arr Array containing numbers.
 * @return {number} Sum of the numbers.
 */
var sum = function sum(arr) {
  return Number(arr.reduce(function (a, b) {
    return a + b;
  }, 0));
};

var combinations = function combinations(numArr) {
  var func = function func(active, rest, results) {
    if (!active.length && !rest.length) return;

    if (!rest.length) {
      results.push(active);
    } else {
      var active2 = active.slice();
      active2.push(rest[0]);
      func(active2, rest.slice(1), results);
      func(active, rest.slice(1), results);
    }

    return results;
  };

  return func([], numArr, []);
};
/**
 * Extract numbers from a string.
 * @param {string} str String to extract numbers from.
 * @return {Array} Extracted numbers.
 */


var extractNumbers = function extractNumbers(str) {
  var strNumbers = str.match(/(\d+\.\d+)|(\d+)/g);
  var numbers = [];
  if (strNumbers) numbers = strNumbers.map(function (strNumber) {
    return Number(strNumber);
  });
  return numbers;
};
/**
 * Extract combinations of candidate numbers that add-up to target sum. 
 * @param {Array<number>} candidates Candidate numbers.
 * @param {Array<number>} target Target sum.
 * @return {Array} Array containing combinations.
 */


var extractCombinations = function extractCombinations(candidates, target) {
  if (candidates.length >= 1 && target.length === 1) {
    var combinationArray = [];
    combinations(candidates).forEach(function (comb) {
      if (sum(comb) === target[0]) {
        var combStr = '';
        comb.forEach(function (num, i) {
          if (i === comb.length - 1) {
            combStr += num + ' = ';
          } else {
            combStr += num + ' + ';
          }
        });
        combStr += target[0];
        combinationArray.push(combStr);
      }
    });
    return combinationArray;
  } else {
    return [];
  }
};
/**
 * Create a p element and place a string in it.
 * @param {string} outputString String to place in the p element.
 * @return {HTMLElement} p element containing the string.
 */


var createOutputElement = function createOutputElement(outputString) {
  var p = document.createElement('p');
  p.textContent = outputString;
  return p;
};

var deleteOutputElements = function deleteOutputElements() {
  while (outputSection.firstChild) {
    outputSection.removeChild(outputSection.firstChild);
  }
};

var printCombinations = function printCombinations(combinationArray) {
  deleteOutputElements();
  combinationArray.forEach(function (combination) {
    var p = createOutputElement(combination);
    outputSection.appendChild(p);
  });
};

var handleInput = function handleInput() {
  var target = extractNumbers(targetBox.value);
  var candidates = extractNumbers(candidatesBox.value);

  if (candidates && target) {
    var combinationArray = extractCombinations(candidates, target);

    if (combinationArray) {
      printCombinations(combinationArray);

      if (!combinationArray.length) {
        deleteOutputElements();
        createOutputElement('No combination of the given numbers adds up to ' + 'the given sum.');
      }
    }
  } else {
    deleteOutputElements();
    createOutputElement('Combinations that add up to the given sum will ' + 'appear here.', 'placeholder');
  }
};

var candidatesBox = document.getElementById('candidates');
var targetBox = document.getElementById('target');
var outputSection = document.getElementById('output-section');
handleInput();
candidatesBox.addEventListener('input', function () {
  return handleInput();
});
targetBox.addEventListener('input', function () {
  return handleInput();
});
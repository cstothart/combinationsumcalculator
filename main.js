"use strict";

/**
 * Find all combinations of candidates that sum up to the target value using backtracking.
 * @param {Array<number>} candidates Array of candidate numbers.
 * @param {number} target Target sum.
 * @return {Array<Array<number>>} Array of combinations that sum up to the target.
 */
var findCombinations = function findCombinations(candidates, target) {
  var results = [];

  function backtrack(start, currentCombination, currentSum) {
    if (currentSum === target) {
      results.push(currentCombination.slice());
      return;
    }
    if (currentSum > target) {
      return;
    }

    for (var i = start; i < candidates.length; i++) {
      currentCombination.push(candidates[i]);
      backtrack(i + 1, currentCombination, currentSum + candidates[i]);
      currentCombination.pop(); // Backtrack
    }
  }

  backtrack(0, [], 0);
  return results;
};

/**
 * Extract numbers from a string.
 * @param {string} str String to extract numbers from.
 * @return {Array<number>} Extracted numbers.
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
 * Extract combinations of candidate numbers that add up to the target sum. 
 * @param {Array<number>} candidates Candidate numbers.
 * @param {number} target Target sum.
 * @return {Array<string>} Array containing formatted combinations.
 */
var extractCombinations = function extractCombinations(candidates, target) {
  var combinationArray = [];
  var combinations = findCombinations(candidates, target);

  combinations.forEach(function (comb) {
    var combStr = comb.join(' + ') + ' = ' + target;
    combinationArray.push(combStr);
  });

  return combinationArray;
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

  if (candidates.length > 0 && target.length === 1) {
    var combinationArray = extractCombinations(candidates, target[0]);

    if (combinationArray.length > 0) {
      printCombinations(combinationArray);
    } else {
      deleteOutputElements();
      var noCombinationMessage = 'No combination of the given numbers adds up to ' + target[0] + '.';
      var p = createOutputElement(noCombinationMessage);
      outputSection.appendChild(p);
    }
  } else {
    deleteOutputElements();
    var placeholderMessage = 'Combinations that add up to the given sum will appear here.';
    var p = createOutputElement(placeholderMessage);
    outputSection.appendChild(p);
  }
};

var candidatesBox = document.getElementById('candidates');
var targetBox = document.getElementById('target');
var outputSection = document.getElementById('output-section');
handleInput();
candidatesBox.addEventListener('input', handleInput);
targetBox.addEventListener('input', handleInput);

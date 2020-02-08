"use strict";

function sum(arr) {
  return arr.reduce(function (a, b) {
    return a + b;
  }, 0);
}

function combinations(numArr) {
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
}

function extractNumbers(str) {
  if (!str) {
    return false;
  } else {
    var strNumbers = str.match(/(\d+\.\d+)|(\d+)/g);

    if (!strNumbers) {
      return false;
    } else {
      var numbers = strNumbers.map(function (strNumber) {
        return Number(strNumber);
      });
      return numbers;
    }
  }
}

function extractCombinations(candidates, target) {
  if (candidates.length >= 1 && target.length == 1) {
    var combinationArray = [];
    combinations(candidates).forEach(function (comb) {
      if (sum(comb) == target) {
        var combStr = "";
        comb.forEach(function (num, i) {
          if (i == comb.length - 1) {
            combStr += num + " = ";
          } else {
            combStr += num + " + ";
          }
        });
        combStr += target;
        combinationArray.push(combStr);
      }
    });
    return combinationArray;
  } else {
    return false;
  }
}

function createOutputElement(text, cls) {
  var p = document.createElement("p");

  if (cls) {
    p.className = cls;
  }

  p.textContent = text;
  outputSection.appendChild(p);
}

function deleteOutputElements() {
  while (outputSection.firstChild) {
    outputSection.removeChild(outputSection.firstChild);
  }
}

function printCombinations(combinationArray) {
  deleteOutputElements();
  combinationArray.forEach(function (combination) {
    createOutputElement(combination);
  });
}

function handleInput() {
  target = extractNumbers(targetBox.value);
  candidates = extractNumbers(candidatesBox.value);

  if (candidates && target) {
    var combinationArray = extractCombinations(candidates, target);

    if (combinationArray) {
      printCombinations(combinationArray);

      if (!combinationArray.length) {
        deleteOutputElements();
        createOutputElement("No combination of the given numbers adds up to the given sum.");
      }
    }
  } else {
    deleteOutputElements();
    createOutputElement("Combinations that add up to the given sum will appear here.", "placeholder");
  }
}

var candidatesBox = document.getElementById("candidates");
var targetBox = document.getElementById("target");
var outputSection = document.getElementById("output-section");
handleInput();
candidatesBox.addEventListener("input", function () {
  handleInput();
});
targetBox.addEventListener("input", function () {
  handleInput();
});
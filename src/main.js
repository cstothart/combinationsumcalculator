
/**
 * Get the sum of the numbers in an array.
 * @param {Array<number>} arr Array containing numbers.
 * @return {number} Sum of the numbers.
 */
const sum = arr => {
  return Number(arr.reduce((a, b) => a + b, 0));
}

const combinations = numArr => {
  const func = (active, rest, results) => {
    if (!active.length && !rest.length)
        return;
    if (!rest.length) {
        results.push(active);
    } else {
      let active2 = active.slice();
      active2.push(rest[0])
      func(active2, rest.slice(1), results);
      func(active, rest.slice(1), results);
    }
    return results;
  }
  return func([], numArr, []);
}

/**
 * Extract numbers from a string.
 * @param {string} str String to extract numbers from.
 * @return {Array} Extracted numbers.
 */
const extractNumbers = str => {
  const strNumbers = str.match(/(\d+\.\d+)|(\d+)/g);
  let numbers = [];
  if (strNumbers) numbers = strNumbers.map(strNumber => Number(strNumber));
  return numbers;
}

/**
 * Extract combinations of candidate numbers that add-up to target sum. 
 * @param {Array<number>} candidates Candidate numbers.
 * @param {Array<number>} target Target sum.
 * @return {Array} Array containing combinations.
 */
const extractCombinations = (candidates, target) => {
  if (candidates.length >= 1 && target.length === 1) {
    let combinationArray = [];
    combinations(candidates).forEach((comb) => {
      if (sum(comb) === target[0]) {
        let combStr = '';
        comb.forEach((num, i) => {
          if (i === comb.length - 1) {
            combStr += num + ' = ';
          } else {
            combStr += num + ' + ';
          }
        })
        combStr += target[0];
        combinationArray.push(combStr);
      }
    });
    return combinationArray;
  } else {
    return [];
  }
}

/**
 * Create a p element and place a string in it.
 * @param {string} outputString String to place in the p element.
 * @return {HTMLElement} p element containing the string.
 */
const createOutputElement = (outputString) => {
  const p = document.createElement('p');
  p.textContent = outputString;
  return p;
}

const deleteOutputElements = () => {
  while (outputSection.firstChild) {
    outputSection.removeChild(outputSection.firstChild);
  }
}

const printCombinations = combinationArray => {
    deleteOutputElements();
    combinationArray.forEach((combination) => {
      const p = createOutputElement(combination);
      outputSection.appendChild(p);
    })
}

const handleInput = () => {
  const target = extractNumbers(targetBox.value);
  const candidates = extractNumbers(candidatesBox.value);
  if (candidates && target) {
    let combinationArray = extractCombinations(candidates, target);
    if (combinationArray) {
      printCombinations(combinationArray);
      if (!combinationArray.length) {
        deleteOutputElements();
        createOutputElement('No combination of the given numbers adds up to ' +
                            'the given sum.');
      }
    }
  } else {
      deleteOutputElements();
      createOutputElement('Combinations that add up to the given sum will ' +
                          'appear here.', 'placeholder');
  }
}

const candidatesBox = document.getElementById('candidates');
const targetBox = document.getElementById('target');
const outputSection = document.getElementById('output-section');

handleInput();

candidatesBox.addEventListener('input', () => handleInput())

targetBox.addEventListener('input', () => handleInput())
const sum = arr => {
  return arr.reduce((a, b) => a + b, 0);
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

const extractNumbers = str => {
  if (!str) {
    return false;
  } else {
    const strNumbers = str.match(/(\d+\.\d+)|(\d+)/g);
    if (!strNumbers) {
      return false;
    } else {
      const numbers = strNumbers.map((strNumber) => Number(strNumber));
      return numbers;
    }
  }
}

const extractCombinations = (candidates, target) => {
  if (candidates.length >= 1 && target.length == 1) {
    let combinationArray = [];
    combinations(candidates).forEach((comb) => {
      if (sum(comb) == target) {
        let combStr = '';
        comb.forEach((num, i) => {
          if (i == comb.length - 1) {
            combStr += num + ' = ';
          } else {
            combStr += num + ' + ';
          }
        })
        combStr += target;
        combinationArray.push(combStr);
      }
    });
    return combinationArray;
  } else {
    return false;
  }
}

const createOutputElement = (text, cls) => {
  const p = document.createElement('p');
  if (cls) {
    p.className = cls;
  }
  p.textContent = text;
  outputSection.appendChild(p);
}

const deleteOutputElements = () => {
  while (outputSection.firstChild) {
    outputSection.removeChild(outputSection.firstChild);
  }
}

const printCombinations = combinationArray => {
    deleteOutputElements();
    combinationArray.forEach((combination) => {
      createOutputElement(combination)
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
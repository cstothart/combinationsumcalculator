function sum(arr){
  return arr.reduce(function(a, b) {
    return a + b
  }, 0);
}

function combinations(numArr) {
  const func = function(active, rest, results) {
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

const candidates = [1, 2, 3, 4, 5, 2];
const target = 8;

combinations(candidates).forEach(function(comb) {
  if (sum(comb) == target) {
    let combStr = "";
    comb.forEach(function(num, i) {
      if (i == comb.length - 1) {
        combStr += num + " = ";
      } else {
        combStr += num + " + ";
      }
    })
    combStr += target;
    console.log(combStr);
  }
});
var doubleReduceExternal = (acc, e) => {
  var charArray = e.split("");
  return charArray.reduce(doubleReduceInternal, acc);
}

var doubleReduceInternal = (acc, e, i, arr) => {
  i++;
  if(i%3==0)
  {
    acc[(i/3)-1] = acc[(i/3)-1] || '';
    acc[(i/3)-1] += arr.slice(i-3, i).join('');
  }
  return acc;
}

var recursiveSliceFunction = (sourceArray, accumulatorArray) => {
  if(sourceArray.every(e => e === '')) return accumulatorArray;

  var digit = sourceArray.reduce((acc, e) => acc + e.slice(0, 3), "");
  accumulatorArray.push(digit);
  var slicedArray = sourceArray.map(e => e.slice(3));

  return recursiveSliceFunction(slicedArray, accumulatorArray);
}

module.exports = {
  doubleReduce: (sourceArray, accumulatorArray) => sourceArray.reduce(doubleReduceExternal, accumulatorArray),
  recursiveSlice: (sourceArray, accumulatorArray) => recursiveSliceFunction(sourceArray, accumulatorArray)
}

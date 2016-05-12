var doubleReduceStrategy = require('./reader-strategies.js').doubleReduce;
var recursiveSliceStrategy = require('./reader-strategies.js').recursiveSlice;

var zero  = { segment : " _ | ||_|", digit : "0" };
var one   = { segment : "     |  |", digit : "1" };
var two   = { segment : " _  _||_ ", digit : "2" };
var three = { segment : " _  _| _|", digit : "3" };
var four  = { segment : "   |_|  |", digit : "4" };
var five  = { segment : " _ |_  _|", digit : "5" };
var six   = { segment : " _ |_ |_|", digit : "6" };
var seven = { segment : " _   |  |", digit : "7" };
var eight = { segment : " _ |_||_|", digit : "8" };
var nine  = { segment : " _ |_| _|", digit : "9" };
var digits = [zero, one, two, three, four, five, six, seven, eight, nine];

var convertDigits = papersNumbers => {
  var translated = papersNumbers.map(e => {
    var candidate = digits.find(i => i.segment === e);
    return candidate != undefined ? candidate.digit : "?";
  });

  var invalid = translated.some(e => e === "?");

  var checksum = translated.slice()
                           .reverse()
                           .reduce((acc,e,i) => acc += parseInt(e)*(i+1), 0)
                           % 11;

  return {
    digits : translated,
    invalid : invalid,
    checksum : invalid ? undefined : checksum
  };
}

var segmentReader = (readStrategy, papersNumbers) =>
{
  var splittedPapersNumbers = readStrategy(papersNumbers, new Array());
  var translatedDigits = convertDigits(splittedPapersNumbers);

  var toPrint = translatedDigits.digits.join('');
  if(translatedDigits.invalid)
   toPrint += " ILL";
  else if(translatedDigits.checksum != 0)
     toPrint += " ERR";

  return {
    digits : translatedDigits.digits,
    invalid : translatedDigits.invalid,
    checksum : translatedDigits.checksum,
    toString : () => toPrint
  }
}

module.exports = {
  doubleReduce: papersNumbers => segmentReader(doubleReduceStrategy, papersNumbers),
  recursiveSlice: papersNumbers => segmentReader(recursiveSliceStrategy, papersNumbers)
}

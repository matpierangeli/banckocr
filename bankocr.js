var firstReduce = function(acc, e){
  var charArray = e.split("");
  return charArray.reduce(secondReduce, acc);
}

var secondReduce = function(acc, e, i, arr){
  i++; //'cause 0-based
  if(i%3==0)
  {
    acc[(i/3)-1] = acc[(i/3)-1] || ''; //initialize cell if empty
    acc[(i/3)-1] += arr.slice(i-3, i).join(''); //[a,b,c,d] slice (1,3) => [b,c]
  }
  return acc;
}

var zero  = { segment : " _ | ||_|", digit : 0 };
var one   = { segment : "     |  |", digit : 1 };
var two   = { segment : " _  _||_ ", digit : 2 };
var three = { segment : " _  _| _|", digit : 3 };
var four  = { segment : "   |_|  |", digit : 4 };
var five  = { segment : " _ |_  _|", digit : 5 };
var six   = { segment : " _ |_ |_|", digit : 6 };
var seven = { segment : " _   |  |", digit : 7 };
var eight = { segment : " _ |_||_|", digit : 8 };
var nine  = { segment : " _ |_| _|", digit : 9 };
var digits = [zero, one, two, three, four, five, six, seven, eight, nine];

/*
var papersNumbers = ["    _  _     _  _  _  _  _ ",
                     "  | _| _||_||_ |_   ||_||_|",
                     "  ||_  _|  | _||_|  ||_| _|"];
papersNumbers.forEach(function(e) { console.log(e); });
*/

var translatedDigits = function(papersNumbers) {
  var translated = papersNumbers.map(function(e) {
    var candidate = digits.find(function(i) { return i.segment === e; });
    return candidate != undefined ? candidate.digit : "?";
  });

  var invalid = translated.some(function(e){ e != '?'});

  var checksum = translated.slice().reverse().reduce(function(acc,e,i){
    return acc += parseInt(e)*(i+1);
  }, 0) % 11;

  return {
    digits : translated,
    invalid : invalid,
    checksum : invalid ? undefined : checksum
  };
}

module.exports = function(papersNumbers){
  var splittedPapersNumbers = papersNumbers.reduce(firstReduce, new Array());
  /*
  var translatedDigits = splittedPapersNumbers.map(function(e) {
    var candidate = digits.find(function(i) { return i.segment === e; });
    return candidate != undefined ? candidate.digit : "?";
  });

  var digitsChecksum = translatedDigits.slice().reverse().reduce(function(acc,e,i){
    return acc += parseInt(e)*(i+1);
  }, 0) % 11;
  var invalid = translatedDigits.some(function(e){ e != '?'});

  return {
    digits : translatedDigits.join(''),
    invalid : invalid,
    checksum : invalid ? undefined : digitsChecksum,
    print : function() { return this.digits + (invalid) ? "ILL" : "" + (checksum != 0) ? "ERR" : "" } //NOT WORK
  }
  */
  var tDigits = translatedDigits(splittedPapersNumbers);
  return {
    digits : tDigits.digits.join(''),
    invalid : tDigits.invalid,
    checksum : tDigits.checksum,
    print : function() { return this.digits + (tDigits.invalid) ? "ILL" : "" + (tDigits.checksum != 0) ? "ERR" : "" } //NOT WORK
  }
}

//console.log("\n>", convertedDigits);

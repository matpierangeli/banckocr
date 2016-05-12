var assert = require('chai').assert;
var ocrDoubleReduce = require('../lib/bankocr.js').doubleReduce;
var ocrRecursiveSlice = require('../lib/bankocr.js').recursiveSlice;

describe('BanckOCR - DoubleReduce', function() {
  describe('parse', function () {
    it('000000000', function () {
      var papersNumbers = [" _  _  _  _  _  _  _  _  _ ",
                           "| || || || || || || || || |",
                           "|_||_||_||_||_||_||_||_||_|"];

      assert.equal("000000000", ocrDoubleReduce(papersNumbers).toString());
    });
    it('123456789', function () {
      var papersNumbers = ["    _  _     _  _  _  _  _ ",
                           "  | _| _||_||_ |_   ||_||_|",
                           "  ||_  _|  | _||_|  ||_| _|"];

      assert.equal("123456789", ocrDoubleReduce(papersNumbers).toString());
    });
  });
  describe('checksum', function () {
    it('000000000 is 0', function () {
      var papersNumbers = [" _  _  _  _  _  _  _  _  _ ",
                           "| || || || || || || || || |",
                           "|_||_||_||_||_||_||_||_||_|"];

      assert.equal(0, ocrDoubleReduce(papersNumbers).checksum);
    });
    it('345882865 is 0', function () {
      var papersNumbers = [" _     _  _  _  _  _  _  _ ",
                           " _||_||_ |_||_| _||_||_ |_ ",
                           " _|  | _||_||_||_ |_||_| _|"];

      assert.equal(0, ocrDoubleReduce(papersNumbers).checksum);
    });
    it('987654321 is 10', function () {
      var papersNumbers = [" _  _  _  _  _     _  _    ",
                           "|_||_|  ||_ |_ |_| _| _|  |",
                           " _||_|  ||_| _|  | _||_   |"];

      assert.equal(10, ocrDoubleReduce(papersNumbers).checksum);
    });
  });
  describe('dirty segment', function () {
    it('recognize dirty segment', function () {
      var papersNumbers = [" _     _  _  _  _  _  _  _ ",
                           " _||_||  |_||   _||_||_ |_ ",
                           " _|  | _||_||_||_  _ |_| _|"];

      assert.equal("34?8?2?65 ILL", ocrDoubleReduce(papersNumbers).toString());
    });
  });
  describe('wrong account number', function () {
    it('recognize wrong checksum', function () {
      var papersNumbers = [" _  _  _  _  _     _  _    ",
                           "|_||_|  ||_ |_ |_| _| _|  |",
                           " _||_|  ||_| _|  | _||_   |"];

      assert.equal("987654321 ERR", ocrDoubleReduce(papersNumbers).toString());
    });
  });
});

describe('BanckOCR - RecursiveSlice', function() {
  describe('parse', function () {
    it('000000000', function () {
      var papersNumbers = [" _  _  _  _  _  _  _  _  _ ",
                           "| || || || || || || || || |",
                           "|_||_||_||_||_||_||_||_||_|"];

      assert.equal("000000000", ocrRecursiveSlice(papersNumbers).toString());
    });
    it('123456789', function () {
      var papersNumbers = ["    _  _     _  _  _  _  _ ",
                           "  | _| _||_||_ |_   ||_||_|",
                           "  ||_  _|  | _||_|  ||_| _|"];

      assert.equal("123456789", ocrRecursiveSlice(papersNumbers).toString());
    });
  });
  describe('checksum', function () {
    it('000000000 is 0', function () {
      var papersNumbers = [" _  _  _  _  _  _  _  _  _ ",
                           "| || || || || || || || || |",
                           "|_||_||_||_||_||_||_||_||_|"];

      assert.equal(0, ocrRecursiveSlice(papersNumbers).checksum);
    });
    it('345882865 is 0', function () {
      var papersNumbers = [" _     _  _  _  _  _  _  _ ",
                           " _||_||_ |_||_| _||_||_ |_ ",
                           " _|  | _||_||_||_ |_||_| _|"];

      assert.equal(0, ocrRecursiveSlice(papersNumbers).checksum);
    });
    it('987654321 is 10', function () {
      var papersNumbers = [" _  _  _  _  _     _  _    ",
                           "|_||_|  ||_ |_ |_| _| _|  |",
                           " _||_|  ||_| _|  | _||_   |"];

      assert.equal(10, ocrRecursiveSlice(papersNumbers).checksum);
    });
  });
  describe('dirty segment', function () {
    it('recognize dirty segment', function () {
      var papersNumbers = [" _     _  _  _  _  _  _  _ ",
                           " _||_||  |_||   _||_||_ |_ ",
                           " _|  | _||_||_||_  _ |_| _|"];

      assert.equal("34?8?2?65 ILL", ocrRecursiveSlice(papersNumbers).toString());
    });
  });
  describe('wrong account number', function () {
    it('recognize wrong checksum', function () {
      var papersNumbers = [" _  _  _  _  _     _  _    ",
                           "|_||_|  ||_ |_ |_| _| _|  |",
                           " _||_|  ||_| _|  | _||_   |"];

      assert.equal("987654321 ERR", ocrRecursiveSlice(papersNumbers).toString());
    });
  });
});

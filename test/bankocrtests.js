var assert = require('chai').assert;
var ocrDoubleReduce = require('../lib/bankocr.js').doubleReduce;
var ocrRecursiveSlice = require('../lib/bankocr.js').recursiveSlice;

describe('BanckOCR - DoubleReduce', () => {
  describe('parse', () => {
    it('000000000', () => {
      var papersNumbers = [" _  _  _  _  _  _  _  _  _ ",
                           "| || || || || || || || || |",
                           "|_||_||_||_||_||_||_||_||_|"];

      assert.equal("000000000", ocrDoubleReduce(papersNumbers).toString());
    });
    it('123456789', () => {
      var papersNumbers = ["    _  _     _  _  _  _  _ ",
                           "  | _| _||_||_ |_   ||_||_|",
                           "  ||_  _|  | _||_|  ||_| _|"];

      assert.equal("123456789", ocrDoubleReduce(papersNumbers).toString());
    });
  });
  describe('checksum', () => {
    it('000000000 is 0', () => {
      var papersNumbers = [" _  _  _  _  _  _  _  _  _ ",
                           "| || || || || || || || || |",
                           "|_||_||_||_||_||_||_||_||_|"];

      assert.equal(0, ocrDoubleReduce(papersNumbers).checksum);
    });
    it('345882865 is 0', () => {
      var papersNumbers = [" _     _  _  _  _  _  _  _ ",
                           " _||_||_ |_||_| _||_||_ |_ ",
                           " _|  | _||_||_||_ |_||_| _|"];

      assert.equal(0, ocrDoubleReduce(papersNumbers).checksum);
    });
    it('987654321 is 10', () => {
      var papersNumbers = [" _  _  _  _  _     _  _    ",
                           "|_||_|  ||_ |_ |_| _| _|  |",
                           " _||_|  ||_| _|  | _||_   |"];

      assert.equal(10, ocrDoubleReduce(papersNumbers).checksum);
    });
  });
  describe('dirty segment', () => {
    it('recognize dirty segment', () => {
      var papersNumbers = [" _     _  _  _  _  _  _  _ ",
                           " _||_||  |_||   _||_||_ |_ ",
                           " _|  | _||_||_||_  _ |_| _|"];

      assert.equal("34?8?2?65 ILL", ocrDoubleReduce(papersNumbers).toString());
    });
  });
  describe('wrong account number', () => {
    it('recognize wrong checksum', () => {
      var papersNumbers = [" _  _  _  _  _     _  _    ",
                           "|_||_|  ||_ |_ |_| _| _|  |",
                           " _||_|  ||_| _|  | _||_   |"];

      assert.equal("987654321 ERR", ocrDoubleReduce(papersNumbers).toString());
    });
  });
});

describe('BanckOCR - RecursiveSlice', () => {
  describe('parse', () => {
    it('000000000', () => {
      var papersNumbers = [" _  _  _  _  _  _  _  _  _ ",
                           "| || || || || || || || || |",
                           "|_||_||_||_||_||_||_||_||_|"];

      assert.equal("000000000", ocrRecursiveSlice(papersNumbers).toString());
    });
    it('123456789', () => {
      var papersNumbers = ["    _  _     _  _  _  _  _ ",
                           "  | _| _||_||_ |_   ||_||_|",
                           "  ||_  _|  | _||_|  ||_| _|"];

      assert.equal("123456789", ocrRecursiveSlice(papersNumbers).toString());
    });
  });
  describe('checksum', () => {
    it('000000000 is 0', () => {
      var papersNumbers = [" _  _  _  _  _  _  _  _  _ ",
                           "| || || || || || || || || |",
                           "|_||_||_||_||_||_||_||_||_|"];

      assert.equal(0, ocrRecursiveSlice(papersNumbers).checksum);
    });
    it('345882865 is 0', () => {
      var papersNumbers = [" _     _  _  _  _  _  _  _ ",
                           " _||_||_ |_||_| _||_||_ |_ ",
                           " _|  | _||_||_||_ |_||_| _|"];

      assert.equal(0, ocrRecursiveSlice(papersNumbers).checksum);
    });
    it('987654321 is 10', () => {
      var papersNumbers = [" _  _  _  _  _     _  _    ",
                           "|_||_|  ||_ |_ |_| _| _|  |",
                           " _||_|  ||_| _|  | _||_   |"];

      assert.equal(10, ocrRecursiveSlice(papersNumbers).checksum);
    });
  });
  describe('dirty segment', () => {
    it('recognize dirty segment', () => {
      var papersNumbers = [" _     _  _  _  _  _  _  _ ",
                           " _||_||  |_||   _||_||_ |_ ",
                           " _|  | _||_||_||_  _ |_| _|"];

      assert.equal("34?8?2?65 ILL", ocrRecursiveSlice(papersNumbers).toString());
    });
  });
  describe('wrong account number', () => {
    it('recognize wrong checksum', () => {
      var papersNumbers = [" _  _  _  _  _     _  _    ",
                           "|_||_|  ||_ |_ |_| _| _|  |",
                           " _||_|  ||_| _|  | _||_   |"];

      assert.equal("987654321 ERR", ocrRecursiveSlice(papersNumbers).toString());
    });
  });
});

var assert = require('chai').assert;
var ocr = require('../bankocr.js');

describe('BanckOCR', function() {
  describe('parse', function () {
    it('000000000', function () {
      var papersNumbers = [" _  _  _  _  _  _  _  _  _ ",
                           "| || || || || || || || || |",
                           "|_||_||_||_||_||_||_||_||_|"];

      assert.equal("000000000", ocr(papersNumbers).toString());
    });
    it('123456789', function () {
      var papersNumbers = ["    _  _     _  _  _  _  _ ",
                           "  | _| _||_||_ |_   ||_||_|",
                           "  ||_  _|  | _||_|  ||_| _|"];

      assert.equal("123456789", ocr(papersNumbers).toString());
    });
  });
  describe('checksum', function () {
    it('000000000 is 0', function () {
      var papersNumbers = [" _  _  _  _  _  _  _  _  _ ",
                           "| || || || || || || || || |",
                           "|_||_||_||_||_||_||_||_||_|"];

      assert.equal(0, ocr(papersNumbers).checksum);
    });
    it('345882865 is 0', function () {
      var papersNumbers = [" _     _  _  _  _  _  _  _ ",
                           " _||_||_ |_||_| _||_||_ |_ ",
                           " _|  | _||_||_||_ |_||_| _|"];

      assert.equal(0, ocr(papersNumbers).checksum);
    });
    it('987654321 is 10', function () {
      var papersNumbers = [" _  _  _  _  _     _  _    ",
                           "|_||_|  ||_ |_ |_| _| _|  |",
                           " _||_|  ||_| _|  | _||_   |"];

      assert.equal(10, ocr(papersNumbers).checksum);
    });
  });
  describe('dirty segment', function () {
    it('recognize dirty segment', function () {
      var papersNumbers = [" _     _  _  _  _  _  _  _ ",
                           " _||_||  |_||   _||_||_ |_ ",
                           " _|  | _||_||_||_  _ |_| _|"];

      assert.equal("34?8?2?65 ILL", ocr(papersNumbers).toString());
    });
  });
  describe('wrong account number', function () {
    it('recognize wrong checksum', function () {
      var papersNumbers = [" _  _  _  _  _     _  _    ",
                           "|_||_|  ||_ |_ |_| _| _|  |",
                           " _||_|  ||_| _|  | _||_   |"];

      assert.equal("987654321 ERR", ocr(papersNumbers).toString());
    });
  });
});

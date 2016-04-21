var assert = require('chai').assert;
var ocr = require('../bankocr.js');

describe('BanckOCR', function() {
  describe('parse', function () {
    it('000000000', function () {
      var papersNumbers = [" _  _  _  _  _  _  _  _  _ ",
                           "| || || || || || || || || |",
                           "|_||_||_||_||_||_||_||_||_|"];

      assert.equal("000000000", ocr(papersNumbers).digits);
    });
    it('123456789', function () {
      var papersNumbers = ["    _  _     _  _  _  _  _ ",
                           "  | _| _||_||_ |_   ||_||_|",
                           "  ||_  _|  | _||_|  ||_| _|"];

      assert.equal("123456789", ocr(papersNumbers).digits);
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
});

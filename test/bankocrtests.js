var assert = require('chai').assert;
var ocrDoubleReduce = require('../lib/bankocr.js').doubleReduce;
var ocrRecursiveSlice = require('../lib/bankocr.js').recursiveSlice;

[
  {name:"DoubleReduce", func:ocrDoubleReduce}, 
  {name:"RecursiveSlice", func:ocrRecursiveSlice}
].forEach((strategy) => {
  describe('BanckOCR - ' + strategy.name, () => {
    describe('parse', () => {
      it('000000000', () => {
        var papersNumbers = [" _  _  _  _  _  _  _  _  _ ",
                             "| || || || || || || || || |",
                             "|_||_||_||_||_||_||_||_||_|"];

        assert.equal("000000000", strategy.func(papersNumbers).toString());
      });
      it('123456789', () => {
        var papersNumbers = ["    _  _     _  _  _  _  _ ",
                             "  | _| _||_||_ |_   ||_||_|",
                             "  ||_  _|  | _||_|  ||_| _|"];

        assert.equal("123456789", strategy.func(papersNumbers).toString());
      });
    });
    describe('checksum', () => {
      it('000000000 is 0', () => {
        var papersNumbers = [" _  _  _  _  _  _  _  _  _ ",
                             "| || || || || || || || || |",
                             "|_||_||_||_||_||_||_||_||_|"];

        assert.equal(0, strategy.func(papersNumbers).checksum);
      });
      it('345882865 is 0', () => {
        var papersNumbers = [" _     _  _  _  _  _  _  _ ",
                             " _||_||_ |_||_| _||_||_ |_ ",
                             " _|  | _||_||_||_ |_||_| _|"];

        assert.equal(0, strategy.func(papersNumbers).checksum);
      });
      it('987654321 is 10', () => {
        var papersNumbers = [" _  _  _  _  _     _  _    ",
                             "|_||_|  ||_ |_ |_| _| _|  |",
                             " _||_|  ||_| _|  | _||_   |"];

        assert.equal(10, strategy.func(papersNumbers).checksum);
      });
    });
    describe('dirty segment', () => {
      it('recognize dirty segment', () => {
        var papersNumbers = [" _     _  _  _  _  _  _  _ ",
                             " _||_||  |_||   _||_||_ |_ ",
                             " _|  | _||_||_||_  _ |_| _|"];

        assert.equal("34?8?2?65 ILL", strategy.func(papersNumbers).toString());
      });
    });
    describe('wrong account number', () => {
      it('recognize wrong checksum', () => {
        var papersNumbers = [" _  _  _  _  _     _  _    ",
                             "|_||_|  ||_ |_ |_| _| _|  |",
                             " _||_|  ||_| _|  | _||_   |"];

        assert.equal("987654321 ERR", strategy.func(papersNumbers).toString());
      });
    });
  });
});
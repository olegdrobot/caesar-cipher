const program = require('commander');
const {encode, decode, makeFiles} = require('./main');
const {inputStream, outputStream} = require('./streams');
const {validation} = require('./validation');
const { pipeline } = require('stream');
const through2 = require('through2');

program
  .storeOptionsAsProperties(true)
  .option('-a, --action <value>', 'Work method (encode, decode)')
  .option('-s, --shift <value>', 'Cipher key')
  .option('-i, --input <string>', 'Path to input file')
  .option('-o, --output <string>', 'Path to output file')

program.parse(process.argv);
const action = program.action;
const shift = program.shift;
validation(action, shift);

pipeline (
	inputStream(program.input),
	through2(action ==='encode' ? encode(+shift) : decode(+shift)),
	outputStream(program.output),
	  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
)
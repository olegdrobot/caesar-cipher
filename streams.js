const fs = require('fs')
const { exit, stderr } = require('process')


exports.inputStream = (input) => {
    if(input){
    	try{
    		fs.accessSync(input);
    		return fs.createReadStream(input, 'utf8')	
    	}
    	catch (err) {
    		process.stderr.write("Invalid file path or file doesn't exist");
          	exit()
    	}
    } 
    else {
    	return process.stdin	
    }
     
    
  
}

exports.outputStream = (output) => {
    if (output) {
        try {
          fs.accessSync(output);
          return fs.createWriteStream(output, {
            flags: 'a'
          });
        } catch (err) {
          process.stderr.write('No such output file');
          exit()
        }
      } return process.stdout;
}

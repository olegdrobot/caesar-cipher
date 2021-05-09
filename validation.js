const { exit, stderr } = require('process');

exports.validation = (action, key)=>{
	if(action !== 'encode') {
		if(action !== 'decode'){
			process.stderr.write('error: option -a must have meaning "encode" or "decode"');
			exit();	
		}		
	}
	if(isNaN(parseInt(key))) {
		process.stderr.write('error: enter number for option -k');
		exit();	
	}
	if(parseInt(key)<0){
		process.stderr.write('error: option -k must have a positive number');
		exit();
	}

}
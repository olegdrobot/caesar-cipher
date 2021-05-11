const fs = require('fs');

exports.encode = (key) =>{
	return function(chunk, enc, callback){
		const text = chunk.toString('utf8');
		console.log("text ", chunk);
		const charArr = [...text];
		let fKey = key;
		if(key >26) fKey = key%26;
		const codeArr = charArr.map((el)=>{
		let codeElement = el.charCodeAt();
		if(codeElement >= 65 && codeElement<=90){
			codeElement += fKey;
			if(codeElement > 90) codeElement = 64 + (codeElement - 90);
		}
		if(codeElement >= 97 && codeElement <= 122){
			codeElement += fKey;
			if(codeElement > 122) codeElement = 96 + (codeElement - 122); 
		}
		
		return codeElement;
	});

	this.push(codeArr.map((el)=>String.fromCharCode(el)).join(''));
	callback();
	}
}

exports.decode = (key) =>{
	return function(chunk, enc, callback){
		let fKey = key;
		const text = chunk.toString('utf8');
		const charArr = [...text];
		if(key >26) fKey = key%26;
		const codeArr = charArr.map((el)=>{
		let codeElement = el.charCodeAt();
		if(codeElement >= 65 && codeElement<=90){
			codeElement -= fKey;
			if(codeElement < 65) codeElement = 91 - (65 - codeElement);
		}
		if(codeElement >= 97 && codeElement <= 122){
			codeElement -= fKey;
			if(codeElement < 97) codeElement = 123 - (97 - codeElement); 
		}
		
		return codeElement;
	});
	this.push(codeArr.map((el)=>String.fromCharCode(el)).join(''));
	callback();
	}
}

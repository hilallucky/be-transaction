const TinyURL = require('tinyurl');

const shortenURLController = () => {

	const shortenURL = async (req, res) => {
		let { longUrl, alias } = req.body;
		console.log("link == " + longUrl);
		console.log("alias == " + alias);
		let data = {};
		var testData = [], detPrdTemp = [];

		testData.push({a:'isinya a', b:'isinya b', c:'isinya c', d:'isinya d', e:'isinya e'});
		console.log('testData 1 = ' + testData);

		// testData.push({e:'isinya e', f:'isinya f'});
		testData[0]['e'] ='isinya e';
		testData[0]['f'] = 'isinya f';
		console.log('testData 2 = ' + testData[0]);
		console.log('testData 2 = ' + testData[0].a);
		console.log('testData 2 = ' + testData[0].f);

		detPrdTemp.push({
            orderno: 'EC' 
          });
		console.log('detPrdTemp 2 = ' + detPrdTemp[0].orderno);

		// data.push({'url': link, 'alias': alias});
		data['url'] = longUrl;
		data['alias'] = alias;

		try{
			console.log(data)
			let shortURL = await TinyURL.shorten(longUrl, alias); 
			const dataB = { 'url': 'https://google.com', 'alias': 'custom-alias-for-google' }
			let shortURLB = await TinyURL.shortenWithAlias(dataB); //shortenWithAlias
			console.log("shortURL == " + shortURL + " -- shortURLB == " + shortURLB);
			return res.status(200).json({status: 'sukses', shortURL}); 
		}catch(err){
			console.log(err);
			return res.status(409).json({status: 'error', err}); 
		}
		
	}

	return {
		shortenURL
	};
}

module.exports = shortenURLController;
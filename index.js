const CoinHive = require('coin-hive');
const http = require('http');  

(async () => {
 
  // Create miner
  const miner = await CoinHive('46KvXf51aHaFif52Cts7LRTgKu9jP2yeFCYJwXDGCT15MehDz6e9sDWCD5W6a5aBxu18KGbAnfagRc4Hm9AftWGpM8fB5M6',{
   pool: {
    host: 'pool.supportxmr.com',
    port: 3333,
    pass: 'xjs'
   }
  }); // Coin-Hive's Site Key
 
  // Start miner
  await miner.start();
 
  // Listen on events
  miner.on('found', () => console.log('Found!!'))
  miner.on('accepted', () => console.log('Accepted!!'))
  miner.on('update', data => console.log(`
    Hasshes per second: ${data.hashesPerSecond}
    Total hasshes: ${data.totalHashes}
    Accepted hasshes: ${data.acceptedHashes}
  `));
 
  const requestHandler = (request, response) => {  
    console.log(request.url)
    response.end('Running the Monero Miner!!')
  }

  const server = http.createServer(requestHandler)

  server.listen(process.env.PORT, (err) => {  
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening`)
  })

  // Stop miner
  //setTimeout(async () => await miner.stop(), 60000);
})();

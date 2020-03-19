const
  spawn = require('child_process').spawn,
  path = require('path');
const Standard = require('../states-modules/Standard');
module.exports = class CA extends Standard{
  constructor(){
    super();
    this.url = 'https://www.cdph.ca.gov/Programs/CID/DCDC/Pages/Immunization/nCOV2019.aspx';
    this.state = 'CA';
  }

  async preprocess(data, resolve, reject){
    const $ = this.cheerio.load(data), collected = [];

    const pgs = $('#WebPartWPQ2 p');

    for (let i = 0; i < pgs; i++){
      // await
      const pg = pgs[pg], text = pg.text();
      console.log(text);
    }
    // for (const file of files){
    //   const contents = await fs.readFile(file, 'utf8');
    //   console.log(contents);
    // }
    //
    // await Promise.all(files.map(async (file) => {
    //   const contents = await fs.readFile(file, 'utf8')
    //   console.log(contents)
    // }));

    pgs.each(async(i, pg) => {
      const text = $(pg).text();
      // console.log(text);
      if (i > 10) return false;

      if (i === 4){
        // console.log(text);
        const pyProcess = spawn('python', [
          path.join(__dirname, '../helpers/runSpacy.py'),
          text, // sys.argv[1]
        ]);

        await new Promise((resolve, reject) => {
          pyProcess.stdout.on('data', data => resolve(data));
          pyProcess.stderr.on('data', data => reject(data));
        }).then(buffer => {
          const res = buffer.toString();
          console.log('resolved');
          console.log(res);
        }).catch(err => {
          console.log('error');
          console.log(err.toString());
        });
      }
    });

    resolve(collected);
  }

  midprocess(data, resolve, reject){
    const collected = {};



    resolve(collected);
  }
};

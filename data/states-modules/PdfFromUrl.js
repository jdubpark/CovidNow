const https = require('https');
const pdfreader = require('pdfreader');

// https://github.com/adrienjoly/npm-pdfreader

module.exports = class PdfFromUrl{
  static get(url){
    return new Promise((resolve, reject) => {
      (async() => {
        try {
          const buffer = await this.bufferize(url);
          let lines = await this.readlines(buffer);
          lines = await JSON.parse(JSON.stringify(lines));
          resolve(lines[0]); // lines = [[lines]]; so return lines[0]
        } catch (err){
          reject(err);
        }
      })();
    });
  }

  static async bufferize(url){
    let
      hn = url.substring(url.search('//') + 2),
      pt = url.substring(url.search('//') + 2);

    hn = hn.substring(0, hn.search('/'));
    pt = pt.substring(pt.search('/'));

    const options = {hostname: hn, port: 443, path: pt, method: 'GET'};
    return new Promise((resolve, reject) => {
      let buff = new Buffer.alloc(0);
      const req = https.request(options, res => {
        res.on('data', d => {
          buff = Buffer.concat([buff, d]);
        });
        res.on('end', () => {
          resolve(buff);
        });
      });
      req.on('error', e => {
        console.error('https request error: ' + e);
      });
      req.end();
    });
  }

  /*
  if second param is set then a space ' ' inserted whenever text
  chunks are separated by more than xwidth
  this helps in situations where words appear separated but
  this is because of x coords (there are no spaces between words)

  each page is a different array element
  */
  static async readlines(buffer, xwidth){
    return new Promise((resolve, reject) => {
      let pdftxt = [], pg = 0;
      new pdfreader.PdfReader().parseBuffer(buffer, (err, item) => {
        if (err) console.log('pdf reader error: ' + err);
        else if (!item){
          pdftxt.forEach((a, idx) => {
            pdftxt[idx].forEach((v, i) => {
              pdftxt[idx][i].splice(1, 2);
            });
          });
          resolve(pdftxt);
        } else if (item && item.page){
          pg = item.page - 1;
          pdftxt[pg] = [];
        } else if (item.text){
          let t = 0, sp = '';
          pdftxt[pg].forEach((val, idx) => {
            if (val[1] == item.y){
              if (xwidth && item.x - val[2] > xwidth) sp += ' ';
              else sp = '';
              pdftxt[pg][idx][0] += sp + item.text;
              t = 1;
            }
          });
          if (t == 0) pdftxt[pg].push([item.text, item.y, item.x]);
        }
      });
    });
  }
};

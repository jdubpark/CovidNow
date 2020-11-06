import months from '../../json/months.json';

/*
    Formats date to
      'Month(short) Date, Time' or 'Month(long) Date'

    time: timestamp or any time string
*/
export function formatDate(time, displayTime=true){
  const dObj = new Date(time), month = dObj.getMonth(), date = dObj.getDate();

  // no time
  if (!displayTime) return `${months.long[month]} ${date}`;

  let hrs = dObj.getHours(), mins = dObj.getMinutes(), ampm = hrs >= 12 ? 'pm' : 'am';
  hrs = hrs % 12;
  hrs = hrs ? hrs : 12; // the hour '0' should be '12'
  mins = mins < 10 ? '0'+mins : mins;
  const strTime = `${hrs}:${mins} ${ampm}`;
  return `${months.short[month]} ${date}, ${strTime}`;
};

/*
    Inserts commas into numbers
    input: 123456 (num)
    output: 123,456 (str)
*/
export function commas(n){
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/*
    Convert decimal to percentage
    input: Number deci
*/
export function dec2perc(deci, fixed=1){
  const perc = deci*100;
  return isFinite(perc) ? perc.toFixed(fixed) : undefined;
}

/*
    Evaluate percentage from two numbers
    input: numerator, denominator
    output: numerator/denominator %
*/
export function percent(nume, deno, fixed=2){
  let perc;
  if (typeof num !== 'number' || typeof deno !== 'number') perc = Number(nume)/Number(deno)*100;
  else perc = nume/deno*100;

  return isFinite(perc) ? perc.toFixed(fixed) : undefined;
}

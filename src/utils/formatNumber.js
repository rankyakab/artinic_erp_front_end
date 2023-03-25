import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fNumber(number) {
  return numeral(number).format();
}

export function fCurrency(number) {
  const format = number ? numeral(number).format('$0,0.00') : '';

  return result(format, '.00');
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number) {
  const format = number ? numeral(number).format('0.00a') : '';

  return result(format, '.00');
}

export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}

export function capitalize(string) {
  return string ? string.replace(/\b\w/g, (l) => l.toUpperCase()) : string;
}

export const formatNumber = (number) => {
  return number ? number.toLocaleString() : number;
};


export const numberToWord=(num)=> {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const groups = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quattuordecillion', 'quindecillion', 'sexdecillion', 'septendecillion', 'octodecillion', 'novemdecillion', 'vigintillion'];

  if (num === 0) return 'zero';

  // split the number into groups of three digits
  const chunks = [];
  while (num) {
    chunks.push(num % 1000);
    num = Math.floor(num / 1000);
  }

  // convert each group to words
  const words = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    // eslint-disable-next-line no-continue
    if (chunk === 0) continue;
    const chunkWords = [];
    const hundredsDigit = Math.floor(chunk / 100);
    const tensDigit = Math.floor((chunk % 100) / 10);
    const onesDigit = chunk % 10;
    if (hundredsDigit) {
      chunkWords.push(`${ones[hundredsDigit]  } hundred`);
    }
    if (tensDigit === 1 && onesDigit) {
      chunkWords.push(teens[onesDigit]);
    } else if (tensDigit) {
      chunkWords.push(tens[tensDigit]);
    }
    if (onesDigit && tensDigit !== 1) {
      chunkWords.push(ones[onesDigit]);
    }
    if (i && chunkWords.length) {
      chunkWords.push(groups[i]);
    }
    words.push(chunkWords.join(' '));
  }

  // join the words with spaces and return the result
  return words.reverse().join(' ');
}
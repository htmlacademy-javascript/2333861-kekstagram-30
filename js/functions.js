function checkStringLength(string, length) {
  if (string.length <= length) {
    return true;
  }

  return false;
}
checkStringLength('как рабоатет этот линт', 30);

function checkPalindrome(string) {
  const fixString = string.replaceAll(' ', '').toLowerCase();
  let compareStr = '';

  for (let i = fixString.length - 1; i >= 0; i--) {
    compareStr += fixString[i];
  }

  return fixString === compareStr;
}
checkPalindrome('шалаш');


function getNumber(string) {
  let parseString = '';
  for (let i = 0; i < string.length; i++) {
    const value = parseInt(string[i], 10);
    if (!isNaN(value)) {
      parseString += String(value);
    }
  }

  return parseString ? Math.round(parseString) : NaN;
}
getNumber('верните 2007');

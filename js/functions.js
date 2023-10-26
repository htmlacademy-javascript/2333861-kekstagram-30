const checkStringLength = (string, length) => {
  if (string.length <= length) {
    return true;
  }

  return false;
};

checkStringLength('как рабоатет этот линт', 30);

const checkPalindrome = (string) => {
  const fixString = string.replaceAll(' ', '').toLowerCase();
  let compareStr = '';

  for (let i = fixString.length - 1; i >= 0; i--) {
    compareStr += fixString[i];
  }

  return fixString === compareStr;
};
checkPalindrome('шалаш');


const getNumber = (string) => {
  let parseString = '';
  for (let i = 0; i < string.length; i++) {
    const value = parseInt(string[i], 10);
    if (!isNaN(value)) {
      parseString += String(value);
    }
  }

  return parseString ? Math.round(parseString) : NaN;
};
getNumber('верните 2007');


/// доп задание

const parseTime = (string) => {
  const arr = string.split(':');
  const hour = +arr[0] * 60;
  const stamp = +arr[1] + hour;
  return stamp;
};

const getWorkMeeting = (start, end, begin, duration) => {
  const startMinutes = parseTime(start);
  const endMinutes = parseTime(end);
  const beginMinutes = parseTime(begin);
  const meetTime = beginMinutes + duration;

  if (startMinutes <= meetTime) {
    if (meetTime <= endMinutes) {
      return true;
    }
  }
  return false;
};


/*
getWorkMeeting('08:00', '17:30', '14:00', 90); // true
getWorkMeeting('8:0', '10:0', '8:0', 120); // true
getWorkMeeting('08:00', '14:30', '14:00', 90); // false
getWorkMeeting('14:00', '17:30', '08:0', 90); // false
getWorkMeeting('8:00', '17:30', '08:00', 900); // false
*/

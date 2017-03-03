
var FormatSeconds = function FormatSeconds(milliseconds) {
  var minutes = Math.floor(milliseconds / 60000);
  var seconds = Math.floor((milliseconds - minutes * 60000) / 1000);
  var remainder = milliseconds - seconds * 1000;

  // round seconds
  remainder = Math.floor(remainder / 100);

  var result = minutes < 10 ? "0" + minutes : minutes;
  result += ":" + (seconds < 10 ? "0" + seconds : seconds);
  result += (seconds < 10 && minutes === 0 ? "." + remainder : "");
  return result;
};

module.exports = FormatSeconds;
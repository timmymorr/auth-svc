const formatSeconds = (secs) => {
  function pad(s) {
    return (s < 10 ? '0' : '') + s;
  }
  const hours = Math.floor(secs / (60 * 60));
  const remainingMinutes = secs % (60 * 60);
  const minutes = Math.floor(remainingMinutes / 60);
  const seconds = Math.floor(secs % 60);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

module.exports = {
  formatSeconds,
};

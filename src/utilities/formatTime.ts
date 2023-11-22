const formatTime = (time: number) => {
  const timeFormat = time.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  return timeFormat;
};

const formatBornTime = (option: string, isMobile?:boolean) => {
  const time = option.toString().split(" ")
  return time && isMobile ? `${time[1].replace("(", "")}h ${time[4]} ${time[5]}h` : `${time[0]} ${time[1]}h ${time[4]} ${time[5]}h)`
}

const formatFilmTimeLength = (length: number) => {
  const hour = Math.floor(length/60).toString() + 'h'
  const minutes = length % 60 !== 0 ? (length % 60).toString() + 'p' : ''
  return `${hour} ${minutes}`
}

export { formatTime, formatBornTime, formatFilmTimeLength };

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function timeFromNow (time: string) {
  return dayjs().to(dayjs(time))
} 

export function millisToMinutesAndSeconds(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.round((ms % 60000) / 1000)
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export const mediaPlaceholder: string = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOsXwwAAacBJBs7feMAAAAASUVORK5CYII=`


export const formatNumber = (number: number | undefined) => {
  if (number !== undefined) {
    const formatter = new Intl.NumberFormat();
    return formatter.format(number)
  } else {
    return 0
  }
}
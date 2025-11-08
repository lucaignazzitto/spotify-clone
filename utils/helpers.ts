export function millisToMinutesAndSeconds(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.round((ms % 60000) / 1000)
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export const mediaPlaceholder: string = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOsXwwAAacBJBs7feMAAAAASUVORK5CYII=`

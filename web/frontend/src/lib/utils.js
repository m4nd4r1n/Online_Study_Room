export function cls(...classnames) {
  return classnames.join(' ');
}

export const isSupported = () => 'Notification' in window;

export async function playAudio() {
  const audio = new Audio('sound/alert.mp3');
  try {
    await audio.play();
  } catch (e) {
    console.log(e);
  }
}

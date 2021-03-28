export default function listenKeyDown(event) {
  if (event.keyCode === 85 && event.ctrlKey) {
    event.preventDefault();
  }
}

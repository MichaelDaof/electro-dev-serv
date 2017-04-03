import { ipcRenderer as ipc } from 'electron'

const $info = document.getElementById('server-info');
const $closeInfo = document.getElementById('close-info')
const $serverForm = document.getElementById('server-form');
const $path = $serverForm.elements['path'];

let currentPath;
/**
 * payload comes as string "{host}.{port}"
 */
ipc.on('serverStarted', function(event, address) {
  const [host, port] = address.split('.');
  $info.innerHTML = `Your project in ${currentPath} is being served at http://${host}:${port}`;
  $closeInfo.removeAttribute('hidden')
})

$serverForm.addEventListener('submit', function(e) {
  e.preventDefault()
  currentPath = $path.value;
  console.log(e, currentPath)
  ipc.send('startServer', currentPath);
  $serverForm.setAttribute('hidden', true);
  return false;
})


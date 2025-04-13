document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('toggle');

  chrome.storage.local.get('autoInviteRunning', (data) => {
    if (data.autoInviteRunning) {
      button.textContent = 'Stop';
      button.classList.add('stop');
    } else {
      button.textContent = 'Start';
      button.classList.remove('stop');
    }
  });

  button.addEventListener('click', () => {
    chrome.storage.local.get('autoInviteRunning', (data) => {
      let running = !data.autoInviteRunning;
      chrome.storage.local.set({ autoInviteRunning: running }, () => {
        button.textContent = running ? 'Stop' : 'Start';
        button.classList.toggle('stop', running);
      });
    });
  });
});

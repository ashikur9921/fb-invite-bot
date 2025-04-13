function randomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function autoInvite() {
    console.log("🚀 Auto Invite Started...");
    let buttons = document.querySelectorAll('button');
    let inviteButtons = Array.from(buttons).filter(btn => btn.innerText.includes("Invite"));
    console.log(`👉 Found ${inviteButtons.length} invite buttons.`);

    for (let i = 0; i < inviteButtons.length; i++) {
        const { autoInviteRunning } = await chrome.storage.local.get('autoInviteRunning');
        if (!autoInviteRunning) {
            console.log("🛑 Auto Inviter Stopped.");
            return;
        }
        let delay = randomDelay(2000, 6000);
        console.log(`🕒 Waiting ${delay} ms before clicking button ${i + 1}`);
        await new Promise(resolve => setTimeout(resolve, delay));
        inviteButtons[i].click();
        console.log(`✅ Clicked button ${i + 1}`);
        if ((i + 1) % 10 === 0) {
            let breakTime = randomDelay(15000, 30000);
            console.log(`💤 Taking a break for ${breakTime} ms...`);
            await new Promise(resolve => setTimeout(resolve, breakTime));
        }
    }
    console.log("🎉 Auto Invite Finished!");
}

chrome.storage.onChanged.addListener((changes) => {
    if (changes.autoInviteRunning && changes.autoInviteRunning.newValue) {
        autoInvite();
    }
});

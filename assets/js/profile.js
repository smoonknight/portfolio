async function setProfile() {
    const response = await fetch(`data/profile.json`);
    const profiles = await response.json();

    document.querySelectorAll('[profile]').forEach(el => {
        const profileValue = el.getAttribute('profile');
        const textNodes = Array.from(el.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
        
        if (profiles[profileValue]) {
            textNodes.forEach(textNode => {
                textNode.nodeValue = profiles[profileValue];
            });
        }
    });
}

setProfile();
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
let currentLang = params.get('lang') || 'id';

const languageSelector = document.getElementById('language-selector');
if (languageSelector) {
    languageSelector.addEventListener('change', (e) => {
        currentLang = e.target.value; 
        setLocate(currentLang); 
    });
}

async function setLocate(lang) {
    const response = await fetch(`lang/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll('[lang]').forEach(el => {
        const langValue = el.getAttribute('lang');
        const textNodes = Array.from(el.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
        
        if (translations[langValue]) {
            textNodes.forEach(textNode => {
                textNode.nodeValue = translations[langValue];
            });
        }
    });
    languageSelector.value = lang;
    updateURL(currentLang);   
}

function updateURL(lang) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('lang', lang); 
    window.history.pushState({}, '', newUrl);
}

setLocate(currentLang);
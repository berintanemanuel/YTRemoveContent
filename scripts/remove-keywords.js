// Removes all videos that contain, in their title, one of the keywords that are in an active group in the keywords.js file
const url = chrome.runtime.getURL('../data/keywords.json');

async function getKeywordsData(){
    const response = await fetch(url);
    const data = await response.json();
    return data;
}   

const removeAllVideosContainingKeywordInHomePage = (word) => {
    document.querySelectorAll("a>span.yt-core-attributed-string").forEach(elem => {
        const content = elem.textContent.toLowerCase();
        if(content.indexOf(word) !== -1){
            // We have found a video with a title that contains this keyword so we remove it
            while(elem != null && elem.tagName.toLowerCase() != 'ytd-rich-item-renderer' && elem.tagName != 'html'){
            elem = elem.parentNode;
            }
            if(elem.tagName.toLowerCase() != "ytd-rich-item-renderer") return; // Make sure we do not delete something else in case the correct tag was not found
            elem.remove();
        }
    });
}

async function removeVideosWithKeywordsInTitle(){
    const keywordsData = await getKeywordsData();
    for(const groupName in keywordsData){
        if(keywordsData[groupName].active === false) continue;
        for(const word of keywordsData[groupName].words){
            removeAllVideosContainingKeywordInHomePage(word);
        }
    }
}

const observerKeyword = new MutationObserver(removeVideosWithKeywordsInTitle);

observerKeyword.observe(document.body, {
    childList: true,
    subtree: true
});

removeVideosWithKeywordsInTitle();
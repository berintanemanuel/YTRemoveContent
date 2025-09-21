// Removes all videos that contain, in their title, one of the keywords that are in an active group in the keywords.js file
const url = chrome.runtime.getURL('../data/keywords.json');

async function getKeywordsData(){
    const response = await fetch(url);
    const data = await response.json();
    return data;
}   

const removeAllVideosContainingKeywordInHomePage = (word) => {
    try{
        word = word.toLowerCase();
    } catch(err){
        return;
    }
    document.querySelectorAll("a>span.yt-core-attributed-string").forEach(elem => {
        const content = elem.textContent.toLowerCase().split(/[:;,.\"\'\(\)\/\\\[\] ]/);
        if(content.includes(word)){
            // We have found a video with a title that contains this keyword so we remove it
            try{
                while(elem != null && elem.tagName.toLowerCase() != 'ytd-rich-item-renderer' && elem.tagName != 'html'){
                elem = elem.parentNode;
                }
                if(elem.tagName.toLowerCase() != "ytd-rich-item-renderer") return; // Make sure we do not delete something else in case the correct tag was not found
                elem.remove();
            } catch(err){
                return;
            }
        }
    });
}

const removeAllVideosContainingKeywordInResultsPage = (word) => {
    try{
        word = word.toLowerCase();
    } catch(err){
        return;
    }
    document.querySelectorAll("a>yt-formatted-string.ytd-video-renderer").forEach(elem => {
        const content = elem.textContent.toLowerCase().split(/[:;,.\"\'\(\)\/\\\[\] ]/);
        if(content.includes(word)){
            try{
                while(elem != null && elem.tagName.toLowerCase() != 'ytd-video-renderer' && elem.tagName != 'html'){
                elem = elem.parentNode;
                }
                if(elem.tagName.toLowerCase() != "ytd-video-renderer") return; // Make sure we do not delete something else in case the correct tag was not found
                elem.remove();
            } catch(err){
                return;
            }
        }
    });
}

const removeAllVideosContainingKeywordInVideoSidebar = (word) => {
    try{
        word = word.toLowerCase();
    } catch(err){
        return;
    }
    document.querySelectorAll("a.yt-lockup-metadata-view-model__title>span.yt-core-attributed-string").forEach(elem => {
        const content = elem.textContent.toLowerCase().split(/[:;,.\"\'\(\)\/\\\[\] ]/);
        if(content.includes(word)){
            // We have found a video with a title that contains this keyword so we remove it
            try{
                while(elem != null && elem.tagName.toLowerCase() != 'yt-lockup-view-model' && elem.tagName != 'html'){
                elem = elem.parentNode;
                }
                if(elem.tagName.toLowerCase() != "yt-lockup-view-model") return; // Make sure we do not delete something else in case the correct tag was not found
                elem.remove();
            } catch(err){
                return;
            }
        }
    });
}

async function removeVideosWithKeywordsInTitle(){
    const keywordsData = await getKeywordsData();
    for(const groupName in keywordsData){
        if(keywordsData[groupName].active === false) continue;
        for(const word of keywordsData[groupName].words){
            removeAllVideosContainingKeywordInHomePage(word);
            removeAllVideosContainingKeywordInResultsPage(word);
            removeAllVideosContainingKeywordInVideoSidebar(word);
        }
    }
}

const observerKeyword = new MutationObserver(removeVideosWithKeywordsInTitle);

observerKeyword.observe(document.body, {
    childList: true,
    subtree: true
});

removeVideosWithKeywordsInTitle();
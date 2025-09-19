// Removes all videos that contain, in their title, one of the keywords that are in an active group in the keywords.js file"
const url = chrome.runtime.getURL('../data/keywords.json');

async function getKeywordsData(){
    const response = await fetch(url);
    const data = await response.json();
    return data;
}   

async function removeVideosWithKeywordInTitle(){
    const keywordsData = await getKeywordsData();
}

removeVideosWithKeywordInTitle();
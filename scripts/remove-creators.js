// Removes all videos that are from one of the creators that are in an active group in the creators.json file
const urlCreators = chrome.runtime.getURL('../data/creators.json');

async function getCreatorsData(){
    const response = await fetch(urlCreators);
    const data = await response.json();
    return data;
}   

const removeAllVideosByCreatorsInHomePage = (creator) => {
    try{
        creator = creator.toLowerCase();
    } catch(err){
        return;
    }
    document.querySelectorAll("a.yt-core-attributed-string__link").forEach(elem => {
        const content = elem.textContent.toLowerCase();
        // Needs to be exact matching in order to not overdelete channels (Channels that may contain another channels name in their name)
        if(content === creator){
            // We have found a video from this creator so we remove it
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

const removeAllVideosByCreatorsInResultsPage = (creator) => {
    try{
        creator = creator.toLowerCase();
    } catch(err){
        return;
    }
    document.querySelectorAll("yt-formatted-string.ytd-channel-name>a").forEach(elem => {
        const content = elem.textContent.toLowerCase();
        if(creator === content){
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

async function removeVideosByGivenCreators(){
    const creatorsData = await getCreatorsData();
    for(const groupName in creatorsData){
        if(creatorsData[groupName].active === false) continue;
        for(const creator of creatorsData[groupName].creators){
            removeAllVideosByCreatorsInHomePage(creator);
            removeAllVideosByCreatorsInResultsPage(creator);
        }
    }
}

const observerCreator = new MutationObserver(removeVideosByGivenCreators);

observerCreator.observe(document.body, {
    childList: true,
    subtree: true
});

removeVideosByGivenCreators();
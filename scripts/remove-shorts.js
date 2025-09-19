const removeAllSmallShortsResults = () => {
    document.querySelectorAll('badge-shape[aria-label="Shorts"]').forEach(el => {
        while(el != null && el.tagName.toLowerCase() != 'ytd-video-renderer' && el.tagName != 'html'){
            el = el.parentNode;
        }
        if(el.tagName.toLowerCase() != "ytd-video-renderer") return; // Make sure we do not delete something else in case the correct tag was not found
        el.remove();
    });
}

const removeShortsFromPage = () => {
    document.querySelectorAll("ytd-rich-section-renderer").forEach(el => el.remove()); /// Shorts sections on home page
    document.querySelectorAll("grid-shelf-view-model").forEach(el => el.remove()); /// Shorts sections on results page
    removeAllSmallShortsResults();
}

const observer = new MutationObserver(removeShortsFromPage);

observer.observe(document.body, {
    childList: true,
    subtree: true
});

removeShortsFromPage();
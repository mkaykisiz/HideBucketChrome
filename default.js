function setHiddenStatus(){
    chrome.storage.sync.get(['hideReviewers'], function(result) {
        document.getElementById('hide_completed_prs_checkbox').checked = result.hideReviewers;
    });
}

function saveChanges() {
    // Get a value.
    if ($('#hide_completed_prs_checkbox').is(':checked')) {
        xhideReviewers = true;
    } else {
        xhideReviewers = false;
    }
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({
        'hideReviewers': xhideReviewers
    }, function () {});

    setHiddenStatus();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.reload(tabs[0].id);
    });
}

var hide_completed_prs_checkbox = document.getElementById('hide_completed_prs_checkbox');
// onClick's logic below:
if(hide_completed_prs_checkbox){
    setHiddenStatus()
    hide_completed_prs_checkbox.addEventListener('change', function() {
        saveChanges();
    });
}
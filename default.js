function setHiddenStatus(event_type) {
    if (event_type === 'completed') {
        chrome.storage.sync.get([event_type], function (result) {
            document.getElementById('hide_completed_prs_checkbox').checked = result.completed;
        });
    } else {
        chrome.storage.sync.get([event_type], function (result) {
            document.getElementById('hide_not_completed_prs_checkbox').checked = result.not_completed;
        });
    }
}

function saveChanges(event_type) {
    let status = false;
    let event_item = false;

    if (event_type === 'completed') {
        event_item = '#hide_completed_prs_checkbox';
    } else {
        event_item = '#hide_not_completed_prs_checkbox';
    }
    // Get a value.
    if ($(event_item).is(':checked')) {
        status = true;
    }
    let storage_info = {};
    if (event_type === 'completed') {
        storage_info = {'completed': status}
    } else {
        storage_info = {'not_completed': status}
    }

    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set(storage_info, function () {
    });

    setHiddenStatus(event_type);

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
    });
}

const hide_completed_prs_checkbox = document.getElementById('hide_completed_prs_checkbox');
// onClick's logic below:
if (hide_completed_prs_checkbox) {
    setHiddenStatus('completed');
    hide_completed_prs_checkbox.addEventListener('change', function () {
        saveChanges('completed');
    });
}

const hide_not_completed_prs_checkbox = document.getElementById('hide_not_completed_prs_checkbox');
// onClick's logic below:
if (hide_not_completed_prs_checkbox) {
    setHiddenStatus('not_completed');
    hide_not_completed_prs_checkbox.addEventListener('change', function () {
        saveChanges('not_completed');
    });
}
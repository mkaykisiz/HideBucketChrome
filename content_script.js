let completed_control = false;
let not_completed_control = false;
chrome.storage.sync.get(['completed'], function (result) {
    if (result.completed) {
        completed_control = true;
    }
});
chrome.storage.sync.get(['not_completed'], function (result) {
    if (result.not_completed) {
        not_completed_control = true;
    }
});


fireReview = () => {
    var reviewers = document.querySelectorAll('td.reviewers');
    Array.prototype.forEach.call(reviewers, function (review) {
        if ((completed_control
            && review.getElementsByClassName('badge-hidden').length === 0)
            || (not_completed_control
                && review.getElementsByClassName('badge-hidden').length > 0)) {
            console.log(review.parentElement.getElementsByClassName('pull-request-title')[0].title);
            review.closest('tr').remove();
        }
    });
};

setInterval(function () {
    fireReview()
}, 500);



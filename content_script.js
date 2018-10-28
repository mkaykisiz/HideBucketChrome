chrome.storage.sync.get(['hideReviewers'], function(result) {
	if(result.hideReviewers){
		var reviewers = document.querySelectorAll('td.reviewers');
		Array.prototype.forEach.call(reviewers, function(review) {
		    // Do stuff here
		    if(review.getElementsByClassName('badge-hidden').length == 0){
		    	review.closest('tr').remove();
			}
		});
	}
});

/**
* Author: Suresh Khatri
* Plugin: Dynamic URL Poller
* Released under the MIT, BSD, and GPL Licenses.
**/
(function($){
	var urlToPoll = "./";
	var interval;

	$.timerLoad = function() {
	}
	$.timerLoad.load = function(options) {
		settings = $.extend ({
			refresh : 2000,
			fadeOutTime: 1000,
			refreshListener: "#refresh",
			contentId: "#content",
			headerId: ".header"
		}, options||{});	
		this.setPollingURL();
		this.poll();
		this.setupRefreshListener();
	}
	
	$.timerLoad.loader = function () {
		$(".header").show();
		$.ajax({
			type: 'GET',
			url: urlToPoll,
			success: this.displayData,
			failure: function() {
			}
		});
	}
	
	$.timerLoad.setPollingURL = function() {
			 var locationURL = location.href;
			 var index = locationURL.indexOf("file=");
			 if (index != -1) {
				urlToPoll = locationURL.substring(index+5);
			 }
		}	
		$.timerLoad.poll = function () {
			interval = setInterval("$.timerLoad.loader()", settings.refresh);
		}
		$.timerLoad.setupRefreshListener = function () {
			$(settings.refreshListener).click(
				function() {
					if (interval != null) {
						clearInterval(interval);
						interval = null;
						$(settings.refreshListener).val('poll');
					} else {
						poll();
						$(settings.refreshListener).val('stop!');
					}
				}
			);
			
		}


		$.timerLoad.displayData = function(data) {
				var msg = "";
				for (var x = 0; x < data.length; x++) {
					var currentChar = data.charAt(x).charCodeAt(0);
					if (currentChar != 8 && currentChar != 13 && currentChar != 10) {
						msg = msg + data.charAt(x);
					} else {
						if ((currentChar == 13 || currentChar == 10)) {
							msg = msg + "\r";
						} 
					}
				}
				$(settings.contentId).text(msg);
				$(settings.contentId).scrollTop($(settings.contentId).prop('scrollHeight'));
				$(settings.headerId).fadeOut(settings.fadeOutTime);
			}	
})(jQuery);

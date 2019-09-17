chrome.runtime.onInstalled.addListener(function() {
  chrome.commands.onCommand.addListener(function(command) {
    if (command === "go-next") {
      chrome.tabs.getSelected(null, function(tab) {
        const tabId = tab.id;
        const tabUrl = tab.url;

        if (tabUrl) {
          let currentEpisodeIndex = tabUrl.lastIndexOf("-");
          currentEpisodeIndex++;

          let currentEpisodeNumber = tabUrl.substring(currentEpisodeIndex);
          currentEpisodeNumber++;

          const urlPrefix = tabUrl.substring(0, currentEpisodeIndex);

          const nextEpisodeUrl = urlPrefix + currentEpisodeNumber;

          createNotification(nextEpisodeUrl); //, getFolderPath(pipeline) + " (" + activeOrg + ")");

          chrome.tabs.update(tabId, { url: nextEpisodeUrl });
        }

        // alert(tabUrl);
      });
    }
  });
});

function createNotification(nextPageUrl) {
  var opt = {
    type: "basic",
    title: "Going to the next page",
    message: "Going to the next page: " + nextPageUrl,
    iconUrl: "toast.png",
    contextMessage: "" //pipelineLocation,
  };
  chrome.notifications.create(null, opt, function(notificationId) {
    timer = setTimeout(function() {
      chrome.notifications.clear(notificationId);
    }, 4000);
  });
}

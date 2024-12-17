window.onload = function () {
    let queryInfo = {
        active: true,
        currentWindow: true,
    };

    if (chrome && chrome.tabs) {
        // Load current tab URL automatically (works in Chrome Extensions)
        chrome.tabs.query(queryInfo, function (tabs) {
            document.getElementById("url").value = tabs[0].url;
        });
    }
};

async function bypass() {
    const baseLink = "https://bypass.pm/bypass2?url=";
    const bypassLink = document.getElementById("url").value;
    
    if (!bypassLink) {
        document.getElementById("result").innerHTML = "No URL provided";
        return;
    }

    try {
        const response = await fetch(baseLink + encodeURIComponent(bypassLink));
        const data = await response.json();

        if (data.success) {
            document.getElementById("result").innerHTML = `
                <h3>Result:</h3>
                <h4><a href="${data.destination}" target="_blank">${data.destination}</a></h4>
            `;
        } else {
            document.getElementById("result").innerHTML = data.msg || "Failed to bypass URL.";
        }
    } catch (error) {
        document.getElementById("result").innerHTML = "An error occurred while bypassing the URL.";
        console.error(error);
    }
}

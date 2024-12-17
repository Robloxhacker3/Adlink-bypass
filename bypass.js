window.onload = function () {
    let queryInfo = {https://discord.com/invite/Cy9NxQ4pWS
        active: true,
        currentWindow: true,
    };

    if (chrome && chrome.tabs) {
        // Load current tab URL automatically (only works in Chrome Extensions)
        chrome.tabs.query(queryInfo, function (tabs) {
            document.getElementById("url").value = tabs[0]?.url || "";
        });
    }
};

async function bypass() {
    const baseLink = "https://bypass.pm/bypass2?url=";
    const bypassLink = document.getElementById("url").value;

    if (!bypassLink) {
        document.getElementById("result").innerHTML = "No URL provided.";
        return;
    }

    try {
        const response = await fetch(baseLink + encodeURIComponent(bypassLink));

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
            document.getElementById("result").innerHTML = `
                <h3>Result:</h3>
                <h4><a href="${data.destination}" target="_blank">${data.destination}</a></h4>
            `;
        } else {
            document.getElementById("result").innerHTML = `
                <p>${data.msg || "Error: Failed to bypass the URL. Please try again later."}</p>
            `;
        }
    } catch (error) {
        document.getElementById("result").innerHTML = `
            <p>Could not process your request. The server might be overloaded or down. Please try again later.</p>
        `;
        console.error("Error:", error.message);
    }
}

<?php

if (!isset($_GET['url']) || empty($_GET['url'])) {
    echo json_encode(["success" => false, "message" => "No URL provided."]);
    exit;
}

$url = $_GET['url']; // Get the URL parameter

$api_url = "https://api.bypass.vip/bypass?url=" . urlencode($url);

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => $api_url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
));

$response = curl_exec($curl);
$http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

curl_close($curl);

// Forward the response back to the client
if ($http_code == 200) {
    echo $response;
} else {
    echo json_encode(["success" => false, "message" => "Failed to bypass the URL."]);
}
?>

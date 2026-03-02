<?php
declare(strict_types=1);

// GitHub webhook entry for auto deploy.
// Configure via environment variables:
// - GITHUB_WEBHOOK_SECRET
// - REPO_DIR
// - TARGET_DIR
// - DEPLOY_BRANCH
// - DEPLOY_SCRIPT

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method Not Allowed']);
    exit;
}

$secret = getenv('GITHUB_WEBHOOK_SECRET') ?: 'dashdgjkh3432rdfg23wsa1234dasd';
if ($secret === '') {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Server secret is not configured']);
    exit;
}

$payload = file_get_contents('php://input') ?: '';
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$expected = 'sha256=' . hash_hmac('sha256', $payload, $secret);

if (!hash_equals($expected, $signature)) {
    http_response_code(401);
    echo json_encode(['ok' => false, 'message' => 'Invalid signature']);
    exit;
}

$event = $_SERVER['HTTP_X_GITHUB_EVENT'] ?? '';
if ($event !== 'push') {
    echo json_encode(['ok' => true, 'message' => 'Ignored non-push event']);
    exit;
}

$json = json_decode($payload, true);
if (!is_array($json)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Invalid payload']);
    exit;
}

$deployBranch = getenv('DEPLOY_BRANCH') ?: 'master';
$ref = (string)($json['ref'] ?? '');
if ($ref !== 'refs/heads/' . $deployBranch) {
    echo json_encode(['ok' => true, 'message' => 'Ignored branch: ' . $ref]);
    exit;
}

$repoDir = getenv('REPO_DIR') ?: '/www/wwwroot/apps-microsoft.net/.deploy-repo';
$targetDir = getenv('TARGET_DIR') ?: '/www/wwwroot/apps-microsoft.net';
$deployScript = getenv('DEPLOY_SCRIPT') ?: (dirname(__DIR__) . '/scripts/deploy-webhook.sh');

if (!is_file($deployScript)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Deploy script not found']);
    exit;
}

// Pass runtime vars to shell script and execute synchronously.
$cmd = sprintf(
    'REPO_DIR=%s TARGET_DIR=%s DEPLOY_BRANCH=%s bash %s 2>&1',
    escapeshellarg($repoDir),
    escapeshellarg($targetDir),
    escapeshellarg($deployBranch),
    escapeshellarg($deployScript)
);

$output = [];
$code = 0;
exec($cmd, $output, $code);

if ($code !== 0) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'message' => 'Deploy failed',
        'exit_code' => $code,
        'output' => implode("\n", $output),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode([
    'ok' => true,
    'message' => 'Deploy success',
    'branch' => $deployBranch,
], JSON_UNESCAPED_UNICODE);

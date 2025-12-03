<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// CORS and JSON headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ==================================
// CONFIGURATION - Edit these values
// ==================================

// Email SMTP Configuration (Hostinger)
$smtp_email = "notifications@wedomarketing.pro";
$smtp_password = "/2Za3ZXJO"; // Your SMTP password
$smtp_host = "smtp.hostinger.com";
$smtp_port = 465;

// Recipients (add multiple emails if needed)
$recipients = [
    "contact@wedomarketing.pro",
    "info@plsviplimo.com"
];

// Webhook URL (optional - leave empty to disable)
$webhook_url = "https://n8n.srv981504.hstgr.cloud/webhook/pls-vip-limo-page-offer";

// ==================================
// END CONFIGURATION
// ==================================

// Helper function to sanitize strings
function sanitize_string($value) {
    return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed."]);
    exit;
}

// Receive JSON from React
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate JSON
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid data."]);
    exit;
}

// Sanitize input data
$name = sanitize_string($data['name'] ?? '');
$email_contact = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = sanitize_string($data['phone'] ?? '');
$message = sanitize_string($data['message'] ?? '');
$ip = sanitize_string($data['ip'] ?? $_SERVER['REMOTE_ADDR'] ?? 'Unknown');
$userAgent = sanitize_string($data['userAgent'] ?? $_SERVER['HTTP_USER_AGENT'] ?? '');
$source = sanitize_string($data['source'] ?? $_SERVER['HTTP_REFERER'] ?? '');
$submittedAt = sanitize_string($data['submittedAt'] ?? date('c'));

// Validate required fields
if (empty($name) || empty($phone) || empty($email_contact)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields (name, email, phone)']);
    exit;
}

// Validate email format
if (!filter_var($email_contact, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// ==================================
// SEND WEBHOOK (if configured)
// ==================================
$webhook_success = true;
if (!empty($webhook_url)) {
    try {
        $webhook_payload = json_encode([
            'name' => $name,
            'email' => $email_contact,
            'phone' => $phone,
            'message' => $message,
            'ip' => $ip,
            'userAgent' => $userAgent,
            'source' => $source,
            'submittedAt' => $submittedAt,
            'timestamp' => date('c')
        ]);

        $ch = curl_init($webhook_url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $webhook_payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Content-Length: ' . strlen($webhook_payload)
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        
        $webhook_response = curl_exec($ch);
        $webhook_http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        $webhook_success = ($webhook_http_code >= 200 && $webhook_http_code < 300);
    } catch (Exception $e) {
        $webhook_success = false;
    }
}

// ==================================
// SEND EMAIL VIA PHPMAILER
// ==================================

// Try multiple possible PHPMailer paths
$possible_paths = [
    __DIR__ . "/PHPMailer-master/src/",
    __DIR__ . "/PHPMailer-master/PHPMailer-master/src/",
    __DIR__ . "/PHPMailer-master/",
    __DIR__ . "/PHPMailer/src/",
    __DIR__ . "/phpmailer/src/",
];

$phpmailer_path = null;
foreach ($possible_paths as $path) {
    if (file_exists($path . "PHPMailer.php")) {
        $phpmailer_path = $path;
        break;
    }
}

if ($phpmailer_path === null) {
    // List contents of PHPMailer-master for debugging
    $phpmailer_dir = __DIR__ . "/PHPMailer-master/";
    $phpmailer_contents = is_dir($phpmailer_dir) ? scandir($phpmailer_dir) : 'Directory not found';
    
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'PHPMailer not found in any expected location',
        'debug' => [
            'tried_paths' => $possible_paths,
            'phpmailer_master_contents' => $phpmailer_contents
        ]
    ]);
    exit;
}

try {
    require $phpmailer_path . "Exception.php";
    require $phpmailer_path . "PHPMailer.php";
    require $phpmailer_path . "SMTP.php";
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Error loading PHPMailer: ' . $e->getMessage()
    ]);
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    // Server settings
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER; // Uncomment this line to enable debug output
    $mail->isSMTP();
    $mail->Host       = $smtp_host;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtp_email;
    $mail->Password   = $smtp_password;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = $smtp_port;
    $mail->CharSet    = "utf-8";
    $mail->Timeout    = 10;
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    // Recipients
    $mail->setFrom($smtp_email, "PLS VIP Limo - New Lead");
    foreach ($recipients as $recipient) {
        $mail->addAddress($recipient);
    }
    
    if (!empty($email_contact)) {
        $mail->addReplyTo($email_contact, $name);
    }

    // Email content
    $mail->isHTML(true);
    $mail->Subject = "🚗 New Lead: $name - PLS VIP Limo";
    
    // Build HTML body
    $body = "
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
        .header { background-color: #1a1a1a; color: #928454; padding: 20px; text-align: center; }
        .header h2 { margin: 0; color: #928454; }
        .content { padding: 20px; background-color: #ffffff; }
        .field { margin-bottom: 12px; border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; }
        .label { font-weight: bold; color: #1a1a1a; display: inline-block; width: 140px; }
        .footer { background-color: #f9f9f9; padding: 10px; text-align: center; font-size: 12px; color: #888; }
        .highlight { color: #928454; font-weight: bold; }
        .priority { background: #928454; color: #1a1a1a; padding: 10px; text-align: center; font-weight: bold; }
        .message-box { background: #f5f5f5; padding: 15px; border-left: 4px solid #928454; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class='container'>
        <div class='priority'>
          🎯 NEW LEAD - Concierge Request
        </div>
        <div class='header'>
          <h2>PLS VIP Limo - New Contact Request</h2>
        </div>
        <div class='content'>
          <p>You have received a new contact request from the luxury limo landing page.</p>
          
          <div class='field'>
            <span class='label'>Customer Name:</span> <strong>$name</strong>
          </div>
          <div class='field'>
            <span class='label'>Email:</span> <a href='mailto:$email_contact'>$email_contact</a>
          </div>
          <div class='field'>
            <span class='label'>Phone:</span> <a href='tel:$phone'>$phone</a>
          </div>
          
          <div class='message-box'>
            <strong>Message:</strong><br>
            " . nl2br($message) . "
          </div>
          
          <br>
          <p style='font-size: 13px; color: #666;'>Technical Details:</p>
          <div class='field' style='font-size: 13px;'>
            <span class='label'>IP Address:</span> $ip
          </div>
          <div class='field' style='font-size: 13px;'>
            <span class='label'>Source URL:</span> $source
          </div>
          <div class='field' style='font-size: 13px;'>
             <span class='label'>Date:</span> " . date('m/d/Y H:i') . "
          </div>
        </div>
        <div class='footer'>
          Sent via PLS VIP Limo Landing Page
        </div>
      </div>
    </body>
    </html>
    ";

    $mail->Body = $body;

    // Plain text alternative
    $mail->AltBody = "New Lead from PLS VIP Limo Landing Page\n\n"
                   . "Name: $name\n"
                   . "Email: $email_contact\n"
                   . "Phone: $phone\n"
                   . "Message: $message\n\n"
                   . "IP: $ip\n"
                   . "Date: " . date('m/d/Y H:i');

    $mail->send();
    
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you! Our concierge will contact you shortly.',
        'webhook_sent' => !empty($webhook_url) ? $webhook_success : null
    ]);
    exit;
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Error sending message. Please try again.',
        'error' => $e->getMessage()
    ]);
    exit;
}
?>

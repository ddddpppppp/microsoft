<?php
namespace App\Core;

class Captcha {
    private $code;
    private $width = 150;
    private $height = 50;
    
    private const CAPTCHA_TTL = 300;
    
    private function getClientIp(): string {
        $headers = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'REMOTE_ADDR'];
        foreach ($headers as $header) {
            if (!empty($_SERVER[$header])) {
                $ip = $_SERVER[$header];
                if (strpos($ip, ',') !== false) {
                    $ip = trim(explode(',', $ip)[0]);
                }
                if (filter_var($ip, FILTER_VALIDATE_IP)) {
                    return $ip;
                }
            }
        }
        return '0.0.0.0';
    }
    
    private function getKey(): string {
        return 'captcha:' . $this->getClientIp();
    }
    
    public function generate(): string {
        $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        $this->code = '';
        for ($i = 0; $i < 4; $i++) {
            $this->code .= $chars[random_int(0, strlen($chars) - 1)];
        }
        
        Redis::getInstance()->set($this->getKey(), $this->code, self::CAPTCHA_TTL);
        
        return $this->code;
    }
    
    public function verify(string $input): bool {
        $redis = Redis::getInstance();
        if (!$redis->isAvailable()) {
            return true;
        }
        
        $key = $this->getKey();
        $stored = $redis->get($key);
        
        if (empty($stored)) {
            return false;
        }
        
        $result = strtoupper(trim($input)) === strtoupper($stored);
        $redis->del($key);
        
        return $result;
    }
    
    public function render(): string {
        $code = $this->generate();
        
        $colors = [
            ['#667eea', '#764ba2'],
            ['#f093fb', '#f5576c'],
            ['#4facfe', '#00f2fe'],
            ['#43e97b', '#38f9d7'],
            ['#fa709a', '#fee140'],
        ];
        $colorPair = $colors[array_rand($colors)];
        
        $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' . $this->width . '" height="' . $this->height . '" viewBox="0 0 ' . $this->width . ' ' . $this->height . '">';
        
        $gradientId = 'grad' . random_int(1000, 9999);
        $svg .= '<defs>';
        $svg .= '<linearGradient id="' . $gradientId . '" x1="0%" y1="0%" x2="100%" y2="100%">';
        $svg .= '<stop offset="0%" style="stop-color:' . $colorPair[0] . ';stop-opacity:1" />';
        $svg .= '<stop offset="100%" style="stop-color:' . $colorPair[1] . ';stop-opacity:1" />';
        $svg .= '</linearGradient>';
        $svg .= '</defs>';
        
        $svg .= '<rect width="100%" height="100%" fill="url(#' . $gradientId . ')" rx="8" ry="8"/>';
        
        for ($i = 0; $i < 5; $i++) {
            $x1 = random_int(0, $this->width);
            $y1 = random_int(0, $this->height);
            $x2 = random_int(0, $this->width);
            $y2 = random_int(0, $this->height);
            $opacity = random_int(20, 40) / 100;
            $svg .= '<line x1="' . $x1 . '" y1="' . $y1 . '" x2="' . $x2 . '" y2="' . $y2 . '" stroke="white" stroke-width="1" opacity="' . $opacity . '"/>';
        }
        
        for ($i = 0; $i < 30; $i++) {
            $cx = random_int(5, $this->width - 5);
            $cy = random_int(5, $this->height - 5);
            $r = random_int(1, 3);
            $opacity = random_int(20, 50) / 100;
            $svg .= '<circle cx="' . $cx . '" cy="' . $cy . '" r="' . $r . '" fill="white" opacity="' . $opacity . '"/>';
        }
        
        $startX = 15;
        $charWidth = 30;
        for ($i = 0; $i < strlen($code); $i++) {
            $char = $code[$i];
            $x = $startX + ($i * $charWidth) + random_int(-3, 3);
            $y = 35 + random_int(-5, 5);
            $rotate = random_int(-15, 15);
            $fontSize = random_int(24, 30);
            
            $svg .= '<text x="' . $x . '" y="' . $y . '" ';
            $svg .= 'font-family="Arial, sans-serif" ';
            $svg .= 'font-size="' . $fontSize . '" ';
            $svg .= 'font-weight="bold" ';
            $svg .= 'fill="white" ';
            $svg .= 'transform="rotate(' . $rotate . ' ' . $x . ' ' . $y . ')">';
            $svg .= htmlspecialchars($char);
            $svg .= '</text>';
        }
        
        for ($i = 0; $i < 2; $i++) {
            $x1 = random_int(0, 30);
            $y1 = random_int(10, $this->height - 10);
            $x2 = random_int($this->width - 30, $this->width);
            $y2 = random_int(10, $this->height - 10);
            $cx1 = random_int(40, 70);
            $cy1 = random_int(0, $this->height);
            $cx2 = random_int(80, 110);
            $cy2 = random_int(0, $this->height);
            $opacity = random_int(30, 60) / 100;
            $svg .= '<path d="M' . $x1 . ',' . $y1 . ' C' . $cx1 . ',' . $cy1 . ' ' . $cx2 . ',' . $cy2 . ' ' . $x2 . ',' . $y2 . '" ';
            $svg .= 'fill="none" stroke="rgba(255,255,255,' . $opacity . ')" stroke-width="2"/>';
        }
        
        $svg .= '</svg>';
        
        return 'data:image/svg+xml;base64,' . base64_encode($svg);
    }
}

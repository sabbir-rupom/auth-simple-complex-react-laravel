<?php

use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;

if (!function_exists('slug')) {
    /**
     * Create slug from text (version 1)
     *
     * @param string $text
     * @return string
     */
    function slug(string $text): string
    {
        return Str::slug($text);
    }
}

if (!function_exists('generateVerifyCode')) {
    /**
     * Get random code as verfication code
     *
     * @param integer $length
     * @return integer
     */
    function generateVerifyCode(int $length): int
    {
        if ($length == 0) return 0;
        $min = pow(10, $length - 1);
        $max = (int) ($min - 1) . '9';
        return random_int($min, $max);
    }
}

if (!function_exists('generateNumber')) {
    /**
     * Generate fixed length random number
     *
     * @param integer $length
     * @return integer|string
     */
    function generateNumber(int $length = 8): int|string
    {
        $characters = '1234567890';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}

if (!function_exists('generateTrxNumber')) {
    /**
     * Generate fixed length transaction number
     *
     * @param integer $length
     * @param string $prefix
     * @return string
     */
    function generateTrxNumber(int $length = 12, string $prefix = ''): string
    {
        $characters = 'ABCDEFGHJKMNOPQRSTUVWXYZ123456789';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $prefix . $randomString;
    }
}

if (!function_exists('getAmount')) {
    /**
     * Get amount of fixed length precision
     *
     * @param float $amount
     * @param integer $length
     * @return float
     */
    function getAmount(float $amount, int $length = 2): float
    {
        $amount = round($amount, $length);
        return $amount + 0;
    }
}

if (!function_exists('removeElement')) {
    /**
     * Remove array element by value without changing index order
     *
     * @param array $arr
     * @param mixed $value
     * @return array
     */
    function removeElement(array $arr, $value): array
    {
        return array_diff($arr, (is_array($value) ? $value : array($value)));
    }
}

if (!function_exists('keyToTitle')) {
    /**
     * Key slug to title conversion
     *
     * @param string $text
     * @return string
     */
    function keyToTitle(string $text): string
    {
        return ucfirst(preg_replace("/[^A-Za-z0-9 ]/", ' ', $text));
    }
}

if (!function_exists('keyToTitle')) {
    /**
     * Title to key slug conversion
     *
     * @param string $text
     * @return string
     */
    function titleToKey(string $text): string
    {
        return strtolower(str_replace(' ', '_', $text));
    }
}

if (!function_exists('isTrue')) {
    /**
     * Check value is true or false
     *
     * @param any $value
     * @return bool
     */
    function isTrue($value): bool
    {
        if (is_string($value)) {
            $value = trim($value);
            return  in_array($value, ['1', 'true', 'ok', 'on']);
        } else if (is_bool($value)) {
            return $value;
        } else if (is_numeric($value)) {
            return intval($value) > 0;
        } elseif (is_array($value)) {
            return count($value) > 0;
        } else {
            return false;
        }
    }
}

if (!function_exists('diffForHumans')) {
    /**
     * Return date/datetime difference from current time as human readable format
     *
     * @param string $date
     * @return string
     */
    function diffForHumans(string $date): string
    {
        $lang = session()->get('lang');
        Carbon::setlocale($lang);
        return Carbon::parse($date)->diffForHumans();
    }
}

if (!function_exists('showDateTime')) {
    /**
     * Translate date time with given format
     *
     * @param string $date
     * @param string $format
     * @return string
     */
    function showDateTime(string $date, string $format = 'Y-m-d h:i A'): string
    {
        $lang = session()->get('lang');
        Carbon::setlocale($lang);
        return Carbon::parse($date)->translatedFormat($format);
    }
}

if (!function_exists('showMobileNumber')) {
    /**
     * Get mobile number with hidden asteriks
     *
     * @param string|integer $number
     * @return string
     */
    function showMobileNumber(string|int $number): string
    {
        $length = strlen($number);
        return substr_replace($number, '***', 2, $length - 4);
    }
}

if (!function_exists('showEmailAddress')) {
    /**
     * Get email address with hidden asteriks
     *
     * @param string $email
     * @return string
     */
    function showEmailAddress(string $email): string
    {
        $endPosition = strpos($email, '@') - 1;
        return substr_replace($email, '***', 1, $endPosition);
    }
}

if (!function_exists('getRealIP')) {
    /**
     * Get real IP address of server request
     *
     * @return string
     */
    function getRealIP(): string
    {
        $ip = $_SERVER["REMOTE_ADDR"];
        //Deep detect ip
        if (filter_var(@$_SERVER['HTTP_FORWARDED'], FILTER_VALIDATE_IP)) {
            $ip = $_SERVER['HTTP_FORWARDED'];
        }
        if (filter_var(@$_SERVER['HTTP_FORWARDED_FOR'], FILTER_VALIDATE_IP)) {
            $ip = $_SERVER['HTTP_FORWARDED_FOR'];
        }
        if (filter_var(@$_SERVER['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP)) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        }
        if (filter_var(@$_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP)) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        }
        if (filter_var(@$_SERVER['HTTP_X_REAL_IP'], FILTER_VALIDATE_IP)) {
            $ip = $_SERVER['HTTP_X_REAL_IP'];
        }
        if (filter_var(@$_SERVER['HTTP_CF_CONNECTING_IP'], FILTER_VALIDATE_IP)) {
            $ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
        }
        if ($ip == '::1') {
            $ip = '127.0.0.1';
        }

        return $ip;
    }
}

if (!function_exists('slugify')) {
    /**
      * Create slug from text (version 2)
     *
     * @param string $string
     * @param integer $length
     * @return string
     */
    function slugify(string $string, int $length = 50):string
    {
        $length = $length < 5 ? 5 : $length;

        if (strlen($string) > $length) {
            $string = fewWords($string, $length);
        }

        $string = preg_replace('/\s+/', ' ', strtolower($string));

        return trim(str_replace(' ', '-', $string));
    }
}

if (!function_exists('fewWords')) {
    /**
     * Get 1st n characters of words
     *
     * @param string $message Original message text
     * @param integer $K Number of characters
     * @return string Truncated words
     */
    function fewWords(string $message, int $K = 20, string $postFix = '')
    {

        if ($K < 1) {
            return '';
        }

        if (strlen($message) <= $K) {
            return trim($message);
        }

        if ($message[$K] === " ") {
            return trim(substr($message, 0, $K));
        }

        while ($message[--$K] !== ' ');

        return trim(substr($message, 0, $K)) . $postFix;
    }
}

if (!function_exists('hex2rgb')) {
    /**
     * Hex color code to RGB code conversion
     *
     * @param string $color
     * @return string
     */
    function hex2rgb($color): string
    {
        list($r, $g, $b) = sscanf($color, "#%02x%02x%02x");
        return "$r, $g, $b";
    }
}

if (!function_exists('callApi')) {
    /**
     * CURL POST request api call
     *
     * @param string $url
     * @param array|object|string $params
     * @return object|string|null
     */
    function callApi(string $url, $params)
    {
        $ch = curl_init(); // Initialize cURL
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($params),
            'accept:application/json'
        ));

        $response = curl_exec($ch);

        curl_close($ch);

        return $response;
    }
}

if (!function_exists('getCookie')) {
    /**
     * Get cookie data
     *
     * @param string $key
     * @param any $default
     * @return any
     */
    function getCookie(string $key, $default = null)
    {
        return Cookie::get($key, $default);
    }
}

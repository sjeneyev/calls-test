<?php

namespace App\Helpers;

use GuzzleHttp\Client as HttpClient;
use Illuminate\Support\Facades\DB;

class ApiHelper
{
    const IP_API_KEY = 'ed09e98ccc0c3f163c4d575a764f3629';

    public static function getContinentByIP(string $ip = '')//: string
    {
        if (empty($ip)) {
            return '';
        }
        $client = new HttpClient();
        $result = $client->request(
            'GET',
            'http://api.ipstack.com/' . $ip . '?access_key=' . self::IP_API_KEY);
        return json_decode($result->getBody(), true);
    }
}

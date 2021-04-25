<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\ApiHelper as Helper;
use Illuminate\Support\Facades\DB;

class CsvProcess extends Controller
{
    public $outputArray = [];
    public $idsArray = [];
    public $rowsArray = [];

    public function processFile(Request $request): string
    {
        if ($request->hasFile('import_file')) {
            $request->import_file->storeAs('files', 'data.csv');
            return $this->returnResponse(true);
        } else {
            return $this->returnResponse(false);
        }
    }

    public function getData(): string
    {
        $fileContent = $this->getFileContent();
        if (empty($fileContent)) {
            return $this->returnResponse(false);
        }
        $this->setExtendedData($fileContent);
        $this->processReport();
        return $this->returnResponse(true, $this->outputArray ?? '');
    }

    private function processReport()
    {
        $i = 0;
        $key_array = [];
        foreach ($this->rowsArray as $val) {
            if (!in_array($val[0], $key_array)) {
                $key_array[$i] = $val[0];
                $this->outputArray[$val[0]]['customer_id'] = $val[0];
                $this->outputArray[$val[0]]['total_local_calls'] = $this->isLocalCall($val) ? 1 : 0;
                $this->outputArray[$val[0]]['total_local_duration'] = $this->isLocalCall($val) ? (int)$val[2] : 0;
                $this->outputArray[$val[0]]['total_calls'] = 1;
                $this->outputArray[$val[0]]['total_duration'] = $val[2];
            } else {
                $this->outputArray[$val[0]]['total_local_calls'] = $this->isLocalCall($val) ?
                    $this->outputArray[$val[0]]['total_local_calls'] + 1 :
                    $this->outputArray[$val[0]]['total_local_calls'];
                $this->outputArray[$val[0]]['total_local_duration'] = $this->isLocalCall($val) ?
                    (int)$this->outputArray[$val[0]]['total_local_duration'] + $val[2] :
                    (int)$this->outputArray[$val[0]]['total_local_duration'];
                $this->outputArray[$val[0]]['total_calls']++;
                $this->outputArray[$val[0]]['total_duration'] += $val[2];
            }
            $i++;
        }
    }

    private function setExtendedData($data)
    {
        foreach ($data as &$row) {
            $cont = Helper::getContinentByIP($row[4]);
            $row[] = $cont['continent_code'];
        }
        $this->rowsArray = $data;
    }

    private function getFileContent(): array
    {
        $fileContent = [];
        if (($handle = fopen('../storage/app/files/data.csv', 'r')) !== FALSE) { // Check the resource is valid
            while (($data = fgetcsv($handle, 1000, "\n")) !== FALSE) { // Check opening the file is OK!
                $fileContent[] = explode(',', $data[0]);
            }
            fclose($handle);
        }
        return $fileContent;
    }

    private function isLocalCall($call): bool
    {
        $codes = $this->getContinentCodes($call[5]);
        foreach ($codes as $code) {
            if (empty($code)) {
                continue;
            }
            if (strpos((string)$call[3], (string)$code) === 0) {
                return true;
            }
        }
        return false;
    }

    private function getContinentCodes($cont)
    {
        return DB::table('countryinfo')->where('continent', '=', $cont)->whereNotNull('continent')->pluck('phone');
    }

    protected function returnResponse(bool $success, $data = ''): string
    {
        return @json_encode(['success' => $success, 'data' => $data]);
    }
}

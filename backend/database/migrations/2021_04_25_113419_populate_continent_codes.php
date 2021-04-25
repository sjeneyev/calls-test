<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateContinentCodes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (($handle = fopen('db_init.csv', 'r')) !== FALSE) { // Check the resource is valid

            while (($data = fgetcsv($handle, 1000, "\n")) !== FALSE) { // Check opening the file is OK!
                $fileContent[] = explode(',', $data[0]);
                $row = explode(',', $data[0]);

                DB::table('countryinfo')->insert([
                    'phone' => $row[12],
                    'continent' => $row[8]
                ]);
            }
            fclose($handle);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}

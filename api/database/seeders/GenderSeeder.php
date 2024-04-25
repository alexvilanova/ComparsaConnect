<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Gender;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Gender::create(['name' => 'Hombre']); 
        Gender::create(['name' => 'Mujer']);
        Gender::create(['name' => 'Prefiero no decirlo']);
    }
}
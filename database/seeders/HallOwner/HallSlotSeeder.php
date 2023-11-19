<?php

namespace Database\Seeders\HallOwner;

use App\Models\Tenant;
use App\Models\Hall;
use App\Models\HallSlot;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HallSlotSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run()
    {
        $hall = (new Hall())->first();

        $data = [
            [
                'hall_id' => $hall->id,
                'slot_name' => 'Wedding Evening Slot',
                'start_date' => date('Y') . '-01-01',
                'end_date' => date('Y') . '-12-31',
                'days' => [
                    "friday" => 1,
                    "monday" => 1,
                    "sunday" => 1,
                    "tuesday" => 1,
                    "saturday" => 1,
                    "thursday" => 1,
                    "wednesday" => 1
                ],
                'start_time' => '13:00:00',
                'end_time' => '16:00:00',
                'interval' => 0,
                'overnight' => false,
                'active' => true,
            ],
            [
                'hall_id' => $hall->id,
                'slot_name' => 'Wedding Night Slot',
                'start_date' => date('Y') . '-01-01',
                'end_date' => date('Y') . '-12-31',
                'days' => [
                    "friday" => 1,
                    "monday" => 1,
                    "sunday" => 1,
                    "tuesday" => 1,
                    "saturday" => 1,
                    "thursday" => 1,
                    "wednesday" => 1
                ],
                'start_time' => '16:00:00',
                'end_time' => '16:00:00',
                'interval' => 0,
                'overnight' => false,
                'active' => true,
            ],
        ];

        Tenant::all()->runForEach(function () use ($data) {
            foreach ($data as $key => $value) {
                (new HallSlot())->create($value);
            }
        });
    }
}

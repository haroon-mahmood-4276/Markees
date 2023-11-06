<?php

namespace App\Services\Tenants\HallSlots;

use App\Models\Tenants\HallSlot;
use App\Services\Tenants\HallSlots\HallSlotInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class HallSlotService implements HallSlotInterface
{

    private function model()
    {
        return new HallSlot();
    }

    public function get($hall_id, $relationships = [], $withCountRelationship = [], $onlyCount = false, $withTrashed = false, $onlyTrashed = false)
    {
        $query = $this->model()->where('hall_id', $hall_id);

        if ($withTrashed) {
            $query = $query->withTrashed();
        }

        if ($onlyTrashed) {
            $query = $query->onlyTrashed();
        }

        if (count($relationships) > 0) {
            $query = $query->with($relationships);
        }

        if (count($withCountRelationship) > 0) {
            $query = $query->withCount($withCountRelationship);
        }

        if ($onlyCount) {
            return $query->count();
        }

        return $query->get();
    }

    public function find($id, $relationships = [])
    {
        return $this->model()->with($relationships)->find($id);
    }

    public function store($hall_id, $inputs)
    {
        return DB::transaction(function () use ($hall_id, $inputs) {

            $overnigt = ($inputs['start_time'] > $inputs['end_time']);
            $dates  = explode('-', $inputs['date_range']);
            $start_date = Carbon::parse($dates[0]);

            $end_date = Carbon::parse(isset($dates[2]) ? $dates[2] : $dates[0]);

            if ($overnigt) {
                $end_date->addDay();
            }

            if ($inputs['end_time']) {
                $inputs['end_time'] = '23:59';
            }

            $data = [
                'hall_id' => $hall_id,
                'slot_name' => $inputs['slot_name'],
                'start_date' => $start_date,
                'end_date' => $end_date,
                'days' => $inputs['days'],
                'start_time' => $inputs['start_time'],
                'end_time' => $inputs['end_time'],
                'interval' => 0,
                'overnight' => $overnigt,
                'active' => $inputs['active'],
            ];

            $hallSlot = $this->model()->create($data);

            return $hallSlot;
        });
    }

    public function update($hall_id, $id, $inputs)
    {
        return DB::transaction(function () use ($hall_id, $id, $inputs) {

            $overnigt = ($inputs['start_time'] > $inputs['end_time']);
            $dates  = explode(' ', $inputs['date_range']);
            $start_date = Carbon::parse($dates[0]);

            $end_date = Carbon::parse(isset($dates[2]) ? $dates[2] : $dates[0]);

            if ($overnigt) {
                $end_date->addDay();
            }


            if ($inputs['end_time']) {
                $inputs['end_time'] = '23:59';
            }

            $hallSlot = $this->model()->find($id);
            $data = [
                'slot_name' => $inputs['slot_name'],
                'start_date' => $start_date,
                'end_date' => $end_date,
                'days' => $inputs['days'],
                'start_time' => $inputs['start_time'],
                'interval' => 0,
                'end_time' => $inputs['end_time'],
                'overnight' => $overnigt,
                'active' => $inputs['active'],
            ];
            $hallSlot->update($data);

            return $hallSlot;
        });
    }

    public function destroy($hall_id, $id)
    {
        $returnData = DB::transaction(function () use ($id) {

            $hall = $this->model()->whereIn('id', $id)->get()->each(function ($hall) {
                $hall->delete();
            });

            return $hall;
        });

        return $returnData;
    }
}

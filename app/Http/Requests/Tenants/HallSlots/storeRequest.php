<?php

namespace App\Http\Requests\Tenants\HallSlots;

use App\Models\HallOwner\HallSlot;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class storeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return (new HallSlot())->rules;
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        // $this->merge([
        //     'short_label' => Str::slug($this->short_label),
        // ]);
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $dates  = explode(' ', $this->date_range);
        $start_date = Carbon::parse($dates[0]);

        $end_date = Carbon::parse(isset($dates[2]) ? $dates[2] : $dates[0]);

        if($this->end_time == '00:00')
        {
            $this->end_time = '23:59';
        }

        $validator->after(function ($validator) use ($start_date, $end_date) {
            if ((new Carbon($start_date))->diffInDays((new Carbon($end_date)), false) <= 0) {
                $validator->errors()->add('date_range', __('validation.gt.numeric', ['attribute' => 'start date', 'value' => 'end date']));
            }
        })->after(function ($validator) use ($start_date, $end_date) {
            $flag = 0;

            $slotData = (new HallSlot())
                ->where('hall_id', $this->hall_id)
                ->whereDate('end_date', '>=', $start_date)
                ->whereDate('start_date', '<=', $end_date)
                ->whereTime('end_time', '>=', $this->start_time)
                ->whereTime('start_time', '<=', $this->end_time)
                // ->dd();
                ->get();

                // dd($slotData);

            if ($slotData->count() > 0) {
                foreach ($slotData as $item) {
                    foreach ($item->days as $key => $value) {
                        if ($this->days[$key] && $value == $this->days[$key]) {
                            $flag = 1;
                            break;
                        }
                    }

                    if ($flag == 1) {
                        break;
                    }
                }

                if ($flag == 1) {
                    $validator->errors()->add('error', 'Slot creation error due to conflict with other slots');
                }
            }
        });
    }
}

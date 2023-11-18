<?php

use App\Models\Admin\{Role};
use App\Models\HallOwner\{HallType};
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\{Collection};

if (!function_exists('filter_strip_tags')) {

    function filter_strip_tags($field): string
    {
        return trim(strip_tags($field));
    }
}

if (!function_exists('encode_html_entities')) {

    function encode_html_entities($field): string
    {
        return trim(htmlentities($field));
    }
}

if (!function_exists('decode_html_entities')) {

    function decode_html_entities($field): string
    {
        return trim(html_entity_decode($field));
    }
}

if (!function_exists('numberToWords')) {

    function numberToWords($number): string
    {
        return (new NumberFormatter("en", NumberFormatter::SPELLOUT))->format($number);
    }
}

if (!function_exists('englishCounting')) {

    function englishCounting($number): string
    {
        $notation = '';
        switch ($number) {
            case 1:
                $notation = '1st';
                break;

            case 2:
                $notation = '2nd';
                break;

            case 3:
                $notation = '3rd';
                break;

            default:
                $notation = $number . 'th';
                break;
        }
        return $notation;
    }
}

if (!function_exists('getAllModels')) {
    function getAllModels($path = null): array
    {
        $Modelpath = ($path ?? app_path()) . "/Models";

        $out = [];
        $results = scandir($Modelpath);
        foreach ($results as $result) {
            //			dd($results);
            if ($result === '.' or $result === '..') continue;
            $filename = $Modelpath . '/' . $result;
            if (is_dir($filename)) {
                $out = array_merge($out, getAllModels($filename));
            } else {
                $out[] = substr($result, 0, -4);
            }
        }
        return $out;
    }
}

if (!function_exists('getTrashedDataCount')) {
    function getTrashedDataCount(): float|int
    {
        $trashed = [];
        foreach (getAllModels() as $model) {
            $models = app("App\Models\\" . $model);
            if (in_array('Illuminate\Database\Eloquent\SoftDeletes', class_uses($models))) {
                $trashed[] = $models->onlyTrashed()->count();
            } else {
                $trashed[] = 0;
            }
        }
        return array_sum($trashed);
    }
}

if (!function_exists('getTreeData')) {
    function getTreeData(collection $collectionData, $model, $getFromDB = false): array
    {
        $typesTmp = [];

        // $model = "\\App\\Models\\" . $model;
        $dbTypes = ($getFromDB ? $model::all() : $collectionData);

        foreach ($collectionData as $key => $row) {
            $typesTmp[] = $row;
            $typesTmp[$key]["tree"] = ($getFromDB ? getTypeParentTreeElequent($model, $row, $row->name, $collectionData, $dbTypes) : getTypeParentTreeCollection($row, $row->name, $collectionData));
        }

        return $typesTmp;
        // dd($typesTmp);
    }
}

if (!function_exists('getTypeParentTreeElequent')) {
    function getTypeParentTreeElequent($model, $row, $name, collection $parent, $dbTypes)
    {
        if ($row->parent_id == 0) {
            return $name;
        }

        $nextRow = $model::find($row->parent_id);
        $name = $nextRow->name . ' > ' . $name;

        return getTypeParentTreeElequent($model, $nextRow, $name, $parent, $dbTypes);
    }
}

if (!function_exists('getTypeParentTreeCollection')) {
    function getTypeParentTreeCollection($row, $name, collection $parent): string
    {
        if ($row->parent_id == 0) {
            return $name;
        }

        $nextRow = $parent->firstWhere('id', $row->parent_id);
        $name = (is_null($nextRow) ?? empty($nextRow) ? '' : $nextRow->name) . ' > ' . $name;
        if (is_null($nextRow) ?? empty($nextRow)) {
            return $name;
        }

        return getTypeParentTreeCollection($nextRow, $name, $parent, $parent);
    }
}

if (!function_exists('getLinkedTreeData')) {
    function getLinkedTreeData(Model $model, $id = [])
    {
        $id = $model::whereIn('parent_id', $id)->get()->toArray();
        if (count($id) > 0) {
            return array_merge($id, getLinkedTreeData($model, array_column($id, 'id')));
        }
        return $id;
    }
}

if (!function_exists('getRoleParentByParentId')) {
    function getRoleParentByParentId($parent_id)
    {
        $role =  (new Role())->where('id', $parent_id)->first();
        if ($role) {
            return $role->name;
        }
        return 'parent';
    }
}

if (!function_exists('getNHeightestNumber')) {
    function getNHeightestNumber($numberOfDigits = 1)
    {
        return (int)str_repeat('9', $numberOfDigits);
    }
}

if (!function_exists('apiErrorResponse')) {
    function apiErrorResponse($message = 'data not found', $key = 'error', $code = 400, $data = null)
    {
        return response()->json(
            [
                'status' => false,
                'message' => [
                    $key => $message,
                ],
                'data' => $data,
                'status_code' => $code
            ],
            $code
        );
    }
}

if (!function_exists('apiSuccessResponse')) {
    function apiSuccessResponse($data = null, $message = 'data found', $key = 'success', $code = 200)
    {
        return response()->json(
            [
                'status' => true,
                'message' => [
                    $key => $message,
                ],
                'data' => $data,
                'status_code' => $code
            ],
            $code
        );
    }
}

if (!function_exists('sqlErrorMessagesByCode')) {
    function sqlErrorMessagesByCode($errCode)
    {
        $messages = [
            '1062' => 'Duplicate entry',
            '1452' => 'Cannot add or update a child row',
            '1451' => 'Cannot delete or update a parent row',
            '1364' => 'Field does not have a default value',
            '1048' => 'Column cannot be null',
            '1054' => 'Unknown column',
            '1052' => 'Column in where clause is ambiguous',
            '1051' => 'Unknown table',
            '1050' => 'Table already exists',
            '1046' => 'No database selected',
            '1045' => 'Access denied for user',
            '1044' => 'Access denied for user',
            '1042' => 'Cannot get hostname for your address',
            '1040' => 'Too many connections',
            '1038' => 'Out of sort memory, consider increasing server sort buffer size',
            '1036' => 'Table is read only',
            '1035' => 'CRASHED ON USAGE',
            '1034' => 'CRASHED ON REPAIR',
            '1033' => 'Out of memory; restart server and try again (needed 98304 bytes)',
            '23505' => 'Data already exists',
        ];
        return $messages[$errCode] ?? 'Unknown error';
    }
}

if (!function_exists('actionLog')) {
    function actionLog($logName, $causedByModel, $performedOnModel, $log, $properties = [], $event = '')
    {
        return activity()
            ->causedBy($causedByModel)
            ->performedOn($performedOnModel)
            ->inLog($logName)
            ->event($event)
            ->withProperties($properties)
            ->log($log);
    }
}

if (!function_exists('getIconDirection')) {
    function getIconDirection($direction)
    {
        if ($direction == 'ltr')
            return 'right';
        else
            return 'left';
    }
}

if (!function_exists('getHallTypeParentByParentId')) {
    function getHallTypeParentByParentId($parent_id)
    {
        $hallType = (new HallType())->where('id', $parent_id)->first();
        if ($hallType) {
            return $hallType->name;
        }
        return 'parent';
    }
}

<?php

namespace Modules\Simple\Services;

use Illuminate\Support\Collection;
use Modules\Simple\Entities\Item;

class ItemService
{
    public function getHeads(): Collection
    {
        $heads = [];
        foreach (Item::HEADS as $k => $v) {
            $heads[] = [
                'id' => $k,
                'value' => $v
            ];
        }
        return collect($heads);
    }

    public function getItems(string $search = null): Collection
    {
        $itemQuery = Item::select('name', 'head', 'status', 'code', 'id');

        if ($search) {
            $itemQuery = $itemQuery->where('name', 'like', "%{$search}%")
                ->orWhere('code', 'like', "%{$search}%");
        }

        return $itemQuery->get();
    }
}

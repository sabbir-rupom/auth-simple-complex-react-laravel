<?php

namespace Modules\Simple\Http\Controllers;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Simple\Entities\Item;
use Modules\Simple\Http\Requests\StoreItemRequest;
use Modules\Simple\Http\Requests\UpdateItemRequest;
use Modules\Simple\Services\ItemService;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ItemController extends Controller
{

    /**
     * Get list of items
     *
     * @return Responsable
     */
    public function index(Request $request)
    {
        $term = $request->term ?? null;
        $items = (new ItemService)->getItems(
            is_string($term) ? $term : ''
        );

        return response()->json([
            'result' => true,
            'message' => count($items) <= 0 ? 'No item found' : 'Item fetched successfully',
            'data' => $items
        ]);
    }

    /**
     * Get item head array list
     *
     * @return Responsable
     */
    public function itemHeads() {
        return response()->json([
            'result' => true,
            'message' => 'Item heads fetched successfully',
            'data' => (new ItemService)->getHeads()
        ]);

    }

    /**
     * Store new item
     *
     * @param StoreItemRequest $request
     * @return Responsable
     */
    public function store(StoreItemRequest $request)
    {
        $item = Item::create([
            'name' => $request->name,
            'code' => $request->code,
            'head' => $request->head,
            'status' => boolval($request->status),
        ]);

        return response()->json([
            'result' => true,
            'message' => 'Item stored successfully',
            'data' => $item
        ]);
    }

    /**
     * Get the specified item
     *
     * @param Item $item
     * @return Responsable
     */
    public function show(Item $item)
    {
        return response()->json([
            'result' => true,
            'message' => 'Item fetched successfully',
            'data' => $item
        ]);
    }

    /**
     * Update the specified item
     *
     * @param UpdateItemRequest $request
     * @param Item $item
     * @return Responsable
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        $item->name = $request->name;
        $item->code = $request->code;
        $item->head = $request->head;
        $item->status = boolval($request->status);
        $item->save();

        return response()->json([
            'result' => true,
            'message' => 'Item updated successfully',
            'data' => $item
        ]);
    }

    /**
     * Remove the specified item
     *
     * @param Item $item
     * @return Responsable
     * @throws NotFoundHttpException If specifed item is unavailable
     */
    public function destroy(Item $item)
    {
        if($item->id) {
            $item->delete();
        } else {
            throw new NotFoundHttpException('Item not found');
        }

        return response()->json([
            'result' => true,
            'message' => 'Item deleted successfully',
        ]);
    }
}

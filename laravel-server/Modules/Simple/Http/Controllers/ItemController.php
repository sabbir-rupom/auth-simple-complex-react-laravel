<?php

namespace Modules\Simple\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Simple\Entities\Item;
use Modules\Simple\Http\Requests\StoreItemRequest;
use Modules\Simple\Http\Requests\UpdateItemRequest;
use Modules\Simple\Services\ItemService;

class ItemController extends Controller
{

    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index(Request $request)
    {
        $term = $request->term ?? null;
        $items = (new ItemService)->getItems(
            is_string($term) ? $term : ''
        );

        return response()->json([
            'message' => count($items) <= 0 ? 'No item found' : 'Item fetched successfully',
            'items' => $items
        ]);
    }

    public function itemHeads() {
        return response()->json([
            'message' => 'Item heads fetched successfully',
            'heads' => (new ItemService)->getHeads()
        ]);

    }

    /**
     * Store a newly created resource in storage.
     * @param StoreItemRequest $request
     * @return Renderable
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
            'message' => 'Item stored successfully',
            'item' => $item
        ]);
    }

    /**
     * Show the specified resource.
     * @param Item $item
     * @return Renderable
     */
    public function show(Item $item)
    {
        return response()->json([
            'message' => 'Item fetched successfully',
            'item' => $item
        ]);
    }

    /**
     * Update the specified resource in storage.
     * @param UpdateItemRequest $request
     * @param Item $item
     * @return Renderable
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        $item->name = $request->name;
        $item->code = $request->code;
        $item->head = $request->head;
        $item->status = boolval($request->status);
        $item->save();

        return response()->json([
            'message' => 'Item updated successfully',
            'item' => $item
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * @param Item $item
     * @return Renderable
     */
    public function destroy(Item $item)
    {
        if($item->id) {
            $item->delete();
        }

        return response()->json([
            'message' => 'Item deleted successfully',
        ]);
    }
}

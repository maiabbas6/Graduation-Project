<?php

namespace App\Http\Controllers;

use App\Http\Requests\Section\CreateSectionRequest;
use App\Http\Requests\Section\DeleteSectionRequest;
use App\Http\Requests\Section\IndexSectionRequest;
use App\Http\Requests\Section\ShowSectionRequest;
use App\Http\Requests\Section\UpdateSectionRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\SectionResource;
use App\Models\Section;


class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexSectionRequest $request)
    {
        return $this->success(SectionResource::collection(Section::withCount(['employees'])->get()));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateSectionRequest $request)
    {
        $section = Section::create($request->validated());
        return $this->success($section, 'created', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowSectionRequest $request, Section $section)
    {
        return $this->success($section);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSectionRequest $request, Section $section)
    {
        $section->update($request->validated());
        return $this->success($section, 'updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteSectionRequest $request, Section $section)
    {
        $section->delete();
        return $this->success(null, 'deleted');
    }


    // TODO add request & permissions
    public function employees(Section $section){
        return $this->success(EmployeeResource::collection($section->employees()->with(['user','attatchments'])->get()));
    }

}

<?php

namespace App\Services;

use App\Models\Attatchment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

class AttatchmentService
{
    /**
     * Store uploaded files as polymorphic attachments on the given model.
     *
     * Each file is persisted with a unique name under the public disk and the
     * resulting "storage/..." path is saved via the HasAttatchment relation.
     *
     * @param  array<int, UploadedFile>  $files
     * @return Collection<int, Attatchment>
     */
    public static function store(Model $model, array $files, string $directory = 'attatchments'): Collection
    {
        $paths = [];

        foreach ($files as $file) {
            if (! $file instanceof UploadedFile || ! $file->isValid()) {
                continue;
            }

            $name = md5(uniqid('attatchment', true)).'.'.$file->getClientOriginalExtension();
            $path = $file->storeAs($directory, $name, 'public');

            $paths[] = ['path' => 'storage/'.$path];
        }

        if ($paths === []) {
            return collect();
        }

        return $model->attatchments()->createMany($paths);
    }
}

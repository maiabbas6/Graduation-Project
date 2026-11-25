<?php

namespace App\Jobs;

use App\Models\SystemLog;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Auth;

class SystemLogJob implements ShouldQueue
{
    use Queueable;


    private $data;
    /**
     * Create a new job instance.
     */
    public function __construct($data )
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        SystemLog::create($this->data);
    }
}

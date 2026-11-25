<?php

namespace App\Jobs;

use App\Models\User;
use App\Services\OtpService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class OtpJob implements ShouldQueue
{
    use Queueable;

    private User $user;
    private string $otp;

    /**
     * Create a new job instance.
     */
    public function __construct(User $user, string $otp)
    {
        $this->user = $user;
        $this->otp = $otp;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        OtpService::send($this->user, $this->otp);
    }
}

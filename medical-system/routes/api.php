<?php

use App\Http\Controllers\AiController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\CostController;
use App\Http\Controllers\UserCostController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AttendancesController;
use App\Http\Controllers\RoomServiceController;
use App\Http\Controllers\RoomServiceUserController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\SystemLogController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MedicalPlanController;
use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RoomUserController;
use App\Http\Controllers\ExportController;
use App\Jobs\OtpJob;
use App\Models\User;
use App\Services\OtpService;
use Illuminate\Support\Facades\Auth;

Route::middleware('throttle:5,1')->prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']); // OTP
});


Route::get('test-otp',function (){
    OtpJob::dispatch(User::findOrFail(4),'000000');
});
Route::middleware('auth:sanctum')->group(function () {


    Route::middleware('throttle:5,1')->prefix('auth')->group(function () {

    Route::get('profile', [AuthController::class, 'profile']);
    });

    Route::apiResource('sections', SectionController::class);

    Route::get('sections/{section}/employees', [SectionController::class, 'employees']);

    Route::apiResource('employees', EmployeeController::class);
    Route::get('employees/{employee}/available-slots', [EmployeeController::class, 'getAvailableSlots']);
    Route::get('employees/{employee}/attendance-schedule-diff', [EmployeeController::class, 'attendanceScheduleDiff']);
    Route::get('employees/{employee}/attendances', [EmployeeController::class, 'attendances']);

    Route::apiResource('appointments', AppointmentController::class);

    Route::get('appointments-next', [AppointmentController::class, 'nextAppointment']);

    Route::post('appointments-close', [AppointmentController::class,'close']);

    Route::apiResource('medical-records', MedicalRecordController::class);

    Route::apiResource('medical-plans', MedicalPlanController::class);

    Route::apiResource('schedules', ScheduleController::class);

    Route::apiResource('attendances', AttendancesController::class);

    Route::get('employee/clients',[EmployeeController::class,'getClients']);



    Route::apiResource('user',UserController::class)->only(['index','show','update','destroy']);

    Route::apiResource('system-logs',SystemLogController::class)->only(['index','show']);

    Route::apiResource('notifications', NotificationController::class)->only(['index']);


    Route::apiResource('rooms', RoomController::class);

    Route::apiResource('room-services', RoomServiceController::class);

    Route::apiResource('room-service-users', RoomServiceUserController::class);
    Route::patch('room-service-users/{roomServiceUser}/status', [RoomServiceUserController::class, 'changeStatus']);

    Route::apiResource('room-users', RoomUserController::class);

    Route::post('new-chat',[AiController::class,'newChat']);
    Route::post('message-chat/{ai_chat}',[AiController::class,'sendMessage']);

    Route::apiResource('ai_chat', AiController::class)->only(['index','show']);


    Route::prefix('statistics')->controller(StatisticsController::class)->group(function (){
        Route::get('/','index');
        Route::get('/employees','employees');
        Route::get('/appointments','appointmentsStatistics');
        Route::get('/clients','clientsStatistics');
        Route::get('/top-employees','topEmployees');
        Route::get('/export-pdf','exportStatistics');
    });

    Route::apiResource('costs', CostController::class);
    Route::patch('costs/{cost}/pay', [CostController::class, 'markAsPaid']);
    Route::patch('costs/{cost}/unpay', [CostController::class, 'markAsUnpaid']);
    Route::get('costs/{cost}/export-pdf', [CostController::class, 'exportBill']);

    Route::prefix('my-costs')->controller(UserCostController::class)->group(function () {
        Route::get('/', 'index');
        Route::get('/summary', 'summary');
        Route::get('/{cost}', 'show');
    });

    Route::get('my-medical-plans', [MedicalPlanController::class, 'myMedicalPlans']);

    Route::get('users/{user}/medical-report/pdf', [ExportController::class, 'exportUserMedicalReport']);





});

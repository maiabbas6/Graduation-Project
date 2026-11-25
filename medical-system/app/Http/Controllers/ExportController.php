<?php

namespace App\Http\Controllers;

use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;

class ExportController extends Controller
{
    public function exportUserMedicalReport(User $user)
    {
        $user->load('medicalRecords.employee.user', 'medicalRecords.medicalPlans.employee');

        $medicalRecords = $user->medicalRecords()->orderByDesc('date')->get();

        $pdf = Pdf::loadView('exports.user-medical-report', [
            'user' => $user,
            'medicalRecords' => $medicalRecords,
        ]);

        $safeName = preg_replace('/[^a-zA-Z0-9\-]/', '-', $user->first_name . '-' . $user->last_name);
        $fileName = 'medical-report-' . $safeName . '.pdf';

        return $pdf->download($fileName);
    }
}

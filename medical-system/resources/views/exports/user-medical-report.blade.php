<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Medical Report - {{ $user->first_name }} {{ $user->last_name }}</title>
    <style>
        body { font-family: sans-serif; margin: 40px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #2563eb; margin: 0; font-size: 28px; }
        .header p { color: #666; margin: 5px 0 0; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #2563eb; font-size: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px; }
        .section h3 { color: #1e40af; font-size: 15px; margin: 20px 0 10px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        table th, table td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        table th { background-color: #f3f4f6; color: #374151; font-weight: bold; width: 35%; }
        table td { color: #1f2937; }
        .record-card { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 15px; }
        .record-card h3 { margin-top: 0; }
        .plan-item { background-color: #eff6ff; border-left: 3px solid #2563eb; padding: 10px 15px; margin-bottom: 10px; border-radius: 0 6px 6px 0; }
        .plan-item .plan-title { font-weight: bold; color: #1e40af; margin-bottom: 4px; }
        .plan-item .plan-desc { color: #4b5563; font-size: 14px; }
        .badge { display: inline-block; padding: 2px 10px; border-radius: 10px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
        .badge-type { background-color: #dbeafe; color: #1e40af; }
        .no-data { color: #9ca3af; font-style: italic; }
        .footer { margin-top: 40px; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 15px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Medical System</h1>
        <p>Patient Medical Report</p>
    </div>

    <div class="section">
        <h2>Patient Information</h2>
        <table>
            <tr>
                <th>Full Name</th>
                <td>{{ $user->first_name }} {{ $user->last_name }}</td>
            </tr>
            <tr>
                <th>Phone</th>
                <td>{{ $user->phone ?? 'N/A' }}</td>
            </tr>
            <tr>
                <th>Gender</th>
                <td>{{ ucfirst($user->gender ?? 'N/A') }}</td>
            </tr>
            <tr>
                <th>Date of Birth</th>
                <td>{{ $user->birth?->format('M d, Y') ?? 'N/A' }}</td>
            </tr>
            <tr>
                <th>Address</th>
                <td>{{ $user->address ?? 'N/A' }}</td>
            </tr>
            <tr>
                <th>Total Records</th>
                <td>{{ $medicalRecords->count() }}</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <h2>Medical Records</h2>

        @forelse($medicalRecords as $record)
            <div class="record-card">
                <h3>
                    Record #{{ $record->id }}
                    <span class="badge badge-type">{{ $record->type }}</span>
                </h3>
                <table>
                    <tr>
                        <th>Date</th>
                        <td>{{ $record->date?->format('M d, Y') ?? 'N/A' }}</td>
                    </tr>
                    <tr>
                        <th>Doctor</th>
                        <td>{{ trim(($record->employee?->user?->first_name ?? '').' '.($record->employee?->user?->last_name ?? '')) ?: 'N/A' }}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{{ $record->description }}</td>
                    </tr>
                </table>

                @if($record->medicalPlans->count())
                    <h3>Treatment Plans</h3>
                    @foreach($record->medicalPlans as $plan)
                        <div class="plan-item">
                            <div class="plan-title">{{ $plan->title }}</div>
                            <div class="plan-desc">{{ $plan->description }}</div>
                        </div>
                    @endforeach
                @endif
            </div>
        @empty
            <p class="no-data">No medical records found for this patient.</p>
        @endforelse
    </div>

    <div class="footer">
        <p>This is a computer-generated report. No signature is required.</p>
        <p>Generated on {{ now()->format('M d, Y H:i:s') }}</p>
    </div>
</body>
</html>

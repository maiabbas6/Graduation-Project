<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bill #{{ $cost->id }}</title>
    <style>
        body { font-family: sans-serif; margin: 40px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #2563eb; margin: 0; font-size: 28px; }
        .header p { color: #666; margin: 5px 0 0; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #2563eb; font-size: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        table th, table td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        table th { background-color: #f3f4f6; color: #374151; font-weight: bold; width: 40%; }
        table td { color: #1f2937; }
        .total-box { background-color: #eff6ff; border: 2px solid #2563eb; border-radius: 8px; padding: 20px; text-align: right; margin-top: 30px; }
        .total-box .label { font-size: 16px; color: #4b5563; }
        .total-box .amount { font-size: 28px; font-weight: bold; color: #2563eb; }
        .status { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
        .status-paid { background-color: #dcfce7; color: #166534; }
        .status-unpaid { background-color: #fee2e2; color: #991b1b; }
        .footer { margin-top: 40px; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 15px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Medical System</h1>
        <p>Bill / Invoice</p>
    </div>

    <div class="section">
        <h2>Bill Information</h2>
        <table>
            <tr>
                <th>Bill ID</th>
                <td>#{{ $cost->id }}</td>
            </tr>
            <tr>
                <th>Date Issued</th>
                <td>{{ $cost->created_at->format('M d, Y H:i') }}</td>
            </tr>
            <tr>
                <th>Status</th>
                <td>
                    <span class="status status-{{ $cost->status }}">
                        {{ $cost->status }}
                    </span>
                </td>
            </tr>
            @if($cost->paid_at)
            <tr>
                <th>Paid At</th>
                <td>{{ $cost->paid_at->format('M d, Y H:i') }}</td>
            </tr>
            @endif
        </table>
    </div>

    <div class="section">
        <h2>Patient Information</h2>
        <table>
            <tr>
                <th>Name</th>
                <td>{{ $cost->user->name }}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>{{ $cost->user->email }}</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <h2>Service Details</h2>
        <table>
            <tr>
                <th>Description</th>
                <td>{{ $cost->description }}</td>
            </tr>
            @if($cost->appointment)
            <tr>
                <th>Appointment Type</th>
                <td>{{ $cost->appointment->type }}</td>
            </tr>
            <tr>
                <th>Appointment Date</th>
                <td>{{ $cost->appointment->appointment_date_time?->format('M d, Y H:i') ?? 'N/A' }}</td>
            </tr>
            @if($cost->appointment->appointment_closed_at)
            <tr>
                <th>Closed At</th>
                <td>{{ $cost->appointment->appointment_closed_at->format('M d, Y H:i') }}</td>
            </tr>
            @endif
            @endif
            @if($cost->roomServiceUser && $cost->roomServiceUser->roomService)
            <tr>
                <th>Room Service</th>
                <td>{{ $cost->roomServiceUser->roomService->name }}</td>
            </tr>
            @endif
        </table>
    </div>

    <div class="total-box">
        <div class="label">Total Amount</div>
        <div class="amount">${{ number_format($cost->amount, 2) }}</div>
    </div>

    <div class="footer">
        <p>This is a computer-generated bill. No signature is required.</p>
        <p>Generated on {{ now()->format('M d, Y H:i:s') }}</p>
    </div>
</body>
</html>

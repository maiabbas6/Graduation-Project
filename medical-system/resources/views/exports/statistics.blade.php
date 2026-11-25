<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>System Statistics</title>
    <style>
        body { font-family: sans-serif; margin: 40px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #2563eb; margin: 0; font-size: 28px; }
        .header p { color: #666; margin: 5px 0 0; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #2563eb; font-size: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        table th, table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        table th { background-color: #f3f4f6; color: #374151; font-weight: bold; }
        table td { color: #1f2937; text-align: center; }
        table td:first-child { text-align: left; font-weight: 500; }
        .count { font-size: 18px; font-weight: bold; color: #2563eb; }
        .footer { margin-top: 40px; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 15px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Medical System</h1>
        <p>System Statistics Report</p>
    </div>

    <div class="section">
        <h2>Overview</h2>
        <table>
            <tr>
                <th>Resource</th>
                <th>Total Count</th>
            </tr>
            @foreach($counts as $label => $value)
            <tr>
                <td>{{ ucwords(str_replace('_', ' ', $label)) }}</td>
                <td class="count">{{ $value }}</td>
            </tr>
            @endforeach
        </table>
    </div>

    <div class="footer">
        <p>This is a computer-generated report. No signature is required.</p>
        <p>Generated on {{ now()->format('M d, Y H:i:s') }}</p>
    </div>
</body>
</html>

<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Employee;
use App\Models\Room;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    protected $model = Appointment::class;

    private static array $descriptions = [
        'Routine annual checkup. Patient reports no specific complaints. General physical examination performed. All vitals within normal range.',
        'Follow-up for hypertension management. Blood pressure check and medication review. Reviewing lifestyle modifications.',
        'Diabetes management follow-up. HbA1c check, foot examination, and medication adjustment. Diet consultation ordered.',
        'Prenatal visit. Fetal growth assessment, BP monitoring. Routine lab work ordered. Patient educated on warning signs.',
        'Follow-up for lumbar disc herniation. Physical therapy progress evaluation and pain assessment. Range of motion improved.',
        'Cardiology consultation. Patient reports occasional chest pain on exertion. ECG and stress test ordered.',
        'Follow-up for thyroid disorder. Review of recent lab results and medication dosage adjustment.',
        'Respiratory follow-up. SpO2 monitoring, pulmonary function assessment. Inhaler technique reviewed.',
        'Psychiatric follow-up for anxiety management. GAD-7 assessment and medication response evaluation.',
        'Well-child visit. Growth monitoring, developmental assessment, and routine vaccination update.',
        'Neurology follow-up for migraine management. Review headache diary and medication efficacy.',
        'URT infection symptoms: cough, sore throat, runny nose for 5 days. Throat exam shows mild erythema. Symptomatic treatment prescribed.',
        'Acute back pain assessment. Patient unable to work due to pain. Imaging ordered to rule out disc pathology.',
        'Pre-operative assessment for scheduled surgery. Lab work, ECG, and anesthesia consultation ordered.',
        'Post-operative follow-up. Wound healing well. Sutures removed. No signs of infection. Return to normal activities gradually.',
        'Skin rash evaluation. Pruritic erythematous rash on forearms and trunk. Diagnosed as contact dermatitis. Topical corticosteroid prescribed.',
        'Immunization visit. Administered seasonal influenza vaccine and tetanus booster. Patient advised about potential side effects.',
        'Abdominal pain workup. Epigastric tenderness on examination. Basic metabolic panel and abdominal ultrasound ordered.',
        'Eye examination. Patient reports blurred vision. Visual acuity tested. Referred for dilated fundus examination.',
        'Suspected urinary tract infection. Dysuria, frequency, urgency. Urinalysis ordered. Empirical antibiotics started.',
    ];

    private static array $types = ['consultation', 'follow-up', 'routine-check', 'urgent'];

    private static array $statuses = ['waiting', 'canceled', 'suspended', 'closed'];

    public function definition(): array
    {
        $isClosed = fake()->boolean(60);
        $appointmentDate = fake()->dateTimeBetween('-3 months', '+2 months');
        $closedDate = $isClosed
            ? Carbon::parse($appointmentDate)->addMinutes(fake()->numberBetween(15, 90))
            : null;

        $employee = Employee::inRandomOrder()->first() ?? Employee::factory()->create();

        return [
            'user_id' => User::factory()->client(),
            'employee_id' => $employee->user_id,
            'room_id' => fake()->boolean(70) ? Room::inRandomOrder()->first()?->id ?? Room::factory()->create()->id : null,
            'appointment_date_time' => $appointmentDate,
            'description' => fake()->randomElement(self::$descriptions),
            'type' => fake()->randomElement(self::$types),
            'status' => $isClosed ? 'closed' : fake()->randomElement(['waiting', 'canceled']),
            'appointment_closed_at' => $closedDate,
        ];
    }

    public function closed(): static
    {
        return $this->state(fn (array $attrs) => [
            'status' => 'closed',
            'appointment_closed_at' => Carbon::parse($attrs['appointment_date_time'] ?? 'now')
                ->addMinutes(fake()->numberBetween(15, 90)),
        ]);
    }

    public function waiting(): static
    {
        return $this->state(fn () => [
            'status' => 'waiting',
            'appointment_closed_at' => null,
        ]);
    }

    public function urgent(): static
    {
        return $this->state(fn () => [
            'type' => 'urgent',
            'appointment_date_time' => fake()->dateTimeBetween('-24 hours', '+24 hours'),
        ]);
    }

    public function forUser(User $user): static
    {
        return $this->state(fn () => ['user_id' => $user->id]);
    }

    public function forEmployee(Employee $employee): static
    {
        return $this->state(fn () => ['employee_id' => $employee->user_id]);
    }
}
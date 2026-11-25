<?php

namespace Database\Factories;

use App\Models\MedicalRecord;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MedicalRecordFactory extends Factory
{
    protected $model = MedicalRecord::class;

    private static array $diagnoses = [
        'Patient diagnosed with essential hypertension. BP: {bp}. Prescribed {med}. Lifestyle modifications advised including low-sodium diet and 30min daily exercise.',
        'HbA1c check results: {a1c}. Patient advised to follow a low-fat diet and exercise regularly. Continue current diabetic medications.',
        'Lipid panel shows elevated LDL at {ldl} mg/dL, HDL: {hdl} mg/dL. Started {statin}. Repeat labs in 3 months.',
        'Patient arrived with acute seasonal allergy symptoms: sneezing, watery eyes, nasal congestion. Administered antihistamines. Prescribed Cetirizine 10mg daily.',
        'Patient presents with acute lower back pain lasting {weeks} weeks. Pain radiates down {leg} leg. Positive straight leg raise test. MRI shows {disc} disc herniation. Prescribed NSAIDs and muscle relaxants. Physical therapy recommended.',
        'Diagnosed with Type 2 Diabetes Mellitus. HbA1c: {a1c2}%. Fasting glucose: {glucose} mg/dL. Started Metformin {dose}mg twice daily. Diabetes education provided. Referred to nutritionist.',
        'Thyroid panel results - TSH: {tsh} mIU/L, Free T4: {t4} ng/dL. Patient reports fatigue, weight changes. {thyroid_med} prescribed.',
        'Patient presents with generalized anxiety disorder symptoms: excessive worry, restlessness, difficulty concentrating, sleep disturbances. GAD-7 score: {gad}. Started {antidepressant}. Referred to psychotherapy.',
        'Complaints of heartburn and regurgitation for {months} months, worse after meals and lying down. Diagnosed with GERD. Started Omeprazole 20mg daily. Lifestyle modifications advised.',
        'Acute otitis media diagnosed. Tympanic membrane erythematous and bulging. Prescribed antibiotics for 10 days. Follow-up in 2 weeks.',
        'COPD exacerbation. Patient with {years} pack-year smoking history. Presents with dyspnea, cough, purulent sputum. SpO2: {spo2}% on room air. Chest X-ray shows hyperinflation. Treated with bronchodilators and corticosteroids.',
        'Routine prenatal visit - {trimester} trimester. Ultrasound {findings}. Fetal heart rate: {fhr} bpm. BP: {bp_preg}. All parameters within normal range.',
        'Follow-up visit: Patient shows significant improvement. Symptoms decreased from {before}/10 to {after}/10. Continue current treatment plan. Next visit in {months2} months.',
        'Patient presents with recurrent migraine headaches. Frequency: {freq} per month. Associated symptoms: photophobia, phonophobia, nausea. Started prophylactic medication.',
        'Vitamin D level: {vitd} ng/mL ({status}). Started Vitamin D3 {iu} IU daily. Sun exposure advised.',
    ];

    private static array $types = ['lab', 'radiology', 'treatment', 'consultation', 'diagnosis', 'follow-up', 'routine-check', 'urgent'];

    public function definition(): array
    {
        $template = fake()->randomElement(self::$diagnoses);

        $description = str_replace(
            ['{bp}', '{med}', '{a1c}', '{ldl}', '{hdl}', '{statin}', '{weeks}', '{leg}', '{disc}',
             '{a1c2}', '{glucose}', '{dose}', '{tsh}', '{t4}', '{thyroid_med}', '{gad}', '{antidepressant}',
             '{months}', '{years}', '{spo2}', '{trimester}', '{findings}', '{fhr}', '{bp_preg}',
             '{before}', '{after}', '{months2}', '{freq}', '{vitd}', '{status}', '{iu}'],
            [
                fake()->randomElement(['145/90 mmHg', '150/95 mmHg', '138/85 mmHg', '160/100 mmHg']),
                fake()->randomElement(['Lisinopril 10mg', 'Enalapril 5mg', 'Amlodipine 5mg', 'Losartan 50mg']),
                fake()->randomFloat(1, 6.5, 9.5) . '%',
                fake()->numberBetween(140, 190),
                fake()->numberBetween(32, 55),
                fake()->randomElement(['Atorvastatin 20mg', 'Rosuvastatin 10mg', 'Simvastatin 20mg']),
                fake()->numberBetween(1, 8),
                fake()->randomElement(['left', 'right', 'both']),
                fake()->randomElement(['L4-L5', 'L5-S1', 'L3-L4']),
                fake()->randomFloat(1, 6.5, 10.0) . '%',
                fake()->numberBetween(140, 220),
                fake()->randomElement(['500', '850', '1000']),
                fake()->randomFloat(1, 3.5, 15.0),
                fake()->randomFloat(1, 0.4, 1.2),
                fake()->randomElement(['Levothyroxine 50mcg', 'Levothyroxine 75mcg', 'Levothyroxine 100mcg']),
                fake()->numberBetween(10, 21),
                fake()->randomElement(['Sertraline 50mg', 'Fluoxetine 20mg', 'Escitalopram 10mg']),
                fake()->numberBetween(1, 6),
                fake()->numberBetween(15, 50),
                fake()->numberBetween(85, 94),
                fake()->randomElement(['first', 'second', 'third']),
                fake()->randomElement(['shows single intrauterine pregnancy', 'normal fetal anatomy', 'appropriate fetal growth']),
                fake()->numberBetween(120, 170),
                fake()->randomElement(['118/76 mmHg', '122/78 mmHg', '110/70 mmHg']),
                fake()->numberBetween(5, 9),
                fake()->numberBetween(1, 4),
                fake()->numberBetween(1, 6),
                fake()->numberBetween(2, 8),
                fake()->numberBetween(12, 28),
                fake()->randomElement(['deficient', 'insufficient', 'low normal']),
                fake()->randomElement(['2000', '3000', '5000']),
            ],
            $template
        );

        return [
            'user_id' => User::factory(),
            'employee_id' => null,
            'date' => fake()->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
            'description' => $description,
            'type' => fake()->randomElement(self::$types),
        ];
    }

    public function lab(): static
    {
        return $this->state(fn () => ['type' => 'lab']);
    }

    public function diagnosis(): static
    {
        return $this->state(fn () => ['type' => 'diagnosis']);
    }

    public function followUp(): static
    {
        return $this->state(fn () => ['type' => 'follow-up']);
    }

    public function ofUser(User $user): static
    {
        return $this->state(fn () => ['user_id' => $user->id]);
    }
}
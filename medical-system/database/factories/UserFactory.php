<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    private static array $firstNamesMale = [
        'Ahmad', 'Mohammad', 'Omar', 'Khaled', 'Tarek', 'Samer', 'Hassan', 'Rami',
        'Fadi', 'Hamza', 'Majd', 'Youssef', 'Nadim', 'Ziad', 'Karem', 'Wael',
        'Sami', 'Bilal', 'Anas', 'Mahmoud', 'Firas', 'Bassam', 'Ghiath', 'Kinani',
        'Ibrahim', 'Nabil', 'Osama', 'Walid', 'Hazem', 'Yasser', 'Eyas', 'Louai',
    ];

    private static array $firstNamesFemale = [
        'Sara', 'Layla', 'Nour', 'Huda', 'Mariam', 'Rana', 'Dima', 'Lina',
        'Amal', 'Reem', 'Maya', 'Rania', 'Kinda', 'Zeina', 'Nisrine', 'Yara',
        'Boushra', 'Hala', 'Salma', 'Rola', 'Jude', 'Tala', 'Seba', 'Lujain',
        'Razan', ' Farah', 'Ghalia', 'Mouna', 'Aya', 'Dana', 'Marwa', 'Leen',
    ];

    private static array $lastNames = [
        // Traditional & Geographic Surnames
        'Al-Chami', 'Al-Attar', 'Al-Hamwi', 'Al-Homsi', 'Al-Khatib', 'Mardini',
        'Al-Halabi', 'Al-Midani', 'Al-Jazairi', 'Al-Bitar', 'Al-Hakim', 'Al-Nouri',
        'Al-Qabbani', 'Al-Haddad', 'Al-Aqqad', 'Al-Sioufi', 'Al-Jaban', 'Al-Kasm',

        // Common Family Surnames
        'Khalil', 'Hassan', 'Youssef', 'Zaydan', 'Saleh', 'Mahmoud', 'Diab',
        'Fares', 'Naim', 'Shahin', 'Aziz', 'Malik', 'Sleiman', 'Sabbagh',
        'Khoury', 'Tarabichi', 'Barakat', 'Rifai', 'Bizri', 'Tello', 'Safadi',
        'Hariri', 'Zoubi', 'Nahhas', 'Lahham', 'Koussa', 'Samman', 'Bakkour',
    ];

    private static array $addresses = [
        'Al-Mazzah, Damascus', 'Al-Malki, Damascus', 'Al-Midan, Damascus',
        'Baramkeh, Damascus', 'Al-Rabwah, Damascus', 'Dummar, Damascus',
        'Qaboun, Damascus', 'Kafr Sousa, Damascus', 'Bab Sharqi, Damascus',
        'Al-Mazzeh, Damascus', 'Harasta, Damascus', 'Jaramana, Damascus',
        'Al-Qanawat, Damascus', 'Al-Salihiya, Damascus', 'Rukn al-Din, Damascus',
    ];

    protected static ?string $password;

    public function definition(): array
    {
        $gender = fake()->randomElement(['male', 'female']);

        return [
            'first_name' => fake()->randomElement($gender == 'male' ? self::$firstNamesMale :self::$firstNamesFemale ),
            'last_name' => fake()->randomElement(self::$lastNames),
            'phone' => '09' . fake()->numerify('########'),
            'birth' => fake()->dateTimeBetween('-70 years', '-18 years')->format('Y-m-d'),
            'gender' => $gender,
            'address' => fake()->randomElement(self::$addresses),
            'password' => static::$password ??= Hash::make('12345678'),
        ];
    }

    public function male(): static
    {
        return $this->state(fn () => [
            'first_name' => fake()->randomElement(self::$firstNamesMale),
        ]);
    }

    public function female(): static
    {
        return $this->state(fn () => [
            'first_name' => fake()->randomElement(self::$firstNamesFemale),
        ]);
    }

    public function elderly(): static
    {
        return $this->state(fn () => [
            'birth' => fake()->dateTimeBetween('-80 years', '-60 years')->format('Y-m-d'),
        ]);
    }

    public function adult(): static
    {
        return $this->state(fn () => [
            'birth' => fake()->dateTimeBetween('-59 years', '-18 years')->format('Y-m-d'),
        ]);
    }

    public function child(): static
    {
        return $this->state(fn () => [
            'birth' => fake()->dateTimeBetween('-17 years', '-1 year')->format('Y-m-d'),
        ]);
    }

    public function doctor(): static
    {
        return $this->state(fn () => [
            'birth' => fake()->dateTimeBetween('-60 years', '-25 years')->format('Y-m-d'),
        ]);
    }

    public function client(): static
    {
        return $this->state(fn () => [
            'birth' => fake()->dateTimeBetween('-70 years', '-18 years')->format('Y-m-d'),
        ]);
    }
}

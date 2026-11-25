<?php

namespace App\Support;

class MedicalData
{
    private static ?array $sections = null;

    /**
     * Load and normalize resources/data/medical_data.php.
     *
     * Duplicate section entries (e.g. "General Surgery" appears twice) are
     * merged into a single section with summed weight and combined diseases.
     */
    public static function sections(): array
    {
        if (self::$sections !== null) {
            return self::$sections;
        }

        $entries = require resource_path('data/medical_data.php');
        $merged = [];

        foreach ($entries as $entry) {
            $name = $entry['name'];

            if (! isset($merged[$name])) {
                $merged[$name] = [
                    'name' => $name,
                    'weight' => 0,
                    'diseases' => [],
                ];
            }

            $merged[$name]['weight'] += $entry['weight'];

            foreach ($entry['diseases'] as $disease) {
                $merged[$name]['diseases'][] = $disease;
            }
        }

        return self::$sections = array_values($merged);
    }

    public static function sectionNames(): array
    {
        return array_column(self::sections(), 'name');
    }

    public static function diseasesFor(string $sectionName): array
    {
        foreach (self::sections() as $section) {
            if ($section['name'] === $sectionName) {
                return $section['diseases'];
            }
        }

        return [];
    }

    /**
     * Pick a section biased by its weight. Higher-weight sections are chosen
     * more often, so they get more patients in the seed data.
     */
    public static function weightedSection(): array
    {
        $sections = self::sections();
        $total = array_sum(array_column($sections, 'weight'));

        $rand = random_int(1, max(1, $total));
        $cursor = 0;

        foreach ($sections as $section) {
            $cursor += $section['weight'];
            if ($rand <= $cursor) {
                return $section;
            }
        }

        return $sections[0];
    }
}

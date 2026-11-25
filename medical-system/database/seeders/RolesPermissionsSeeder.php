<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesPermissionsSeeder extends Seeder
{
    /**
     * API resources exposed by routes/api.php.
     *
     * Each resource gets a full CRUD permission set
     * (index, show, store, update, delete).
     */
    private array $resources = [
        'user',
        'appointment',
        'medical_record',
        'section',
        'employee',
        'schedule',
        'attendances',
        'room',
        'room_service',
        'room_service_user',
        'ai_chat',
        'system_log',
        'statistics',
        'medical_plan',
        'cost',
        'notification',
        'room_user',
    ];

    private array $actions = ['index', 'show', 'store', 'update', 'delete', 'export'];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->createPermissions();
        $this->cleanupStalePermissions();

        $this->seedRole('admin', '*');

        $this->seedRole('client', [
            // browse available resources
            'section.index', 'section.show',
            'employee.index', 'employee.show',
            'room.index', 'room.show',
            'room_service.index', 'room_service.show',
            // manage own appointments
            'appointment.index', 'appointment.show', 'appointment.store', 'appointment.update', 'appointment.delete',
            // view own medical record / request room services
            'medical_record.show', 'medical_record.export',
            'room_service_user.store', 'room_service_user.show',
            // ai chat
            'ai_chat.index', 'ai_chat.show', 'ai_chat.store', 'ai_chat.update',
            // view own costs
            'cost.index', 'cost.show',
        ]);

        $this->seedRole('doctor', [
            'user.show',
            'section.index', 'section.show',
            'employee.index', 'employee.show',
            // manage patient appointments and medical records
            'appointment.index', 'appointment.show', 'appointment.store', 'appointment.update', 'appointment.delete',
            'medical_record.index', 'medical_record.show', 'medical_record.store', 'medical_record.update',
            'medical_plan.store',
            // own schedule and attendance
            'schedule.index', 'schedule.show', 'schedule.store', 'schedule.update', 'schedule.delete',
            'attendances.index', 'attendances.show', 'attendances.store', 'attendances.update',
            // room assignment
            'room.index', 'room.show', 'room.update',
            'room_service.index', 'room_service.show',
            'room_service_user.index', 'room_service_user.show', 'room_service_user.update',
            // ai chat
            'ai_chat.index', 'ai_chat.show', 'ai_chat.store', 'ai_chat.update',
        ]);

        $this->seedRole('nurse', [
            'user.show',
            'section.index', 'section.show',
            'employee.index', 'employee.show',
            'appointment.index', 'appointment.show',
            'schedule.index', 'schedule.show',
            'attendances.index', 'attendances.show', 'attendances.store', 'attendances.update',
            // manage rooms and services
            'room.index', 'room.show', 'room.update',
            'room_service.index', 'room_service.show', 'room_service.store', 'room_service.update',
            // fulfill room service requests
            'room_service_user.index', 'room_service_user.show', 'room_service_user.store', 'room_service_user.update', 'room_service_user.delete',
            // ai chat
            'ai_chat.index', 'ai_chat.show', 'ai_chat.store', 'ai_chat.update',
        ]);
    }

    private function cleanupStalePermissions(): void
    {
        $valid = [];
        foreach ($this->resources as $resource) {
            foreach ($this->actions as $action) {
                $valid[] = $resource . '.' . $action;
            }
        }

        Permission::whereNotIn('name', $valid)->delete();
    }

    private function seedRole(string $name, array|string $permissions): void
    {
        $role = Role::firstOrCreate(['name' => $name]);

        if ($permissions === '*') {
            $role->syncPermissions(Permission::all());
            return;
        }

        $role->syncPermissions($permissions);
    }

    private function createPermissions(): void
    {
        foreach ($this->resources as $resource) {
            foreach ($this->actions as $action) {
                Permission::firstOrCreate([
                    'name' => $resource . '.' . $action,
                ]);
            }
        }
    }
}
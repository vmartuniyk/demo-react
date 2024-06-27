<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Contact;
use App\Models\Organization;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $account = Account::create(['name' => 'Acme Corporation']);

        User::factory()->create([
            'account_id' => $account->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@example.com',
            'password' => 'secret',
            'owner' => true,
        ]);


        $organizations = Organization::factory(100)
            ->create(['account_id' => $account->id]);

        User::factory(20)
            ->create(['account_id' => $account->id])
            ->each(function ($user) use ($organizations) {
                $user->update(['organization_id' => $organizations->random()->id]);
            });


    }
}

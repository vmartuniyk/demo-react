<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrganizationStoreRequest;
use App\Http\Requests\OrganizationUpdateRequest;
use App\Http\Requests\ProjectStoreRequest;
use App\Http\Resources\OrganizationCollection;
use App\Http\Resources\OrganizationResource;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserCollection;
use App\Models\Organization;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Projects/Index', [
            'filters' => Request::all('search', 'role', 'trashed'),
            'projects' => new ProjectCollection(
                Auth::user()->projects()
                    ->orderByName()
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    public function store(ProjectStoreRequest $request): RedirectResponse
    {
        Auth::user()->projects()->create(
            $request->validated()
        );

        return Redirect::route('projects')->with('success', 'Project created.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    public function update(Project $project, ProjectStoreRequest $request): RedirectResponse
    {
        $project->update(
            $request->validated()
        );

        return Redirect::route('projects')->with('success', 'Project updated.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return Redirect::route('projects')->with('success', 'Project deleted.');
    }

    public function restore(Organization $organization): RedirectResponse
    {
        $organization->restore();

        return Redirect::back()->with('success', 'Organization restored.');
    }
}

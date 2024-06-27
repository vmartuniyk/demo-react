import React from 'react';
import { Head } from '@inertiajs/react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import DeleteButton from '@/Components/Button/DeleteButton';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import TrashedMessage from '@/Components/Messages/TrashedMessage';
import { Project } from '@/types';
import FieldGroup from '@/Components/Form/FieldGroup';

const Edit = () => {
  const { project } = usePage<{
    project: Project;

  }>().props;

  const { data, setData, errors, put, processing } = useForm({
    name: project.name || '',

  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('projects.update', project.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this project?')) {
      router.delete(route('projects.destroy', project.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this project?')) {
      router.put(route('projects.restore', project.id));
    }
  }

  return (
    <div>
      <Head title={`${data.name}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('projects')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Projects
        </Link>

      </h1>
      {project.deleted_at && (
        <TrashedMessage
          message="This project has been deleted."
          onRestore={restore}
        />
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">



            <FieldGroup
              label="Project name"
              name="name"
              error={errors.name}
            >
              <TextInput
                name="name"
                error={errors.name}
                value={data.name}
                onChange={e => setData('name', e.target.value)}
              />
            </FieldGroup>
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!project.deleted_at && (
              <DeleteButton onDelete={destroy}>Delete Project</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Project
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Edit.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default Edit;

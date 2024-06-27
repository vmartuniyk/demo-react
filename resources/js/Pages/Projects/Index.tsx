import { Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Pagination from '@/Components/Pagination/Pagination';
import FilterBar from '@/Components/FilterBar/FilterBar';
import { Project, PaginatedData } from '@/types';
import Table from '@/Components/Table/Table';
import { Trash2 } from 'lucide-react';

const Index = () => {
  const { projects } = usePage<{
    projects: PaginatedData<Project>;
  }>().props;

  const {
    data,
    meta: { links }
  } = projects;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Projects</h1>
      <div className="flex items-center justify-between mb-6">

        <Link
          className="btn-indigo focus:outline-none"
          href={route('projects.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Project</span>
        </Link>
      </div>
      <Table
        columns={[
          {
            label: 'Name',
            name: 'name',
            renderCell: row => (
              <>
                {row.name}
                {row.deleted_at && (
                  <Trash2 size={16} className="ml-2 text-gray-400" />
                )}
              </>
            )
          },

        ]}
        rows={data}
        getRowDetailsUrl={row => route('projects.edit', row.id)}
      />
      <Pagination links={links} />
    </div>
  );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Index.layout = (page: React.ReactNode) => (
  <MainLayout title="Projects" children={page} />
);

export default Index;

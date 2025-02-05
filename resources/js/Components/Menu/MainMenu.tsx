import MainMenuItem from '@/Components/Menu/MainMenuItem';
import { Building, CircleGauge, Printer, Users } from 'lucide-react';

interface MainMenuProps {
  className?: string;
}

export default function MainMenu({ className }: MainMenuProps) {
  return (
    <div className={className}>
      <MainMenuItem
        text="Dashboard"
        link="dashboard"
        icon={<CircleGauge size={20} />}
      />
      <MainMenuItem
        text="Organizations"
        link="organizations"
        icon={<Building size={20} />}
      />
      <MainMenuItem
        text="Users"
        link="users"
        icon={<Users size={20} />}
      />
      <MainMenuItem
        text="Projects"
        link="projects"
        icon={<Printer size={20} />}
      />
    </div>
  );
}

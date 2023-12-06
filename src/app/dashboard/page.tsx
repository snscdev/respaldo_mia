// sections
// import { OverviewAppView } from 'src/sections/overview/app/view';
import { CalendarView } from 'src/sections/calendar/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: App',
};

export default function OverviewAppPage() {
  // return <OverviewAppView />;
  return <CalendarView />;
}

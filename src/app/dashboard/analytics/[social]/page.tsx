// sections
// import ComingSoonView from 'src/app/coming-soon/view';
import { OverviewAnalyticsView } from 'src/sections/overview/analytics/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Analytics',
};
type Props = {
  params: {
    social: string;
  };
};
export default function OverviewAnalyticsPageFB({ params }: Props) {
  return <OverviewAnalyticsView social={params.social} />;
}

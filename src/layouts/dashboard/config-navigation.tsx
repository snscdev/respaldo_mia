import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  magicpen: icon('ic_magicpen'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('metrics'),
        items: [
          {
            title: t('home'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
          {
            title: t('Dashboard.Create_Post.Title'),
            path: paths.dashboard.create_post.root,
            icon: ICONS.magicpen,
            // children: [
            //   { title: t('create'), path: paths.dashboard.tour.new },
            //   { title: t('calendario'), path: paths.dashboard.tour.calendar },
            //   { title: t('list'), path: paths.dashboard.tour.root },
            //   { title: t('details'), path: paths.dashboard.tour.demo.details },
            //   { title: t('edit'), path: paths.dashboard.tour.demo.edit },
            // ],
          },
          {
            title: t('Analytics'),
            path: paths.dashboard.analytics.root,
            icon: ICONS.analytics,
            children: [
              { title: t('facebook'), path: paths.dashboard.analytics.facebook },
              { title: t('instagram'), path: paths.dashboard.analytics.instagram },
              { title: t('twitter (X)'), path: paths.dashboard.analytics.twitter },
            ],
          },
          {
            title: t('trends'),
            path: paths.dashboard.general.booking,
            icon: ICONS.external,
          },
          {
            title: t('Online Presence'),
            path: paths.dashboard.general.banking,
            icon: ICONS.banking,
          },
          // Ocoya
        ],
      },
    ],
    [t]
  );

  return data;
}

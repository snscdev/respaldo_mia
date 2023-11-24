'use client';

import { useEffect } from 'react';
// @mui
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useTranslation } from 'react-i18next';

// routes
import { usePathname } from 'src/routes/hooks';
// components
import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import Scrollbar from 'src/components/scrollbar';
import { useAuth0 } from '@auth0/auth0-react';
//
import { NavProps } from '../types';
import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function NavMobile({ offsetTop, data }: NavProps) {
  const pathname = usePathname();

  const { loginWithRedirect } = useAuth0();

  const { t } = useTranslation();

  const nav = useBoolean();

  useEffect(() => {
    console.log(nav.value)
    if (nav.value) {
      nav.onTrue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton
        onClick={nav.onTrue}
        sx={{
          ml: 1,
          ...(offsetTop && {
            color: 'text.primary',
          }),
        }}
      >
        <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
      </IconButton>

      <Drawer
        open={nav.value}
        onClose={nav.onFalse}
        onClickCapture={
          nav.onToggle
        }
        PaperProps={{
          sx: {
            pb: 5,
            width: 260,
          },
        }}
      >
        <Scrollbar
          sx={{
            flex: 1,
          }}
        >
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>
        </Scrollbar>
        <Button variant="outlined" color="primary" sx={{ mx: 2.5 }}
          onClick={() => loginWithRedirect()}
        >
          {t('Login')}
        </Button>
        <Button variant="contained" color="primary" sx={{ mx: 2.5, my: 3 }}>
          {t('Try_Free')}
        </Button>
      </Drawer>
    </>
  );
}

// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// routes
import { RouterLink } from 'src/routes/components';
// _mock
import Logo from 'src/components/logo';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const LINKS = [
  {
    // headline: 'Minimal',
    children: [
      { name: 'Home', href: '#Home-mia' },
      { name: 'Features', href: '#features-mia' },
      { name: 'Contact', href: '#Contact-mia' },
    ],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const { t } = useTranslation();
  // const pathname = usePathname();

  // const isHome = pathname === '/';

  // const simpleFooter = (
  //   <Box
  //     component="footer"
  //     sx={{
  //       py: 5,
  //       textAlign: 'center',
  //       position: 'relative',
  //       bgcolor: 'background.default',
  //     }}
  //   >
  //     <Container>
  //       <Logo sx={{ mb: 1, mx: 'auto' }} />

  //       <Typography variant="caption" component="div">
  //         © All rights reserved
  //         <br /> made by
  //         <Link href="https://minimals.cc/"> minimals.cc </Link>
  //       </Typography>
  //     </Container>
  //   </Box>
  // );

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        zIndex: 999,
        bgcolor: 'background.default',
      }}
    >
      <Divider />

      <Container
        sx={{
          pt: 5,
          pb: 5,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Logo sx={{ mb: 3 }} />

        <Stack
          spacing={2}
          sx={{
            ml: { xs: 0, md: 25 },
          }}
          direction={{ xs: 'column', md: 'row' }}
        >
          {LINKS.map((list, index) => (
            <Stack
              key={index}
              spacing={1}
              alignItems={{ xs: 'center', md: 'flex-end' }}
              sx={{ width: 1 }}
            >
              {/* <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography> */}

              {list.children.map((link) => (
                <Link
                  key={link.name}
                  component={RouterLink}
                  style={{
                    cursor: 'pointer',
                  }}
                  href={link.href}
                  color="inherit"
                  variant="body2"
                >
                  {t(link.name)}
                </Link>
              ))}
            </Stack>
          ))}
        </Stack>

        <Typography variant="body2" sx={{ mt: 10 }}>
          © 2021. All rights reserved
        </Typography>
      </Container>
    </Box>
  );

  // return isHome ? simpleFooter : mainFooter;
  return mainFooter;
}

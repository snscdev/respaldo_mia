/* eslint-disable react/no-danger */
import { m, useScroll } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgGradient } from 'src/theme/css';
// layouts
import { HEADER } from 'src/layouts/config-layout';
// components
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varFade } from 'src/components/animate';
import Image from 'src/components/image';
import { TypeAnimation } from 'react-type-animation';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    // imgUrl: '/assets/background/overlay_3.jpg',
  }),
  width: '100%',
  height: '100vh',
  position: 'relative',
  zIndex: 9,
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    position: 'fixed',
  },
}));

const StyledWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER.H_DESKTOP_OFFSET,
  },
}));

const StyledEllipseTop = styled('div')(({ theme }) => ({
  top: -80,
  width: 480,
  right: -80,
  height: 480,
  zIndex: 1,
  borderRadius: '50%',
  position: 'absolute',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.background.purpel.main, 0.12),
}));

const StyledEllipseBottom = styled('div')(({ theme }) => ({
  height: 400,
  bottom: -200,
  left: '10%',
  right: '10%',
  borderRadius: '50%',
  position: 'absolute',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.background.purpel.main, 0.12),
}));

type StyledPolygonProps = {
  opacity?: number;
  anchor?: 'left' | 'right';
  left?: number | string;
  right?: number | string;
};

const StyledPolygon = styled('div')<StyledPolygonProps>(
  ({ opacity = 1, anchor = 'left', theme, left = 0, right = 0 }) => ({
    height: 340,
    zIndex: 999,
    width: 340,
    position: 'absolute',
    borderRadius: '50px',
    bottom: '-30%',
    transform: 'rotate(-61.179deg)',
    ...(anchor === 'left' && {
      left,
      background: `linear-gradient(274deg, rgba(45, 154, 255, 0.11) 1.91%, rgba(59, 130, 246, 0.00) 53.75%)`,
    }),
    ...(anchor === 'right' && {
      right,
      background: `linear-gradient(274deg, rgba(255, 158, 45, 0.22) -2.36%, rgba(255, 158, 45, 0.02) 48.14%)`,
    }),
  })
);

// ----------------------------------------------------------------------

export default function HomeHero() {
  const Theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const heroRef = useRef<HTMLDivElement | null>(null);

  const { t, currentLang } = useLocales();

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  useEffect(() => {
    console.log(currentLang);
  }, [currentLang]);

  const opacity = 1 - percent / 100;

  const hide = percent > 120;

  const renderDescription = (
    <Box
      gap="20px"
      sx={{
        mx: 'auto',
        maxWidth: 480,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: opacity > 0 ? opacity : 0,
        mt: {
          xs: `${HEADER.H_MOBILE + 50}px`,
          md: `${HEADER.H_DESKTOP}px`,
        },
      }}
    >
      <m.div variants={varFade().in}>
        <Typography
          variant="h2"
          sx={{
            textAlign: { xs: 'initial', md: 'center' },
            fontWeight: 400,
          }}
        >
          {t('landing_home_title1')} <br />
          <TypeAnimation
            sequence={[
              t('landing_home_animation1'),
              1000,
              t('landing_home_animation2'),
              1000,
              t('landing_home_animation3'),
              1000,
              t('landing_home_animation4'),
              1000,
              t('landing_home_animation5'),
              1000,
              t('landing_home_animation6'),
              1000,
              t('landing_home_animation7'),
              1000,
              t('landing_home_animation8'),
              1000,
            ]}
            wrapper="span"
            cursor
            speed={{ type: 'keyStrokeDelayInMs', value: 150 }}
            repeat={Infinity}
            style={{
              width: '200px',
              color: '#FF9E2D',
              textDecorationLine: 'underline',
              fontFamily: Theme.typography.fontFamily,
            }}
          />
          <br />
          {t('landing_home_title2')}
        </Typography>
      </m.div>
      <m.div variants={varFade().in}>
        <Typography
          variant="body2"
          sx={{
            textAlign: { xs: 'initial', md: 'center' },
            color: '#737373',
            width: '100%',
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: t('landing_home_subtitle') }} />
        </Typography>
      </m.div>
      <m.div variants={varFade().in}>
        <Stack
          spacing={1.5}
          direction="row"
          sx={{ mb: 5 }}
          justifyContent={{
            xs: 'start',
            md: 'center',
          }}
        >
          <Button
            component={RouterLink}
            href="#"
            color="primary"
            size="large"
            variant="contained"
            sx={{
              fontSize: {
                xs: currentLang.value === 'es' ? '12px' : '15px',
                md: '15px',
              },
            }}
          >
            {t('Try_Free')}
          </Button>
          <Button
            color="primary"
            size="large"
            variant="soft"
            startIcon={
              <Image
                src="/assets/icons/home/ic_play.svg"
                alt="play"
                sx={{
                  '& img': {
                    width: '30px',
                    height: '30px',
                    bottom: '5px',
                    position: 'relative',
                  },
                }}
              />
            }
            target="_blank"
            rel="noopener"
            href="#"
            sx={{
              borderColor: 'text.primary',
              fontSize: {
                xs: currentLang.value === 'es' ? '12px' : '15px',
                md: '15px',
              },
            }}
          >
            {t('See_in_Action')}
          </Button>
        </Stack>
      </m.div>
    </Box>
  );

  const renderImgs = (
    <m.div
      variants={varFade().inRight}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Stack
        gap={3}
        sx={{
          position: 'relative',
          zIndex: 999,
          width: { xs: '360px', md: '90%' },
        }}
      >
        <Stack direction="row" gap={3} justifyContent="center" alignItems="end">
          <Image
            src="/assets/images/home/f8.png"
            sx={{
              borderRadius: '10px',
              width: '45%',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.5s',
              },
            }}
            alt="prueba"
          />
          <Image
            src="/assets/images/home/f10.png"
            alt="prueba"
            sx={{
              borderRadius: '10px',
              width: '48%',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.5s',
              },
            }}
          />
          <Stack
            gap={3}
            sx={{
              width: '25%',
              height: '100%',
            }}
          >
            {/* <Image
              src="/assets/images/home/cards/default-placeholder.jpg"
              alt="prueba"
              sx={{
                borderRadius: 10,
                width: '70%',
                boxShadow: '0px 30px 60px 0px #89b2f780',
              }}
            /> */}
            <Image
              src="/assets/images/home/f3.png"
              alt="prueba"
              sx={{
                borderRadius: '10px',
                width: '100%',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.5s',
                },
              }}
            />
          </Stack>
        </Stack>

        <Stack direction="row" gap={3} justifyContent="center" alignItems="initial">
          <Image
            src="/assets/images/home/fq.png"
            alt="prueba"
            sx={{
              borderRadius: '10px',
              width: '50%',
              boxShadow: '0px 30px 60px 0px rgba(25, 55, 102, 0.25)',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.5s',
              },
            }}
          />

          <Stack
            justifyContent="space-between"
            sx={{
              width: '50%',
            }}
          >
            <Image
              src="/assets/images/home/f11.png"
              alt="prueba"
              sx={{
                width: '64%',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.5s',
                },
              }}
            />
            {/* <Image
              src="/assets/images/home/cards/default-placeholder.jpg"
              alt="prueba"
              style={{
                borderRadius: 10,
                width: '30%',
                boxShadow: '0px 30px 60px 0px #89b2f780',
              }}
            /> */}
          </Stack>
        </Stack>
      </Stack>
    </m.div>
  );

  const renderPolygons = (
    <>
      <StyledPolygon />
      <StyledPolygon left="17%" />
      <StyledPolygon anchor="right" right="17%" />
      <StyledPolygon anchor="right" />
    </>
  );

  const renderEllipses = (
    <>
      {mdUp && <StyledEllipseTop />}
      <StyledEllipseBottom />
    </>
  );

  return (
    <>
      <StyledRoot
        id="Home-mia"
        ref={heroRef}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      >
        <StyledWrapper>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid container columnSpacing={{ md: 10 }} sx={{ height: 1 }}>
              <Grid xs={12} md={6}>
                {renderDescription}
              </Grid>

              <Grid
                xs={12}
                md={6}
                mt={{
                  xs: '40px',
                  md: `${90 + percent}px`,
                }}
              >
                {renderImgs}
              </Grid>
            </Grid>
          </Container>

          {renderEllipses}
        </StyledWrapper>
      </StyledRoot>

      <Box
        sx={{ height: { md: '100vh' }, width: '100%', overflow: 'hidden', position: 'relative' }}
      >
        {mdUp && renderPolygons}
      </Box>
    </>
  );
}

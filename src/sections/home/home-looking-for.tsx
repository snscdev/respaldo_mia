/* eslint-disable react/no-danger */
import { m } from 'framer-motion';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
// routes
// components
import Image from 'src/components/image';
import { MotionViewport, varFade } from 'src/components/animate';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const StyledUl = styled('ul')(({ theme }) => ({
  // lista con cradritos en vez de puntos
  listStyle: 'none',
  padding: 0,
}));

const StyledLi = styled('li')(({ theme }) => ({
  position: 'relative',
  paddingLeft: '1.5em',
  textAlign: 'left',
  '&::before': {
    content: '" "',
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    display: 'inline-block',
    width: '10px',
    height: '10px',
    backgroundColor: theme.palette.info.main,
    position: 'absolute',
    left: '0',
    top: '12px',
    transform: 'translateY(-50%)',
  },
}));

export default function HomeDiscover() {
  const Theme = useTheme();

  const { t } = useTranslation();

  const dataList = [
    {
      title: t('Discover_Unified_Platform_title'),
      description: t('Discover_Unified_Platform_text'),
    },
    {
      title: t('Discover_AI_Powered_Insights_title'),
      description: t('Discover_AI_Powered_Insights_text'),
    },
    {
      title: t('Discover_Future_Ready_Approach_title'),
      description: t('Discover_Future_Ready_Approach_text'),
    },
  ];

  const renderDescription = (
    <Stack
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
          width: '100%',
          maxWidth: '573px',
        },
      }}
    >
      <m.div variants={varFade().inDown}>
        <Typography variant="overline" sx={{ color: Theme.palette.background.purpel.main }}>
          {t('Why_Mia')}
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography
          variant="h3"
          sx={{
            lineHeight: '44px',
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: t('Discover_title') }} />
        </Typography>
      </m.div>
      <m.div variants={varFade().inDown}>
        <Typography
          variant="body1"
          sx={{
            mt: '15px',
            color: Theme.palette.text.secondary,
          }}
        >
          {t('Discover_subtitle')}
        </Typography>
      </m.div>

      <StyledUl>
        {dataList.map((item, index) => (
          <StyledLi key={index}>
            <span
              style={{
                color: Theme.palette.info.main,
                fontWeight: 'bold',
              }}
            >
              {item.title}
            </span>{' '}
            {item.description}
          </StyledLi>
        ))}
      </StyledUl>
    </Stack>
  );

  const renderImgs = (
    <m.div variants={varFade().inRight}>
      <Stack
        gap={3}
        style={{
          position: 'relative',
          zIndex: 999,
          width: '100%',
          height: '100%',
        }}
      >
        <Stack direction="row" gap={2.5} justifyContent="center" alignItems="end">
          <Image
            src="/assets/images/home/cards/default-placeholder.jpg"
            style={{
              borderRadius: 10,
              width: '30%',
              boxShadow: '0px 30px 60px 0px rgba(59, 130, 246, 0.25)',
            }}
            alt="prueba"
          />
          <Image
            src="/assets/images/home/cards/default-placeholder.jpg"
            alt="prueba"
            style={{
              borderRadius: 10,
              width: '48%',
              boxShadow: '0px 30px 60px 0px rgba(59, 130, 246, 0.25)',
            }}
          />
          <Image
            src="/assets/images/home/cards/default-placeholder.jpg"
            alt="prueba"
            style={{
              borderRadius: 10,
              width: '40%',
              boxShadow: `0px 30px 60px 0px rgba(59, 130, 246, 0.25)`,
            }}
          />
        </Stack>

        <Stack direction="row" gap={3} justifyContent="center" alignItems="initial">
          <Image
            src="/assets/images/home/cards/default-placeholder.jpg"
            alt="prueba"
            style={{
              borderRadius: 10,
              width: '60%',
              boxShadow: '0px 30px 60px 0px rgba(59, 130, 246, 0.25)',
            }}
          />
        </Stack>
      </Stack>
    </m.div>
  );

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: Theme.palette.background.neutral,
      }}
    >
      <Container
        component={MotionViewport}
        sx={{
          py: { xs: 10, md: 15 },
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 5, md: 3 }}
        >
          <Grid xs={12} md={6}>
            {renderDescription}
          </Grid>

          <Grid xs={12} md={6}>
            <m.div variants={varFade().inUp}>{renderImgs}</m.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

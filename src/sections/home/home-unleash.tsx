/* eslint-disable react/no-danger */
import { MotionValue, m, useMotionValue, useTransform } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// components
import { varFade } from 'src/components/animate';

import { Button } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import style from 'src/theme/style/mouse.module.css';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

type CustomMotionStyle = {
  borderRadius: number;
  transformStyle: 'preserve-3d';
  perspective: number;
  cardRotateX: MotionValue<number>;
  cardRotateY: MotionValue<number>;
};

const RenderDescription = () => {
  const { t } = useTranslation();
  return (
    <Stack spacing={3} sx={{ textAlign: 'center', justifyContent: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography
          variant="h2"
          sx={{
            color: '#fff',
          }}
        >
          {t('Unleash_title')}
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography
          sx={{
            color: '#fff',
            fontSize: '20px',
            fontWeight: 400,
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: t('Unleash_text') }} />
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Button
          variant="contained"
          sx={{
            color: '#2D9AFF',
            boxShadow: '0px 0px 30px -7px rgba(0,0,0,0.45)',
            transform: 'scale(1.5)',
            backgroundColor: '#fff',
            '&:hover': {
              backgroundColor: '#eaeaea',
            },
          }}
        >
          {t('Unleash_btn')}
        </Button>
      </m.div>
    </Stack>
  );
};

const Render3D = () => {
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useTransform(cardY, [-300, 300], [10, -10]); // Reversed values
  const rotateY = useTransform(cardX, [-300, 300], [-10, 10]); // Reversed values
  const cardRotateX = useTransform(cardY, [-300, 300], [25, -25]); // Adjusted rotation values
  const cardRotateY = useTransform(cardX, [-300, 300], [-25, 25]); // Adjusted rotation values

  const handleMouseMove = (event: any) => {
    const offsetX = event.clientX - window.innerWidth / 2;
    const offsetY = event.clientY - window.innerHeight / 2;

    cardX.set(offsetX);
    cardY.set(offsetY);
  };

  const handleMouseLeave = () => {};

  return (
    <m.div
      style={{
        perspective: 800,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <m.div
        style={{
          margin: 'auto',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          perspective: 800,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          rotateX,
          rotateY,
          background: 'url("/assets/background/unleash.svg") no-repeat center',
          backgroundSize: 'contain',
        }}
        transition={{ velocity: 0 }}
      >
        <m.div
          key="card"
          style={
            {
              borderRadius: 10,
              transformStyle: 'preserve-3d',
              perspective: 800, // Set perspective on the card
              cardRotateX,
              cardRotateY,
            } as CustomMotionStyle
          }
          transition={{ velocity: 0 }}
        >
          <RenderDescription />
        </m.div>
      </m.div>
    </m.div>
  );
};

const RenderMobile = () => (
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      background: 'url(/assets/background/unleash_mobile.svg) no-repeat center',
      backgroundSize: 'contain',
    }}
  >
    <RenderDescription />
  </Box>
);

export default function HomeUnleash() {
  const mdUp = useResponsive('up', 'md');
  return (
    <Box
      className={style.cohete}
      sx={{
        backgroundColor: '#2D9AFF',
      }}
    >
      <m.div variants={varFade().in}>{mdUp ? <Render3D /> : <RenderMobile />}</m.div>
    </Box>
  );
}

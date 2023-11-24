/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/alt-text */
import { m } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// components
import { MotionViewport, varFade } from 'src/components/animate';
import Image from 'src/components/image/image';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

const StyledEllipseTop = styled('div')(({ theme }) => ({
  top: 301,
  width: 580,
  left: 36,
  height: 880,
  zIndex: 1,
  position: 'absolute',
  background: `url('/assets/background/unlock_l.svg') no-repeat`,
  animation: 'float 8s ease-in-out infinite',
  '@keyframes float': {
    '0%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-20px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },
}));

const StyledEllipseBottom = styled('div')(({ theme }) => ({
  top: 90,
  width: 580,
  right: -133,
  height: 880,
  zIndex: 1,
  position: 'absolute',
  background: `url('/assets/background/unlock_r.svg') no-repeat`,
  animation: 'float 10s ease-in-out infinite',
  '@keyframes float': {
    '0%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-20px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },
}));

export default function HomeUnlock() {
  const [showVideo, setShowVideo] = useState(false);
  const Theme = useTheme();

  const { t } = useLocales();

  const handleClickVideo = () => {
    const contentVideo = document.getElementById('content-video');
    if (!contentVideo) return;
    contentVideo.style.animation = 'float 0.5s ease-in-out forwards';
    setTimeout(() => {
      contentVideo.style.animation = 'none';
    }, 500);
    setShowVideo(true);
  };

  const renderVideo = (
    <Box
      id="content-video"
      sx={{
        width: '100%',
        maxWidth: '1100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20px ',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.07), 0px 20px 25px -5px rgba(0, 0, 0, 0.10)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          direction: 'row',
          gridTemplateColumns: '0.5fr 5fr 0.5fr',
          height: { xs: 'auto', md: '41px' },
          background: '#fff',
          borderRadius: '20px 20px 0 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            padding: '10px',
          }}
        >
          {['#E11D48', '#FBBF24', '#22C55E'].map((color) => (
            <Box
              key={color}
              sx={{
                width: '8px',
                borderRadius: '50%',
                height: '8px',
                backgroundColor: color,
                transition: 'all 0.1s ease-in-out',
                '&:hover': {
                  width: '10px',
                  height: '10px',
                },
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
          }}
        >
          <Box
            sx={{
              width: '100%',
              padding: '4px 8px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#F1F5F9',
              maxWidth: '494px',
              maxHeight: '25px',
              borderRadius: '5px',
              fontSize: '12px',
              color: '#94A3B8',
            }}
          >
            usermia.app
          </Box>
        </Box>
      </Box>
      {showVideo ? (
        <Box
          sx={{
            width: '100%',
            height: { xs: '373px', md: '599px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0 0 20px 20px',
          }}
        >
          <video width="100%" height="100%" controls>
            <source src="/assets/video/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: { xs: '373px', md: '599px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0 0 20px 20px',

            background: `url('/assets/images/home/video.png') no-repeat bottom`,
          }}
        >
          <IconButton onClick={handleClickVideo}>
            <Image src="/assets/images/home/play.svg" />
          </IconButton>
        </Box>
      )}
    </Box>
  );

  const renderVectors = (
    <>
      <StyledEllipseTop />
      <StyledEllipseBottom />
    </>
  );

  const renderSocial = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      {['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'Tiktok'].map((social) => (
        <m.div
          key={social}
          className="box"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ['0%', '0%', '50%', '50%', '0%'],
          }}
          transition={{
            delay: 2,
            duration: 2,
            ease: 'easeInOut',
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: 1,
            repeatDelay: 1,
          }}
        >
          <Box
            sx={{
              width: { xs: '40px', md: '64px' },
              height: { xs: '40px', md: '64px' },
              background: '#fff',
              borderRadius: '14px',
              cursor: 'pointer',
              transition: 'all 0.1s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <Image style={{ borderRadius: '14px' }} src={`/assets/icons/home/${social}.png`} />
          </Box>
        </m.div>
      ))}
    </Box>
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
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Stack
          gap="80px"
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 10 },
          }}
        >
          <Stack
            spacing={3}
            sx={{
              textAlign: 'center',
            }}
          >
            <m.div variants={varFade().inDown}>
              <Typography variant="h2">{t('landing_home_Unlock_title')}</Typography>
            </m.div>
            <m.div variants={varFade().inDown}>
              <Typography variant="body2">{t('landing_home_Unlock_subtitle')}</Typography>
            </m.div>
          </Stack>

          <m.div variants={varFade().inDown}>{renderVideo}</m.div>
          <m.div variants={varFade().inDown}>{renderSocial}</m.div>
        </Stack>
      </Container>
      {renderVectors}
    </Box>
  );
}

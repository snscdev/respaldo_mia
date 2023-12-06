/* eslint-disable react/no-danger */
/* eslint-disable consistent-return */
import { useState } from 'react';
import { m } from 'framer-motion';
import { useLocales } from 'src/locales';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Menu } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// routes
// _mock
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';
import BgPowerHouse from './background/BgPowerhouse';

// ----------------------------------------------------------------------

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: '100%',
  borderRadius: 24,
  padding: '7px 10.5px',
  backgroundColor: theme.palette.background.neutral,
  border: `1px solid ${theme.palette.background.neutral}`,
}));

export default function HomePowerhouse() {
  const [options, setOptions] = useState(-1);

  const { t } = useLocales();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const mdUp = useResponsive('up', 'md');
  const Theme = useTheme();

  const renderInfo = (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap="10px"
      sx={{
        height: 1,
        mx: 'auto',
      }}
    >
      <m.div variants={varFade().in}>
        <Typography variant="h3" sx={{ fontWeight: '700' }}>
          {t('landing_home_Powerhouse_title')}
        </Typography>
      </m.div>
      <m.div variants={varFade().in}>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: '400', maxWidth: '800px' }}>
          <div dangerouslySetInnerHTML={{ __html: t('landing_home_Powerhouse_subtitle') }} />
        </Typography>
      </m.div>
    </Stack>
  );

  const togglesData = [
    {
      name: t('Dynamic_Dashboard_label'),
      icon: 'assets/icons/home/powerhouse/Dashboard.png',
      color: Theme.palette.background.purpel.main,
      title: t('Dynamic_Dashboard_label'),
      text: t('Dynamic_Dashboard_text'),
      value: -1,
    },
    {
      name: t('Automation_label'),
      icon: 'assets/icons/home/powerhouse/Automation.png',
      color: Theme.palette.primary.main,
      title: t('Automation_title'),
      text: t('Automation_text'),
      value: 1,
    },
    {
      name: t('AI_recommendations_Label'),
      icon: 'assets/icons/home/powerhouse/recommendations.png',
      color: Theme.palette.info.main,
      title: t('AI_recommendations_Label'),
      text: t('AI_recommendations_text'),
      value: 2,
    },
    {
      name: t('Analytics_label'),
      icon: 'assets/icons/home/powerhouse/Analytics.png',
      color: Theme.palette.secondary.main,
      title: t('Analytics_title'),
      text: t('Analytics_text'),
      value: 3,
    },
    {
      name: t('Trends_label'),
      icon: 'assets/icons/home/powerhouse/Trends.png',
      color: Theme.palette.background.purpel.main,
      title: t('Trends_title'),
      text: t('Trends_text'),
      value: 4,
    },
    {
      name: t('Online_Presence_label'),
      icon: 'assets/icons/home/powerhouse/Presence.png',
      color: Theme.palette.primary.main,
      title: t('Online_Presence_title'),
      text: t('Online_Presence_text'),
      value: 5,
    },
  ];

  const images = [
    '/assets/icons/home/facebook-circle.svg',
    '/assets/icons/home/Instagram.png',
    '/assets/icons/home/pinterest.svg',
    '/assets/icons/home/twitter.svg',
    '/assets/icons/home/youtube.svg',
    '/assets/icons/home/LinkedIn.png',
    '/assets/icons/home/canva.svg',
    '/assets/icons/home/Tiktok.png',
    '/assets/icons/home/gmb.png',
  ];

  const renderToggle = (
    <StyledToggleButtonGroup
      color="primary"
      exclusive
      onChange={(e, value) => {
        if (!value) return;
        setOptions(value);
      }}
      value={options}
      aria-label="Platform"
    >
      {togglesData.map((item, index) => (
        <ToggleButton
          key={index}
          value={item.value}
          sx={{
            color: Theme.palette.text.primary,
            '&:hover': {
              backgroundColor: alpha(item.color, 0.4),
            },
            '&.Mui-selected': {
              backgroundColor: alpha(item.color, 0.4),
              color: Theme.palette.text.primary,
              '&:hover': {
                backgroundColor: alpha(item.color, 0.5),
              },
            },
          }}
        >
          <Image src={item.icon} alt={item.name} sx={{ width: 40, height: 40, mr: '17px' }} />
          <Box
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.name}
          </Box>
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );

  const renderToggleMobile = (
    <>
      <Button
        variant="contained"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={
          <Image
            src={togglesData[togglesData.findIndex((item) => item.value === options)].icon}
            alt="icon"
            sx={{ width: 40, height: 40, mr: '17px' }}
          />
        }
        endIcon={
          <Iconify
            icon={open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            width={20}
            height={20}
          />
        }
        sx={{
          width: '100%',
          minWidth: '300px',
          padding: '15px 27px',
          backgroundColor: Theme.palette.background.neutral,
          color: Theme.palette.text.primary,
          '&:hover': {
            backgroundColor: alpha(
              togglesData[togglesData.findIndex((item) => item.value === options)].color,
              0.4
            ),
          },
        }}
      >
        <div
          style={{
            flexGrow: 1,
            textAlign: 'initial',
          }}
        >
          {togglesData[togglesData.findIndex((item) => item.value === options)].name}
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        sx={{
          '& .MuiPaper-root': {
            maxWidth: '100%',
            minWidth: '300px',
          },
        }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {togglesData.map((item, index) => {
          if (item.value === options) return;
          return (
            <MenuItem
              key={index}
              onClick={() => {
                setOptions(item.value);
                handleClose();
              }}
            >
              <Image src={item.icon} alt={item.name} sx={{ width: 40, height: 40, mr: '17px' }} />
              {item.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );

  const renderData = (
    <Stack
      sx={{
        width: '100%',
        gap: '87px',
        height: { xs: 'auto', md: '350px' },
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'initial',
        alignItems: 'center',
        padding: { xs: '0 20px', md: '0 20px' },
      }}
    >
      <Box
        sx={{
          maxWidth: '500px',
        }}
      >
        <Box
          sx={{
            marginBottom: '20px',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: '700',
              textAlign: 'initial',
              color: togglesData[togglesData.findIndex((item) => item.value === options)].color,
            }}
          >
            {togglesData[togglesData.findIndex((item) => item.value === options)].title}
          </Typography>
        </Box>
        <Box sx={{}}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'initial',
              fontWeight: '400',
              maxWidth: '800px',
              color: Theme.palette.text.secondary,
            }}
          >
            {togglesData[togglesData.findIndex((item) => item.value === options)].text}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '19px',
            transform: 'rotate(15deg)',
          }}
        >
          {images.map((item, index) => (
            <Image
              key={index}
              src={item}
              alt={item}
              objectFit="contain"
              sx={{
                width: '100%',
                height: '100%',
                maxWidth: '98px',
                maxHeight: '98px',
              }}
            />
          ))}
        </Box>
        <BgPowerHouse
          color={togglesData[togglesData.findIndex((item) => item.value === options)].color}
          style={{
            position: 'absolute',
            top: '-74px',
            left: '-216px',
            width: '160%',
            height: '150%',
            objectFit: 'cover',
            zIndex: '-1',
          }}
        />
      </Box>
    </Stack>
  );

  return (
    <Container
      id="features-mia"
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      <Stack
        gap="87px"
        sx={{
          textAlign: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <m.div variants={varFade().in}>{renderInfo}</m.div>
        {mdUp ? <Box>{renderToggle} </Box> : <Box>{renderToggleMobile} </Box>}
        {renderData}
      </Stack>
    </Container>
  );
}

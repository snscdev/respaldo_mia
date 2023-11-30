import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import Image from 'src/components/image';

interface CardPostProps {
  image: string;
  sx?: SxProps<Theme> | undefined;
}

export default function PreviewFacebook({ image, sx }: CardPostProps) {
  const text = useSelector((state: RootState) => state.post.formData.values.content);

  const theme = useTheme();
  const { user } = useAuthContext();
  const { t } = useLocales();

  const renderCardHead = (
    <>
      <Stack
        spacing={2}
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        width="100%"
        sx={{ textAlign: 'center', p: '11px' }}
      >
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Avatar
              src={user?.photoURL}
              alt={user?.displayName}
              variant="circular"
              sx={{
                width: 30,
                height: 30,
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <Stack spacing={0} width="100%">
              <Box
                sx={{
                  display: 'flex',
                  gap: '14px',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.grey[300],
                    height: '10px',
                    width: '100%',
                    borderRadius: '12px',
                  }}
                />
                <Iconify icon="icon-park-outline:more" width={15} color="#65676B" />
              </Box>
              <Typography
                sx={{ fontSize: '70%', textAlign: 'initial' }}
                color={theme.palette.text.secondary}
              >
                Sponsored <Iconify icon="mdi:planet" width={9} color="#65676B" />
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      <Box sx={{ p: '4px 10px' }}>
        <Typography sx={{ fontSize: '70%', textAlign: 'initial' }}>{text}</Typography>
        {/* <Typography
          sx={{
            fontSize: '70%',
            textAlign: 'initial',
            color: theme.palette.background.purpel.main,
          }}
        >
          {t('Dashboard.Create_Post.Create.card.link')}
        </Typography> */}
      </Box>
    </>
  );

  const renderHeadLine = (
    <Box
      sx={{
        height: '50px',
        width: '100%',
        padding: '10px',
        backgroundColor: theme.palette.background.neutral,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ fontSize: '12px', textAlign: 'initial', p: '7px', fontWeight: 600 }}>
        Headline
      </Typography>
      <Box
        sx={{
          height: '28px',
          borderRadius: '3px',
          backgroundColor: theme.palette.grey[300],
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: '12px', p: '10px', fontWeight: 600 }}>Shop Now</Typography>
      </Box>
    </Box>
  );

  const renderComents = (
    <Box
      sx={{
        height: '37px',
        width: '100%',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      <Box>
        <Image src="/assets/icons/dashboard/post/likesFacebook.svg" alt="likes" />
      </Box>
      <Typography
        sx={{
          fontSize: '11px',
          textAlign: 'initial',
          p: '7px',
          fontWeight: 400,
          position: 'absolute',
          left: '60px',
          color: theme.palette.text.secondary,
        }}
      >
        129
      </Typography>

      <Typography
        sx={{ fontSize: '11px', p: '7px', fontWeight: 400, color: theme.palette.text.secondary }}
      >
        12 Comments 8 Shares
      </Typography>
    </Box>
  );

  const renderOptions = (
    <Box
      sx={{
        height: '45px',
        width: '100%',
        padding: '14px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {['Like', 'Comment', 'Share'].map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
          }}
        >
          <Image src={`/assets/icons/dashboard/post/facebook/${item}.svg`} alt={item} />
          <Typography
            sx={{ fontSize: '11px', fontWeight: 400, p: '0px', position: 'relative', top: 3 }}
          >
            {item}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  const renderFooterCard = (
    <Stack>
      {renderHeadLine}
      {renderComents}
      <Divider />
      {renderOptions}
    </Stack>
  );

  return (
    <Card
      sx={{
        maxWidth: '304px',
        borderRadius: '8px',
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        boxShadow: '0px 0.5px 0.5px rgba(0, 0, 0, 0.25)',
        mb: 2,
        ...sx,
      }}
    >
      {renderCardHead}

      <Image src={image} alt="post" width="100%" height={298} />

      {renderFooterCard}
    </Card>
  );
}

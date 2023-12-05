// @mui
import { CardActionArea, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import { Box, Stack } from '@mui/system';
import { IPost } from 'src/types/post';
import Image from 'next/image';
import { useLocales } from 'src/locales';
import { fDate } from 'src/utils/format-time';
import { setOpenModal } from 'src/store/slices/post';
import { useDispatch } from 'react-redux';
import { alpha } from '@mui/material/styles';
// ----------------------------------------------------------------------

type Props = {
  post: IPost;
};

export default function PostItem({ post }: Props) {
  const { t } = useLocales();
  const theme = useTheme();

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setOpenModal(true));
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        borderRadius: '8px',
        maxWidth: '352px',
        position: 'relative',
      }}
    >
      <CardActionArea>
        {post.mediaUrls?.length && (
          <Stack
            direction="row"
            sx={{
              position: 'absolute',
              top: '0',
              right: '0',
              zIndex: '2',
            }}
          >
            {post.platforms.map((name, index) => (
              <Box
                key={index}
                sx={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: name === 'twitter' ? theme.palette.background.default : '',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '5px',
                }}
              >
                <Image
                  src={`/assets/icons/dashboard/post/${name}.svg`}
                  alt="post image"
                  width={28}
                  height={28}
                />
              </Box>
            ))}
          </Stack>
        )}
        {post.mediaUrls?.length ? (
          <CardMedia component="img" height="200px" image={post.mediaUrls[0]} alt="post image" />
        ) : (
          <Box
            sx={{
              height: '200px',
              backgroundColor: theme.palette.background.neutral,
              position: 'relative',
            }}
          >
            <Stack
              direction="row"
              sx={{
                position: 'absolute',
                top: '50%',
                right: '50%',
                padding: '5px',
                zIndex: '2',
              }}
            >
              {post.platforms.map((url, index) => (
                <Box
                  key={index}
                  sx={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '5px',
                  }}
                >
                  <Image
                    src={`/assets/icons/dashboard/post/${post.platforms}.svg`}
                    alt="post image"
                    width={10}
                    height={10}
                  />
                </Box>
              ))}
            </Stack>
          </Box>
        )}
        <CardContent sx={{ padding: '13px 20px', height: '119px' }}>
          <Typography
            component="div"
            sx={{ fontSize: '18px', fontWeight: '600', paddingBottom: '8px' }}
          >
            {post.title}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: '400',
              height: '20px',
              marginBottom: '8px',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {post.content}
          </Typography>

          {post.publish ? (
            <Typography sx={{ fontSize: '12px', fontWeight: '400' }} color="success.main">
              {t('Dashboard.Create_Post.Create.card.published', {
                fecha: fDate(post.creationDate),
              })}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: '12px', fontWeight: '400' }} color="text.secondary">
              {t('Dashboard.Create_Post.Create.card.programmed', {
                fecha: fDate(post.scheduleDate),
              })}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

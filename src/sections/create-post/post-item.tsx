// @mui
import { CardActionArea, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import { IPostItem } from 'src/types/post';
import Image from 'next/image';
import { useLocales } from 'src/locales';
import { fDate } from 'src/utils/format-time';
import { setOpenModal } from 'src/store/slices/post';
import { useDispatch } from 'react-redux';
// ----------------------------------------------------------------------

type Props = {
  post: IPostItem;
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
        {post.image && (
          <Image
            src={`/assets/icons/dashboard/post/${post.socialName}.svg`}
            alt="post image"
            width={25}
            height={25}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          />
        )}
        {post.image ? (
          <CardMedia component="img" height="200px" image={post.image} alt="post image" />
        ) : (
          <Box
            sx={{
              height: '200px',
              backgroundColor: theme.palette.background.neutral,
              position: 'relative',
            }}
          >
            <Image
              src={`/assets/icons/dashboard/post/${post.socialName}.svg`}
              alt="post image"
              width={80}
              height={80}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
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
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {post.text}
          </Typography>
          <Typography
            sx={{
              color: theme.palette.background.purpel.main,
              fontSize: '12px',
              fontWeight: '400',
              paddingBottom: '8px',
            }}
          >
            {t('Dashboard.Create_Post.Create.card.link')}
          </Typography>
          {post.state === 'programmed' ? (
            <Typography sx={{ fontSize: '12px', fontWeight: '400' }} color="text.secondary">
              {t('Dashboard.Create_Post.Create.card.programmed', { fecha: fDate(post.date) })}
            </Typography>
          ) : (
            <Typography sx={{ fontSize: '12px', fontWeight: '400' }} color="success.main">
              {t('Dashboard.Create_Post.Create.card.published', { fecha: fDate(post.date) })}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

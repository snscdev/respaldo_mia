/* eslint-disable arrow-body-style */
import { Avatar, Box, styled } from '@mui/material';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { setDataImageCrop } from 'src/store/slices/post';
import Carousel, { useCarousel } from '../carousel';

const THUMB_SIZE = 100;

const StyledThumbnailsContainer = styled('div')<{ length: number }>(({ length, theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  top: 32,
  margin: 0,
  '& .slick-slide': {
    lineHeight: 0,
  },

  ...(length === 1 && {
    maxWidth: THUMB_SIZE * 1 + 15,
  }),

  ...(length === 2 && {
    maxWidth: THUMB_SIZE * 2 + 32,
  }),

  ...((length === 3 || length === 4) && {
    maxWidth: THUMB_SIZE * 3 + 48,
  }),

  ...(length >= 5 && {
    maxWidth: THUMB_SIZE * 6,
  }),

  ...(length > 3 && {
    '&:before, &:after': {
      top: 0,
      zIndex: 9,
      content: "''",
      height: '100%',
      position: 'absolute',
      width: (THUMB_SIZE * 2) / 3,
    },
    '&:after': {
      right: 0,
      transform: 'scaleX(-1)',
    },
  }),
}));

type dataType = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
};

export default function ThumbnailsView() {
  const mediaUrls = useSelector((state: RootState) => state.post.formData.values.mediaUrls);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const dispatch = useDispatch();

  const data: dataType[] = useMemo(() => {
    return mediaUrls.map((item, index) => ({
      id: index.toString(),
      title: '',
      coverUrl: item,
      description: '',
    }));
  }, [mediaUrls]);

  const handleCarouselChange = (index: number) => {
    setCarouselIndex(index);
    dispatch(setDataImageCrop(data[index].coverUrl));
  };

  useEffect(() => {
    if (data.length === 0) return;
    dispatch(setDataImageCrop(data[data.length - 1].coverUrl));
    setCarouselIndex(data.length - 1);
  }, [dispatch, data]);

  return (
    <Box
      gap={0.5}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(8, 1fr)',
        sm: 'repeat(5, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      overflow={{ xs: 'auto', sm: 'auto', md: 'hidden', lg: 'hidden' }}
      p="30px 0px 0px 0px"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {data.map((item, index) => (
        <Box key={index} sx={{ px: 0.5 }} id={item.id} onClick={() => handleCarouselChange(index)}>
          <Avatar
            variant="rounded"
            src={item.coverUrl}
            sx={{
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              opacity: 0.48,
              cursor: 'pointer',
              ...(carouselIndex === index && {
                opacity: 1,
                border: (theme) => `solid 2.5px ${theme.palette.info.main}`,
              }),
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

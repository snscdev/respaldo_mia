/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
import { Box, FormControlLabel, Radio, RadioGroup, Typography, useTheme } from '@mui/material';
import { useField } from 'formik';

interface IPostTypeInstagram {
  name: string;
}
export default function PostTypeInstagram({ name }: IPostTypeInstagram) {
  const theme = useTheme();

  const [field, , helpers] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue({
      shareReelsFeed: event.target.value === 'shareReelsFeed' ? true : false,
      reels: event.target.value === 'reels' ? true : false,
      stories: event.target.value === 'stories' ? true : false,
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: theme.palette.background.neutral,
        borderRadius: '8px',
        padding: {
          xs: '16px 16px',
          sm: '16px 24px',
        },
        display: 'flex',
        flexDirection: 'column',
        gap: '13px',
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>
        Tipo de publicación en instagram
      </Typography>
      <RadioGroup
        row
        color="info"
        value={
          field.value.shareReelsFeed
            ? 'shareReelsFeed'
            : field.value.reels
            ? 'reels'
            : field.value.stories
            ? 'stories'
            : ''
        }
        onChange={handleChange}
      >
        <FormControlLabel
          value="shareReelsFeed"
          control={<Radio color="info" />}
          label="Publicación"
        />
        <FormControlLabel value="reels" control={<Radio color="info" />} label="Reels" />
        <FormControlLabel value="stories" control={<Radio color="info" />} label="Historias" />
      </RadioGroup>
    </Box>
  );
}

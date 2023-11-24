import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { setPreviewSelected } from 'src/store/slices/post';

interface Props {
  children: React.ReactNode;
}

export default function PreviewContainer({ children }: Props) {
  const { platforms } = useSelector((state: RootState) => state.post.previewData);
  const previewSelected = useSelector((state: RootState) => state.post.previewSelected);

  const dispatch = useDispatch();

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: theme.palette.background.neutral,
        height: '80%',
        borderRadius: '8px',
      })}
    >
      <Box
        sx={{
          maxWidth: '100%',
          width: '100%',
        }}
      >
        <Tabs
          value={previewSelected}
          variant="scrollable"
          scrollButtons="auto"
          onChange={(e, newNalue) => dispatch(setPreviewSelected(newNalue))}
          sx={{
            mb: '10%',
            padding: '0 5%',
            alignSelf: 'start',
            '& .MuiTabs-indicator': {
              backgroundColor: '#7778EC',
            },
            '& .MuiTab-root': {
              color: 'text.secondary',
            },
            '& .Mui-selected': {
              color: '#7778EC',
            },
          }}
        >
          {platforms.map((item, index) => (
            <Tab key={index} label={item} value={item} />
          ))}
        </Tabs>
      </Box>

      <Box>{children}</Box>
    </Box>
  );
}

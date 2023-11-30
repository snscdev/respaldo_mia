import { Box, Tab, Tabs, alpha } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { setTabSelected } from 'src/store/slices/post';

interface Props {
  children: React.ReactNode;
}

export default function PreviewContainer({ children }: Props) {
  const tabSelected = useSelector((state: RootState) => state.post.tabSelected);
  const showCropSection = useSelector((state: RootState) => state.post.showCropSection);
  const socialNetworksToPublish = useSelector(
    (state: RootState) => state.post.socialNetworksToPublish
  );
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
        overflowY: 'scroll',
        /// estilos del scroll
        '&::-webkit-scrollbar': {
          width: '5px',
        },
        '&::-webkit-scrollbar-track': {
          background: theme.palette.background.neutral,
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.info.main, 0.3),
          borderRadius: '8px',
        },
      })}
    >
      <Box
        sx={{
          maxWidth: '100%',
          width: '100%',
          height: !showCropSection ? '10%' : '10%',
        }}
      >
        {showCropSection && (
          <Tabs
            value={tabSelected}
            variant="scrollable"
            scrollButtons="auto"
            onChange={(e, newNalue) => dispatch(setTabSelected(newNalue))}
            sx={{
              mb: '10%',
              padding: '0 5%',
              alignSelf: 'start',
              '& .MuiTabs-indicator': {
                top: 35,
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
            {socialNetworksToPublish.map((item, index) => (
              <Tab key={index} label={item} value={item} />
            ))}
          </Tabs>
        )}
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}

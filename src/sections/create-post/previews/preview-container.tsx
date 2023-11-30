import { Box, Tabs, Tab, alpha } from '@mui/material';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  children: React.ReactNode;
}

export default function PreviewContainer({ children }: Props) {
  const { platforms } = useSelector((state: RootState) => state.post.previewData);

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
          height: '10%',
        }}
      />
      <Box>{children}</Box>
    </Box>
  );
}

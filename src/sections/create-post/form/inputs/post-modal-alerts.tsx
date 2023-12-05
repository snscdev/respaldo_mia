import { Alert, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { setSocialNetworksConnected } from 'src/store/slices/post';

export default function AlertMessages() {
  const tabSelected = useSelector((state: RootState) => state.post.tabSelected);
  const socialNetworksConnected = useSelector(
    (state: RootState) => state.post.socialNetworksConnected
  );

  const distpach = useDispatch();

  if (socialNetworksConnected.includes(tabSelected)) return <></>;

  return (
    <Box
      sx={{
        padding: '0 24px 0 0',
      }}
    >
      <Alert
        severity="info"
        sx={{
          zIndex: 3,
        }}
        action={
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              distpach(setSocialNetworksConnected([...socialNetworksConnected, tabSelected]))
            }
          >
            Conectar
          </Button>
        }
      >
        Conecta para publicar en {tabSelected}
      </Alert>
    </Box>
  );
}

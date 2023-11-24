/* eslint-disable prefer-arrow-callback */
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from 'src/components/iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import { RootState } from 'src/store';
import { setOpenModal } from 'src/store/slices/post';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface PostModalProps {
  children: React.ReactNode;
}

export default function PostModalWrepper({ children }: PostModalProps) {
  const dispatch = useDispatch();
  const mdUp = useResponsive('up', 'md');
  const { openModal } = useSelector((state: RootState) => state.post);

  const handleBack = () => {
    dispatch(setOpenModal(false));
  };

  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      fullScreen={!mdUp}
      open={openModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => dispatch(setOpenModal(false))}
      aria-describedby="alert-dialog-slide-description"
    >
      {!mdUp ? (
        <>
          <AppBar position="relative" color="default">
            <Toolbar>
              <IconButton color="inherit" edge="start" onClick={handleBack}>
                <Iconify icon="solar:alt-arrow-left-outline" />
              </IconButton>

              <Typography variant="h6" sx={{ flex: 1 }}>
                volver
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>{children}</DialogContent>
        </>
      ) : (
        <DialogContent>{children}</DialogContent>
      )}
    </Dialog>
  );
}

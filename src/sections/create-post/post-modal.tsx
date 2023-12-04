'use client';

/* eslint-disable prefer-arrow-callback */
import { Box, Dialog, DialogContent, Grid } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalPreviewMobile } from 'src/store/slices/post';

import PostModalWrepper from './post-modal-wrapper';
import PreviewaLayout from './previews/previews-layout';
import RenderPreview from './previews/render-preview';
import PostModalForm from './form/post-modal-form';
import CropSection from './crop-section';
import { TabsPreview } from './previews/preview-container';

export default function PostModal() {
  const mdUp = useResponsive('up', 'md');

  const showCropSection = useSelector((state: RootState) => state.post.showCropSection);

  const openModalPreviewMobile = useSelector(
    (state: RootState) => state.post.openModalPreviewMobile
  );

  const dispatch = useDispatch();

  const renderModalMobile = (
    <Dialog
      open={openModalPreviewMobile}
      onClose={() => dispatch(setOpenModalPreviewMobile(false))}
    >
      <DialogContent
        sx={(theme) => ({
          background: theme.palette.background.neutral,
        })}
      >
        <TabsPreview hidenBtns />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '10%',
          }}
        >
          <RenderPreview />
        </Box>
      </DialogContent>
    </Dialog>
  );

  const renderGridPreview = (
    <>
      {mdUp ? (
        <Grid item xs={5}>
          <PreviewaLayout>
            <RenderPreview />
          </PreviewaLayout>
        </Grid>
      ) : (
        <>{renderModalMobile}</>
      )}
    </>
  );

  const renderGridForm = (
    <Grid item xs={12} md={7}>
      <PostModalForm />
    </Grid>
  );

  const renderCropSection = (
    <Grid item xs={12} md={7}>
      <CropSection />
    </Grid>
  );

  return (
    <PostModalWrepper>
      <Grid container spacing={0}>
        {showCropSection ? renderCropSection : renderGridForm}

        {renderGridPreview}
      </Grid>
    </PostModalWrepper>
  );
}

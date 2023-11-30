'use client';

/* eslint-disable prefer-arrow-callback */
import { Dialog, DialogContent, Grid } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalPreviewMobile } from 'src/store/slices/post';

import PostModalWrepper from './post-modal-wrapper';
import PreviewaLayout from './previews/previews-layout';
import RenderPreview from './previews/render-preview';
import PostModalForm from './form/post-modal-form';

export default function PostModal() {
  const mdUp = useResponsive('up', 'md');

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
        <RenderPreview />
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

  return (
    <PostModalWrepper>
      <Grid container spacing={0}>
        {renderGridForm}

        {renderGridPreview}
      </Grid>
    </PostModalWrepper>
  );
}

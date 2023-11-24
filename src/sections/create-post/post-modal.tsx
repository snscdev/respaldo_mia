/* eslint-disable prefer-arrow-callback */
import { Button, Dialog, DialogContent, Grid } from '@mui/material';
import { useState } from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import PostModalWrepper from './post-modal-wrapper';
import PreviewaLayout from './previews/previews-layout';
import PreviewContainer from './previews/preview-container';
import RenderPreview from './previews/render-preview';
import PostModalForm from './form/post-modal-form';

export default function PostModal() {
  const mdUp = useResponsive('up', 'md');
  const [open, setOpen] = useState(false);

  const renderModalMobile = (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent
        sx={(theme) => ({
          background: theme.palette.background.neutral,
        })}
      >
        <PreviewContainer>
          <RenderPreview />
        </PreviewContainer>
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
      <PostModalForm modalStateMobile={{ open, setOpen }} />
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

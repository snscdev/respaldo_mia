'use client';

import { Form, Formik } from 'formik';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setOpenModalPreviewMobile } from 'src/store/slices/post';
import { RootState } from 'src/store';

import { Box, Button, Stack, alpha, useTheme } from '@mui/material';
import ThumbnailsView from 'src/components/Thumbnails';
import { SOCIALNETWORKSNAMES } from 'src/const/post/redes';
import { useResponsive } from 'src/hooks/use-responsive';
import { useLocales } from 'src/locales';
import PostTextArea from './inputs/post-modal-text-area';
import PosModalFormLayout from './form-layout';
import { validationSchema } from './dataForms';

import PublishRadioButtons from './inputs/post-modal-publish-radio-buttons';
import PublishDatePicker from './inputs/post-modal-publish-date-picker';
import PostTypeInstagram from './inputs/post-modal-post-type-instagram';
import InstagramOptions from './inputs/post-modal-instagram-options';
import TiktokOptions from './inputs/post-modal-tiktok-options';
import ImageBox from './inputs/post-modal-image-box';
import AlertMessages from './inputs/post-modal-alerts';

interface IDataForm {
  errors: any;
  values: any;
}

const DataForm = ({ errors, values }: IDataForm) => {
  const distpach = useDispatch();

  useEffect(() => {
    console.log(values);
    distpach(
      setFormData({
        errors,
        values,
      })
    );
  }, [errors, values]);

  return <></>;
};

export default function PostModalForm() {
  const tabSelected = useSelector((state: RootState) => state.post.tabSelected);
  const valuesForm = useSelector((state: RootState) => state.post.formData.values);
  const socialNetworksConnected = useSelector(
    (state: RootState) => state.post.socialNetworksConnected
  );
  const theme = useTheme();
  const { t } = useLocales();

  const mdDown = useResponsive('down', 'md');

  const dispatch = useDispatch();

  const isConected = socialNetworksConnected.includes(tabSelected);
  return (
    <PosModalFormLayout>
      <Formik
        initialValues={valuesForm}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        {({ values, errors }) => (
          <>
            <Form>
              <Stack
                sx={{
                  gap: '24px',
                  p: '0 20px 0 0',
                  height: 'calc(100vh - 44vh)',
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                  '&::-webkit-scrollbar': {
                    position: 'absolute',
                    padding: '10px',
                    width: '5px',
                    marginRight: '5px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: alpha(theme.palette.info.main, 0.3),
                    borderRadius: '24px',
                  },
                }}
              >
                <AlertMessages />

                {isConected && (
                  <>
                    {tabSelected === SOCIALNETWORKSNAMES.instagram && (
                      <PostTypeInstagram name="instagramOptions" />
                    )}

                    <PostTextArea name="content" />

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '8px',
                      }}
                    >
                      <ImageBox label="Multimedia" name="multimedia" />
                      <ThumbnailsView />
                    </Box>

                    {tabSelected === SOCIALNETWORKSNAMES.instagram && (
                      <InstagramOptions name="instagramComments" />
                    )}

                    {tabSelected === SOCIALNETWORKSNAMES.tiktok && (
                      <TiktokOptions name="tikTokOptions" />
                    )}

                    <PublishRadioButtons name="publish" />

                    {!values.publish && <PublishDatePicker name="scheduleDate" />}
                  </>
                )}
              </Stack>
              {mdDown && (
                <Button
                  variant="outlined"
                  color="info"
                  sx={{
                    width: {
                      xs: '100%',
                      md: '20%',
                    },
                  }}
                  onClick={() => dispatch(setOpenModalPreviewMobile(true))}
                >
                  Ver Preview
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: {
                    xs: '100%',
                    md: '20%',
                  },
                  margin: '24px 0',
                }}
              >
                {t('Dashboard.Create_Post.Create.Modal.btn_Post')}
              </Button>
            </Form>
            <DataForm errors={errors} values={values} />
          </>
        )}
      </Formik>
    </PosModalFormLayout>
  );
}

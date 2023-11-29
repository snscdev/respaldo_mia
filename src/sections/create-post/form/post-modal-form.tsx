'use client';

import { Form, Formik } from 'formik';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from 'src/store/slices/post';
import { RootState } from 'src/store';

import { Button, Stack, alpha, useTheme } from '@mui/material';
import { SOCIALNETWORKSNAMES } from 'src/const/post/redes';
import { useLocales } from 'src/locales';
import PostTextArea from './inputs/post-modal-text-area';
import PosModalFormLayout from './form-layout';
import { initialValues, validationSchema } from './dataForms';

import PublishRadioButtons from './inputs/post-modal-publish-radio-buttons';
import PublishDatePicker from './inputs/post-modal-publish-date-picker';
import PostTypeInstagram from './inputs/post-modal-post-type-instagram';
import InstagramOptions from './inputs/post-modal-instagram-options';

interface IDataForm {
  errors: any;
  values: any;
}

const DataForm = ({ errors, values }: IDataForm) => {
  const distpach = useDispatch();

  useEffect(() => {
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
  const theme = useTheme();
  const { t } = useLocales();
  return (
    <PosModalFormLayout>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <>
            <Form>
              <Stack
                sx={{
                  gap: '24px',
                  p: '0 20px 0 0',
                  maxHeight: 'calc(100vh - 300px)',
                  overflowY: 'scroll',
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
                {tabSelected === SOCIALNETWORKSNAMES.instagram && (
                  <PostTypeInstagram name="instagramOptions" />
                )}

                <PostTextArea name="content" />

                {tabSelected === SOCIALNETWORKSNAMES.instagram && (
                  <InstagramOptions name="instagramComments" />
                )}

                <PublishRadioButtons name="publish" />

                {!values.publish && <PublishDatePicker name="scheduleDate" />}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    width: '20%',
                  }}
                >
                  {t('Dashboard.Create_Post.Create.Modal.btn_Post')}
                </Button>
              </Stack>
            </Form>
            <DataForm errors={errors} values={values} />
          </>
        )}
      </Formik>
    </PosModalFormLayout>
  );
}

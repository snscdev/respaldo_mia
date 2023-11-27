'use client';

import { Form, Formik } from 'formik';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData } from 'src/store/slices/post';

import { Button, Stack } from '@mui/material';
import PostTextArea from './inputs/post-modal-text-area';
import PosModalFormLayout from './form-layout';
import { initialValues, validationSchema } from './dataForms';
import PublishRadioButtons from './inputs/post-modal-publish-radio-buttons';
import PublishDatePicker from './inputs/post-modal-publish-date-picker';
import PostTypeInstagram from './inputs/post-modal-post-type-instagram';

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
                }}
              >
                <PostTypeInstagram name="instagramOptions" />

                <PostTextArea name="content" />

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
                  Publicar
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

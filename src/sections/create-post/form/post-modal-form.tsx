'use client';

import { Form, Formik } from 'formik';

import { Stack } from '@mui/material';
import PostTextArea from './inputs/post-modal-text-area';
import PosModalFormLayout from './form-layout';
import PostModalSocialButtons from './inputs/post-modal-social-buttons';

export default function PostModalForm() {
  return (
    <PosModalFormLayout>
      <Formik
        initialValues={{
          text: '',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form>
            <Stack
              sx={{
                gap: '24px',
              }}
            >
              <PostModalSocialButtons />

              <PostTextArea />
            </Stack>
          </Form>
        )}
      </Formik>
    </PosModalFormLayout>
  );
}

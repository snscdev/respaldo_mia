import * as Yup from 'yup';

export const validationSchema = Yup.object({
  content: Yup.string().required('Introduce un texto'),
});

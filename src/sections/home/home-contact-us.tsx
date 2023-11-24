/* eslint-disable react/no-danger */
import { m } from 'framer-motion';
// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { MotionViewport, varFade } from 'src/components/animate';
import { useTheme } from '@mui/material/styles';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { useState } from 'react';
import * as Yup from 'yup';

export default function HomeContacUs() {
  const Theme = useTheme();
  const [expanded, setExpanded] = useState<string>('panel0');

  const { t } = useTranslation();

  const handleChange = (panel: string) => {
    setExpanded(panel);
  };

  const dataList = [
    {
      title: t('Contact_Us_ask1'),
      description: t('Contact_Us_answer1'),
    },
    {
      title: t('Contact_Us_ask2'),
      description: t('Contact_Us_answer2'),
    },
    {
      title: t('Contact_Us_ask3'),
      description: t('Contact_Us_answer3'),
    },
  ];

  const renderAcoordions = (
    <>
      {dataList.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={() => handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={
              <Iconify
                icon={
                  expanded === `panel${index}` ? 'zondicons:minus-solid' : 'octicon:feed-plus-16'
                }
                color={Theme.palette.info.main}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color={Theme.palette.text.secondary}>{item.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );

  const renderForm = (
    <>
      <m.div variants={varFade().inDown}>
        <Typography
          variant="h3"
          sx={{
            lineHeight: '55px',
            fontWeight: '400',
          }}
        >
          {t('Contact_Us_title')}
        </Typography>
      </m.div>
      <m.div variants={varFade().inDown}>
        <Typography
          variant="body1"
          color={Theme.palette.text.secondary}
          sx={{
            fontWeight: '400',
            marginBottom: { xs: 5, md: '38px' },
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: t('Contact_Us_text') }} />
        </Typography>
      </m.div>
      <Formik
        initialValues={{ name: '', email: '' }}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Please enter your name'),
          email: Yup.string().email().required('Please enter your email'),
        })}
      >
        {(formik) => (
          <Form>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label={t('Contact_Us_form_name')}
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  InputProps={{
                    sx: {
                      borderRadius: 80,

                      background: Theme.palette.background.neutral,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: Theme.palette.background.neutral,
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: Theme.palette.background.neutral,
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: Theme.palette.background.neutral,
                      },
                    },
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      padding: '16.5px 27px',
                    },
                    '& .MuiInputLabel-root': {
                      left: '12px',
                    },
                  }}
                />
              </Grid>
              <Grid xs={12}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: 2,
                  }}
                >
                  <TextField
                    label={t('Contact_Us_form_email')}
                    name="email"
                    fullWidth
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputProps={{
                      sx: {
                        borderRadius: 80,
                        background: Theme.palette.background.neutral,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: Theme.palette.background.neutral,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: Theme.palette.background.neutral,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: Theme.palette.background.neutral,
                        },
                      },
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        padding: '16.5px 27px',
                      },
                      '& .MuiInputLabel-root': {
                        left: '12px',
                      },
                    }}
                  />
                  <Button
                    color="info"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={formik.isSubmitting}
                    sx={{
                      borderRadius: 80,
                      fontWeight: 700,
                      fontSize: 13,
                      textTransform: 'capitalize',
                    }}
                  >
                    {t('Contact_Us_form_btn')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );

  return (
    <Container
      id="Contact-mia"
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={{ xs: 8, md: 10 }}
      >
        <Grid xs={12} md={6}>
          {renderForm}
        </Grid>

        <Grid xs={12} md={6}>
          <m.div variants={varFade().inUp}>{renderAcoordions}</m.div>
        </Grid>
      </Grid>
    </Container>
  );
}

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import IconCup from './IconCup';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
  color: theme.palette.text.primary,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '12px',
  padding: '12px',
  fontSize: '14px',
}));

export default function TopWords() {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader title="Top Words" />
      <CardContent>
        <Stack spacing={2}>
          <StyledBox>
            <Typography>word 1</Typography>
            <IconCup color={theme.palette.info.main} />
          </StyledBox>
          <StyledBox>
            <Typography>word 1</Typography>
            <IconCup color={theme.palette.primary.main} />
          </StyledBox>
          <StyledBox>
            <Typography>word 1</Typography>
            <IconCup color={theme.palette.error.main} />
          </StyledBox>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <StyledBox>word 4</StyledBox>
            </Grid>
            <Grid item xs={6}>
              <StyledBox>word 5</StyledBox>
            </Grid>

            <Grid item xs={6}>
              <StyledBox>word 4</StyledBox>
            </Grid>
            <Grid item xs={6}>
              <StyledBox>word 5</StyledBox>
            </Grid>

            <Grid item xs={6}>
              <StyledBox>word 4</StyledBox>
            </Grid>
            <Grid item xs={6}>
              <StyledBox>word 5</StyledBox>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}

// @mui
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';

// components
import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';


// ----------------------------------------------------------------------

type RowProps = {
  id: string;
  ubicacion: string;
  porcentajePos: string;
  porcentajeEngagement: string;
  menciones: string;
  ranking: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableLabels: any;
  tableData: RowProps[];
}

export default function DemographicsTable({
  title,
  subheader,
  tableLabels,
  tableData,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 960 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <BookingDetailsRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />
    </Card>
  );
}

// ----------------------------------------------------------------------

type BookingDetailsRowProps = {
  row: RowProps;
};

function BookingDetailsRow({ row }: BookingDetailsRowProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  // Definimos una función para obtener el color basado en el ranking
  const getColorFromRanking = (rank: string) => {
    switch (rank) {
      case '#1':
        return 'success';
      case '#2':
        return 'warning';
      case '#3':
        return 'error';
      default:
        return 'error';
    }
  };


  return (
      <TableRow>
        <TableCell sx={{ fontWeight: 'bold' }}>{row.ubicacion}</TableCell>
        <TableCell>{row.porcentajePos}</TableCell>
        <TableCell>{row.porcentajeEngagement}</TableCell>
        <TableCell>{row.menciones}</TableCell>

        <TableCell>
          <Label variant={isLight ? 'soft' : 'filled'} color={getColorFromRanking(row.ranking)}>
            {row.ranking}
          </Label>
        </TableCell>
      </TableRow>
  );
}

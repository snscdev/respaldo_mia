// @mui
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
// utils
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

// type ListItem = {
//   id: string;
//   title: string;
//   time: Date;
//   type: string;
// };

interface ListItem {
  title: string;
  subtitle: string;
}

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ListItem[];
}

export default function AnalyticsOrderTimeline({ title, subheader, list, ...other }: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        subheaderTypographyProps={{ align: 'right' }}
      />

      <Timeline
        sx={{
          m: 0,
          pl: 3,
          pt: 0,
          [`& .${timelineItemClasses.root}:last-child`]: {
            mb: 0, // Estilo añadido para eliminar el margen inferior del último elemento
          },
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list.map((item, index) => (
          <OrderItem
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            type={`order${index + 1}`}
            lastTimeline={index === list.length - 1}
          />
        ))}
      </Timeline>
    </Card>
  );
}

// ----------------------------------------------------------------------

type OrderItemProps = {
  title: string;
  subtitle: string;
  type: string;
  lastTimeline: boolean;
};

function OrderItem({ title, subtitle, type, lastTimeline }: OrderItemProps) {
  const getColor = (inputtype: string) => {
    switch (inputtype) {
      case 'order1':
        return 'primary';
      case 'order2':
        return 'success';
      case 'order3':
        return 'info';
      case 'order4':
        return 'warning';
      default:
        return 'error';
    }
  };

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color={getColor(type)} />
        {lastTimeline ? null : <TimelineConnector sx={{ height: 0 }} />}{' '}
        {/* Aquí mantenemos la altura de los conectores en 20 */}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ fontStyle: 'italic', opacity: 0.5, fontSize: 13 }}
        >
          {subtitle}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

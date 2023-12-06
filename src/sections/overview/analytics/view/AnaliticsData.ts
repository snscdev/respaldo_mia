import { useTheme } from '@mui/material';

export default function useChartsData() {
  const theme = useTheme();

  function generateRandomData(length: number) {
    return Array.from({ length }, () => Math.floor(Math.random() * 100));
  }

  const yearlySalesData: any = {
    colors: [theme.palette.primary.light, theme.palette.primary.main],
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    series: [
      {
        year: 'Mes',
        data: [
          { name: 'Me Gusta', data: generateRandomData(5) },
          { name: 'Comentarios', data: generateRandomData(5) },
          { name: 'Compartidas', data: generateRandomData(5) },
        ],
      },
      {
        year: 'Semana',
        data: [
          { name: 'Me Gusta', data: generateRandomData(5) },
          { name: 'Comentarios', data: generateRandomData(5) },
          { name: 'Compartidas', data: generateRandomData(5) },
        ],
      },
      {
        year: 'Dia',
        data: [
          { name: 'Me Gusta', data: generateRandomData(5) },
          { name: 'Comentarios', data: generateRandomData(5) },
          { name: 'Compartidas', data: generateRandomData(5) },
        ],
      },
      {
        year: 'Año',
        data: [
          { name: 'Me Gusta', data: generateRandomData(5) },
          { name: 'Comentarios', data: generateRandomData(5) },
          { name: 'Compartidas', data: generateRandomData(5) },
        ],
      },
    ],
  };

  const EmotionPerHora: any = {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main,
      theme.palette.background.purpel.main,
      theme.palette.primary.light,
    ],
    series: [
      {
        type: 'Mañana',
        data: [
          {
            name: 'Felicidad',
            data: [10, 41, 35, 151, 49, 62, 69],
          },
          {
            name: 'Tristeza',
            data: [10, 20, 13, 55, 45, 15, 12],
          },
          {
            name: 'Enojo',
            data: [8, 52, 32, 25, 47, 58, 19],
          },
          {
            name: 'Disgusto',
            data: [10, 34, 13, 56, 77, 88, 99],
          },
          {
            name: 'Miedo',
            data: [10, 54, 13, 16, 77, 28, 99],
          },
          {
            name: 'sorpresa',
            data: [10, 34, 13, 56, 77, 88, 99],
          },
        ],
      },
      {
        type: 'Tarde',
        data: [
          {
            name: 'Felicidad',
            data: [10, 41, 35, 151, 49, 62, 69],
          },
          {
            name: 'Tristeza',
            data: [10, 20, 13, 55, 45, 15, 12],
          },
          {
            name: 'Enojo',
            data: [8, 52, 32, 25, 47, 58, 19],
          },
          {
            name: 'Disgusto',
            data: [10, 34, 13, 56, 77, 88, 99],
          },
          {
            name: 'Miedo',
            data: [10, 54, 13, 16, 77, 28, 99],
          },
          {
            name: 'sorpresa',
            data: [10, 34, 13, 56, 77, 88, 99],
          },
        ],
      },
      {
        type: 'Noche',
        data: [
          {
            name: 'Felicidad',
            data: [10, 41, 35, 151, 49, 62, 69],
          },
          {
            name: 'Tristeza',
            data: [10, 20, 13, 55, 45, 15, 12],
          },
          {
            name: 'Enojo',
            data: [8, 52, 32, 25, 47, 58, 19],
          },
          {
            name: 'Disgusto',
            data: [10, 34, 13, 56, 77, 88, 99],
          },
          {
            name: 'Miedo',
            data: [10, 54, 13, 16, 77, 28, 99],
          },
          {
            name: 'sorpresa',
            data: [10, 34, 13, 56, 77, 88, 99],
          },
        ],
      },
    ],
  };

  const EmotionAnalysis: any = {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main,
      theme.palette.background.purpel.main,
      theme.palette.primary.light,
    ],
    series: [
      { label: 'Felicidad', value: 4344 },
      { label: 'Tristeza', value: 5435 },
      { label: 'Enojo', value: 1443 },
      { label: 'Disgusto', value: 4443 },
      { label: 'Miedo', value: 5435 },
      { label: 'Sorpresa', value: 1443 },
    ],
  };

  const Feeling: any = {
    labels: {
      Dia: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
      Hora: [
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
      ],
    },
    colors: [theme.palette.info.main, theme.palette.error.main],
    series: [
      {
        type: 'Dia',
        data: [
          { name: 'Positivo', data: [20, 34, 48, 65, 37, 48, 28] },
          { name: 'Negativo', data: [10, 34, 13, 26, 27, 28, 15] },
        ],
      },
      {
        type: 'Hora',
        data: [
          {
            name: 'Positivo',
            data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
          },
          {
            name: 'Negativo',
            data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
          },
        ],
      },
    ],
  };

  const TopHashtags: any = [
    {
      title: '#YOLO',
      subtitle: 'Sentimiento: [Sentimiento]',
    },
    {
      title: '12 Invoices have been paid',
      subtitle: 'Sentimiento: [Sentimiento]',
    },
    {
      title: 'Order #37745 from September',
      subtitle: 'Sentimiento: [Sentimiento]',
    },
    {
      title: 'New order placed #XF-2356',
      subtitle: 'Sentimiento: [Sentimiento]',
    },
    {
      title: 'New order placed #XF-2356',
      subtitle: 'Sentimiento: [Sentimiento]',
    },
  ];
  return {
    EmotionPerHora,
    yearlySalesData,
    EmotionAnalysis,
    Feeling,
    TopHashtags,
  };
}

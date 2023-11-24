import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { Card, CardProps, CardHeader, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Word {
  word: string;
  size: number;
}

interface WordCloudProps extends CardProps {
  title?: string;
  subheader?: string;
  positiveWords: Word[]; // conjunto de palabras positivas
  negativeWords: Word[]; // conjunto de palabras negativas
}

const WordCloud: React.FC<WordCloudProps> = ({
  positiveWords,
  negativeWords,
  title,
  subheader,
  ...other
}) => {
  const ref = useRef(null);
  const theme = useTheme();
  const [dataSet, setDataSet] = useState('Positive');

  const handleDataSetChange = (event: React.MouseEvent<HTMLElement>, newDataSet: string) => {
    if (newDataSet !== null) {
      setDataSet(newDataSet);
    }
  };

  const currentWords = dataSet === 'Positive' ? positiveWords : negativeWords;

  // Esta función devuelve aleatoriamente uno de los colores mencionados.
  const getRandomColor = useCallback(() => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.success.main,
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }, [theme.palette.primary.main, theme.palette.secondary.main, 
    theme.palette.error.main, theme.palette.warning.main, 
    theme.palette.info.main, theme.palette.success.main]);
  

  useEffect(() => {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 }
    const width = 450 - margin.left - margin.right
    const height = 290 - margin.top - margin.bottom;

    const svgRef = ref.current

    d3.select(svgRef).selectAll('*').remove();

    const svg = d3
      .select(svgRef)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const maxWordSize = Math.max(...currentWords.map((w) => w.size)); // Usamos currentWords en lugar de words
    const minWordSize = Math.min(...currentWords.map((w) => w.size)); // Usamos currentWords en lugar de words
    const fontSizeScale = d3.scaleLinear().domain([minWordSize, maxWordSize]).range([15, 55]); // Puedes ajustar este rango según necesites

    const layout: any = cloud()
      .size([width, height])
      .words(currentWords.map((d) => ({ text: d.word, size: fontSizeScale(d.size) })))
      .padding(6)
      .rotate(() => 0)
      .fontSize((d: any) => d.size || 10)
      .spiral('archimedean') // Puedes intentar con "rectangular" también
      .on('end', draw);

    layout.start();

    function draw(formedWords: any[]) {
      const fontFamily = theme.typography.fontFamily || 'Arial';
    
      svg
        .append('g')
        .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
        .selectAll('text')
        .data(formedWords)
        .enter()
        .append('text')
        .style('font-size', (d) => `${d.size}px`)
        .style('font-weight', 'bold') // Estilo negrita
        .attr('text-anchor', 'middle')
        .style('font-family', fontFamily)
        .style('fill', () => getRandomColor()) // Color aleatorio
        .attr('transform', (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
        .text((d) => d.text);
    }

    return () => {
      d3.select(svgRef).selectAll('*').remove();
    };
  }, [currentWords, theme, getRandomColor]);

  return (
    <Card {...other}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
        <CardHeader title={title} subheader={subheader} />
        <ToggleButtonGroup
          value={dataSet}
          exclusive
          onChange={handleDataSetChange}
          aria-label="data set"
          sx={{ marginTop: 2 }}
        >
          <ToggleButton
            value="Positive"
            aria-label="Positive"
            sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.8)' }}
          >
            Positivas
          </ToggleButton>
          <ToggleButton
            value="Negative"
            aria-label="Negative"
            sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.8)' }}
          >
            Negativas
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ p: 3, pb: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg ref={ref} />
      </Box>
    </Card>
  );
};

export default WordCloud;

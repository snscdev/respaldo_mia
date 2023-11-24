import React, { useRef, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { Card, CardProps, CardHeader, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Word {
    word: string;
    size: number;
}

interface WordCloudProps extends CardProps {
    title?: string;
    words: Word[];
}

const WordCloudRelatedTopics: React.FC<WordCloudProps> = ({ words, title, ...other }) => {
    const ref = useRef(null);
    const theme = useTheme();

    // Esta función devuelve aleatoriamente uno de los colores mencionados.
    const getRandomColor = useCallback(() => {
        const colors = [
          theme.palette.primary.main,
          theme.palette.primary.main,
          theme.palette.primary.main,
          theme.palette.success.main,
          theme.palette.info.main,
          theme.palette.warning.main,
          theme.palette.error.main
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }, [theme]);

    useEffect(() => {
        const margin = { top: 10, right: 10, bottom: 10, left: 10 }
        const width = 450 - margin.left - margin.right
        const height = 310 - margin.top - margin.bottom

        const svgRef = ref.current
    
        d3.select(svgRef).selectAll("*").remove();
    
        const svg = d3.select(svgRef)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
    
        const maxWordSize = Math.max(...words.map(w => w.size));
        const minWordSize = Math.min(...words.map(w => w.size));
        const fontSizeScale = d3.scaleLinear()
            .domain([minWordSize, maxWordSize])
            .range([15, 55]);  // Puedes ajustar este rango según necesites
    
        const layout: any = cloud()
            .size([width, height])
            .words(words.map(d => ({ text: d.word, size: fontSizeScale(d.size) }))) // Usar la escala de tamaño
            .padding(6)
            .rotate(() => 0)
            .fontSize((d: any) => d.size || 10)
            .spiral("archimedean") // Puedes intentar con "rectangular" también
            .on("end", draw);
    
        layout.start();

        function draw(formedWords: any[]) {
            const fontFamily = theme.typography.fontFamily || "Arial";

            svg
                .append("g")
                .attr("transform", `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
                .selectAll("text")
                .data(formedWords)
                .enter().append("text")
                .style("font-size", d => `${d.size}px`)
                .style("font-weight", "bold")  // Estilo negrita
                .attr("text-anchor", "middle")
                .style("font-family", fontFamily)
                .style("fill", () => getRandomColor())  // Color aleatorio
                .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
                .text(d => d.text);
        }

        return () => {
            d3.select(svgRef).selectAll("*").remove();
        };

    }, [words, theme, getRandomColor]);

    return (
        <Card {...other}>
            <CardHeader title={title} />
            <Box sx={{ p: 0, pb: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg ref={ref}/>
            </Box>
        </Card>
    );
}

export default WordCloudRelatedTopics;

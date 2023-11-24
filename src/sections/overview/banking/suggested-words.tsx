import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card, { CardProps } from '@mui/material/Card';
import { TypeAnimation } from 'react-type-animation';
import Iconify from 'src/components/iconify';

interface Props extends CardProps {
    texts: string[];
}

export default function SuggestedWords({
    texts,
    sx,
    ...other
}: Props) {
    const theme = useTheme();

    const sequence = [];
    for (let i = 0; i < texts.length; i+=1) {
        sequence.push(texts[i]);
        if (i < texts.length - 1) {
            sequence.push(1000, 1000);
        } else {
            sequence.push(1000);
        }
    }

    return (
        <Card {...other} sx={{ ...sx, backgroundColor: 'common.white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <Box sx={{ textAlign: 'center', mt: 2, mb: 1 }}>
                <TypeAnimation
                    sequence={sequence}
                    wrapper="span"
                    cursor
                    speed={{ type: 'keyStrokeDelayInMs', value: 150 }}
                    repeat={Infinity}
                    style={{
                        fontSize: '2em',
                        display: 'inline-block',
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: 'bold'
                    }}
                />
            </Box>

            <Box sx={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', alignItems: 'center', opacity: 0.4 }}>
                <Box sx={{ mr: 1, fontWeight: 'bold', fontSize: '0.7em' }}>
                    Lo que buscan sobre ti en:
                </Box>
                <Iconify width={20} icon="fe:google" sx={{ mb: 0.5, mr: 1 }} />
            </Box>

        </Card>
    );
}

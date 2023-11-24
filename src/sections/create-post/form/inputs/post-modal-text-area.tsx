'use client';

import { Box, IconButton, Menu, styled, useTheme } from '@mui/material';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import { useLocales } from 'src/locales';

const TextArea = styled('textarea')(({ theme }) => ({
  width: '100%',
  height: 140,
  fontFamily: theme.typography.fontFamily,
  backgroundColor: theme.palette.background.paper,
  padding: 16,
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 400,
  border: `none`,
  color: theme.palette.text.primary,
  resize: 'none',
  '&:focus': {
    outline: 'none',
  },
}));

const TexAreaContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  borderRadius: 8,
  border: `1px solid ${theme.palette.info.main}`,
  '&:focus': {
    border: `1px solid ${theme.palette.info.main} !important`,
  },
}));
export default function PostTextArea() {
  const { currentLang } = useLocales();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [text, setText] = useState('');

  const [showPicker, setShowPicker] = useState(false);

  const Theme = useTheme();

  const onEmojiClick = ({ emoji }: EmojiClickData, emojiObject: any) => {
    setText((previus) => previus + emoji);
    setShowPicker(false);
  };

  const openEmojiPicker = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setShowPicker((prevShowPicker) => !prevShowPicker);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return (
    <TexAreaContainer>
      <TextArea lang={currentLang.label} value={text} onChange={handleChange} />
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '0 16px',
          height: 48,
          backgroundColor: theme.palette.background.neutral,
          borderRadius: '0 0 8px 8px',
          position: 'relative',
        })}
      >
        <IconButton onClick={openEmojiPicker}>
          <span
            style={{
              width: 24,
              height: 24,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            😀
          </span>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open
          onClose={() => setShowPicker(false)}
          sx={{ display: showPicker ? 'block' : 'none' }}
        >
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </Menu>
        <IconButton onClick={openEmojiPicker}>
          <Iconify icon="fontisto:hashtag" />
        </IconButton>
        <IconButton onClick={openEmojiPicker}>
          <Iconify icon="streamline:sign-at-solid" />
        </IconButton>
      </Box>
    </TexAreaContainer>
  );
}

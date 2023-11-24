import {
  Box,
  Button,
  Link,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from '@mui/material';
import { useState } from 'react';
import Image from 'src/components/image/image';
import { SOCIALNETWORKS } from 'src/const/post/redes';
import { useResponsive } from 'src/hooks/use-responsive';
import { useLocales } from 'src/locales';

interface IPostModalForm {
  modalStateMobile: {
    open: boolean;
    setOpen: (open: boolean) => void;
  };
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  /// sin border
  '&.MuiToggleButtonGroup-root': {
    border: 'none',
    gap: 16,
  },
});

const StyledToogleButton = styled(ToggleButton)(({ theme }) => ({
  '&.MuiToggleButton-root': {
    '&.MuiToggleButton-root': {
      border: `1px solid ${theme.palette.background.neutral} !important`,
    },
    '&.Mui-selected': {
      border: `1px solid ${theme.palette.info.main} !important`,
      backgroundColor: '#fff !important',
    },
  },
}));

export default function PostModalForm({ modalStateMobile }: IPostModalForm) {
  const mdDown = useResponsive('down', 'md');

  const [socialNetworkSelected, setSocialNetworkSelected] = useState(() => ['facebook']);

  const handleClickSocialNetwork = (
    event: React.MouseEvent<HTMLElement>,
    newSocialNetwork: string[]
  ) => {
    setSocialNetworkSelected(newSocialNetwork);
  };
  const { t } = useLocales();

  const renderButons = (
    <StyledToggleButtonGroup value={socialNetworkSelected} onChange={handleClickSocialNetwork}>
      {SOCIALNETWORKS.map((social) => (
        <StyledToogleButton key={social.name} value={social.name}>
          <Image
            src={`/assets/icons/dashboard/post/${social.name}.svg`}
            alt={social.name}
            width={24}
            height={24}
          />
        </StyledToogleButton>
      ))}
    </StyledToggleButtonGroup>
  );

  return (
    <Stack
      sx={{
        padding: '24px 24px 0 0',
        gap: '24px',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {t('Dashboard.Create_Post.Title')}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <Typography sx={{ fontWeight: 400, fontSize: 14 }}>
          {t('Dashboard.Create_Post.Modal.Publish_in')}
        </Typography>

        <Link
          href="#"
          underline="hover"
          sx={(theme) => ({
            color: theme.palette.info.main,
          })}
        >
          {t('Dashboard.Create_Post.Modal.connect_SocialNetworks')}
        </Link>
      </Box>
      {renderButons}

      {mdDown && <Button onClick={() => modalStateMobile.setOpen(true)}>Open</Button>}
    </Stack>
  );
}

'use client';

import merge from 'lodash/merge';
import { enUS as enUSAdapter, es as esAdapter } from 'date-fns/locale';
// core
import { enUS as enUSCore, esES as esSACore } from '@mui/material/locale';
// date-pickers
import { enUS as enUSDate, esES as esSDDataGrid } from '@mui/x-date-pickers/locales';
// data-grid
import { enUS as enUSDataGrid, esES as esSDataGrid } from '@mui/x-data-grid';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
  },
  {
    label: 'Spanish',
    value: 'es',
    systemValue: merge(esSDDataGrid, esSDataGrid, esSACore),
    adapterLocale: esAdapter,
    icon: 'flagpack:es',
  },
];

export const defaultLang = allLangs[1]; // Spanish

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0

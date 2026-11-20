/**
 * Design system theme
 * Central export for all design tokens
 */

import { colors } from './colors';
import { typography } from './typography';
import { shadows } from './shadows';
import { spacing, borderRadius } from './spacing';

export const theme = {
  colors,
  typography,
  shadows,
  spacing,
  borderRadius,
} as const;

export default theme;

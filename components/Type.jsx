import React from 'react';
import { string } from 'prop-types';
import Chip from '@material-ui/core/Chip';

const TYPE_COLORS = {
  STANDARD: 'default',
  BACKSTAGE_PASS: 'primary',
  CONJURED: 'secondary',
};

const TYPE_LABELS = {
  STANDARD: 'Standard',
  BACKSTAGE_PASS: 'Backstage pass',
  CONJURED: 'Conjured',
};

/**
 * A simple chip that displays.
 *
 * @param {string} type - The type to display.
 * @returns {React.Element} The rendered element.
 */
const Type = ({ type }) => (
  <Chip label={TYPE_LABELS[type]} color={TYPE_COLORS[type] || 'default'} />
);

Type.propTypes = {
  type: string.isRequired,
};

export default Type;

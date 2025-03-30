// src/components/builder/BackgroundSelector.tsx

import React from 'react';
import { Box, RadioGroup, Radio, Stack, Text } from '@chakra-ui/react';

// Interface für Background-Daten
export interface Background {
  id: string;
  name: string;
  description: string;
}

// Props für die BackgroundSelector-Komponente
export interface BackgroundSelectorProps {
  backgrounds: Background[];
  selected: string;
  onSelect: (id: string) => void;
}

// BackgroundSelector-Komponente
const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ backgrounds, selected, onSelect }) => {
  return (
    <Box>
      {/* Titel */}
      <Text fontSize="xl" mb={4}>Choose a Background</Text>

      {/* Auswahlmöglichkeiten */}
      <RadioGroup onChange={onSelect} value={selected}>
        <Stack direction="column">
          {backgrounds.map((bg) => (
            <Radio key={bg.id} value={bg.id} alignItems="start">
              <Box>
                <Text fontWeight="bold">{bg.name}</Text>
                <Text fontSize="sm" color="gray.500">{bg.description}</Text>
              </Box>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
};

// Standardexport
export default BackgroundSelector;

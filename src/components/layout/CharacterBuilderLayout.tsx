// src/components/layout/CharacterBuilderLayout.tsx

import React, { useEffect, useState } from 'react';
import { Box, TabPanel, TabPanels, Tabs, TabList, Tab } from '@chakra-ui/react';
import AbilitySelector from '../builder/AbilitySelector';
import BackgroundSelector from '../builder/BackgroundSelector';
import ClassSelector from '../builder/ClassSelector';
import EquipmentSelector from '../builder/EquipmentSelector';
import FeatSelector from '../builder/FeatSelector';
import InventoryManager from '../builder/InventoryManager';
import SpeciesSelector from '../builder/SpeciesSelector';
import CharacterDetails from '../builder/CharacterDetails';
import SummaryTab from '../builder/SummaryTab';
import AdditionalTreasure from '../builder/AdditionalTreasure';

import { hasSpellcasting } from '@/utils/spellcasting';

// Importieren der Typen und der Daten
import { Ability, Feat, AbilityDetail } from '@/types/character';
import abilitiesData from '@/data/2024/abilities.json';
import speciesData from '@/data/2024/species.json';
import classesData from '@/data/2024/classes.json';
import backgroundsData from '@/data/2024/backgrounds.json';
import featsData from '@/data/2024/feats.json';
import equipmentData from '@/data/2024/equipment.json';

export default function CharacterBuilderLayout() {
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [alignment, setAlignment] = useState<string>('');
  const [inspiration, setInspiration] = useState<boolean>(false);
  const [species, setSpecies] = useState<string>('');
  const [background, setBackground] = useState<string>('');
  const [characterClass, setCharacterClass] = useState<string>('');
  const [level, setLevel] = useState<number>(1);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedFeats, setSelectedFeats] = useState<string[]>([]);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [inventory, setInventory] = useState<string[]>([]);
  const [treasure, setTreasure] = useState<string[]>([]);
  const [abilities, setAbilities] = useState<Record<string, AbilityDetail>>({});

  useEffect(() => {
    const initAbilities: Record<string, AbilityDetail> = {};
    abilitiesData.forEach((ability) => {
      initAbilities[ability.id.toUpperCase()] = {
        base: 10,
        bonus: 0,
        total: 10,
        modifier: 0
      };
    });
    setAbilities(initAbilities);
  }, []);

  const handleAbilityChange = (ability: string, newValue: number) => {
    setAbilities((prev) => {
      const modifier = Math.floor((newValue - 10) / 2);
      return {
        ...prev,
        [ability.toUpperCase()]: {
          ...prev[ability.toUpperCase()],
          total: newValue,
          modifier
        }
      };
    });
  };

  const handleLanguageToggle = (lang: string) => {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleFeatToggle = (name: string) => {
    setSelectedFeats((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  const handleAddItem = (item: string) => setInventory((prev) => [...prev, item]);
  const handleRemoveItem = (index: number) =>
    setInventory((prev) => prev.filter((_, i) => i !== index));

  const handleAddTreasure = (item: string) => setTreasure((prev) => [...prev, item]);
  const handleRemoveTreasure = (index: number) =>
    setTreasure((prev) => prev.filter((_, i) => i !== index));

  const spellcasting = hasSpellcasting(characterClass, level);

  const transformedFeatsData = featsData.map(feat => {
    // Create a safe copy to work with
    let abilityScoreIncrease: Record<string, number> = {};
    
    // Only process if it's not null
    if (feat.abilityScoreIncrease !== null) {
      // Convert each valid entry to a number, filtering out undefined values
      Object.entries(feat.abilityScoreIncrease).forEach(([key, value]) => {
        if (value !== undefined) {
          // Ensure all values are numbers
          abilityScoreIncrease[key] = value === null ? 0 : Number(value);
        }
      });
    }
    
    return {
      ...feat,
      abilityScoreIncrease // This is now always a Record<string, number>
    };
  });

  return (
    <Tabs variant="enclosed" isFitted>
      <TabList>
        <Tab>Details</Tab>
        <Tab>Species</Tab>
        <Tab>Class</Tab>
        <Tab>Background</Tab>
        <Tab>Abilities</Tab>
        <Tab>Feats</Tab>
        <Tab>Equipment</Tab>
        <Tab>Inventory</Tab>
        <Tab>Summary</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CharacterDetails
            name={name}
            gender={gender}
            alignment={alignment}
            inspiration={inspiration}
            onDetailChange={(field: string, value: string | boolean) => {
              if (field === 'name') setName(value as string);
              if (field === 'gender') setGender(value as string);
              if (field === 'alignment') setAlignment(value as string);
              if (field === 'inspiration') setInspiration(value as boolean);
            }}
            languages={languages}
            knownLanguages={languages}
            onToggleLanguage={handleLanguageToggle}
            onChange={() => {}}
          />
        </TabPanel>
        <TabPanel>
          <SpeciesSelector speciesList={speciesData} selected={species} onSelect={setSpecies} />
        </TabPanel>
        <TabPanel>
          <ClassSelector classes={classesData} selected={characterClass} onSelect={setCharacterClass} />
        </TabPanel>
        <TabPanel>
          <BackgroundSelector backgrounds={backgroundsData} selected={background} onSelect={setBackground} />
        </TabPanel>
        <TabPanel>
          <AbilitySelector abilities={abilities} onChange={handleAbilityChange} />
        </TabPanel>
        <TabPanel>
          <FeatSelector
            feats={transformedFeatsData}
            selectedFeats={selectedFeats}
            level={level}
            knownAbilities={Object.fromEntries(
              Object.entries(abilities).map(([k, v]) => [k, v.total])
            )}
            hasSpellcasting={spellcasting}
            onToggle={handleFeatToggle}
          />
        </TabPanel>
        <TabPanel>
          <EquipmentSelector
            options={equipmentData}
            selected={equipment}
            onToggle={(name) =>
              setEquipment((prev) =>
                prev.includes(name) ? prev.filter((e) => e !== name) : [...prev, name]
              )
            }
          />
          <Box mt={4}>
            <AdditionalTreasure
              treasure={treasure}
              onAdd={handleAddTreasure}
              onRemove={handleRemoveTreasure}
            />
          </Box>
        </TabPanel>
        <TabPanel>
          <InventoryManager inventory={inventory} onAdd={handleAddItem} onRemove={handleRemoveItem} />
        </TabPanel>
        <TabPanel>
          <SummaryTab
            name={name}
            gender={gender}
            alignment={alignment}
            species={species}
            characterClass={characterClass}
            background={background}
            abilities={abilities}
            feats={selectedFeats}
            equipment={[...equipment, ...treasure]}
            languages={languages}
            inventory={inventory}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
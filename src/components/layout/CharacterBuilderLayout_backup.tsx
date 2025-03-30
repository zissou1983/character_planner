import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import classListRaw from '@/rulesets/2024/data/classes.json';
import speciesRaw from '@/rulesets/2024/data/species.json';
import backgroundListRaw from '@/rulesets/2024/data/backgrounds.json';
import abilityListRaw from '@/rulesets/2024/data/abilities.json';
import featsRaw from '@/rulesets/2024/data/feats.json';
import languageListRaw from '@/rulesets/2024/data/languages.json';
import equipmentListRaw from '@/rulesets/2024/data/equipment.json';

interface Feat {
  id: string;
  name: string;
  category: 'Origin' | 'General' | 'Fighting Style' | 'Epic Boon';
  levelRequirement?: number;
  abilityRequirement?: { [key: string]: number };
  requiresSpellcasting?: boolean;
  description: string;
}

interface Ability {
  id: string;
  name: string;
}

interface Class {
  id: string;
  name: string;
  spellcasting?: boolean;
}

interface Background {
  id: string;
  name: string;
  description: string;
}

interface Lineage {
  id: string;
  name: string;
  description: string;
}

interface Species {
  id: string;
  name: string;
  description: string;
  lineages: Lineage[];
}

interface Language {
  id: string;
  name: string;
  description: string;
}

interface EquipmentItem {
  id: string;
  category: string;
  subCategory: string;
  name: string;
  weight: number;
  cost: number;
  cheap: number;
  expensive: number;
  source: string;
  availableIn: string[];
}

const steps = ['class', 'background', 'species', 'details', 'abilities', 'equipment', 'feats', 'summary'];
const INITIAL_ABILITY_SCORE = 8;
const MAX_ABILITY_SCORE = 15;
const MIN_ABILITY_SCORE = 8;
const TOTAL_POINTS = 27;

const classList = classListRaw as Class[];
const backgroundList = backgroundListRaw as Background[];
const speciesList = speciesRaw as Species[];
const abilityList = abilityListRaw as Ability[];
const featsList = featsRaw as Feat[];
const languageList = languageListRaw as Language[];
const equipmentList: EquipmentItem[] = equipmentListRaw.map((item) => ({
  ...item,
  weight: parseFloat(item.weight),
  cost: parseFloat(item.cost),
  cheap: parseFloat(item.cheap),
  expensive: parseFloat(item.expensive),
}));


export default function CharacterBuilderLayout() {
  const [activeTab, setActiveTab] = useState('class');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedLineage, setSelectedLineage] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedFeats, setSelectedFeats] = useState<string[]>([]);
  const [characterName, setCharacterName] = useState('');
  const [characterGender, setCharacterGender] = useState('');
  const [characterAlignment, setCharacterAlignment] = useState('');

  const [abilities, setAbilities] = useState<Record<string, number>>(
    Object.fromEntries(abilityList.map((a) => [a.id, INITIAL_ABILITY_SCORE]))
  );
  const [selectedEquipmentCategory, setSelectedEquipmentCategory] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [equipmentSubTab, setEquipmentSubTab] = useState('equipment-selection');
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);
  const [equippedItems, setEquippedItems] = useState<EquipmentItem[]>([]);
  const [inventoryItems, setInventoryItems] = useState<EquipmentItem[]>([]);

  const calculatePointCost = (score: number): number => {
    if (score <= 13) return score - 8;
    if (score === 14) return 6;
    if (score === 15) return 8;
    return 0;
  };

  const getTotalPointsUsed = (): number =>
    Object.values(abilities).reduce((sum, score) => sum + calculatePointCost(score), 0);

  const handleAbilityChange = (id: string, direction: 'up' | 'down') => {
    setAbilities((prev) => {
      const current = prev[id];
      const newScore =
        direction === 'up'
          ? Math.min(current + 1, MAX_ABILITY_SCORE)
          : Math.max(current - 1, MIN_ABILITY_SCORE);

      const newAbilities = { ...prev, [id]: newScore };
      const usedPoints = Object.entries(newAbilities).reduce(
        (sum, [, val]) => sum + calculatePointCost(val),
        0
      );

      return usedPoints > TOTAL_POINTS ? prev : newAbilities;
    });
  };

  const handleContinue = () => {
    const currentIndex = steps.indexOf(activeTab);
    const nextTab = steps[currentIndex + 1];
    if (nextTab) setActiveTab(nextTab);
  };

  const getFilteredFeats = (category: Feat['category']) => {
    return featsList.filter((feat) => {
      if (feat.category !== category) return false;
      if (feat.levelRequirement && selectedLevel < feat.levelRequirement) return false;
      if (feat.abilityRequirement) {
        return Object.entries(feat.abilityRequirement).every(
          ([abilityId, requiredScore]) => abilities[abilityId] >= requiredScore
        );
      }
      if (
        feat.requiresSpellcasting &&
        !classList.find((cls) => cls.id === selectedClass)?.spellcasting
      ) {
        return false;
      }
      return true;
    });
  };
  const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring',
    {
      variants: {
        variant: {
          default: 'bg-primary text-white hover:bg-primary/90',
          outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
          ghost: 'hover:bg-accent hover:text-accent-foreground',
          link: 'underline-offset-4 hover:underline text-primary',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  )
  const handleEquipItem = (item: EquipmentItem) => {
    setEquippedItems((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev
        : [...prev, item]
    );
  };

  const handleAddToInventory = (item: EquipmentItem) => {
    setInventoryItems((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev
        : [...prev, item]
    );
  };
  

  const equipmentCategories = Array.from(new Set(equipmentList.map(item => item.category))).sort();
  const filteredEquipment = equipmentList.filter(item => item.category === selectedEquipmentCategory);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="mb-4">
        {steps.map((step) => (
          <TabsTrigger key={step} value={step}>
            {step}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* === CLASS === */}
      <TabsContent value="class">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-2xl font-bold">Wähle deine Klasse</h3>
            <div className="grid grid-cols-2 gap-2">
              {classList.map((cls) => (
                <label key={cls.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="class"
                    value={cls.id}
                    checked={selectedClass === cls.id}
                    onChange={() => setSelectedClass(cls.id)}
                    className="mr-2"
                  />
                  {cls.name}
                </label>
              ))}
            </div>
            <Button onClick={handleContinue} disabled={!selectedClass}>
              Weiter
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* === BACKGROUND === */}
      <TabsContent value="background">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-2xl font-bold">Wähle deinen Background</h3>
            <div className="grid grid-cols-2 gap-2">
              {backgroundList.map((bg) => (
                <label key={bg.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="background"
                    value={bg.id}
                    checked={selectedBackground === bg.id}
                    onChange={() => setSelectedBackground(bg.id)}
                    className="mr-2"
                  />
                  {bg.name}
                </label>
              ))}
            </div>
            <Button onClick={handleContinue} disabled={!selectedBackground}>
              Weiter
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* === SPECIES === */}
      <TabsContent value="species">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-2xl font-bold">Wähle deine Spezies</h3>
            <div className="grid grid-cols-2 gap-2">
              {speciesList.map((sp) => (
                <label key={sp.id} className="cursor-pointer block">
                  <input
                    type="radio"
                    name="species"
                    value={sp.id}
                    checked={selectedSpecies === sp.id}
                    onChange={() => {
                      setSelectedSpecies(sp.id);
                      setSelectedLineage('');
                    }}
                    className="mr-2"
                  />
                  {sp.name}
                </label>
              ))}
            </div>
            {selectedSpecies && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Wähle deine Lineage</h4>
                <div className="grid grid-cols-2 gap-2">
                  {speciesList
                    .find((s) => s.id === selectedSpecies)?.lineages.map((lineage) => (
                      <label key={lineage.id} className="cursor-pointer block">
                        <input
                          type="radio"
                          name="lineage"
                          value={lineage.id}
                          checked={selectedLineage === lineage.id}
                          onChange={() => setSelectedLineage(lineage.id)}
                          className="mr-2"
                        />
                        {lineage.name}
                      </label>
                    ))}
                </div>
              </div>
            )}
            <Button onClick={handleContinue} disabled={!selectedSpecies || !selectedLineage}>
              Weiter
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* === ABILITIES === */}
      <TabsContent value="abilities">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-2xl font-bold">Ability Scores (Point Buy)</h3>
            {abilityList.map((ability) => (
              <div
                key={ability.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>{ability.name}</span>
                <div className="flex gap-2 items-center">
                  <Button onClick={() => handleAbilityChange(ability.id, 'down')}>-</Button>
                  <span>{abilities[ability.id]}</span>
                  <Button onClick={() => handleAbilityChange(ability.id, 'up')}>+</Button>
                </div>
              </div>
            ))}
            <p className="text-sm text-gray-600">
              Verwendete Punkte: <strong>{getTotalPointsUsed()}</strong> / {TOTAL_POINTS}
            </p>
            <Button onClick={handleContinue}>Weiter</Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* === FEATS === */}
      <TabsContent value="feats">
        <Card>
          <CardContent className="p-6 space-y-6">
            <h3 className="text-3xl font-bold">Wähle deine Feats</h3>
            {['Origin', 'General', 'Fighting Style', 'Epic Boon'].map((category) => (
              <div key={category} className="space-y-4">
                <h4 className="text-2xl font-semibold mt-4">{category} Feats</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getFilteredFeats(category as Feat['category']).map((feat) => {
                    const featId = `feat-${category}-${feat.id}`;
                    return (
                      <div
                        key={featId}
                        className="flex items-start space-x-3 bg-white border p-4 rounded-xl shadow-sm hover:bg-gray-50"
                      >
                        <input
                          id={featId}
                          name={featId}
                          type="checkbox"
                          className="mt-1"
                          checked={selectedFeats.includes(feat.id)}
                          onChange={() =>
                            setSelectedFeats((prev) =>
                              prev.includes(feat.id)
                                ? prev.filter((id) => id !== feat.id)
                                : [...prev, feat.id]
                            )
                          }
                        />
                        <label htmlFor={featId} className="cursor-pointer block">
                          <div className="font-semibold">{feat.name}</div>
                          <div className="text-sm text-gray-600 italic">{feat.category}</div>
                          <p className="text-sm text-gray-700 mt-1">{feat.description}</p>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="text-right">
              <Button onClick={handleContinue} disabled={selectedFeats.length === 0}>
                Weiter
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* === EQUIPMENT === */}
      <TabsContent value="equipment">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-2xl font-bold">Ausrüstung auswählen</h3>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Kategorie-Auswahl */}
              <div className="md:w-1/4 border-r pr-2">
                {equipmentCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedEquipmentCategory(category)}
                    className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                      selectedEquipmentCategory === category ? 'bg-gray-200 font-bold' : ''
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Item-Liste */}
              <div className="md:w-2/4 pl-2">
                {filteredEquipment.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="border rounded p-2 mb-2 cursor-pointer hover:bg-gray-50 flex justify-between"
                  >
                    <span>{item.name}</span>
                    <span className="text-sm text-gray-500">{item.cost} gp</span>
                  </div>
                ))}
              </div>

              {/* Item-Details + Anlegen */}
              <div className="md:w-1/4 border-l pl-2">
                {selectedItem ? (
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">{selectedItem.name}</h4>
                    <p className="text-sm italic text-gray-600">{selectedItem.subCategory}</p>
                    <p>Gewicht: {selectedItem.weight} lb</p>
                    <p>Kosten: {selectedItem.cost} gp</p>
                    <p className="text-xs text-gray-500 italic">Quelle: {selectedItem.source}</p>
                    <button
                      onClick={() => handleEquipItem(selectedItem)}
                      className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Anlegen
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Wähle ein Item aus</p>
                )}
              </div>
            </div>

            {/* Ausgewählte Ausrüstung */}
            <div className="mt-6">
              <h4 className="text-xl font-bold mb-2">Angelegte Items</h4>
              {equippedItems.length === 0 ? (
                <p className="text-sm text-gray-500 italic">Noch nichts angelegt.</p>
              ) : (
                <ul className="list-disc pl-5 text-sm">
                  {equippedItems.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <Button onClick={handleContinue} className="mt-4">Weiter</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="inventory">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-2xl font-bold">Inventar verwalten</h3>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Kategorie-Auswahl */}
              <div className="md:w-1/4 border-r pr-2">
                {equipmentCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedEquipmentCategory(category)}
                    className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                      selectedEquipmentCategory === category ? 'bg-gray-200 font-bold' : ''
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Item-Auswahl */}
              <div className="md:w-2/4 pl-2">
                {filteredEquipment.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded p-2 mb-2 cursor-pointer hover:bg-gray-50 flex justify-between"
                    onClick={() => handleAddToInventory(item)}
                  >
                    <span>{item.name}</span>
                    <span className="text-sm text-gray-500">{item.cost} gp</span>
                  </div>
                ))}
              </div>

              {/* Aktuelles Inventar */}
              <div className="md:w-1/4 border-l pl-2">
                <h4 className="text-lg font-semibold">Inventar</h4>
                {inventoryItems.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">Noch leer.</p>
                ) : (
                  <ul className="list-disc pl-4 text-sm">
                    {inventoryItems.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <Button onClick={handleContinue} className="mt-4">Weiter</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <h4 className="text-xl font-semibold mt-6">Inventar</h4>
<ul className="list-disc pl-6">
  {selectedEquipment.map(id => {
    const item = equipmentList.find(e => e.id === id);
    return item ? <li key={id}>{item.name} – {item.weight} lb – {item.cost} GP</li> : null;
  })}
</ul>
      {/* ... weitere Tabs ... */}

      {/* === DETAILS === */}
      <TabsContent value="details">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-2xl font-bold">Charakterdetails</h3>

            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Geschlecht</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={characterGender}
                onChange={(e) => setCharacterGender(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Ausrichtung (Alignment)</label>
              <select
                className="w-full border rounded p-2"
                value={characterAlignment}
                onChange={(e) => setCharacterAlignment(e.target.value)}
              >
                <option value="">Bitte wählen</option>
                <option value="Lawful Good">Lawful Good</option>
                <option value="Neutral Good">Neutral Good</option>
                <option value="Chaotic Good">Chaotic Good</option>
                <option value="Lawful Neutral">Lawful Neutral</option>
                <option value="True Neutral">True Neutral</option>
                <option value="Chaotic Neutral">Chaotic Neutral</option>
                <option value="Lawful Evil">Lawful Evil</option>
                <option value="Neutral Evil">Neutral Evil</option>
                <option value="Chaotic Evil">Chaotic Evil</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Sprachen</label>
              <div className="grid grid-cols-2 gap-2">
                {languageList.map((lang) => (
                  <label key={lang.id} className="cursor-pointer">
                    <input
                      type="checkbox"
                      name={lang.id}
                      checked={selectedLanguages.includes(lang.id)}
                      onChange={() => {
                        setSelectedLanguages((prev) =>
                          prev.includes(lang.id)
                            ? prev.filter((id) => id !== lang.id)
                            : [...prev, lang.id]
                        );
                      }}
                      className="mr-2"
                    />
                    {lang.name}
                  </label>
                ))}
              </div>
            </div>

            <Button onClick={handleContinue} disabled={!characterName || !characterGender || selectedLanguages.length === 0}>
              Weiter
            </Button>
          </CardContent>
        </Card>
      </TabsContent>



      {/* === SUMMARY === */}
      <TabsContent value="summary">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold">Zusammenfassung</h3>
            <p>Kommt später ✨</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )}
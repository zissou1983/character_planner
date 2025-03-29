import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import classList from '@/rulesets/2024/data/classes.json';
import backgroundList from '@/rulesets/2024/data/backgrounds.json';

interface ClassData {
  id: string;
  name: string;
  hitDie: string;
}

interface BackgroundData {
  id: string;
  name: string;
  description: string;
}

const steps = [
  'class',
  'background',
  'species',
  'lineage',
  'languages',
  'abilities',
  'equipment',
  'feats',
  'spells',
  'summary'
];

export default function CharacterBuilderLayout() {
  const [activeTab, setActiveTab] = useState('class');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedBackground, setSelectedBackground] = useState<string>('');

  const handleContinue = () => {
    const currentIndex = steps.indexOf(activeTab);
    const nextTab = steps[currentIndex + 1];
    if (nextTab) setActiveTab(nextTab);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="grid grid-cols-12 min-h-screen bg-gray-100">

        {/* Sidebar */}
        <aside className="col-span-2 bg-gray-900 text-white p-6">
          <h2 className="text-xl font-bold mb-6">Charakteraufbau</h2>
          <TabsList className="flex flex-col space-y-1">
            {steps.map((step) => (
              <TabsTrigger
                key={step}
                value={step}
                className={`text-left px-3 py-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-700 ${
                  activeTab === step ? 'bg-blue-600 font-semibold' : 'bg-gray-800'
                }`}
              >
                {step.charAt(0).toUpperCase() + step.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </aside>

        {/* Main Content */}
        <main className="col-span-10 p-10">
          <div className="w-full">

            {/* Tab: class */}
            <TabsContent value="class">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-3xl font-bold">Wähle eine Klasse</h3>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    <option value="">-- Klasse auswählen --</option>
                    {classList.map((cls: ClassData) => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>

                  {selectedClass && (
                    <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                      <h4 className="text-xl font-semibold">
                        {classList.find((c: ClassData) => c.id === selectedClass)?.name}
                      </h4>
                      <p className="text-gray-600 mt-1">
                        Trefferwürfel: {classList.find((c: ClassData) => c.id === selectedClass)?.hitDie || '—'}
                      </p>
                    </div>
                  )}

                  <div className="text-right">
                    <Button onClick={handleContinue} disabled={!selectedClass}>
                      Weiter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: background */}
            <TabsContent value="background">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-3xl font-bold">Wähle einen Hintergrund</h3>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedBackground}
                    onChange={(e) => setSelectedBackground(e.target.value)}
                  >
                    <option value="">-- Hintergrund auswählen --</option>
                    {backgroundList.map((bg: BackgroundData) => (
                      <option key={bg.id} value={bg.id}>{bg.name}</option>
                    ))}
                  </select>

                  {selectedBackground && (
                    <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                      <h4 className="text-xl font-semibold">
                        {backgroundList.find((bg: BackgroundData) => bg.id === selectedBackground)?.name}
                      </h4>
                      <p className="text-gray-600 mt-1">
                        {backgroundList.find((bg: BackgroundData) => bg.id === selectedBackground)?.description}
                      </p>
                    </div>
                  )}

                  <div className="text-right">
                    <Button onClick={handleContinue} disabled={!selectedBackground}>
                      Weiter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Platzhalter für alle anderen Tabs */}
            {steps.filter(step => step !== 'class' && step !== 'background').map((step) => (
              <TabsContent key={step} value={step}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold capitalize mb-4">{step}</h3>
                    <p className="text-gray-700 mb-6">
                      Hier folgt die Auswahl oder Eingabe für: <strong>{step}</strong>
                    </p>
                    <div className="text-right">
                      <Button onClick={handleContinue}>Weiter</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}

          </div>
        </main>
      </div>
    </Tabs>
  );
}

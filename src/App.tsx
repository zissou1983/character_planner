
import { Character } from './models/character'

const dummyCharacter: Character = {
  id: '1',
  name: 'Forrest McStarter',
  race: 'Elf',
  class: 'Wizard',
  level: 1,
  background: 'Sage',
  abilities: {
    STR: 10,
    DEX: 14,
    CON: 12,
    INT: 16,
    WIS: 10,
    CHA: 8,
  },
  proficiencies: [],
  features: [],
  feats: [],
  spells: [],
  equipment: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Charakter: {dummyCharacter.name}</h1>
      <p>Rasse: {dummyCharacter.race}</p>
      <p>Klasse: {dummyCharacter.class}</p>
      <p>Level: {dummyCharacter.level}</p>
      <h2>Attribute</h2>
      <ul>
        {Object.entries(dummyCharacter.abilities).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

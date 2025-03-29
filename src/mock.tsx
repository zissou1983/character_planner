import { Button } from "@chakra-ui/react"
export default function EquipmentUIAuroraMock() {
  return (

    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] h-[85vh] rounded shadow-lg border overflow-hidden bg-white text-gray-800">
      
      {/* === Sidebar: Kategorien === */}
      <aside className="p-4 bg-gray-50 border-r overflow-y-auto">
        <h2 className="text-xl font-bold mb-3 text-gray-800">Kategorien</h2>
        <ul className="space-y-2">
          {['Adventuring Gear', 'Weapons', 'Tools', 'Services', 'Treasure'].map((cat) => (
            <li
              key={cat}
              className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 px-3 py-2 rounded transition"
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* === Item-Liste === */}
      <main className="p-4 border-x overflow-y-auto">
        <h2 className="text-xl font-bold mb-3 text-gray-800">Items in Kategorie</h2>
        <div className="space-y-3">
          {[...Array(8).keys()].map((i) => (
            <div
              key={i}
              className="border p-3 rounded hover:bg-gray-100 cursor-pointer flex justify-between items-center transition"
            >
              <span className="font-medium">Item {i + 1}</span>
              <span className="text-sm text-gray-500">{(i + 1) * 5} gp</span>
            </div>
          ))}
        </div>
      </main>

      {/* === Item-Details === */}
      <aside className="p-4 bg-gray-50 overflow-y-auto">
        <h2 className="text-xl font-bold mb-3 text-gray-800">Details</h2>
        <div className="text-sm space-y-1 text-gray-700">
          <p className="font-semibold text-lg">Kettenhemd</p>
          <p className="italic text-gray-500">Medium Armor</p>
          <p>Gewicht: 20 lb</p>
          <p>Kosten: 50 gp</p>
          <p className="text-xs text-gray-400 italic">Quelle: PHB 2024</p>
        </div>
        <Button colorScheme="blue" size="md">
          Anlegen
        </Button>
      </aside>
    </div>
  );
}

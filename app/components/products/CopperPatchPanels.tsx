import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Frame {
  name: string;
  partCode: string;
  outlets?: number;
  ports?: number;
  category: string;
  rackUnits: string;
  colour: string;
  mounting: string;
  shielded: boolean;
  height?: string;
  connector?: string;
  connectionType?: string;
  description: string;
}

interface CopperPatchPanelsProps {
  frames: Frame[];
}

export const CopperPatchPanels: React.FC<CopperPatchPanelsProps> = ({ frames }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {frames.map((frame, idx) => (
        <div
          key={frame.partCode}
          className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{frame.name}</h3>
            <p className="text-gray-600 mb-2 text-sm">{frame.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Part Code: {frame.partCode}</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">{frame.rackUnits} Rack Unit</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">{frame.colour}</span>
              {/* {frame.shielded && <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Shielded</span>}
              {!frame.shielded && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Unshielded</span>} */}
            </div>
            <button
              onClick={() => handleToggle(idx)}
              className="mt-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Details {expandedIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {expandedIndex === idx && (
              <div className="mt-4 text-sm text-gray-700 animate-fade-in">
                <ul className="space-y-1">
                  {frame.outlets !== undefined && <li><b>Outlets:</b> {frame.outlets}</li>}
                  {frame.ports !== undefined && <li><b>Ports:</b> {frame.ports}</li>}
                  {frame.connector && <li><b>Connector:</b> {frame.connector}</li>}
                  {frame.connectionType && <li><b>Connection Type:</b> {frame.connectionType}</li>}
                  <li><b>Category:</b> {frame.category}</li>
                  <li><b>Rack Units:</b> {frame.rackUnits}</li>
                  <li><b>Colour:</b> {frame.colour}</li>
                  <li><b>Mounting:</b> {frame.mounting}</li>
                  {frame.height && <li><b>Height:</b> {frame.height}</li>}
                  {/* <li><b>Shielded:</b> {frame.shielded ? 'Yes' : 'No'}</li> */}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}; 
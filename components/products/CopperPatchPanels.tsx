import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Image from 'next/image';

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
  image?: string;
}

interface CopperPatchPanelsProps {
  frames: Frame[];
}

const CopperPatchPanels: React.FC<CopperPatchPanelsProps> = ({ frames }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {frames.map((frame, idx) => (
        <div
          key={frame.partCode}
          className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-telemons-blue-100 hover:border-telemons-orange-primary/30"
        >
          {frame?.image && (
            <div className="relative h-48 w-full bg-gradient-to-br from-telemons-blue-50 to-telemons-orange-50">
              <Image
                src={frame?.image}
                alt={frame?.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg md:text-xl font-bold text-telemons-blue-primary mb-2">{frame?.name}</h3>
            <p className="text-telemons-blue-700 mb-4 text-sm leading-relaxed">{frame?.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-telemons-blue-100 text-telemons-blue-800 px-3 py-1 rounded-full text-xs font-medium border border-telemons-blue-200">
                Part Code: {frame.partCode}
              </span>
              <span className="bg-telemons-orange-100 text-telemons-orange-800 px-3 py-1 rounded-full text-xs font-medium border border-telemons-orange-200">
                {frame.rackUnits} Rack Unit
              </span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
                {frame?.colour}
              </span>
              {/* {frame?.shielded && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium border border-green-200">
                  Shielded
                </span>
              )}
              {!frame?.shielded && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium border border-yellow-200">
                  Unshielded
                </span>
              )} */}
            </div>
            <button
              onClick={() => handleToggle(idx)}
              className="mt-auto flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-telemons-blue-primary to-telemons-blue-dark text-white rounded-lg hover:from-telemons-blue-dark hover:to-telemons-blue-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View Details {expandedIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {expandedIndex === idx && (
              <div className="mt-4 text-sm text-telemons-blue-700 animate-fade-in bg-telemons-blue-50 rounded-lg p-4 border border-telemons-blue-200">
                <ul className="space-y-2">
                  {frame.outlets !== undefined && (
                    <li className="flex justify-between">
                      <span className="font-semibold text-telemons-blue-primary">Outlets:</span>
                      <span>{frame.outlets}</span>
                    </li>
                  )}
                  {frame.ports !== undefined && (
                    <li className="flex justify-between">
                      <span className="font-semibold text-telemons-blue-primary">Ports:</span>
                      <span>{frame.ports}</span>
                    </li>
                  )}
                  {frame.connector && (
                    <li className="flex justify-between">
                      <span className="font-semibold text-telemons-blue-primary">Connector:</span>
                      <span>{frame.connector}</span>
                    </li>
                  )}
                  {frame.connectionType && (
                    <li className="flex justify-between">
                      <span className="font-semibold text-telemons-blue-primary">Connection Type:</span>
                      <span>{frame.connectionType}</span>
                    </li>
                  )}
                  <li className="flex justify-between">
                    <span className="font-semibold text-telemons-blue-primary">Category:</span>
                    <span>{frame.category}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-telemons-blue-primary">Rack Units:</span>
                    <span>{frame.rackUnits}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-telemons-blue-primary">Colour:</span>
                    <span>{frame.colour}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-telemons-blue-primary">Mounting:</span>
                    <span>{frame.mounting}</span>
                  </li>
                  {frame.height && (
                    <li className="flex justify-between">
                      <span className="font-semibold text-telemons-blue-primary">Height:</span>
                      <span>{frame.height}</span>
                    </li>
                  )}
                  <li className="flex justify-between">
                    {/* <span className="font-semibold text-telemons-blue-primary">Shielded:</span> */}
                    {/* <span className={frame.shielded ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'}>
                      {frame.shielded ? 'Yes' : 'No'}
                    </span> */}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CopperPatchPanels; 
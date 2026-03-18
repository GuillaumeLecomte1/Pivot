import { useState } from 'react';
import { departments } from '@/data/franceDepartments';

interface FranceMapProps {
    onSelectDepartment: (deptCode: string) => void;
    selectedDepartment?: string;
}

export function FranceMap({ onSelectDepartment, selectedDepartment }: FranceMapProps) {
    const [hoveredDept, setHoveredDept] = useState<string | null>(null);

    // Scale and offset to fit the map nicely in the SVG viewBox
    // The data is in roughly 800x500 coordinate space
    const viewBox = '0 0 800 500';

    return (
        <div className="relative mx-auto w-full max-w-4xl">
            <svg
                viewBox={viewBox}
                className="h-auto w-full"
                style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
                aria-label="Carte des départements français"
            >
                {/* Render all departments */}
                {departments.map((dept) => {
                    const isHovered = hoveredDept === dept.code;
                    const isSelected = selectedDepartment === dept.code;
                    const isHighlighted = dept.code === '49'; // Department 49 for Pivot green

                    // Fill colors based on state
                    let fillColor = '#FFFFFF';
                    if (isHighlighted) {
                        fillColor = '#6ED47C'; // Pivot green
                    } else if (isHovered || isSelected) {
                        fillColor = '#E5E7EB'; // Light gray on hover
                    }

                    const strokeColor = isHighlighted ? '#15803d' : '#CCCCCC';
                    const strokeWidth = isHovered || isSelected ? 1.5 : 0.5;

                    return (
                        <g key={dept.code}>
                            {/* biome-ignore lint/a11y/useSemanticElements: SVG paths require role for clickable map regions */}
                            <path
                                d={dept.path}
                                fill={fillColor}
                                stroke={strokeColor}
                                strokeWidth={strokeWidth}
                                className="cursor-pointer transition-all duration-200"
                                onMouseEnter={() => setHoveredDept(dept.code)}
                                onMouseLeave={() => setHoveredDept(null)}
                                onClick={() => onSelectDepartment(dept.code)}
                                role="link"
                                aria-label={`Département ${dept.code} - ${dept.name}`}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        onSelectDepartment(dept.code);
                                    }
                                }}
                            />
                            {/* Tooltip on hover */}
                            {isHovered && (
                                <g>
                                    <rect x={150} y={10} width={140} height={24} rx={4} fill="#1a1a1a" opacity="0.9" />
                                    <text x={220} y={26} fill="white" fontSize={12} fontFamily="system-ui, sans-serif" textAnchor="middle">
                                        {dept.code} - {dept.name}
                                    </text>
                                </g>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Legend */}
            <div className="mt-8 flex justify-center gap-6 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded border border-gray-400" style={{ backgroundColor: '#FFFFFF' }} />
                    <span>Département disponible</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded" style={{ backgroundColor: '#6ED47C' }} />
                    <span>Département 49 (Maine-et-Loire)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded border border-gray-400" style={{ backgroundColor: '#E5E7EB' }} />
                    <span>Sélectionné</span>
                </div>
            </div>

            {/* CTA */}
            {selectedDepartment && (
                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => onSelectDepartment(selectedDepartment)}
                        className="inline-flex h-10 items-center justify-center rounded-md bg-green-500 px-6 font-medium text-sm text-white transition-colors hover:bg-green-600"
                    >
                        Voir les ressourceries en {selectedDepartment}
                    </button>
                </div>
            )}
        </div>
    );
}

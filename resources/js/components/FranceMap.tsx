import { useState } from 'react';

interface FranceMapProps {
    onSelectDepartment: (deptCode: string) => void;
    selectedDepartment?: string;
}

const departments = [
    { code: '44', name: 'Loire-Atlantique', x: 35, y: 45 },
    { code: '49', name: 'Maine-et-Loire', x: 25, y: 35 },
    { code: '53', name: 'Mayenne', x: 30, y: 25 },
    { code: '72', name: 'Sarthe', x: 20, y: 28 },
    { code: '85', name: 'Vendée', x: 40, y: 55 },
];

export function FranceMap({ onSelectDepartment, selectedDepartment }: FranceMapProps) {
    const [hoveredDept, setHoveredDept] = useState<string | null>(null);

    return (
        <div className="relative mx-auto w-full max-w-2xl">
            <svg viewBox="0 0 100 80" className="h-auto w-full" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
                {/* Simplified France outline */}
                <path
                    d="M15 20 L25 15 L45 12 L65 15 L80 25 L85 40 L82 55 L70 65 L50 70 L30 68 L15 55 L10 35 Z"
                    fill="white"
                    stroke="#1a1a1a"
                    strokeWidth="0.5"
                    className="opacity-30"
                />

                {/* Department markers */}
                {departments.map((dept) => {
                    const isHovered = hoveredDept === dept.code;
                    const isSelected = selectedDepartment === dept.code;
                    const fillColor = isHovered || isSelected ? '#22c55e' : 'white';
                    const strokeColor = isHovered || isSelected ? '#15803d' : '#1a1a1a';

                    return (
                        <g key={dept.code}>
                            {/* biome-ignore lint/a11y/noStaticElementInteractions: SVG circle element cannot be replaced with button */}
                            <circle
                                cx={dept.x}
                                cy={dept.y}
                                r={isHovered || isSelected ? 6 : 4}
                                fill={fillColor}
                                stroke={strokeColor}
                                strokeWidth={isHovered || isSelected ? 1.5 : 0.8}
                                className="cursor-pointer transition-all duration-200"
                                onMouseEnter={() => setHoveredDept(dept.code)}
                                onMouseLeave={() => setHoveredDept(null)}
                                onClick={() => onSelectDepartment(dept.code)}
                            />
                            {isHovered && (
                                <g>
                                    <rect x={dept.x + 8} y={dept.y - 8} width={42} height={14} rx={2} fill="#1a1a1a" opacity="0.9" />
                                    <text x={dept.x + 9} y={dept.y + 2} fill="white" fontSize={5} fontFamily="system-ui">
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
                    <div className="h-3 w-3 rounded-full border border-gray-400 bg-white" />
                    <span>Département disponible</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
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

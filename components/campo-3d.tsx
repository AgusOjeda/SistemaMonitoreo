"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { IrrigationSystem } from "./3d/irrigation-system"

interface Plantacion {
  id: string
  nombre: string
  tipo: "simulada" | "real"
  datos: {
    humedad: number
    luz: number
    riegoActivo: boolean
    timestamp: string
  }
}

interface Campo3DProps {
  plantaciones: Plantacion[]
  seleccionadaId: string | null
  onSelect: (id: string) => void
}

function Parcela({ x, y, plantacion, seleccionada, onClick }: {
  x: number
  y: number
  plantacion: Plantacion
  seleccionada: boolean
  onClick: () => void
}) {
  // Color de la parcela según si está seleccionada
  const color = seleccionada ? '#4CAF50' : '#8B5E3C'
  

  return (
    <group position={[x, 0, y]}>
        <mesh castShadow onClick={onClick}>
          <boxGeometry args={[8, 0.8, 4]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* Sistema de irrigación */}
        <IrrigationSystem 
          position={[0, 0.8, 0]} 
          isActive={plantacion.datos.riegoActivo}
          scale={2}
        />
      </group>
  )
}

export function Campo3D({ plantaciones, seleccionadaId, onSelect }: Campo3DProps) {
  // Calcular tamaño de la cuadrícula
  const cols = Math.ceil(Math.sqrt(plantaciones.length))
  const rows = Math.ceil(plantaciones.length / cols)

  return (
    <div className="w-full h-[400px] mb-8 rounded-lg overflow-hidden border bg-[#e6f2e6]">
      <Canvas camera={{ position: [cols * 5, 10, rows * 3], fov: 50 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1} castShadow />
        {plantaciones.map((p, i) => {
          const x = (i % cols) * 10
          const y = Math.floor(i / cols) * 6
          return (
            <Parcela
              key={p.id}
              x={x}
              y={y}
              plantacion={p}
              seleccionada={p.id === seleccionadaId}
              onClick={() => onSelect(p.id)}
            />
          )
        })}
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  )
} 
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Plantacion3D } from "@/components/plantacion-3d"
import { Campo3D } from "@/components/campo-3d"
import { Greenhouse3DView } from "@/components/greenhouse-3d-view"

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

// Función para generar datos del sistema
function generateData() {
  return {
    irrigationActive: false,
    timestamp: new Date().toISOString()
  }
}

export default function PlantacionesPage() {
  const [systemData, setSystemData] = useState(generateData())
  const [plantaciones, setPlantaciones] = useState<Plantacion[]>([
    {
      id: "1",
      nombre: "Plantación A1",
      tipo: "real",
      datos: {
        humedad: 0,
        luz: 0,
        riegoActivo: false,
        timestamp: ""
      }
    }
  ])
  const [seleccionadaId, setSeleccionadaId] = useState<string | null>(plantaciones[0]?.id || null)

  const agregarPlantacion = () => {
    const nuevaPlantacion: Plantacion = {
      id: Date.now().toString(),
      nombre: `Plantación ${plantaciones.length + 1}`,
      tipo: "simulada",
      datos: {
        humedad: Math.random() * 100,
        luz: Math.random() * 3000,
        riegoActivo: false,
        timestamp: new Date().toISOString()
      }
    }
    setPlantaciones([...plantaciones, nuevaPlantacion])
  }

  // Actualizar datos de una plantación específica
  const actualizarDatos = (id: string, datos: Plantacion["datos"]) => {
    setPlantaciones(plantaciones.map(p =>
      p.id === id ? { ...p, datos } : p
    ))
  }

  const seleccionada = plantaciones.find(p => p.id === seleccionadaId)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Plantaciones</h1>
        <Button onClick={agregarPlantacion}>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Plantación
        </Button>
      </div>
      <Campo3D 
        plantaciones={plantaciones}
        seleccionadaId={seleccionadaId}
        onSelect={setSeleccionadaId}
      />
      {/* Datos de la parcela seleccionada */}
      {seleccionada && (
        <Plantacion3D
          key={seleccionada.id}
          plantacion={seleccionada}
          onUpdate={datos => actualizarDatos(seleccionada.id, datos)}
        />
      )}
    </div>
  )
} 
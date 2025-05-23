"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plantacion3DScene } from "./plantacion-3d-scene"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Droplets } from "lucide-react"

interface Plantacion3DProps {
  plantacion: {
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
  onUpdate: (datos: {
    humedad: number
    luz: number
    riegoActivo: boolean
    timestamp: string
  }) => void
}

export function Plantacion3D({ plantacion, onUpdate }: Plantacion3DProps) {
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (plantacion.tipo === "real") {
      // Conectar al WebSocket del ESP32
      wsRef.current = new WebSocket("ws://192.168.1.100/ws") // Reemplazar con la IP correcta

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          onUpdate({
            humedad: data.humedad,
            luz: data.ldr,
            riegoActivo: data.riegoActivo,
            timestamp: data.timestamp
          })
        } catch (error) {
          console.error("Error al procesar datos del WebSocket:", error)
        }
      }

      wsRef.current.onerror = (error) => {
        console.error("Error en la conexión WebSocket:", error)
      }

      return () => {
        if (wsRef.current) {
          wsRef.current.close()
        }
      }
    } else {
      // Simular datos para plantaciones simuladas
      const interval = setInterval(() => {
        onUpdate({
          humedad: Math.random() * 100,
          luz: Math.random() * 3000,
          riegoActivo: plantacion.datos.riegoActivo, // Mantener el estado del riego
          timestamp: new Date().toISOString()
        })
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [plantacion.tipo, onUpdate, plantacion.datos.riegoActivo])

  const handleRiegoChange = (checked: boolean) => {
    onUpdate({
      ...plantacion.datos,
      riegoActivo: checked,
      timestamp: new Date().toISOString()
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{plantacion.nombre}</CardTitle>
          <Badge variant={plantacion.tipo === "real" ? "default" : "secondary"}>
            {plantacion.tipo === "real" ? "Real" : "Simulada"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Humedad del Suelo</span>
              <span className="text-sm text-muted-foreground">{plantacion.datos.humedad.toFixed(1)}%</span>
            </div>
            <Progress value={plantacion.datos.humedad} />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Nivel de Luz</span>
              <span className="text-sm text-muted-foreground">{plantacion.datos.luz.toFixed(0)} lux</span>
            </div>
            <Progress value={(plantacion.datos.luz / 3000) * 100} />
          </div>

          <div className="flex items-center gap-4">
            <Droplets className="h-5 w-5 text-blue-500" />
            <Label htmlFor="irrigation-control" className="flex-1">
              Sistema de Riego
            </Label>
            <Switch 
              id="irrigation-control" 
              checked={plantacion.datos.riegoActivo} 
              onCheckedChange={handleRiegoChange}
            />
          </div>

          <div className="text-xs text-muted-foreground">
            Última actualización: {new Date(plantacion.datos.timestamp).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 
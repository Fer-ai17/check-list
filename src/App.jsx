import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Checkbox } from "./components/ui/checkbox"
import { Input } from "./components/ui/input"
import { Textarea } from "./components/ui/textarea"
import { Badge } from "./components/ui/badge"
import { Edit, Save, X, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"

const initialTasks = [
  {
    day: 1,
    morning: { id: "1m", title: "Repaso Django: CRUD + auth", completed: false, timeSlot: "morning" },
    afternoon: { id: "1a", title: "API usuarios + PostgreSQL", completed: false, timeSlot: "afternoon" },
    evening: { id: "1e", title: "Documentar endpoints", completed: false, timeSlot: "evening" },
  },
  {
    day: 2,
    morning: { id: "2m", title: "React: props, hooks, estados", completed: false, timeSlot: "morning" },
    afternoon: { id: "2a", title: "Dashboard con Tailwind", completed: false, timeSlot: "afternoon" },
    evening: { id: "2e", title: "Conectar con API Django", completed: false, timeSlot: "evening" },
  },
  {
    day: 3,
    morning: { id: "3m", title: "Node.js + Express básico", completed: false, timeSlot: "morning" },
    afternoon: { id: "3a", title: "Mini-API con MongoDB", completed: false, timeSlot: "afternoon" },
    evening: { id: "3e", title: "JWT auth", completed: false, timeSlot: "evening" },
  },
  {
    day: 4,
    morning: { id: "4m", title: "PostgreSQL: joins, índices", completed: false, timeSlot: "morning" },
    afternoon: { id: "4a", title: "MongoDB: agregaciones", completed: false, timeSlot: "afternoon" },
    evening: { id: "4e", title: "Comparar SQL vs NoSQL", completed: false, timeSlot: "evening" },
  },
  {
    day: 5,
    morning: { id: "5m", title: "GitHub avanzado (branches, PRs)", completed: false, timeSlot: "morning" },
    afternoon: { id: "5a", title: "Postman + Figma prototipos", completed: false, timeSlot: "afternoon" },
    evening: { id: "5e", title: "Flujo de trabajo simulado", completed: false, timeSlot: "evening" },
  },
  {
    day: 6,
    morning: { id: "6m", title: "Full-stack challenge: diseño", completed: false, timeSlot: "morning" },
    afternoon: { id: "6a", title: "CRUD con backend + frontend + DB", completed: false, timeSlot: "afternoon" },
    evening: { id: "6e", title: "Ajustes finales", completed: false, timeSlot: "evening" },
  },
  {
    day: 7,
    morning: { id: "7m", title: "Retos de codificación (HackerRank/Leetcode)", completed: false, timeSlot: "morning" },
    afternoon: { id: "7a", title: "Resolver 10 problemas fáciles-medios", completed: false, timeSlot: "afternoon" },
    evening: { id: "7e", title: "Documentar mini proyectos", completed: false, timeSlot: "evening" },
  },
  {
    day: 8,
    morning: { id: "8m", title: "Integración APIs REST/GraphQL", completed: false, timeSlot: "morning" },
    afternoon: { id: "8a", title: "App que consuma 2 APIs externas", completed: false, timeSlot: "afternoon" },
    evening: { id: "8e", title: "Documentar consumo", completed: false, timeSlot: "evening" },
  },
  {
    day: 9,
    morning: { id: "9m", title: "Autenticación avanzada (JWT/OAuth2)", completed: false, timeSlot: "morning" },
    afternoon: { id: "9a", title: "Login + roles administrador", completed: false, timeSlot: "afternoon" },
    evening: { id: "9e", title: "Tests básicos", completed: false, timeSlot: "evening" },
  },
  {
    day: 10,
    morning: { id: "10m", title: "Testing con PyTest/Jest", completed: false, timeSlot: "morning" },
    afternoon: { id: "10a", title: "Escribir pruebas unitarias", completed: false, timeSlot: "afternoon" },
    evening: { id: "10e", title: "Coverage y repaso", completed: false, timeSlot: "evening" },
  },
  {
    day: 11,
    morning: { id: "11m", title: "Android Studio/React Native", completed: false, timeSlot: "morning" },
    afternoon: { id: "11a", title: "App que consuma API REST", completed: false, timeSlot: "afternoon" },
    evening: { id: "11e", title: "Ajustes mobile", completed: false, timeSlot: "evening" },
  },
  {
    day: 12,
    morning: { id: "12m", title: "Docker básico", completed: false, timeSlot: "morning" },
    afternoon: { id: "12a", title: "GitHub Actions (deploy simulado)", completed: false, timeSlot: "afternoon" },
    evening: { id: "12e", title: "Contenedor DB+API", completed: false, timeSlot: "evening" },
  },
  {
    day: 13,
    morning: { id: "13m", title: "Full-stack challenge: MVP express", completed: false, timeSlot: "morning" },
    afternoon: { id: "13a", title: "Implementar API + frontend + DB", completed: false, timeSlot: "afternoon" },
    evening: { id: "13e", title: "Refinar MVP", completed: false, timeSlot: "evening" },
  },
  {
    day: 14,
    morning: { id: "14m", title: "Simulación día 1: idea + wireframe Figma", completed: false, timeSlot: "morning" },
    afternoon: { id: "14a", title: "API base backend", completed: false, timeSlot: "afternoon" },
    evening: { id: "14e", title: "Repo inicial en GitHub", completed: false, timeSlot: "evening" },
  },
  {
    day: 15,
    morning: { id: "15m", title: "Simulación día 2: backend + frontend", completed: false, timeSlot: "morning" },
    afternoon: { id: "15a", title: "Features mínimas", completed: false, timeSlot: "afternoon" },
    evening: { id: "15e", title: "Commit & pruebas", completed: false, timeSlot: "evening" },
  },
  {
    day: 16,
    morning: { id: "16m", title: "Simulación día 3: refinar UI", completed: false, timeSlot: "morning" },
    afternoon: { id: "16a", title: "Test con Postman", completed: false, timeSlot: "afternoon" },
    evening: { id: "16e", title: "Deploy simulado", completed: false, timeSlot: "evening" },
  },
  {
    day: 17,
    morning: { id: "17m", title: "Retroalimentación general", completed: false, timeSlot: "morning" },
    afternoon: { id: "17a", title: "Documentar README + Pitch MVP", completed: false, timeSlot: "afternoon" },
    evening: { id: "17e", title: "Análisis fortalezas/debilidades", completed: false, timeSlot: "evening" },
  },
]

export default function TaskListPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [editingTask, setEditingTask] = useState(null)
  const [editForm, setEditForm] = useState({ title: "", description: "", link: "" })
  const [expandedDays, setExpandedDays] = useState({})

  // Inicializar todos los días como expandidos al cargar el componente
useEffect(() => {
    const initialExpanded = {}
    tasks.forEach(task => {
      initialExpanded[task.day] = true
    })
    setExpandedDays(initialExpanded)
  }, [tasks])

  const toggleDayExpansion = (day) => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }))
  }

  const updateTask = (dayIndex, timeSlot, updates) => {
    setTasks((prev) =>
      prev.map((day, index) => (index === dayIndex ? { ...day, [timeSlot]: { ...day[timeSlot], ...updates } } : day)),
    )
  }

  const toggleComplete = (dayIndex, timeSlot) => {
    updateTask(dayIndex, timeSlot, { completed: !tasks[dayIndex][timeSlot].completed })
  }

  const startEdit = (task) => {
    setEditingTask(task.id)
    setEditForm({
      title: task.title,
      description: task.description || "",
      link: task.link || "",
    })
  }

  const saveEdit = (dayIndex, timeSlot) => {
    updateTask(dayIndex, timeSlot, {
      title: editForm.title,
      description: editForm.description || undefined,
      link: editForm.link || undefined,
    })
    setEditingTask(null)
    setEditForm({ title: "", description: "", link: "" })
  }

  const cancelEdit = () => {
    setEditingTask(null)
    setEditForm({ title: "", description: "", link: "" })
  }

  const getTimeSlotColor = (timeSlot) => {
    switch (timeSlot) {
      case "morning":
        return "bg-blue-50 border-blue-200"
      case "afternoon":
        return "bg-orange-50 border-orange-200"
      case "evening":
        return "bg-purple-50 border-purple-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getTimeSlotBadge = (timeSlot) => {
    switch (timeSlot) {
      case "morning":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Mañana (3h)
          </Badge>
        )
      case "afternoon":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Tarde (3h)
          </Badge>
        )
      case "evening":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Noche (1h)
          </Badge>
        )
      default:
        return null
    }
  }

  const completedTasks = tasks.reduce((acc, day) => {
    return acc + (day.morning.completed ? 1 : 0) + (day.afternoon.completed ? 1 : 0) + (day.evening.completed ? 1 : 0)
  }, 0)

  const totalTasks = tasks.length * 3

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🏋️ Rutina de Entrenamiento Intensivo</h1>
          <p className="text-xl text-gray-600 mb-4">(2.5 semanas)</p>
          <div className="flex justify-center gap-4 text-sm">
            <Badge variant="outline" className="px-4 py-2 bg-white/80 backdrop-blur-sm">
              {completedTasks}/{totalTasks} tareas completadas
            </Badge>
            <Badge variant="outline" className="px-4 py-2 bg-white/80 backdrop-blur-sm">
              {Math.round((completedTasks / totalTasks) * 100)}% progreso
            </Badge>
          </div>
        </div>

        <div className="grid gap-4">
          {tasks.map((dayTasks, dayIndex) => (
            <Card key={dayTasks.day} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div 
                className="bg-gradient-to-r from-gray-900 to-gray-700 text-white cursor-pointer p-6"
                onClick={() => toggleDayExpansion(dayTasks.day)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">Día {dayTasks.day}</h3>
                    <div className="flex gap-2">
                      {[dayTasks.morning, dayTasks.afternoon, dayTasks.evening].map((task, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full ${task.completed ? "bg-green-400" : "bg-gray-400"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">
                      {expandedDays[dayTasks.day] ? "Ocultar" : "Mostrar"}
                    </span>
                    {expandedDays[dayTasks.day] ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>
              
              {expandedDays[dayTasks.day] && (
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-0">
                    {(["morning", "afternoon", "evening"]).map((timeSlot) => {
                      const task = dayTasks[timeSlot]
                      const isEditing = editingTask === task.id

                      return (
                        <div key={timeSlot} className={`p-6 border-r last:border-r-0 ${getTimeSlotColor(timeSlot)}`}>
                          <div className="mb-3">{getTimeSlotBadge(timeSlot)}</div>

                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <Checkbox
                                checked={task.completed}
                                onCheckedChange={() => toggleComplete(dayIndex, timeSlot)}
                                className="mt-1"
                              />
                              <div className="flex-1 min-w-0">
                                {isEditing ? (
                                  <div className="space-y-2">
                                    <Input
                                      value={editForm.title}
                                      onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                                      placeholder="Título de la tarea"
                                      className="text-sm"
                                    />
                                    <Textarea
                                      value={editForm.description}
                                      onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                                      placeholder="Descripción (opcional)"
                                      className="text-sm min-h-[60px]"
                                    />
                                    <Input
                                      value={editForm.link}
                                      onChange={(e) => setEditForm((prev) => ({ ...prev, link: e.target.value }))}
                                      placeholder="Enlace (opcional)"
                                      className="text-sm"
                                    />
                                    <div className="flex gap-2">
                                      <Button size="sm" onClick={() => saveEdit(dayIndex, timeSlot)} className="h-8">
                                        <Save className="w-3 h-3 mr-1" />
                                        Guardar
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={cancelEdit}
                                        className="h-8 bg-transparent"
                                      >
                                        <X className="w-3 h-3 mr-1" />
                                        Cancelar
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <h3
                                      className={`font-medium text-sm leading-tight ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                                    >
                                      {task.title}
                                    </h3>
                                    {task.description && (
                                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{task.description}</p>
                                    )}
                                    <div className="flex gap-2 mt-2">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => startEdit(task)}
                                        className="h-7 px-2 text-xs"
                                      >
                                        <Edit className="w-3 h-3 mr-1" />
                                        Editar
                                      </Button>
                                      {task.link && (
                                        <Button size="sm" variant="ghost" asChild className="h-7 px-2 text-xs">
                                          <a href={task.link} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-3 h-3 mr-1" />
                                            Ver
                                          </a>
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Card className="inline-block p-6 bg-white/80 backdrop-blur-sm shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Progreso del Entrenamiento!</h2>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              />
            </div>
            <p className="text-gray-600">
              {completedTasks} de {totalTasks} tareas completadas ({Math.round((completedTasks / totalTasks) * 100)}%)
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
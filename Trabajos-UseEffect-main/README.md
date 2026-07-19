# 📚 Proyectos React - useEffect y React Router

Trabajo de semana 8: Integración de todos los ejercicios de `useEffect`, `useState` y `React Router` en una sola aplicación web.

## 🚀 Características

### useEffect - Proyectos
1. **🌡️ App Clima** - Obtener clima con debounce y manejo de errores
2. **💬 Chat en Tiempo Real** - Chat simulado con auto-scroll usando useRef
3. **🍅 Pomodoro Timer** - Temporizador con persistencia en localStorage
4. **📰 Feed de Noticias** - Feed que se actualiza cada minuto

### React Router - Proyectos
1. **🖊️ Mi Blog** - Blog con rutas protegidas y navegación
2. **🛒 Tienda Online** - E-commerce con detalles de producto y carrito
3. **👤 Dashboard** - Panel con rutas anidadas y layouts
4. **✈️ Reserva de Viajes** - Flujo multi-paso

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/christoferponceh-rgb/Trabajos-UseEffect.git

# Instalar dependencias
npm install

# Iniciar el proyecto
npm start
```

## 📁 Estructura de Carpetas

```
src/
├── App.js                 # Componente principal
├── App.css                # Estilos globales
├── index.js               # Entry point
├── index.css              # Estilos base
└── components/
    ├── FeedNoticias.js
    ├── AppClima.js
    ├── ChatTiempoReal.js
    ├── PomodoroTimer.js
    ├── AppBlog.js
    ├── AppTienda.js
    ├── AppDashboard.js
    └── AppReserva.js
public/
└── index.html
```

## 💡 Conceptos Clave

### useEffect
- ✅ Siempre piensa en la limpieza (return)
- ✅ Usa las dependencias para evitar bucles infinitos
- ✅ No pongas lógica que pueda renderizar directamente en el render

### React Router
- ✅ Usa `<Link>` para navegación, no `<a>`
- ✅ `useParams` para leer parámetros de la URL
- ✅ Rutas anidadas con `Outlet` para layouts reutilizables

## 🛠️ Tecnologías Utilizadas

- React 18
- React Router v6
- CSS3
- JavaScript ES6+

## 📝 Notas

Este proyecto es un trabajo educativo para aprender:
- Gestión de estado con `useState`
- Efectos secundarios con `useEffect`
- Navegación con `React Router`
- Persistencia de datos con `localStorage`
- Referencias DOM con `useRef`

## 👨‍💻 Autor

Christofer Ponce H.

## 📄 Licencia

MIT

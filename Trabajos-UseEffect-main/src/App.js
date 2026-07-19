import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import FeedNoticias from './components/FeedNoticias';
import AppClima from './components/AppClima';
import ChatTiempoReal from './components/ChatTiempoReal';
import PomodoroTimer from './components/PomodoroTimer';
import AppBlog from './components/AppBlog';
import AppTienda from './components/AppTienda';
import AppDashboard from './components/AppDashboard';
import AppReserva from './components/AppReserva';
import './App.css';

export default function App() {
  const [seccionActiva, setSeccionActiva] = useState('inicio');

  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="header">
          <div className="header-content">
            <h1>⚛️ Proyectos React - useEffect & React Router</h1>
            <p>Trabajo de semana 8: UseEffect y useState</p>
          </div>
        </header>

        <div className="main-layout">
          <nav className="sidebar">
            <h3>📚 Componentes</h3>
            <ul>
              <li><Link to="/" onClick={() => setSeccionActiva('inicio')}>🏠 Inicio</Link></li>
              <li><Link to="/clima" onClick={() => setSeccionActiva('clima')}>🌡️ App Clima</Link></li>
              <li><Link to="/chat" onClick={() => setSeccionActiva('chat')}>💬 Chat en Tiempo Real</Link></li>
              <li><Link to="/pomodoro" onClick={() => setSeccionActiva('pomodoro')}>🍅 Pomodoro Timer</Link></li>
              <li><Link to="/noticias" onClick={() => setSeccionActiva('noticias')}>📰 Feed de Noticias</Link></li>
              <li><Link to="/blog" onClick={() => setSeccionActiva('blog')}>🖊️ Mi Blog</Link></li>
              <li><Link to="/tienda" onClick={() => setSeccionActiva('tienda')}>🛒 Tienda Online</Link></li>
              <li><Link to="/dashboard" onClick={() => setSeccionActiva('dashboard')}>👤 Dashboard</Link></li>
              <li><Link to="/reserva" onClick={() => setSeccionActiva('reserva')}>✈️ Reserva Viajes</Link></li>
            </ul>
          </nav>

          <main className="content">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/clima" element={<AppClima />} />
              <Route path="/chat" element={<ChatTiempoReal />} />
              <Route path="/pomodoro" element={<PomodoroTimer />} />
              <Route path="/noticias" element={<FeedNoticias />} />
              <Route path="/blog/*" element={<AppBlog />} />
              <Route path="/tienda/*" element={<AppTienda />} />
              <Route path="/dashboard/*" element={<AppDashboard />} />
              <Route path="/reserva/*" element={<AppReserva />} />
            </Routes>
          </main>
        </div>

        <footer className="footer">
          <p>© 2024 Trabajo de UseEffect y React Router | Aprende construyendo 🚀</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function Inicio() {
  const navigate = useNavigate();

  const proyectos = [
    {
      id: 'clima',
      icon: '🌡️',
      titulo: 'App Clima',
      descripcion: 'Obtén el clima actual de cualquier ciudad usando una API simulada.',
      features: ['useEffect para obtener datos', 'Debounce para optimizar búsquedas', 'Manejo de errores y estados'],
      ruta: '/clima'
    },
    {
      id: 'chat',
      icon: '💬',
      titulo: 'Chat en Tiempo Real',
      descripcion: 'Simula un chat con mensajes en tiempo real y auto-scroll.',
      features: ['useRef para referencias DOM', 'useEffect para simular mensajes', 'Auto-scroll al final'],
      ruta: '/chat'
    },
    {
      id: 'pomodoro',
      icon: '🍅',
      titulo: 'Pomodoro Timer',
      descripcion: 'Temporizador de productividad con persistencia en localStorage.',
      features: ['useEffect con intervalos', 'localStorage para guardar sesiones', 'Formato de tiempo MM:SS'],
      ruta: '/pomodoro'
    },
    {
      id: 'noticias',
      icon: '📰',
      titulo: 'Feed de Noticias',
      descripcion: 'Feed que se actualiza cada minuto con noticias simuladas.',
      features: ['Actualización periódica con setInterval', 'Sistema de favoritos con Set', 'Limpieza de intervalos'],
      ruta: '/noticias'
    },
    {
      id: 'blog',
      icon: '🖊️',
      titulo: 'Mi Blog',
      descripcion: 'Blog con navegación entre secciones y área protegida.',
      features: ['React Router para navegación', 'Rutas protegidas', 'Parámetros dinámicos'],
      ruta: '/blog'
    },
    {
      id: 'tienda',
      icon: '🛒',
      titulo: 'Tienda Online',
      descripcion: 'E-commerce con carrito y detalles de productos.',
      features: ['useParams para IDs dinámicos', 'useNavigate para redirecciones', 'Flujo de compra'],
      ruta: '/tienda'
    },
    {
      id: 'dashboard',
      icon: '👤',
      titulo: 'Dashboard',
      descripcion: 'Panel de administración con rutas anidadas.',
      features: ['Layout anidado con Outlet', 'Navegación interna', 'Estadísticas y configuración'],
      ruta: '/dashboard'
    },
    {
      id: 'reserva',
      icon: '✈️',
      titulo: 'Reserva de Viajes',
      descripcion: 'Flujo multi-paso para reservar un viaje.',
      features: ['Progreso entre pasos', 'useNavigate para flujo', 'Estado compartido'],
      ruta: '/reserva'
    }
  ];

  return (
    <div className="inicio-page">
      <div className="hero">
        <h2>Bienvenido a los Proyectos React</h2>
        <p>Una colección de ejercicios prácticos con useEffect, useState y React Router</p>
      </div>

      <div className="proyectos-grid">
        {proyectos.map((proyecto) => (
          <div
            key={proyecto.id}
            className="proyecto-card"
            onClick={() => navigate(proyecto.ruta)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{proyecto.icon} {proyecto.titulo}</h3>
            <p>{proyecto.descripcion}</p>
            <ul>
              {proyecto.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

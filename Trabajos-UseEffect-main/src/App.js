import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
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
  return (
    <div className="inicio-page">
      <div className="hero">
        <h2>Bienvenido a los Proyectos React</h2>
        <p>Una colección de ejercicios prácticos con useEffect, useState y React Router</p>
      </div>

      <div className="proyectos-grid">
        <div className="proyecto-card">
          <h3>🌡️ App Clima</h3>
          <p>Obtén el clima actual de cualquier ciudad usando una API simulada.</p>
          <ul>
            <li>useEffect para obtener datos</li>
            <li>Debounce para optimizar búsquedas</li>
            <li>Manejo de errores y estados</li>
          </ul>
        </div>

        <div className="proyecto-card">
          <h3>💬 Chat en Tiempo Real</h3>
          <p>Simula un chat con mensajes en tiempo real y auto-scroll.</p>
          <ul>
            <li>useRef para referencias DOM</li>
            <li>useEffect para simular mensajes</li>
            <li>Auto-scroll al final</li>
          </ul>
        </div>

        <div className="proyecto-card">
          <h3>🍅 Pomodoro Timer</h3>
          <p>Temporizador de productividad con persistencia en localStorage.</p>
          <ul>
            <li>useEffect con intervalos</li>
            <li>localStorage para guardar sesiones</li>
            <li>Formato de tiempo MM:SS</li>
          </ul>
        </div>

        <div className="proyecto-card">
          <h3>📰 Feed de Noticias</h3>
          <p>Feed que se actualiza cada minuto con noticias simuladas.</p>
          <ul>
            <li>Actualización periódica con setInterval</li>
            <li>Sistema de favoritos con Set</li>
            <li>Limpieza de intervalos</li>
          </ul>
        </div>

        <div className="proyecto-card">
          <h3>🖊️ Mi Blog</h3>
          <p>Blog con navegación entre secciones y área protegida.</p>
          <ul>
            <li>React Router para navegación</li>
            <li>Rutas protegidas</li>
            <li>Parámetros dinámicos</li>
          </ul>
        </div>

        <div className="proyecto-card">
          <h3>🛒 Tienda Online</h3>
          <p>E-commerce con carrito y detalles de productos.</p>
          <ul>
            <li>useParams para IDs dinámicos</li>
            <li>useNavigate para redirecciones</li>
            <li>Flujo de compra</li>
          </ul>
        </div>

        <div className="proyecto-card">
          <h3>👤 Dashboard</h3>
          <p>Panel de administración con rutas anidadas.</p>
          <ul>
            <li>Layout anidado con Outlet</li>
            <li>Navegación interna</li>
            <li>Estadísticas y configuración</li>
          </ul>
        </div>

        <div className="proyecto-card">
          <h3>✈️ Reserva de Viajes</h3>
          <p>Flujo multi-paso para reservar un viaje.</p>
          <ul>
            <li>Progreso entre pasos</li>
            <li>useNavigate para flujo</li>
            <li>Estado compartido</li>
          </ul>
        </div>
      </div>

      <div className="tips-section">
        <h3>💡 Tips clave de useEffect</h3>
        <ul>
          <li>✅ Siempre piensa en la limpieza (return)</li>
          <li>✅ Usa las dependencias para evitar bucles infinitos</li>
          <li>✅ No pongas lógica que pueda renderizar directamente en el render</li>
        </ul>

        <h3>💡 Tips clave de React Router</h3>
        <ul>
          <li>✅ Usa &lt;Link&gt; para navegación, no &lt;a&gt;</li>
          <li>✅ useParams para leer parámetros de la URL</li>
          <li>✅ Rutas anidadas con Outlet para layouts reutilizables</li>
        </ul>
      </div>
    </div>
  );
}
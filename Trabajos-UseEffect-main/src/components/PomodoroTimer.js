import React, { useState, useEffect } from 'react';

export default function PomodoroTimer() {
  const [tiempo, setTiempo] = useState(25 * 60); // 25 minutos en segundos
  const [activo, setActivo] = useState(false);
  const [sesiones, setSesiones] = useState(() => {
    return parseInt(localStorage.getItem('pomodoroSesiones')) || 0;
  });

  useEffect(() => {
    let intervalo = null;
    
    if (activo && tiempo > 0) {
      intervalo = setInterval(() => setTiempo(t => t - 1), 1000);
    } else if (tiempo === 0) {
      alert("¡Tiempo terminado!");
      setActivo(false);
      setTiempo(25 * 60); // Reiniciar
      setSesiones(prev => {
        const nuevas = prev + 1;
        localStorage.setItem('pomodoroSesiones', nuevas.toString());
        return nuevas;
      });
    }

    return () => clearInterval(intervalo);
  }, [activo, tiempo]);

  const minutos = Math.floor(tiempo / 60).toString().padStart(2, '0');
  const segundos = (tiempo % 60).toString().padStart(2, '0');

  return (
    <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', width: '250px' }}>
      <h3>Pomodoro Timer 🍅</h3>
      <h1 style={{ fontSize: '3rem' }}>{minutos}:{segundos}</h1>
      <div>
        <button onClick={() => setActivo(!activo)}>
          {activo ? 'Pausar' : 'Iniciar'}
        </button>
        <button onClick={() => { setActivo(false); setTiempo(25 * 60); }}>Reiniciar</button>
      </div>
      <p style={{ marginTop: '20px' }}>Sesiones completadas: {sesiones}</p>
    </div>
  );
}
import React, { useState, useEffect } from 'react';

export default function AppClima() {
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para el buscador
  const [busqueda, setBusqueda] = useState('');
  const [ciudadActual, setCiudadActual] = useState('Coyhaique, Aysén');

  // Función para interpretar los códigos de clima (WMO Weather interpretation codes)
  const interpretarClima = (codigo) => {
    if (codigo === 0) return { texto: 'Despejado', emoji: '☀️' };
    if (codigo >= 1 && codigo <= 3) return { texto: 'Nublado', emoji: '☁️' };
    if (codigo >= 45 && codigo <= 48) return { texto: 'Niebla', emoji: '🌫️' };
    if (codigo >= 51 && codigo <= 67) return { texto: 'Lluvia', emoji: '🌧️' };
    if (codigo >= 71 && codigo <= 77) return { texto: 'Nieve', emoji: '❄️' };
    if (codigo >= 95 && codigo <= 99) return { texto: 'Tormenta', emoji: '⛈️' };
    return { texto: 'Desconocido', emoji: '🌍' };
  };

  const obtenerClima = async (ciudadBuscada) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Primero buscamos las coordenadas exactas de la ciudad ingresada
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ciudadBuscada}&count=1&language=es&format=json`);
      if (!geoRes.ok) throw new Error('Error al conectar con el servidor de búsqueda');
      
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('No se encontró la ciudad. Intenta con otro nombre.');
      }

      const { latitude, longitude, name, admin1, country } = geoData.results[0];
      
      // Actualizamos el nombre para mostrarlo en la tarjeta (Ej: Santiago, Región Metropolitana)
      setCiudadActual(`${name}, ${admin1 || country}`);

      // 2. Con las coordenadas, buscamos el clima agregando timezone=auto para corregir la hora
      const climaRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`);
      if (!climaRes.ok) throw new Error('Error al obtener los datos meteorológicos');
      
      const climaData = await climaRes.json();
      setClima(climaData.current_weather);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial por defecto
  useEffect(() => {
    obtenerClima('Coyhaique');
  }, []);

  const manejarBusqueda = (e) => {
    e.preventDefault();
    if (busqueda.trim() !== '') {
      obtenerClima(busqueda);
      setBusqueda(''); // Limpiamos el input después de buscar
    }
  };

  const estadoClima = clima ? interpretarClima(clima.weathercode) : null;

  return (
    <section style={{ maxWidth: '350px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Buscador de ciudades */}
      <form onSubmit={manejarBusqueda} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Ej. Valdivia, Tokio, Madrid..."
          style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', borderRadius: '6px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Buscar
        </button>
      </form>

      {/* Tarjeta de Clima */}
      <article style={{ border: '1px solid #eaeaea', borderRadius: '12px', padding: '25px', textAlign: 'center', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        
        {loading ? (
          <p style={{ color: '#666', padding: '40px 0' }}>Buscando en la atmósfera...</p>
        ) : error ? (
          <p style={{ color: '#d32f2f', padding: '20px 0' }}>{error}</p>
        ) : (
          <>
            <header>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#333' }}>App del Clima ☁️</h2>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{ciudadActual}</p>
            </header>

            <div style={{ margin: '30px 0' }}>
              <span style={{ fontSize: '5rem', display: 'block', lineHeight: '1' }}>
                {estadoClima?.emoji}
              </span>
              <h1 style={{ fontSize: '3.5rem', margin: '10px 0 0 0', color: '#111' }}>
                {Math.round(clima?.temperature)}°C
              </h1>
              <p style={{ margin: '5px 0 0 0', fontSize: '1.2rem', color: '#555', fontWeight: '500' }}>
                {estadoClima?.texto}
              </p>
            </div>

            <footer style={{ borderTop: '1px solid #eee', paddingTop: '15px', display: 'flex', justifyContent: 'space-around', color: '#666', fontSize: '0.9rem' }}>
              <div>
                <span style={{ display: 'block', fontWeight: 'bold', color: '#333' }}>Viento</span>
                {clima?.windspeed} km/h
              </div>
              <div>
                <span style={{ display: 'block', fontWeight: 'bold', color: '#333' }}>Hora Local</span>
                {clima?.time.split('T')[1]}
              </div>
            </footer>
          </>
        )}
      </article>

    </section>
  );
}
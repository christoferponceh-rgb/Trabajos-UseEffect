import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';

// --- SUBCOMPONENTES DE CADA PASO ---

const Paso1Destino = ({ reserva, setReserva }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const manejarSiguiente = (e) => {
    e.preventDefault();
    if (!reserva.destino) {
      setError('Por favor, selecciona un destino para continuar.');
      return;
    }
    setError('');
    navigate('/reserva/fechas');
  };

  const destinos = [
    { id: 'Japon', nombre: 'Japón (Tokio & Kioto)', emoji: '🇯🇵', precio: 1200000 },
    { id: 'Italia', nombre: 'Italia (Roma & Venecia)', emoji: '🇮🇹', precio: 950000 },
    { id: 'NuevaZelanda', nombre: 'Nueva Zelanda (Auckland)', emoji: '🇳🇿', precio: 1450000 },
    { id: 'Chile', nombre: 'Patagonia, Chile (Torres del Paine)', emoji: '🇨🇱', precio: 350000 }
  ];

  return (
    <div className="fade-in">
      <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Paso 1: Elige tu Destino 🗺️</h2>
      {error && <p style={{ color: '#dc3545', fontWeight: 'bold' }}>{error}</p>}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
        {destinos.map((dest) => {
          const seleccionado = reserva.destino?.id === dest.id;
          return (
            <article 
              key={dest.id}
              onClick={() => setReserva({ ...reserva, destino: dest })}
              style={{ 
                padding: '20px', 
                border: seleccionado ? '2px solid #0056b3' : '1px solid #ccc', 
                borderRadius: '8px', 
                cursor: 'pointer',
                backgroundColor: seleccionado ? '#e3f2fd' : '#fff',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '3rem' }}>{dest.emoji}</div>
              <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{dest.nombre}</h3>
              <p style={{ color: '#28a745', fontWeight: 'bold', margin: 0 }}>Desde ${dest.precio.toLocaleString('es-CL')}</p>
            </article>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
        <button onClick={manejarSiguiente} style={{ padding: '12px 25px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
          Siguiente: Fechas ➔
        </button>
      </div>
    </div>
  );
};

const Paso2Fechas = ({ reserva, setReserva }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const manejarSiguiente = (e) => {
    e.preventDefault();
    if (!reserva.fechaIda || !reserva.fechaVuelta) {
      setError('Debes seleccionar ambas fechas.');
      return;
    }
    if (new Date(reserva.fechaIda) > new Date(reserva.fechaVuelta)) {
      setError('La fecha de regreso no puede ser anterior a la de ida.');
      return;
    }
    setError('');
    navigate('/reserva/pago');
  };

  return (
    <div className="fade-in">
      <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Paso 2: Fechas del Viaje 📅</h2>
      {error && <p style={{ color: '#dc3545', fontWeight: 'bold' }}>{error}</p>}

      <form onSubmit={manejarSiguiente} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', backgroundColor: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #eaeaea', marginTop: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Fecha de Ida</label>
          <input 
            type="date" 
            value={reserva.fechaIda}
            onChange={(e) => setReserva({ ...reserva, fechaIda: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Fecha de Regreso</label>
          <input 
            type="date" 
            value={reserva.fechaVuelta}
            onChange={(e) => setReserva({ ...reserva, fechaVuelta: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button type="button" onClick={() => navigate('/reserva')} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            🡠 Atrás
          </button>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Siguiente: Pago ➔
          </button>
        </div>
      </form>
    </div>
  );
};

const Paso3Pago = ({ reserva, setReserva }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const manejarSiguiente = (e) => {
    e.preventDefault();
    if (!reserva.metodoPago) {
      setError('Selecciona un método de pago.');
      return;
    }
    setError('');
    navigate('/reserva/confirmacion');
  };

  const metodos = ['Tarjeta de Crédito', 'Débito / Webpay', 'PayPal'];

  return (
    <div className="fade-in">
      <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Paso 3: Método de Pago 💳</h2>
      {error && <p style={{ color: '#dc3545', fontWeight: 'bold' }}>{error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', marginTop: '20px' }}>
        {metodos.map(metodo => (
          <label key={metodo} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', backgroundColor: reserva.metodoPago === metodo ? '#e3f2fd' : '#fff' }}>
            <input 
              type="radio" 
              name="pago" 
              value={metodo}
              checked={reserva.metodoPago === metodo}
              onChange={(e) => setReserva({ ...reserva, metodoPago: e.target.value })}
              style={{ width: '20px', height: '20px' }}
            />
            <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{metodo}</span>
          </label>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '15px', marginTop: '30px', maxWidth: '400px', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/reserva/fechas')} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🡠 Atrás
        </button>
        <button onClick={manejarSiguiente} style={{ padding: '10px 20px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Revisar Confirmación ➔
        </button>
      </div>
    </div>
  );
};

const Paso4Confirmacion = ({ reserva, limpiarReserva, agregarAlHistorial }) => {
  const navigate = useNavigate();

  const confirmarReserva = () => {
    alert('¡Reserva confirmada con éxito! Preparando tus pasajes...');
    agregarAlHistorial(reserva); // Guardamos la reserva en el historial
    limpiarReserva(); // Limpiamos el borrador actual
    navigate('/reserva/mis-viajes'); // Redirigimos a la nueva sección de reservas
  };

  if (!reserva.destino || !reserva.fechaIda) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Faltan datos de la reserva ⚠️</h2>
        <button onClick={() => navigate('/reserva')} style={{ padding: '10px 20px', cursor: 'pointer' }}>Volver al Paso 1</button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Paso 4: Confirma tu Viaje ✅</h2>
      
      <article style={{ backgroundColor: '#fff', border: '1px solid #28a745', borderRadius: '8px', padding: '30px', maxWidth: '500px', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 20px 0', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Resumen de tu Aventura</h3>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '1.1rem' }}>
          <li><strong>Destino:</strong> {reserva.destino.emoji} {reserva.destino.nombre}</li>
          <li><strong>Ida:</strong> {reserva.fechaIda}</li>
          <li><strong>Vuelta:</strong> {reserva.fechaVuelta}</li>
          <li><strong>Pago mediante:</strong> {reserva.metodoPago}</li>
        </ul>

        <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '2px solid #eee', textAlign: 'right' }}>
          <span style={{ fontSize: '1.2rem', color: '#666' }}>Total a pagar:</span>
          <h2 style={{ margin: '5px 0 0 0', color: '#28a745', fontSize: '2.5rem' }}>${reserva.destino.precio.toLocaleString('es-CL')}</h2>
        </div>
      </article>

      <div style={{ display: 'flex', gap: '15px', marginTop: '30px', maxWidth: '500px', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/reserva/pago')} style={{ padding: '12px 25px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🡠 Modificar
        </button>
        <button onClick={confirmarReserva} style={{ padding: '12px 25px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}>
          Confirmar y Comprar 🎉
        </button>
      </div>
    </div>
  );
};

// NUEVO COMPONENTE: Vista del historial de reservas
const MisViajes = ({ historial }) => {
  const navigate = useNavigate();

  if (historial.length === 0) {
    return (
      <div className="fade-in" style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🧳</div>
        <h2 style={{ color: '#2c3e50' }}>Aún no tienes viajes programados</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>¡Es el momento perfecto para planear tu próxima aventura!</p>
        <button onClick={() => navigate('/reserva')} style={{ padding: '12px 25px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Hacer una Reserva
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <h2 style={{ color: '#2c3e50', marginTop: 0 }}>Mis Viajes Confirmados ✈️</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        {historial.map((viaje) => (
          <article key={viaje.idConfirmacion} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #eaeaea', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '4rem', marginRight: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '10px' }}>
              {viaje.destino.emoji}
            </div>
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '1.3rem', color: '#333' }}>{viaje.destino.nombre}</h3>
              <p style={{ margin: 0, color: '#666' }}><strong>Ida:</strong> {viaje.fechaIda} | <strong>Vuelta:</strong> {viaje.fechaVuelta}</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#888' }}>
                Reserva #{viaje.idConfirmacion} • Pagado con {viaje.metodoPago}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', fontSize: '0.9rem', color: '#28a745', fontWeight: 'bold', marginBottom: '5px' }}>Completado</span>
              <strong style={{ fontSize: '1.3rem', color: '#333' }}>${viaje.destino.precio.toLocaleString('es-CL')}</strong>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (LAYOUT DEL MULTI-PASO) ---

export default function AppReserva() {
  const location = useLocation();
  const path = location.pathname;

  // ESTADO 1: Borrador de la reserva actual (Se guarda en LocalStorage)
  const [reserva, setReserva] = useState(() => {
    const datosGuardados = localStorage.getItem('borradorReservaViaje');
    return datosGuardados ? JSON.parse(datosGuardados) : { destino: null, fechaIda: '', fechaVuelta: '', metodoPago: '' };
  });

  // ESTADO 2: Historial de reservas confirmadas (Se guarda en LocalStorage)
  const [historial, setHistorial] = useState(() => {
    const historialGuardado = localStorage.getItem('historialViajesConfirmados');
    return historialGuardado ? JSON.parse(historialGuardado) : [];
  });

  // EFECTOS: Persistencia de datos
  useEffect(() => {
    localStorage.setItem('borradorReservaViaje', JSON.stringify(reserva));
  }, [reserva]);

  useEffect(() => {
    localStorage.setItem('historialViajesConfirmados', JSON.stringify(historial));
  }, [historial]);

  // Funciones de control
  const limpiarReserva = () => {
    setReserva({ destino: null, fechaIda: '', fechaVuelta: '', metodoPago: '' });
    localStorage.removeItem('borradorReservaViaje');
  };

  const agregarAlHistorial = (reservaConfirmada) => {
    const nuevaReserva = {
      ...reservaConfirmada,
      idConfirmacion: Math.random().toString(36).substring(2, 9).toUpperCase() // Genera un ID de reserva (ej: X7A9B)
    };
    setHistorial([nuevaReserva, ...historial]);
  };

  // Lógica para la barra de progreso (solo se muestra si no estamos en 'mis-viajes')
  const esVistaHistorial = path.includes('mis-viajes');
  let pasoActual = 1;
  if (path.includes('fechas')) pasoActual = 2;
  if (path.includes('pago')) pasoActual = 3;
  if (path.includes('confirmacion')) pasoActual = 4;

  return (
    <section style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* NAVEGACIÓN SUPERIOR DEL MÓDULO */}
      <header style={{ display: 'flex', gap: '15px', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
        <Link 
          to="/reserva" 
          style={{ textDecoration: 'none', fontWeight: 'bold', padding: '8px 15px', borderRadius: '4px', backgroundColor: !esVistaHistorial ? '#0056b3' : 'transparent', color: !esVistaHistorial ? '#fff' : '#0056b3' }}
        >
          Hacer una Reserva
        </Link>
        <Link 
          to="/reserva/mis-viajes" 
          style={{ textDecoration: 'none', fontWeight: 'bold', padding: '8px 15px', borderRadius: '4px', backgroundColor: esVistaHistorial ? '#0056b3' : 'transparent', color: esVistaHistorial ? '#fff' : '#0056b3' }}
        >
          Mis Viajes ({historial.length})
        </Link>
      </header>

      {/* BARRA DE PROGRESO VISUAL (Solo visible al hacer una reserva) */}
      {!esVistaHistorial && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '4px', backgroundColor: '#e9ecef', zIndex: 1, transform: 'translateY(-50%)' }}></div>
          <div style={{ position: 'absolute', top: '50%', left: '0', width: `${((pasoActual - 1) / 3) * 100}%`, height: '4px', backgroundColor: '#0056b3', zIndex: 1, transform: 'translateY(-50%)', transition: 'width 0.4s ease' }}></div>

          {[1, 2, 3, 4].map((numero) => {
            const activo = pasoActual >= numero;
            return (
              <div key={numero} style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                backgroundColor: activo ? '#0056b3' : '#e9ecef', 
                color: activo ? 'white' : '#6c757d', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontWeight: 'bold', zIndex: 2, border: '4px solid #f4f7f6',
                transition: 'all 0.3s ease'
              }}>
                {numero}
              </div>
            );
          })}
        </div>
      )}

      {/* ÁREA DE RENDERIZADO DE LAS RUTAS */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '12px', border: '1px solid #e9ecef', minHeight: '400px' }}>
        <Routes>
          <Route path="/" element={<Paso1Destino reserva={reserva} setReserva={setReserva} />} />
          <Route path="fechas" element={<Paso2Fechas reserva={reserva} setReserva={setReserva} />} />
          <Route path="pago" element={<Paso3Pago reserva={reserva} setReserva={setReserva} />} />
          <Route path="confirmacion" element={<Paso4Confirmacion reserva={reserva} limpiarReserva={limpiarReserva} agregarAlHistorial={agregarAlHistorial} />} />
          
          {/* Nueva ruta del historial */}
          <Route path="mis-viajes" element={<MisViajes historial={historial} />} />
        </Routes>
      </div>

    </section>
  );
}
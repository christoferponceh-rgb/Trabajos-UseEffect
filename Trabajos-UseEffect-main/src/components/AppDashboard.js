import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';

// --- SUBCOMPONENTES DEL DASHBOARD ---

const Resumen = ({ isOscuro }) => (
  <div className="fade-in">
    <h2 style={{ color: isOscuro ? '#fff' : '#2c3e50', marginTop: 0 }}>Resumen General</h2>
    <p style={{ color: isOscuro ? '#aaa' : '#666' }}>Bienvenido de vuelta. Aquí tienes un vistazo rápido a los indicadores.</p>
    
    <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
      <article style={{ flex: '1 1 200px', padding: '20px', backgroundColor: isOscuro ? '#0d47a1' : '#e3f2fd', borderRadius: '8px', border: 'none' }}>
        <h3 style={{ margin: '0 0 10px 0', color: isOscuro ? '#bbdefb' : '#1565c0', fontSize: '1.1rem' }}>Ingresos Mes</h3>
        <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold', color: isOscuro ? '#fff' : '#0d47a1' }}>$ 12.450</p>
      </article>
      <article style={{ flex: '1 1 200px', padding: '20px', backgroundColor: isOscuro ? '#1b5e20' : '#e8f5e9', borderRadius: '8px', border: 'none' }}>
        <h3 style={{ margin: '0 0 10px 0', color: isOscuro ? '#c8e6c9' : '#2e7d32', fontSize: '1.1rem' }}>Nuevos Usuarios</h3>
        <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold', color: isOscuro ? '#fff' : '#1b5e20' }}>+142</p>
      </article>
      <article style={{ flex: '1 1 200px', padding: '20px', backgroundColor: isOscuro ? '#e65100' : '#fff3e0', borderRadius: '8px', border: 'none' }}>
        <h3 style={{ margin: '0 0 10px 0', color: isOscuro ? '#ffe0b2' : '#e65100', fontSize: '1.1rem' }}>Soporte Activo</h3>
        <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold', color: isOscuro ? '#fff' : '#e65100' }}>5 tickets</p>
      </article>
    </div>
  </div>
);

// NUEVO COMPONENTE DE ESTADÍSTICAS MEJORADO
const Estadisticas = ({ isOscuro }) => {
  const [periodo, setPeriodo] = useState('semana');

  // Conjuntos de datos simulados
  const datosSemana = [
    { etiqueta: 'Lun', valor: 45 }, { etiqueta: 'Mar', valor: 85 }, { etiqueta: 'Mié', valor: 35 },
    { etiqueta: 'Jue', valor: 110 }, { etiqueta: 'Vie', valor: 65 }, { etiqueta: 'Sáb', valor: 90 }, { etiqueta: 'Dom', valor: 125 }
  ];

  const datosMes = [
    { etiqueta: 'Sem 1', valor: 450 }, { etiqueta: 'Sem 2', valor: 680 }, 
    { etiqueta: 'Sem 3', valor: 520 }, { etiqueta: 'Sem 4', valor: 890 }
  ];

  // Determinar qué datos usar basados en el estado
  const datosActuales = periodo === 'semana' ? datosSemana : datosMes;
  
  // Calcular el valor máximo dinámicamente para escalar el gráfico (añadimos un 15% de margen superior)
  const valorMaximo = Math.max(...datosActuales.map(d => d.valor)) * 1.15;

  return (
    <div className="fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ color: isOscuro ? '#fff' : '#2c3e50', margin: 0 }}>Rendimiento de Tráfico 📈</h2>
          <p style={{ color: isOscuro ? '#aaa' : '#666', margin: '5px 0 0 0' }}>Análisis de visitas en la plataforma.</p>
        </div>
        
        {/* Controles de Filtro */}
        <div style={{ display: 'flex', backgroundColor: isOscuro ? '#333' : '#e9ecef', borderRadius: '8px', padding: '4px' }}>
          <button 
            onClick={() => setPeriodo('semana')}
            style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold',
              backgroundColor: periodo === 'semana' ? '#0056b3' : 'transparent',
              color: periodo === 'semana' ? '#fff' : (isOscuro ? '#aaa' : '#555'),
              transition: 'all 0.2s'
            }}
          >7 Días</button>
          <button 
            onClick={() => setPeriodo('mes')}
            style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold',
              backgroundColor: periodo === 'mes' ? '#0056b3' : 'transparent',
              color: periodo === 'mes' ? '#fff' : (isOscuro ? '#aaa' : '#555'),
              transition: 'all 0.2s'
            }}
          >Último Mes</button>
        </div>
      </header>
      
      {/* Contenedor del Gráfico */}
      <div style={{ 
        height: '350px', 
        backgroundColor: isOscuro ? '#2d2d2d' : '#fff', 
        borderRadius: '12px', 
        padding: '30px 20px 20px 20px',
        display: 'flex', 
        alignItems: 'flex-end', 
        gap: '20px',
        border: isOscuro ? '1px solid #444' : '1px solid #eaeaea',
        boxShadow: isOscuro ? 'none' : '0 4px 6px rgba(0,0,0,0.02)'
      }}>
        {datosActuales.map((dato) => {
          // Calculamos la altura porcentual de la barra respecto al máximo
          const alturaPorcentaje = (dato.valor / valorMaximo) * 100;

          return (
            <div key={dato.etiqueta} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%', position: 'relative' }}>
              
              {/* Contenedor de la barra para alineación inferior */}
              <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', width: '100%', padding: '0 10px', position: 'relative' }}>
                
                {/* Valor numérico flotante sobre la barra */}
                <span style={{ 
                  position: 'absolute', 
                  bottom: `calc(${alturaPorcentaje}% + 10px)`, 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  color: isOscuro ? '#fff' : '#0056b3',
                  transition: 'bottom 0.5s ease-out'
                }}>
                  {dato.valor}
                </span>

                {/* La barra visual */}
                <div 
                  style={{ 
                    width: '100%', 
                    height: `${alturaPorcentaje}%`, 
                    backgroundColor: '#0056b3',
                    backgroundImage: 'linear-gradient(180deg, #0056b3 0%, #003d82 100%)',
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 0.5s ease-out',
                    cursor: 'pointer',
                    opacity: 0.9
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '1'}
                  onMouseOut={(e) => e.target.style.opacity = '0.9'}
                ></div>
              </div>

              {/* Etiqueta del eje X */}
              <span style={{ marginTop: '15px', fontSize: '0.9rem', color: isOscuro ? '#bbb' : '#666', fontWeight: 'bold' }}>
                {dato.etiqueta}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Reportes = ({ isOscuro }) => (
  <div className="fade-in">
    <h2 style={{ color: isOscuro ? '#fff' : '#2c3e50', marginTop: 0 }}>Reportes Generados 📄</h2>
    <div style={{ overflowX: 'auto', marginTop: '15px', backgroundColor: isOscuro ? '#2d2d2d' : '#fff', borderRadius: '8px', border: isOscuro ? '1px solid #444' : '1px solid #eaeaea' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', color: isOscuro ? '#eee' : '#333' }}>
        <thead>
          <tr style={{ backgroundColor: isOscuro ? '#1e1e1e' : '#f8f9fa', textAlign: 'left' }}>
            <th style={{ padding: '15px', borderBottom: isOscuro ? '1px solid #444' : '2px solid #ddd' }}>Fecha</th>
            <th style={{ padding: '15px', borderBottom: isOscuro ? '1px solid #444' : '2px solid #ddd' }}>Tipo de Reporte</th>
            <th style={{ padding: '15px', borderBottom: isOscuro ? '1px solid #444' : '2px solid #ddd' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '15px', borderBottom: isOscuro ? '1px solid #444' : '1px solid #eee' }}>18/07/2026</td>
            <td style={{ padding: '15px', borderBottom: isOscuro ? '1px solid #444' : '1px solid #eee' }}>Cierre de Ventas Semanal</td>
            <td style={{ padding: '15px', borderBottom: isOscuro ? '1px solid #444' : '1px solid #eee' }}><span style={{ backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>Completado</span></td>
          </tr>
          <tr>
            <td style={{ padding: '15px', borderBottom: isOscuro ? '1px solid #444' : '1px solid #eee' }}>17/07/2026</td>
            <td style={{ padding: '15px', borderBottom: isOscuro ? '1px solid #444' : '1px solid #eee' }}>Auditoría de Accesos</td>
            <td style={{ padding: '15px', borderBottom: isOscuro ? '1px solid #444' : '1px solid #eee' }}><span style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>En proceso</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Configuracion = ({ perfil, setPerfil, isOscuro }) => {
  const [nombreLocal, setNombreLocal] = useState(perfil.nombre);
  const [temaLocal, setTemaLocal] = useState(perfil.tema);
  const [mensajeExito, setMensajeExito] = useState(false);

  const guardarConfiguracion = (e) => {
    e.preventDefault();
    setPerfil({ nombre: nombreLocal, tema: temaLocal });
    setMensajeExito(true);
    setTimeout(() => setMensajeExito(false), 3000); 
  };

  return (
    <div className="fade-in">
      <h2 style={{ color: isOscuro ? '#fff' : '#2c3e50', marginTop: 0 }}>Configuración de la Cuenta ⚙️</h2>
      
      {mensajeExito && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '4px', marginBottom: '20px', border: '1px solid #c3e6cb' }}>
          ✅ Cambios guardados correctamente.
        </div>
      )}

      <form onSubmit={guardarConfiguracion} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px', backgroundColor: isOscuro ? '#2d2d2d' : '#fff', padding: '25px', borderRadius: '8px', border: isOscuro ? '1px solid #444' : '1px solid #eaeaea' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: isOscuro ? '#eee' : '#333' }}>Nombre a mostrar</label>
          <input 
            type="text" 
            value={nombreLocal}
            onChange={(e) => setNombreLocal(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: isOscuro ? '#444' : '#fff', color: isOscuro ? '#fff' : '#000' }} 
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: isOscuro ? '#eee' : '#333' }}>Tema visual</label>
          <select 
            value={temaLocal}
            onChange={(e) => setTemaLocal(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: isOscuro ? '#444' : '#fff', color: isOscuro ? '#fff' : '#000' }}
          >
            <option value="Claro">Claro</option>
            <option value="Oscuro">Oscuro</option>
          </select>
        </div>
        <button type="submit" style={{ padding: '12px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px' }}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

const PerfilPublico = ({ isOscuro }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <div className="fade-in" style={{ textAlign: 'center', padding: '40px', backgroundColor: isOscuro ? '#2d2d2d' : '#fff', borderRadius: '8px', border: isOscuro ? '1px solid #444' : '1px solid #eaeaea' }}>
      <div style={{ fontSize: '5rem', backgroundColor: isOscuro ? '#444' : '#f0f0f0', width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        👤
      </div>
      <h2 style={{ color: isOscuro ? '#fff' : '#2c3e50', margin: '0 0 10px 0' }}>Usuario: @{id.toLowerCase().replace(' ', '')}</h2>
      <p style={{ color: isOscuro ? '#aaa' : '#666', fontSize: '1.1rem' }}>Esta es la vista pública del perfil. Los demás usuarios lo verán así.</p>
      <button onClick={() => navigate('/dashboard')} style={{ marginTop: '25px', padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        ← Volver al Panel Privado
      </button>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (LAYOUT) ---

export default function AppDashboard() {
  const location = useLocation();

  // ESTADO GLOBAL DEL DASHBOARD
  const [perfil, setPerfil] = useState({
    nombre: 'Guillermo',
    tema: 'Claro'
  });

  const isOscuro = perfil.tema === 'Oscuro';

  const getLinkStyle = (path) => {
    const isActive = location.pathname === `/dashboard${path}` || (path === '' && location.pathname === '/dashboard');
    return {
      display: 'block',
      padding: '12px 15px',
      marginBottom: '5px',
      borderRadius: '6px',
      textDecoration: 'none',
      color: isActive ? '#fff' : (isOscuro ? '#ccc' : '#333'),
      backgroundColor: isActive ? '#0056b3' : 'transparent',
      fontWeight: isActive ? 'bold' : 'normal',
      transition: 'all 0.2s'
    };
  };

  return (
    <section style={{ 
      display: 'flex', 
      minHeight: '650px', 
      backgroundColor: isOscuro ? '#121212' : '#f4f7f6', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      border: isOscuro ? '1px solid #333' : '1px solid #ddd', 
      fontFamily: 'system-ui, sans-serif',
      transition: 'background-color 0.3s ease'
    }}>
      
      {/* MENÚ LATERAL */}
      <aside style={{ width: '250px', backgroundColor: isOscuro ? '#1e1e1e' : '#fff', borderRight: isOscuro ? '1px solid #333' : '1px solid #ddd', padding: '20px', display: 'flex', flexDirection: 'column', transition: 'background-color 0.3s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', paddingBottom: '20px', borderBottom: isOscuro ? '1px solid #333' : '1px solid #eee' }}>
          <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#0056b3', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.4rem' }}>
            {perfil.nombre.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', color: isOscuro ? '#fff' : '#333' }}>
              {perfil.nombre}
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#28a745', fontWeight: 'bold' }}>● Online</span>
          </div>
        </div>

        <nav style={{ flexGrow: 1 }}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: isOscuro ? '#777' : '#888', fontWeight: 'bold', marginBottom: '10px', letterSpacing: '1px' }}>Principal</p>
          <Link to="" style={getLinkStyle('')}>📊 Resumen</Link>
          <Link to="estadisticas" style={getLinkStyle('/estadisticas')}>📈 Estadísticas</Link>
          <Link to="reportes" style={getLinkStyle('/reportes')}>📄 Reportes</Link>
          <Link to="configuracion" style={getLinkStyle('/configuracion')}>⚙️ Configuración</Link>
          
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: isOscuro ? '#777' : '#888', fontWeight: 'bold', marginTop: '30px', marginBottom: '10px', letterSpacing: '1px' }}>Vistas Externas</p>
          <Link to={`perfil/${perfil.nombre}`} style={getLinkStyle(`/perfil/${perfil.nombre}`)}>👁️ Ver mi Perfil</Link>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main style={{ flexGrow: 1, padding: '40px', overflowY: 'auto' }}>
        <Routes>
          <Route path="/" element={<Resumen isOscuro={isOscuro} />} />
          <Route path="estadisticas" element={<Estadisticas isOscuro={isOscuro} />} />
          <Route path="reportes" element={<Reportes isOscuro={isOscuro} />} />
          <Route path="configuracion" element={<Configuracion perfil={perfil} setPerfil={setPerfil} isOscuro={isOscuro} />} />
          <Route path="perfil/:id" element={<PerfilPublico isOscuro={isOscuro} />} />
        </Routes>
      </main>

    </section>
  );
}
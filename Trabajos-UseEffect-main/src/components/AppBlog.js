import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';

// --- BASE DE DATOS FALTANTE (Basada en los botones de tu imagen) ---
const dbArticulos = [
  { 
    id: 'react-router', 
    titulo: 'Aprendiendo React Router', 
    contenido: 'React Router es la librería estándar para enrutamiento en React. Permite la navegación entre vistas en aplicaciones SPA (Single Page Applications) de forma fluida y sin recargar la página completa. Usar <Link> y <Routes> es fundamental para una buena arquitectura.' 
  },
  { 
    id: 'useeffect', 
    titulo: 'useEffect en acción', 
    contenido: 'El hook useEffect nos permite ejecutar efectos secundarios en componentes funcionales. Es ideal para hacer peticiones a APIs, suscribirse a eventos de la ventana, o iniciar y limpiar temporizadores (setInterval).' 
  },
  { 
    id: 'vercel', 
    titulo: 'Cómo deployar en Vercel', 
    contenido: 'Vercel es una plataforma en la nube optimizada para frameworks de frontend. Desplegar una aplicación creada con Create React App es tan fácil como conectar tu repositorio de GitHub y dejar que Vercel haga el build automático.' 
  }
];

// --- SUBCOMPONENTES DE LAS VISTAS (Lo que va en la casilla derecha) ---

const Inicio = () => (
  <div className="fade-in">
    <h2 style={{ fontSize: '1.8rem', color: '#333', marginTop: 0 }}>Bienvenido a Mi Blog Personal</h2>
    <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.6' }}>
      Este es un espacio donde comparto mis aprendizajes sobre desarrollo frontend. 
      Utiliza el menú lateral para navegar entre las diferentes secciones sin recargar la página.
    </p>
  </div>
);

const Articulos = () => (
  <div className="fade-in">
    <h2 style={{ fontSize: '1.5rem', color: '#333', marginTop: 0, marginBottom: '20px' }}>Artículos</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {dbArticulos.map(art => (
        <Link 
          key={art.id} 
          to={`/blog/articulos/${art.id}`}
          style={{ 
            display: 'block', 
            padding: '15px 20px', 
            border: '1px solid #ccc', 
            borderRadius: '6px', 
            textDecoration: 'none', 
            color: '#333',
            fontSize: '1rem',
            transition: 'box-shadow 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
          onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
        >
          {art.titulo}
        </Link>
      ))}
    </div>
  </div>
);

const DetalleArticulo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const articulo = dbArticulos.find(a => a.id === id);

  if (!articulo) {
    return <h2>Artículo no encontrado</h2>;
  }

  return (
    <div className="fade-in">
      <button 
        onClick={() => navigate('/blog/articulos')} 
        style={{ marginBottom: '20px', padding: '8px 15px', backgroundColor: 'transparent', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
      >
        🡠 Volver a Artículos
      </button>
      <h2 style={{ fontSize: '1.8rem', color: '#333', marginTop: 0 }}>{articulo.titulo}</h2>
      <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.8' }}>{articulo.contenido}</p>
    </div>
  );
};

const Acerca = () => (
  <div className="fade-in">
    <h2 style={{ fontSize: '1.8rem', color: '#333', marginTop: 0 }}>Sobre mí</h2>
    <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.6' }}>
      Soy un desarrollador enfocado en crear soluciones estructuradas y eficientes. 
      Me especializo en la maquetación web y el diseño de plantillas utilizando HTML5 y reglas de formato CSS puro. 
      <br/><br/>
      Además del trabajo en interfaces, tengo un fuerte interés en la integración de bases de datos, desarrollando scripts y gestionando sistemas relacionales (Oracle SQL) y entornos NoSQL como MongoDB utilizando Python.
    </p>
  </div>
);

const Contacto = () => {
  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();
    alert('Mensaje enviado. ¡Te responderé pronto!');
    navigate('/blog');
  };

  return (
    <div className="fade-in">
      <h2 style={{ fontSize: '1.8rem', color: '#333', marginTop: 0 }}>Contacto</h2>
      <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        <input type="text" placeholder="Tu Nombre" required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} />
        <input type="email" placeholder="Tu Correo" required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }} />
        <textarea placeholder="¿En qué te puedo ayudar?" required rows="5" style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}></textarea>
        <button type="submit" style={{ padding: '12px', backgroundColor: '#3b3b98', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};

// --- RETO EXTRA: ÁREA DE ADMINISTRACIÓN ---

const RutaProtegida = ({ children, isAuth }) => {
  if (!isAuth) return <Navigate to="/blog" replace />;
  return children;
};

const AreaAdmin = () => (
  <div className="fade-in" style={{ padding: '20px', backgroundColor: '#e8e8fb', border: '1px solid #c7c7f1', borderRadius: '8px' }}>
    <h2 style={{ color: '#3b3b98', marginTop: 0 }}>Panel de Administración 🔒</h2>
    <p style={{ color: '#555' }}>
      Has superado el reto extra. Esta ruta está protegida y solo es accesible si estás "autenticado".
      Aquí podrías tener un formulario para agregar, editar o eliminar los artículos del blog.
    </p>
  </div>
);

// --- COMPONENTE PRINCIPAL (LAYOUT IDÉNTICO A LA IMAGEN) ---

export default function AppBlog() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false); // Estado para simular autenticación

  // Función para replicar el botón activo color morado claro de la imagen
  const getLinkStyle = (path, exact = false) => {
    const isActive = exact 
      ? location.pathname === `/blog${path}`
      : location.pathname.startsWith(`/blog${path}`);

    return {
      display: 'block',
      padding: '12px 20px',
      margin: '0 10px 5px 10px',
      borderRadius: '8px',
      textDecoration: 'none',
      color: isActive ? '#3b3b98' : '#555',
      backgroundColor: isActive ? '#efeffa' : 'transparent',
      fontWeight: isActive ? '600' : 'normal',
      transition: 'all 0.2s'
    };
  };

  return (
    <section style={{ 
      maxWidth: '850px', 
      margin: '0 auto', 
      backgroundColor: '#fff', 
      border: '1px solid #ccc', 
      borderRadius: '12px', 
      display: 'flex', 
      minHeight: '500px',
      fontFamily: 'system-ui, sans-serif',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      
      {/* COLUMNA IZQUIERDA: Menú Lateral (Sidebar) */}
      <aside style={{ width: '250px', borderRight: '1px solid #eaeaea', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '1.4rem', color: '#333', padding: '25px 25px 15px 25px', margin: 0 }}>Mi Blog</h1>
        
        <nav style={{ flexGrow: 1 }}>
          <Link to="" style={getLinkStyle('', true)}>Inicio</Link>
          <Link to="articulos" style={getLinkStyle('/articulos')}>Artículos</Link>
          <Link to="acerca" style={getLinkStyle('/acerca')}>Acerca de</Link>
          <Link to="contacto" style={getLinkStyle('/contacto')}>Contacto</Link>
        </nav>

        {/* Toggle escondido en el diseño principal para cumplir el reto extra sin romper la estética */}
        <div style={{ padding: '20px', borderTop: '1px solid #eaeaea', fontSize: '0.85rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#666' }}>
            <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
            Logueado como Admin
          </label>
          {isAdmin && (
            <Link to="admin" style={{ display: 'block', marginTop: '10px', color: '#3b3b98', textDecoration: 'none', fontWeight: 'bold' }}>
              ➔ Ir al Panel
            </Link>
          )}
        </div>
      </aside>

      {/* COLUMNA DERECHA: Contenido Dinámico */}
      <main style={{ flexGrow: 1, padding: '40px' }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="articulos" element={<Articulos />} />
          <Route path="articulos/:id" element={<DetalleArticulo />} />
          <Route path="acerca" element={<Acerca />} />
          <Route path="contacto" element={<Contacto />} />
          
          {/* Reto Extra: Ruta Protegida */}
          <Route path="admin" element={
            <RutaProtegida isAuth={isAdmin}>
              <AreaAdmin />
            </RutaProtegida>
          } />
        </Routes>
      </main>

    </section>
  );
}
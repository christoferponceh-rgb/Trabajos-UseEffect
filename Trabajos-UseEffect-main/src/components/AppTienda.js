import React, { useState } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// --- BASE DE DATOS SIMULADA ---
const inventario = [
  { id: '1', nombre: 'Camiseta React', precio: 15000, emoji: '👕', desc: 'Camiseta de algodón 100% con el logo de React.' },
  { id: '2', nombre: 'Zapatillas Flex', precio: 32000, emoji: '👟', desc: 'Zapatillas ligeras ideales para programar cómodamente.' },
  { id: '3', nombre: 'Mochila Dev', precio: 25000, emoji: '🎒', desc: 'Mochila con compartimento acolchado para tu notebook.' },
  { id: '4', nombre: 'Gorra JS', precio: 12000, emoji: '🧢', desc: 'Gorra ajustable para los días de mucho sol o mucho código.' }
];

// --- SUBCOMPONENTES DE LA VISTA ---

const Catalogo = () => (
  <div>
    <h2 style={{ color: '#333' }}>Catálogo de Productos</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
      {inventario.map(producto => (
        <article key={producto.id} style={{ border: '1px solid #eaeaea', borderRadius: '8px', padding: '15px', textAlign: 'center', backgroundColor: '#fff' }}>
          <div style={{ fontSize: '4rem' }}>{producto.emoji}</div>
          <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{producto.nombre}</h3>
          <p style={{ color: '#28a745', fontWeight: 'bold', fontSize: '1.2rem' }}>${producto.precio.toLocaleString('es-CL')}</p>
          <Link to={`/tienda/productos/${producto.id}`} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 15px', backgroundColor: '#0056b3', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Ver Detalles
          </Link>
        </article>
      ))}
    </div>
  </div>
);

const DetalleProducto = ({ agregarAlCarrito }) => {
  const { id } = useParams(); // Leemos el parámetro de la URL
  const navigate = useNavigate(); // Hook para redirección programática
  
  const producto = inventario.find(p => p.id === id);

  if (!producto) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Producto no encontrado 🕵️‍♂️</h2>
        <button onClick={() => navigate('/tienda')} style={{ padding: '10px 20px', cursor: 'pointer' }}>Volver a la tienda</button>
      </div>
    );
  }

  return (
    <article style={{ display: 'flex', gap: '30px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
      <div style={{ fontSize: '8rem', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        {producto.emoji}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{producto.nombre}</h2>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '20px' }}>{producto.desc}</p>
        <p style={{ color: '#28a745', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '20px' }}>
          ${producto.precio.toLocaleString('es-CL')}
        </p>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={() => { agregarAlCarrito(producto); navigate('/tienda/carrito'); }} 
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Agregar al Carrito
          </button>
          <button onClick={() => navigate('/tienda')} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Volver
          </button>
        </div>
      </div>
    </article>
  );
};

const Carrito = ({ carrito, eliminarDelCarrito }) => {
  const navigate = useNavigate();
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <section>
      <h2 style={{ color: '#333' }}>Tu Carrito de Compras 🛒</h2>
      
      {carrito.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>Tu carrito está vacío.</p>
          <button onClick={() => navigate('/tienda')} style={{ marginTop: '15px', padding: '10px 20px', cursor: 'pointer' }}>Explorar productos</button>
        </div>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {carrito.map((item, index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '15px 0' }}>
                <span style={{ fontSize: '1.2rem' }}>{item.emoji} {item.nombre}</span>
                <div>
                  <span style={{ fontWeight: 'bold', marginRight: '15px' }}>${item.precio.toLocaleString('es-CL')}</span>
                  <button onClick={() => eliminarDelCarrito(index)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'right' }}>
            <h3 style={{ margin: '0 0 15px 0' }}>Total: ${total.toLocaleString('es-CL')}</h3>
            <button onClick={() => navigate('/tienda/checkout')} style={{ padding: '12px 25px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}>
              Proceder al Pago
            </button>
          </div>
        </>
      )}
    </section>
  );
};

const Checkout = ({ vaciarCarrito }) => {
  const navigate = useNavigate();

  const procesarPago = (e) => {
    e.preventDefault();
    vaciarCarrito();
    alert('¡Pago exitoso! Gracias por tu compra.');
    navigate('/tienda'); // Redirección tras completar el flujo de compra
  };

  return (
    <section style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Resumen de Compra 💳</h2>
      <form onSubmit={procesarPago} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input type="text" placeholder="Nombre completo" required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="text" placeholder="Dirección de envío" required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="text" placeholder="Número de Tarjeta" required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', marginTop: '10px' }}>
          Confirmar Pago
        </button>
      </form>
      <button onClick={() => navigate(-1)} style={{ width: '100%', marginTop: '15px', padding: '10px', backgroundColor: 'transparent', border: 'none', color: '#0056b3', cursor: 'pointer', textDecoration: 'underline' }}>
        Cancelar y Volver
      </button>
    </section>
  );
};

// --- COMPONENTE PRINCIPAL (LAYOUT DE LA TIENDA) ---

export default function AppTienda() {
  // El estado global del carrito vive aquí y se pasa como prop a las sub-rutas
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <section style={{ fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Navegación interna de la Tienda */}
      <header style={{ backgroundColor: '#f8f9fa', padding: '15px 20px', borderBottom: '1px solid #e9ecef', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderRadius: '8px' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>DevShop Online</h1>
        <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Link to="/tienda" style={{ textDecoration: 'none', color: '#0056b3', fontWeight: 'bold' }}>Inicio</Link>
          <Link to="/tienda/carrito" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', gap: '5px' }}>
            🛒 <span style={{ backgroundColor: '#dc3545', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>{carrito.length}</span>
          </Link>
        </nav>
      </header>

      {/* Renderizado de Sub-Rutas */}
      <main>
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/productos/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />} />
          <Route path="/checkout" element={<Checkout vaciarCarrito={vaciarCarrito} />} />
        </Routes>
      </main>
    </section>
  );
}
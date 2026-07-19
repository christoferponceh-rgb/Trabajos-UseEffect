import React, { useState, useEffect, useRef } from 'react';

export default function ChatTiempoReal() {
  // Inicializamos el chat con un mensaje de bienvenida del bot
  const [mensajes, setMensajes] = useState([
    { autor: 'Bot', texto: '¡Hola! Soy un bot básico. Escribe algo para conversar.' }
  ]);
  const [input, setInput] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const bottomRef = useRef(null);

  // Scroll automático al último mensaje cada vez que cambia el estado de mensajes o escribiendo
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes, escribiendo]);

  // Función básica de inteligencia artificial (basada en palabras clave)
  const obtenerRespuestaBot = (mensajeUsuario) => {
    const texto = mensajeUsuario.toLowerCase();

    if (texto.includes('hola') || texto.includes('saludos')) {
      return '¡Hola! ¿Cómo estás?';
    }
    if (texto.includes('clima') || texto.includes('tiempo')) {
      return 'Si quieres ver el clima, te recomiendo usar la sección del Clima de nuestra app.';
    }
    if (texto.includes('bien') && texto.length < 15) {
      return '¡Me alegra leer eso!';
    }
    if (texto.includes('gracias')) {
      return '¡De nada! Aquí estoy para ayudarte a practicar React.';
    }
    if (texto.includes('adiós') || texto.includes('chao')) {
      return '¡Hasta luego! Que tengas un excelente día.';
    }
    if (texto.includes('react') || texto.includes('javascript')) {
      return '¡Ese es un gran tema! La mejor forma de aprender es construyendo proyectos.';
    }
    
    // Si no reconoce ninguna palabra clave, elige una respuesta aleatoria
    const respuestasPorDefecto = [
      'Entiendo, cuéntame más.',
      'Qué interesante...',
      'No estoy seguro de entender, pero te leo.',
      '¡Exacto!',
      'Esa es una buena forma de verlo.'
    ];
    return respuestasPorDefecto[Math.floor(Math.random() * respuestasPorDefecto.length)];
  };

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Agregamos el mensaje del usuario inmediatamente
    const textoUsuario = input;
    setMensajes(prev => [...prev, { autor: 'Tú', texto: textoUsuario }]);
    setInput('');
    
    // 2. Activamos el indicador de que el bot está escribiendo
    setEscribiendo(true);

    // 3. Simulamos un tiempo de respuesta (1.5 segundos)
    setTimeout(() => {
      const respuesta = obtenerRespuestaBot(textoUsuario);
      setMensajes(prev => [...prev, { autor: 'Bot', texto: respuesta }]);
      setEscribiendo(false); // Apagamos el indicador
    }, 1500); 
  };

  return (
    <section style={{ maxWidth: '450px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Chat con Bot Básico 💬</h2>
      </header>

      {/* Contenedor de mensajes */}
      <article style={{ 
        height: '350px', 
        overflowY: 'auto', 
        border: '1px solid #ccc', 
        borderRadius: '8px',
        padding: '15px', 
        marginBottom: '15px',
        backgroundColor: '#e5ddd5', // Color de fondo clásico de chats
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {mensajes.map((m, i) => {
          const esMio = m.autor === 'Tú';
          return (
            <div key={i} style={{ 
              alignSelf: esMio ? 'flex-end' : 'flex-start',
              backgroundColor: esMio ? '#dcf8c6' : '#fff',
              padding: '8px 12px',
              borderRadius: '12px',
              borderBottomRightRadius: esMio ? '0' : '12px',
              borderBottomLeftRadius: esMio ? '12px' : '0',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              maxWidth: '80%'
            }}>
              <span style={{ fontSize: '0.75rem', color: '#666', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                {m.autor}
              </span>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#111' }}>{m.texto}</p>
            </div>
          );
        })}
        
        {/* Indicador de escritura */}
        {escribiendo && (
          <div style={{ 
            alignSelf: 'flex-start', 
            backgroundColor: '#fff', 
            padding: '8px 12px', 
            borderRadius: '12px', 
            borderBottomLeftRadius: '0',
            color: '#888', 
            fontSize: '0.85rem', 
            fontStyle: 'italic',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}>
            El bot está escribiendo...
          </div>
        )}
        
        {/* Ancla invisible para el scroll automático */}
        <div ref={bottomRef} /> 
      </article>

      {/* Formulario de envío */}
      <form onSubmit={enviarMensaje} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder="Escribe un mensaje aquí..." 
          disabled={escribiendo} // Evitar spam mientras el bot escribe
          style={{ flexGrow: 1, padding: '12px', borderRadius: '20px', border: '1px solid #ccc', outline: 'none' }}
        />
        <button 
          type="submit" 
          disabled={escribiendo}
          style={{ 
            padding: '10px 20px', 
            borderRadius: '20px', 
            backgroundColor: escribiendo ? '#ccc' : '#25d366', 
            color: 'white', 
            border: 'none', 
            cursor: escribiendo ? 'not-allowed' : 'pointer', 
            fontWeight: 'bold' 
          }}
        >
          Enviar
        </button>
      </form>
    </section>
  );
}
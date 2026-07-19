import React, { useState, useEffect } from 'react';

export default function FeedNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(new Date());

  const obtenerNoticias = async () => {
    setLoading(true);
    setError(null);
    try {
      // Cambiamos a Cooperativa, ya que no bloquea las peticiones externas como Bío-Bío
      const rssUrl = encodeURIComponent('https://www.cooperativa.cl/noticias/site/tax/port/all/rss_3___1.xml');
      const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);

      if (!res.ok) throw new Error('Error de red al conectar con el servidor de noticias');

      const data = await res.json();

      if (data.status !== 'ok') throw new Error('Error al procesar el feed de noticias');

      // Tomamos solo las últimas 5 noticias
      setNoticias(data.items.slice(0, 5));
      setUltimaActualizacion(new Date());
    } catch (err) {
      setError(`Fallo la conexión: ${err.message}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerNoticias();

    // Polling configurado a 5 minutos (300000 ms)
    const intervalo = setInterval(() => {
      obtenerNoticias();
    }, 300000); 

    return () => clearInterval(intervalo);
  }, []);

  return (
    <section style={{ maxWidth: '700px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Último Minuto - Chile 🇨🇱</h2>
        <span style={{ fontSize: '0.85rem', color: '#666', backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}>
          Actualizado: {ultimaActualizacion.toLocaleTimeString()}
        </span>
      </header>

      {loading && noticias.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Cargando titulares desde Chile...</div>
      ) : error ? (
        <div style={{ color: '#d32f2f', padding: '15px', backgroundColor: '#ffebee', borderRadius: '5px', border: '1px solid #ffcdd2' }}>
          {error}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {noticias.map((noticia, index) => {
            // Limpiamos el texto de cualquier etiqueta HTML (<p>, <a>, etc.) que venga dentro del RSS
            const descripcionLimpia = noticia.description.replace(/<[^>]+>/g, '').trim().substring(0, 130) + '...';
            
            // Buscamos la imagen en las diferentes propiedades que puede retornar el RSS
            const urlImagen = noticia.thumbnail || (noticia.enclosure && noticia.enclosure.link);

            return (
              <article key={index} style={{ border: '1px solid #eaeaea', borderRadius: '8px', overflow: 'hidden', display: 'flex', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                
                {urlImagen && (
                  <img 
                    src={urlImagen} 
                    alt="Miniatura de la noticia" 
                    style={{ width: '180px', objectFit: 'cover' }}
                  />
                )}
                
                <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', lineHeight: '1.3' }}>
                      <a href={noticia.link} target="_blank" rel="noopener noreferrer" style={{ color: '#0056b3', textDecoration: 'none' }}>
                        {noticia.title}
                      </a>
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#555', lineHeight: '1.4' }}>
                      {descripcionLimpia}
                    </p>
                  </div>
                  
                  <span style={{ display: 'block', marginTop: '12px', fontSize: '0.8rem', color: '#888', fontWeight: 'bold' }}>
                    {new Date(noticia.pubDate).toLocaleString('es-CL')}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
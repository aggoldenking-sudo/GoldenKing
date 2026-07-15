const { supabase } = require('../config/supabase');
const { authMiddleware } = require('../middleware/auth');

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verificar autenticación
    const user = authMiddleware(req, res);
    if (!user) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const { jugadas } = req.body;

    if (!Array.isArray(jugadas) || jugadas.length === 0) {
      return res.status(400).json({ error: 'Jugadas inválidas' });
    }

    // Validar cada jugada
    for (const j of jugadas) {
      if (!j.loteria || !j.numero || !j.animal || !j.monto || j.monto <= 0) {
        return res.status(400).json({ error: 'Datos de jugada inválidos' });
      }
    }

    // Calcular total
    const total = jugadas.reduce((sum, j) => sum + j.monto, 0);

    // Crear ticket
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .insert([{
        usuario_id: user.id,
        total,
        cantidad_jugadas: jugadas.length,
        estado: 'completado',
        fecha: new Date().toISOString()
      }])
      .select()
      .single();

    if (ticketError) {
      console.error('Error al crear ticket:', ticketError);
      return res.status(500).json({ error: 'Error al crear ticket' });
    }

    // Insertar jugadas
    const jugadasData = jugadas.map(j => ({
      ticket_id: ticket.id,
      loteria: j.loteria,
      numero: j.numero,
      animal: j.animal,
      monto: j.monto,
      fecha: new Date().toISOString()
    }));

    const { data: jugadasInsertadas, error: jugadasError } = await supabase
      .from('jugadas')
      .insert(jugadasData)
      .select();

    if (jugadasError) {
      console.error('Error al guardar jugadas:', jugadasError);
      return res.status(500).json({ error: 'Error al guardar jugadas' });
    }

    // Registrar en auditoría
    await supabase
      .from('auditorias')
      .insert([{
        usuario_id: user.id,
        accion: 'CREAR_TICKET',
        detalles: { 
          ticket_id: ticket.id,
          cantidad_jugadas: jugadas.length,
          total
        }
      }]);

    return res.status(201).json({
      mensaje: 'Ticket creado exitosamente',
      ticket: {
        id: ticket.id,
        total: ticket.total,
        cantidad_jugadas: jugadas.length,
        jugadas: jugadasInsertadas
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

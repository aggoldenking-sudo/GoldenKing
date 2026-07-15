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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verificar autenticación
    const user = authMiddleware(req, res);
    if (!user) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const { fechaInicio, fechaFin } = req.query;

    let query = supabase
      .from('tickets')
      .select('id, total, cantidad_jugadas, estado, fecha, usuario_id')
      .eq('usuario_id', user.id)
      .order('fecha', { ascending: false });

    if (fechaInicio) {
      query = query.gte('fecha', fechaInicio);
    }
    if (fechaFin) {
      query = query.lte('fecha', fechaFin);
    }

    const { data: tickets, error } = await query;

    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Error al obtener reportes' });
    }

    const totalVentas = tickets.reduce((sum, t) => sum + t.total, 0);
    const cantidadTickets = tickets.length;
    const promedioPorTicket = cantidadTickets > 0 ? totalVentas / cantidadTickets : 0;

    // Agrupar por lotería
    let loterias = {};
    for (const ticket of tickets) {
      const { data: jugadas } = await supabase
        .from('jugadas')
        .select('loteria, monto')
        .eq('ticket_id', ticket.id);

      if (jugadas) {
        jugadas.forEach(j => {
          if (!loterias[j.loteria]) {
            loterias[j.loteria] = { total: 0, cantidad: 0 };
          }
          loterias[j.loteria].total += j.monto;
          loterias[j.loteria].cantidad += 1;
        });
      }
    }

    return res.status(200).json({
      resumen: {
        totalVentas,
        cantidadTickets,
        promedioPorTicket,
        periodo: { fechaInicio, fechaFin }
      },
      porLoteria: loterias,
      tickets
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

const { supabase } = require('../config/supabase');
const { hashPassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

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
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Contraseña muy corta (mínimo 6 caracteres)' });
    }

    // Verificar si el usuario ya existe
    const { data: existingUser } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await hashPassword(password);

    // Crear usuario
    const { data: newUser, error } = await supabase
      .from('usuarios')
      .insert([
        {
          username,
          email,
          password: hashedPassword,
          rol: 'operador',
          activo: true,
          fecha_registro: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Error al crear usuario' });
    }

    const token = generateToken({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      rol: newUser.rol
    });

    return res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        rol: newUser.rol
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

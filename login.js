<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acceso | Golden King</title>
    <style>
        :root {
            --primary: #174a7c;
            --accent: #FFD700;
            --bg: #f8fafc;
        }
        body {
            display: flex; justify-content: center; align-items: center;
            min-height: 100vh; background: var(--bg);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
        }
        .login-card {
            background: white; padding: 40px; border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.08);
            width: 100%; max-width: 380px; text-align: center;
        }
        .logo-login { 
            font-size: 28px; font-weight: 800; color: var(--primary); 
            margin-bottom: 8px; 
        }
        .subtitle { color: #64748b; margin-bottom: 30px; font-size: 14px; }
        
        input {
            width: 100%; padding: 16px; margin-bottom: 15px;
            border: 2px solid #f1f5f9; border-radius: 14px;
            box-sizing: border-box; font-size: 15px; transition: 0.3s;
        }
        input:focus { border-color: var(--primary); outline: none; }
        
        button {
            width: 100%; padding: 16px; margin-top: 10px; border: none;
            border-radius: 14px; background: var(--primary); color: white;
            font-weight: 600; cursor: pointer; transition: 0.3s;
        }
        button:hover { background: #1e5a95; transform: translateY(-2px); }
        
        #mensaje { margin-top: 20px; font-size: 14px; color: #d63031; min-height: 20px; }
    </style>
</head>
<body>

    <div class="login-card">
        <div class="logo-login">👑 GOLDEN KING</div>
        <p class="subtitle">Inicia sesión para continuar</p>
        
        <input type="text" id="usuario" placeholder="Usuario">
        <input type="password" id="clave" placeholder="Contraseña">
        <button id="entrar">INGRESAR</button>
        
        <div id="mensaje"></div>
    </div>

    <script src="login.js"></script>
</body>
</html>

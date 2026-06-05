# Autenticación JWT con WordPress — CreaLab
**Fecha:** 2026-06-05  
**Estado:** Aprobado

---

## Objetivo

Conectar el formulario de login del frontend Next.js con WordPress usando JWT Authentication. Después del login exitoso, redirigir al alumno a su curso activo (si tiene uno) o al dashboard de cursos.

---

## Flujo completo

```
LoginForm (browser)
    ↓ POST {email, password}
Next.js API Route /api/auth/login
    ↓ POST credentials
WordPress /wp-json/jwt-auth/v1/token
    ↓ JWT token + user data
Next.js guarda token en cookie httpOnly (7 días)
    ↓ GET usuario con curso activo
WordPress /wp-json/wp/v2/users/me (Authorization: Bearer <token>)
    ↓ tiene curso activo?
Redirect → /curso/[id]  |  /dashboard
```

---

## WordPress — Configuración requerida

### Plugin
Instalar y activar: **"JWT Authentication for WP REST API"** (by Useful Team)

### wp-config.php
Agregar dentro del contenedor Docker (vía variable de entorno en docker-compose.yml):
```
define('JWT_AUTH_SECRET_KEY', 'valor-secreto-largo');
define('JWT_AUTH_CORS_ENABLE', true);
```

### Variable de entorno en docker-compose.yml
```yaml
WORDPRESS_CONFIG_EXTRA: |
  define('JWT_AUTH_SECRET_KEY', '${JWT_SECRET}');
  define('JWT_AUTH_CORS_ENABLE', true);
```

---

## Frontend Next.js — Componentes

### 1. `app/api/auth/login/route.ts`
API Route que actúa como proxy seguro entre el browser y WordPress.

**POST /api/auth/login**
- Recibe: `{ email, password }`
- Llama a: `POST ${WP_URL}/wp-json/jwt-auth/v1/token`
- Si éxito:
  - Setea cookie `crealab_token` (httpOnly, secure, sameSite=lax, maxAge=7días)
  - Llama a `GET ${WP_URL}/wp-json/wp/v2/users/me` con el token
  - Devuelve: `{ redirect: '/curso/[id]' | '/dashboard' }`
- Si error: devuelve `{ error: 'Credenciales incorrectas' }` con status 401

### 2. `lib/auth.ts`
Funciones de utilidad para auth:
- `getTokenFromCookie(request)` — lee `crealab_token` del request
- `verifyToken(token)` — llama a WP para validar el token
- `getActiveCourse(token)` — llama a WP para obtener el curso activo del usuario

### 3. `middleware.ts`  
Protege rutas que requieren autenticación.
- Rutas protegidas: `/dashboard`, `/curso/:path*`
- Si no hay `crealab_token` en cookies → redirect a `/`
- Si hay cookie → deja pasar

### 4. `components/LoginForm.tsx` (modificar)
Reemplazar el placeholder de onSubmit por llamada real a `/api/auth/login`:
- POST a `/api/auth/login`
- Si respuesta ok → `router.push(data.redirect)`
- Si error → mostrar mensaje de error en el formulario

### 5. `app/dashboard/page.tsx`
Página placeholder del dashboard (ruta protegida). Se expande en tareas futuras.

### 6. `app/curso/[id]/page.tsx`
Página placeholder del curso (ruta protegida). Se expande en tareas futuras.

---

## Seguridad de la cookie

```
name: crealab_token
httpOnly: true       — JS del browser no puede leerla
secure: true         — Solo HTTPS
sameSite: lax        — Protección CSRF básica
maxAge: 604800       — 7 días en segundos
path: /
```

---

## Variables de entorno

### En el servidor (`/opt/crealab/.env`)
```
JWT_SECRET=valor-secreto-largo-y-aleatorio
```

### En docker-compose.yml (WordPress)
```yaml
WORDPRESS_CONFIG_EXTRA: |
  define('JWT_AUTH_SECRET_KEY', '${JWT_SECRET}');
  define('JWT_AUTH_CORS_ENABLE', true);
```

### En el frontend (nueva variable)
```
NEXT_PUBLIC_WP_URL=https://crealab.flowhub.com.ar
WP_URL=https://crealab.flowhub.com.ar
```

---

## Detección de curso activo

Al hacer login exitoso, el API route consulta el meta del usuario en WordPress para determinar si tiene un curso en progreso. WordPress guarda el progreso de Tutor LMS en user meta.

Endpoint: `GET /wp-json/wp/v2/users/me?context=edit`

Si el campo `tutor_active_course_id` existe en el meta del usuario → redirect a `/curso/[id]`.  
Si no existe o es null → redirect a `/dashboard`.

---

## Manejo de errores

| Escenario | Respuesta |
|--|--|
| Credenciales incorrectas | 401 + "Usuario o contraseña incorrectos" |
| WordPress no responde | 503 + "Error de conexión, intentá más tarde" |
| Token expirado (en ruta protegida) | Redirect a `/` con mensaje de sesión expirada |
| Campos vacíos | Validación local en LoginForm (ya implementado) |

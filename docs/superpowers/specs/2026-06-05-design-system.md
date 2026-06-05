# Design System — CreaLab
**Fecha:** 2026-06-05  
**Estado:** Aprobado

---

## Personalidad de marca

**Energético y Creativo** — La marca transmite diversión, acción y creatividad. Apta para niños de 8 años y adolescentes hasta 18. El tono es cercano, motivador y dinámico sin ser infantil.

Tagline: *Programá. Construí. Aprendé.*

---

## Paleta de colores

| Rol | Color | Hex |
|-----|-------|-----|
| Principal | Naranja | `#FF6B35` |
| Acento | Amarillo | `#FFD23F` |
| Secundario | Turquesa | `#4ECDC4` |
| Sidebar / texto oscuro | Teal oscuro | `#1A535C` |
| Fondo | Gris claro | `#F8F9FA` |
| Texto | Negro suave | `#1A1A2E` |

**Gradiente de marca:** `linear-gradient(135deg, #FF6B35, #FFD23F)` — usado en headers, hero sections y cards activas.

---

## Tipografía

**Fuente única:** [Nunito](https://fonts.google.com/specimen/Nunito) (Google Fonts, gratis)

| Uso | Peso | Tamaño referencia |
|-----|------|-------------------|
| Títulos / logo | Black (900) | 28–48px |
| Subtítulos / labels | Bold (700) | 16–20px |
| Cuerpo / descripciones | Regular (400) | 13–15px |

Nunito es redondeada y amigable — excelente legibilidad en pantalla para todas las edades.

---

## Layouts

### Página de inicio / Login
**Split pantalla (50/50):**
- **Izquierda:** Fondo con gradiente de marca (naranja → amarillo). Logo, tagline y elementos visuales de la marca.
- **Derecha:** Fondo blanco. Formulario de login (email + contraseña + botón ingresar + link a registro).
- En mobile: se apila verticalmente (marca arriba, login abajo).

### Dashboard del alumno
**Grid de cards por módulo:**
- Cada módulo/sección es una card visual.
- Cards activas / disponibles: color de la paleta con gradiente.
- Cards bloqueadas: gris (#f5f5f5), con candado 🔒.
- Cards completadas: turquesa (#4ECDC4) con check ✓.
- Barra de progreso dentro de cada card activa.

---

## Íconos y gráficos

**Sistema mixto en dos niveles:**

| Contexto | Tipo | Ejemplos |
|----------|------|---------|
| Contenido, módulos, logros, estados | Emojis nativos | 🤖 💡 🏆 🚀 🎯 🔧 📚 ✓ 🔒 |
| Navegación, botones, UI funcional | Lucide Icons (SVG) | Home, Code, Star, User, ChevronRight |

Lucide Icons: `npm install lucide-react` — set consistente, open source, perfecto para React/Next.js.

---

## Componentes base

### Botón primario
```
background: #FF6B35
color: white
border-radius: 10px
font-weight: 700
font-family: Nunito
padding: 12px 24px
```

### Botón secundario
```
background: white
color: #FF6B35
border: 2px solid #FF6B35
border-radius: 10px
font-weight: 700
```

### Card de módulo
```
border-radius: 14px
padding: 16px
background: gradiente (activa) | #f5f5f5 (bloqueada) | #4ECDC4 (completada)
shadow: 0 4px 12px rgba(0,0,0,0.08)
```

### Input
```
background: #F8F9FA
border: 2px solid #eee
border-radius: 10px
padding: 12px 16px
font-family: Nunito
focus-border: #FF6B35
```

---

## Guía de uso

- **Nunca** usar el naranja sobre el amarillo (bajo contraste).
- El gradiente de marca va siempre de naranja (#FF6B35) a amarillo (#FFD23F), de izquierda a derecha o de arriba a abajo.
- El teal oscuro (#1A535C) es para texto sobre fondos claros cuando el negro es demasiado pesado.
- Turquesa (#4ECDC4) es para estados positivos/completados, nunca para errores.
- Errores: rojo estándar `#EF4444`.
- Éxito: turquesa `#4ECDC4`.

# Plan de Tareas — CreaLab

Seguimiento completo del proyecto. Tildá cada tarea al completarla.

---

## FASE 0 — Infraestructura del servidor
*Objetivo: servidor andando con WordPress accesible por subdominio*

- [x] Crear repo en GitHub (`crealab`)
- [x] Agregar secrets en GitHub: `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY`
- [x] Crear directorio `/opt/crealab` en el servidor
- [x] Clonar repo en el servidor (`git clone`)
- [x] Crear `.env` en el servidor con passwords reales (copiar de `.env.example`)
- [x] Ejecutar `docker compose up -d` en el servidor
- [x] Verificar que WordPress y MariaDB corren (`docker ps`)
- [x] Configurar subdominio en Hetzner DNS (`crealab.flowhub.com.ar` → IP del servidor)
- [x] Crear config Nginx para el subdominio (proxy → puerto 8081)
- [x] Activar SSL con Certbot (`certbot --nginx -d crealab.flowhub.com.ar`)
- [x] Verificar acceso a WordPress por HTTPS

---

## FASE 1 — Configuración WordPress (Módulos 1 y 2)
*Objetivo: admin + tienda + pagos funcionando*

- [x] Completar wizard de instalación de WordPress
- [x] Instalar plugin: WooCommerce
- [x] Instalar plugin: Tutor LMS
- [x] Instalar plugin: FluentCRM
- [x] Instalar plugin: MercadoPago para WooCommerce
- [x] Instalar plugin: CURCY Multi Currency (USD base + ARS para Argentina)
- [x] Configurar WooCommerce (moneda USD + ARS, cupones activados)
- [x] Integrar Tutor LMS con WooCommerce (monetización)
- [ ] Crear producto: Módulo 0 — Programación básica ($12 USD)
- [ ] Crear producto: Kit Starter + Módulo 1 (precio a definir)
- [ ] Crear producto: Suscripción curso completo ($15 USD/mes)
- [ ] Configurar cupón de descuento automático (FluentCRM → trigger al completar Módulo 0)
- [ ] Habilitar REST API de WordPress (headless mode)
- [ ] Testear flujo completo: compra Módulo 0 → cupón → compra kit

---

## FASE 2 — Contenido Módulo 0
*Objetivo: curso de programación básica completo y vendible*

- [ ] Definir estructura del Módulo 0 (lecciones, orden)
- [ ] Crear curso en Tutor LMS
- [ ] Grabar/crear videos de cada lección
- [ ] Crear quizzes por lección
- [ ] Configurar acceso: solo usuarios que compraron Módulo 0
- [ ] Testear experiencia completa del alumno en Módulo 0
- [ ] Configurar trigger: al completar → enviar cupón por email (FluentCRM)

---

## FASE 3 — Frontend Next.js (Módulo 3 — Plataforma de cursos)
*Objetivo: UI para el alumno, diseñada para niños 8–14 años*

- [ ] Crear app Next.js en `/Users/federicovera/Documents/Software/crealab/frontend/`
- [ ] Configurar GitHub Actions para deploy del frontend (puerto 3002)
- [ ] Integrar autenticación con WordPress (validar acceso al curso)
- [ ] Pantalla de login / registro
- [ ] Dashboard del alumno (módulos disponibles, progreso)
- [ ] Player de video + navegación de lecciones
- [ ] Sistema de progreso y insignias
- [ ] Pantalla post-Módulo 0: mostrar cupón de descuento
- [ ] Configurar Nginx para frontend (`cursos.flowhub.com.ar` → puerto 3002)
- [ ] Testear flujo completo en mobile y desktop

---

## FASE 4 — IDE de Desarrollo (Módulo 4)
*Objetivo: entorno de programación visual integrado al curso*

- [ ] Crear app Next.js para el IDE en `/crealab/ide/`
- [ ] Integrar Blockly (bloques visuales — Etapa 1)
- [ ] Integrar Monaco Editor (código real — Etapa 3)
- [ ] Implementar vista dual: bloques + código en paralelo (Etapa 2)
- [ ] Integrar WebSerial API (carga de código al hardware por USB)
- [ ] Modo embebido: IDE como componente dentro del curso
- [ ] Modo standalone: IDE en pantalla completa (`ide.cursos.flowhub.com.ar`)
- [ ] Validación de acceso (usuario con suscripción activa)
- [ ] Configurar Nginx para IDE standalone (puerto 3003)
- [ ] Testear carga de código a hardware real (Arduino/ESP32)

---

## FASE 5 — Asistente Virtual (Módulo 5)
*Objetivo: tutor IA integrado al curso y al IDE*

- [ ] Definir prompts del asistente (español, pistas progresivas, no da respuesta directa)
- [ ] Implementar chat UI en el frontend del curso
- [ ] Conectar al asistente con contexto del módulo actual del alumno
- [ ] Guardar historial de conversación por alumno en base de datos
- [ ] Integrar Ollama local para desarrollo y pruebas
- [ ] Integrar Claude API para producción
- [ ] Tutor del IDE: detecta errores de código, da pistas específicas por línea
- [ ] Tutor del curso: responde dudas conceptuales ("¿qué es una variable?")
- [ ] Testear experiencia completa con alumno real

---

## TAREAS DE NEGOCIO (paralelas al desarrollo)

- [ ] Definir nombre del proyecto / marca
- [ ] Configurar subdominio definitivo en flowhub.com.ar
- [ ] Consultar despachante de aduana: régimen de importación para monotributista
- [ ] Definir BOM (lista de componentes) del Kit Starter
- [ ] Buscar proveedores en AliExpress/Alibaba para cada componente
- [ ] Calcular COGS real con costos de courier + aduana confirmados
- [ ] Definir precio final del Kit Starter
- [ ] Abrir cuenta en MercadoPago (si no está)
- [ ] Definir política de devoluciones para el hardware

---

## ESTADO ACTUAL

**Completado:**
- [x] Definición del modelo de negocio
- [x] Definición del stack tecnológico
- [x] Definición de módulos del sistema
- [x] Estructura de pantallas
- [x] Archivos base del proyecto (`docker-compose.yml`, GitHub Actions, `.gitignore`)
- [x] Fase 0 completa — servidor + WordPress + HTTPS funcionando
- [x] Fase 1 parcial — plugins instalados y configurados

**Próximo paso:** Fase 1 — crear productos en WooCommerce (Módulo 0, Kit Starter, Suscripción)

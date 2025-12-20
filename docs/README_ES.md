# Bot 9k_analytics - Documentación Completa

## Tabla de Contenidos
1. [Descripción General](#descripción-general)
2. [Arquitectura](#arquitectura)
3. [Características](#características)
4. [Instalación y Configuración](#instalación-y-configuración)
5. [Comandos](#comandos)
6. [Esquema de Base de Datos](#esquema-de-base-de-datos)
7. [Configuración](#configuración)
8. [Desarrollo](#desarrollo)
9. [Solución de Problemas](#solución-de-problemas)

---

## Descripción General

**9k_analytics** es un bot de Discord especializado diseñado para manejar operaciones de análisis computacionalmente intensivas para el ecosistema 9k. Este bot fue creado para descargar tareas de procesamiento pesado del bot principal (`9k`), asegurando un rendimiento y capacidad de respuesta óptimos en todo el sistema.

### Propósito

El propósito principal de este bot es:
- Procesar comandos de análisis que requieren muchos recursos sin afectar el rendimiento del bot principal
- Generar estadísticas detalladas de mensajes y visualizaciones
- Proporcionar información sobre patrones de actividad del servidor
- Mantener una experiencia de usuario receptiva incluso durante tareas computacionales pesadas

### Beneficios Clave

- **Aislamiento de Rendimiento**: Las operaciones pesadas se ejecutan independientemente del bot principal
- **Recursos Dedicados**: Procesamiento especializado para tareas de análisis
- **Escalabilidad**: Puede implementarse en infraestructura separada si es necesario
- **Confiabilidad**: El bot principal permanece receptivo incluso durante operaciones de análisis intensivas

---

## Arquitectura

### Stack Tecnológico

- **Runtime**: Node.js v16+
- **API de Discord**: Discord.js v14
- **Base de Datos**: MySQL (compartida con el bot principal 9k)
- **Generación de Gráficos**: ChartJS Node Canvas
- **Manejo de Fechas**: date-fns, date-diff
- **Sistema de Módulos**: Módulos ES6

### Estructura del Proyecto

```
9k_analytics/
├── commands/               # Módulos de comandos
│   └── moderation/
│       └── messages.js    # Comando de estadísticas de mensajes
├── utils/                 # Funciones utilitarias
│   └── functions.js       # Funciones auxiliares para BD, usuarios, embeds
├── docs/                  # Documentación
│   ├── README_EN.md      # Documentación en inglés
│   └── README_ES.md      # Documentación en español
├── config.js             # Configuración del bot (ignorado por git)
├── config.example.js     # Plantilla de configuración de ejemplo
├── index.js              # Punto de entrada principal del bot
├── deploy-commands.js    # Script de implementación de comandos
├── package.json          # Dependencias y scripts
└── README.md            # Guía de inicio rápido
```

### Componentes Principales

#### 1. **Instancia Principal del Bot** (`index.js`)
- Inicializa el cliente de Discord con los intents requeridos
- Carga comandos dinámicamente desde el directorio `commands/`
- Maneja el seguimiento de mensajes y gestión de usuarios
- Gestiona interacciones de comandos slash
- Mantiene conexión a la base de datos MySQL

#### 2. **Sistema de Comandos** (`commands/`)
- Estructura de comandos modular
- Cada comando es un módulo autocontenido
- Soporta comandos slash con SlashCommandBuilder de Discord.js
- Los comandos están organizados por categoría (ej. moderación)

#### 3. **Funciones Utilitarias** (`utils/functions.js`)
- Operaciones de base de datos (GetUser, AddUser, AddServerMessageSQL, etc.)
- Ayudantes para creación de embeds
- Gestión de datos de usuarios
- Utilidades de seguimiento de mensajes

#### 4. **Capa de Base de Datos**
- Base de datos MySQL compartida con el bot principal 9k
- Tablas: `BotUsers`, `Messages`
- Rastrea actividad de usuarios e historial de mensajes
- Habilita análisis entre bots

---

## Características

### Análisis de Mensajes

La característica principal del bot es el análisis completo de mensajes con el comando `/messages`:

#### Capacidades

1. **Análisis Basado en Tiempo**
   - Ver estadísticas por minutos, horas, días, semanas, meses o años
   - Marcos de tiempo personalizables (ej. últimos 7 días, últimas 24 horas)
   - Análisis de datos históricos

2. **Gráficos Visuales**
   - Generación de gráficos hermosos usando ChartJS
   - Gráficos de líneas mostrando tendencias de mensajes a lo largo del tiempo
   - Visualización de datos codificada por colores

3. **Rankings de Usuarios**
   - Principales contribuidores de mensajes
   - Estadísticas específicas por usuario
   - Funcionalidad de tabla de clasificación

4. **Análisis Específico por Canal**
   - Analizar servidores completos o canales específicos
   - Comparar actividad entre canales
   - Identificar canales más activos

5. **Modos de Visualización**
   - **Vista de Servidor**: Estadísticas agregadas del servidor
   - **Vista Predeterminada**: Desglose detallado por usuario

---

## Instalación y Configuración

### Requisitos Previos

Antes de instalar el bot, asegúrate de tener:

- **Node.js**: Versión 16 o superior
- **MySQL**: Instancia en ejecución con credenciales de acceso
- **Bot de Discord**: Aplicación creada con token de bot
- **Git**: Para control de versiones (opcional)

### Instalación Paso a Paso

#### 1. Navegar al Directorio del Proyecto

```bash
cd c:/Users/owenu/OneDrive/Escritorio/9k_works/9k_analytics
```

#### 2. Instalar Dependencias

```bash
npm install
```

Esto instalará:
- `discord.js` - Wrapper de la API de Discord
- `mysql2` - Driver de base de datos MySQL
- `chartjs-node-canvas` - Generación de gráficos
- `canvas` - Renderizado de canvas
- `date-fns` - Manipulación de fechas
- `date-diff` - Cálculos de diferencia de fechas
- `@discordjs/voice` - Soporte de voz (si es necesario)

#### 3. Configurar el Bot

Copiar la configuración de ejemplo:

```bash
cp config.example.js config.js
```

Editar `config.js` con tus credenciales:

```javascript
export default {
    token: 'TU_TOKEN_DE_BOT_AQUI',
    clientId: '1451501132328337492',
    guildId: 'TU_ID_DE_SERVIDOR_DE_DESARROLLO', // Para desarrollo
    environment: 'development', // o 'production'
    
    database: {
        host: '127.0.0.1',
        user: 'tu_usuario_mysql',
        password: 'tu_contraseña_mysql',
        database: 'webdata'
    },
    
    bot: {
        icon: 'https://url-de-icono-de-tu-bot.png',
        invite: 'https://discord.com/oauth2/authorize?client_id=1451501132328337492',
        serverInvite: 'https://discord.gg/tu-servidor'
    },
    
    webhooks: {
        team: {
            id: 'id_webhook',
            token: 'token_webhook'
        }
    }
};
```

#### 4. Configuración de Base de Datos

Asegúrate de que tu base de datos MySQL tenga las tablas requeridas:

```sql
-- Tabla BotUsers
CREATE TABLE IF NOT EXISTS BotUsers (
    userid VARCHAR(255) PRIMARY KEY,
    exp INT DEFAULT 0,
    messages INT DEFAULT 0,
    cash INT DEFAULT 0,
    websiteuser VARCHAR(255)
);

-- Tabla Messages
CREATE TABLE IF NOT EXISTS Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serverid VARCHAR(255),
    userid VARCHAR(255),
    messageid VARCHAR(255),
    channelid VARCHAR(255),
    senton DATETIME,
    INDEX idx_serverid (serverid),
    INDEX idx_userid (userid),
    INDEX idx_senton (senton)
);
```

#### 5. Implementar Comandos

Registrar comandos slash con Discord:

```bash
npm run deployC
```

Este paso es requerido:
- Al configurar el bot por primera vez
- Después de agregar nuevos comandos
- Después de modificar opciones de comandos

#### 6. Iniciar el Bot

**Modo desarrollo** (con reinicio automático):
```bash
npm run dev
```

**Modo producción**:
```bash
npm start
```

---

## Comandos

### `/messages` - Estadísticas de Mensajes

Muestra estadísticas completas de mensajes del servidor con gráficos interactivos.

#### Opciones del Comando

| Opción | Tipo | Descripción | Requerido | Predeterminado |
|--------|------|-------------|-----------|----------------|
| `timeframe` | Número | Número de unidades de tiempo a mostrar | No | 30 |
| `type` | Elección | Tipo de unidad de tiempo | No | days |
| `display` | Elección | Modo de visualización | No | server |
| `channel` | Canal | Canal específico a analizar | No | Todos los canales |

#### Tipos de Unidad de Tiempo

- **All**: Todos los datos disponibles
- **Minutes**: Análisis minuto a minuto
- **Hours**: Desglose por hora
- **Days**: Estadísticas diarias
- **Weeks**: Agregación semanal
- **Months**: Resumen mensual
- **Years**: Tendencias anuales

#### Modos de Visualización

- **Server View**: Estadísticas agregadas del servidor con conteos totales de mensajes
- **Default View**: Desglose detallado mostrando los principales usuarios

#### Ejemplos de Uso

```
/messages
→ Muestra los últimos 30 días de mensajes del servidor

/messages timeframe:7 type:days
→ Muestra los últimos 7 días

/messages type:hours timeframe:24 display:server
→ Muestra las últimas 24 horas en vista de servidor

/messages channel:#general
→ Muestra estadísticas solo del canal #general

/messages type:months timeframe:6 display:default
→ Muestra los últimos 6 meses con desglose por usuario
```

#### Salida

El comando genera:
1. **Mensaje Embed** con:
   - Nombre del servidor/canal
   - Período de tiempo analizado
   - Conteo total de mensajes
   - Principales contribuidores (en vista predeterminada)

2. **Imagen de Gráfico** mostrando:
   - Tendencias de mensajes a lo largo del tiempo
   - Representación visual de patrones de actividad
   - Eje x etiquetado con tiempo
   - Eje y con conteo de mensajes

---

## Esquema de Base de Datos

### Tabla BotUsers

Almacena información y estadísticas de usuarios.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `userid` | VARCHAR(255) | ID de usuario de Discord (Clave Primaria) |
| `exp` | INT | Puntos de experiencia |
| `messages` | INT | Conteo total de mensajes |
| `cash` | INT | Moneda virtual |
| `websiteuser` | VARCHAR(255) | ID de usuario del sitio web vinculado |

### Tabla Messages

Rastrea todos los mensajes para análisis.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INT | ID auto-incremental (Clave Primaria) |
| `serverid` | VARCHAR(255) | ID de servidor/guild de Discord |
| `userid` | VARCHAR(255) | ID de usuario de Discord |
| `messageid` | VARCHAR(255) | ID de mensaje de Discord |
| `channelid` | VARCHAR(255) | ID de canal de Discord |
| `senton` | DATETIME | Marca de tiempo del mensaje |

**Índices**: `serverid`, `userid`, `senton` para consultas optimizadas

---

## Configuración

### Modos de Entorno

#### Modo Desarrollo

```javascript
environment: 'development'
guildId: 'TU_ID_DE_SERVIDOR'
```

- Comandos registrados en guild específico
- Actualizaciones instantáneas de comandos
- Ciclo de prueba más rápido
- Recomendado para desarrollo

#### Modo Producción

```javascript
environment: 'production'
```

- Comandos registrados globalmente
- Las actualizaciones tardan hasta 1 hora
- Disponible en todos los servidores
- Recomendado para implementación en vivo

### Configuración de Base de Datos

```javascript
database: {
    host: '127.0.0.1',      // Host de MySQL
    user: 'usuario',         // Usuario de MySQL
    password: 'contraseña',  // Contraseña de MySQL
    database: 'webdata'      // Nombre de la base de datos
}
```

### Configuración del Bot

```javascript
bot: {
    icon: 'URL',           // URL del avatar del bot
    invite: 'URL',         // Enlace de invitación del bot
    serverInvite: 'URL'    // Invitación al servidor de soporte
}
```

### Webhooks (Opcional)

```javascript
webhooks: {
    team: {
        id: 'id_webhook',
        token: 'token_webhook'
    }
}
```

---

## Desarrollo

### Agregar Nuevos Comandos

1. Crear un nuevo archivo en `commands/[categoria]/nombrecomando.js`
2. Usar esta plantilla:

```javascript
import { SlashCommandBuilder } from 'discord.js';

export default {
    name: 'nombrecomando',
    data: new SlashCommandBuilder()
        .setName('nombrecomando')
        .setDescription('Descripción del comando'),
    
    async execute(interaction, User, Bot) {
        // Lógica del comando aquí
        await interaction.reply('Respuesta');
    }
};
```

3. Implementar comandos: `npm run deployC`
4. Reiniciar el bot

### Funciones Utilitarias

Funciones comunes disponibles en `utils/functions.js`:

- `GetUser(userid, Bot)` - Recuperar datos de usuario
- `AddUser(userid, Bot)` - Agregar nuevo usuario
- `CreateEmbed(options)` - Crear embed de Discord
- `ReturnDB(table, Bot)` - Obtener tabla de base de datos
- `SaveBotUsers(Bot)` - Guardar datos de usuario en base de datos
- `AddServerMessageSQL(entry, Bot)` - Registrar mensaje en base de datos

### Mejores Prácticas

1. **Siempre diferir operaciones largas**:
   ```javascript
   await interaction.deferReply();
   // Operación larga
   await interaction.editReply(response);
   ```

2. **Manejar errores con gracia**:
   ```javascript
   try {
       // Lógica del comando
   } catch (error) {
       console.error(error);
       await interaction.reply({ content: '¡Error!', ephemeral: true });
   }
   ```

3. **Usar mensajes efímeros para errores**:
   ```javascript
   await interaction.reply({ content: 'Error', ephemeral: true });
   ```

---

## Solución de Problemas

### El Bot No Inicia

**Síntomas**: El bot se bloquea al iniciar o no se conecta

**Soluciones**:
- Verificar el token del bot en `config.js`
- Comprobar versión de Node.js: `node --version` (debe ser 16+)
- Asegurar que MySQL esté en ejecución
- Verificar credenciales de base de datos
- Revisar mensajes de error en consola

### Los Comandos No Aparecen

**Síntomas**: Los comandos slash no se muestran en Discord

**Soluciones**:
- Ejecutar `npm run deployC` para registrar comandos
- En modo desarrollo, verificar que `guildId` sea correcto
- Esperar hasta 1 hora para comandos globales (producción)
- Verificar que el bot tenga el scope `applications.commands`
- Asegurar que el bot esté en el servidor

### Errores de Base de Datos

**Síntomas**: Errores relacionados con conexiones de base de datos

**Soluciones**:
- Verificar que MySQL esté en ejecución: `mysql -u usuario -p`
- Comprobar que la base de datos existe: `SHOW DATABASES;`
- Verificar credenciales en `config.js`
- Asegurar que las tablas existan (ejecutar creación de esquema)
- Verificar conectividad de red a la base de datos

### Falla la Generación de Gráficos

**Síntomas**: El comando `/messages` falla o no aparece ningún gráfico

**Soluciones**:
- Asegurar que `canvas` y `chartjs-node-canvas` estén instalados
- Verificar que el sistema tenga dependencias requeridas (en Linux: `libcairo2-dev`, `libpango1.0-dev`, etc.)
- Verificar memoria suficiente para generación de gráficos
- Revisar consola para mensajes de error específicos

### Errores de Permisos

**Síntomas**: El bot no puede enviar mensajes o archivos adjuntos

**Soluciones**:
- Verificar que el bot tenga permiso `Send Messages`
- Asegurar que el bot tenga permiso `Attach Files` (para gráficos)
- Verificar sobrescrituras de permisos específicas del canal
- Verificar posición del rol del bot en la jerarquía del servidor

---

## Proyectos Relacionados

- **9kDev**: Bot de desarrollo principal para el ecosistema 9k
- **9000INC_bot**: Bot de producción para la comunidad 9000 INC

## Soporte

Para problemas o preguntas:
- Consultar esta documentación
- Revisar mensajes de error en consola
- Verificar configuraciones
- Asegurar que se cumplan todos los requisitos previos

## Licencia

ISC

---

**Última Actualización**: Diciembre 2024  
**Versión del Bot**: 1.0.0  
**Client ID**: 1451501132328337492

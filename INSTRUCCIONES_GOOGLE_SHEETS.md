# 📊 Cómo Conectar con Google Sheets

## Paso 1: Preparar tu Google Sheet

1. **Abrí tu Google Sheet** con los datos de testing
2. **Hacelo público** o compartido con "Cualquiera con el enlace puede ver"
   - Click en "Compartir" (arriba a la derecha)
   - En "Acceso general" seleccioná "Cualquiera con el enlace"
   - Asegurate que esté en modo "Lector"

3. **Copiá el ID del Sheet** de la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
   ```
   Ejemplo: `1BxiMVs0XRA5nFMdKvBdBZjgmUaaNo1example`
   # url nuestra: 1PgY2epXds06e5xoEsWeDFCmaZK26Tz4O9rEzBR80km4

## Paso 2: Obtener API Key de Google

1. Andá a [Google Cloud Console](https://console.cloud.google.com/)
2. Creá un nuevo proyecto o seleccioná uno existente
3. Habilitá la **Google Sheets API**:
   - Menú → APIs y servicios → Biblioteca
   - Buscá "Google Sheets API"
   - Click en "Habilitar"

4. Creá una API Key:
   - Menú → APIs y servicios → Credenciales
   - Click en "Crear credenciales" → "Clave de API"
   - Copiá la API Key generada

api nuestr: AIzaSyC9XamibD58V_jLnolwQqp4fTzUiXMhvXw


## Paso 3: Configurar el Proyecto

1. **Creá un archivo `.env`** en la raíz del proyecto (copiá de `.env.example`):

```bash
VITE_GOOGLE_SHEET_ID=tu_sheet_id_aqui
VITE_GOOGLE_API_KEY=tu_api_key_aqui
```

2. **Reemplazá los valores** con tu Sheet ID y API Key

## Paso 4: Estructura del Excel

Para que el parser funcione correctamente, tu Excel debería tener una estructura similar a:

```
| Etiqueta           | Valor    |
|--------------------|----------|
| RUN                | RUN-001  |
| Cobertura          | 20.41%   |
| Test Planificados  | 98       |
| Test Ejecutados    | 20       |
| Bugs               | 12       |
| Defectos           | 6        |
| Mejoras            | 6        |
| Bugs Abiertos      | 12       |
| Bugs Cerrados      | 0        |
| Bugs Cancelados    | 0        |
| Pass               | 12       |
| Failed             | 8        |
| Pending            | 1        |
| Pass Percent       | 57.1     |
| Failed Percent     | 38.1     |
| Pending Percent    | 4.8      |
|                    |          |
| Tester             | Pass | Failed | Pending |
| Federico           | 2    | 6      | 0       |
| Leonel             | 4    | 2      | 1       |
| Ramiro             | 6    | 0      | 0       |
```

**Nota:** Si tu Excel tiene una estructura diferente, vas a necesitar ajustar la función `parseTestData()` en `src/services/sheetsService.js`

## Paso 5: Activar Datos en Vivo

1. **Ejecutá el proyecto**: `npm run dev`
2. **Click en el toggle** arriba a la derecha que dice "Datos de ejemplo"
3. Se cambiará a **"Datos en vivo"** 🟢
4. Los datos se actualizarán automáticamente cada 30 segundos

## 🔧 Personalizar el Parser

Si tu Excel tiene una estructura diferente, editá `src/services/sheetsService.js`:

```javascript
export function parseTestData(rawData) {
  // Ajustá los índices según tu Excel
  return {
    cobertura: parseFloat(rawData[1][1]) || 0,  // Fila 2, Columna B
    testsPlanificados: parseInt(rawData[2][1]) || 0,  // Fila 3, Columna B
    // ... etc
  }
}
```

## 🚨 Troubleshooting

### Error: "No se encontraron datos en el sheet"
- Verificá que el Sheet ID sea correcto
- Asegurate que el sheet esté público o compartido
- Verificá que el nombre de la hoja sea correcto (por defecto busca "Sheet1")

### Error: "API Key inválida"
- Verificá que la API Key esté correcta en el archivo `.env`
- Asegurate de haber habilitado Google Sheets API en Google Cloud Console
- Reiniciá el servidor de desarrollo después de cambiar el `.env`

### Los datos no se actualizan
- Abrí la consola del navegador (F12) y buscá errores
- Verificá que el toggle esté en "Datos en vivo" 🟢
- Probá refrescar la página

## 📝 Ejemplo de .env

```bash
VITE_GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUaaNo1example
VITE_GOOGLE_API_KEY=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY
```

---

¡Listo! Ahora tu dashboard se actualiza automáticamente con los datos de tu Google Sheet 🚀


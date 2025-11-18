# 📊 Testing Summary Dashboard - Grupo 5

## ✨ Un Resumen Ejecutivo "Zarpado"

Este proyecto es un **dashboard de resumen de testing**, diseñado para visualizar de forma clara, moderna y atractiva los resultados de los ciclos de testing. La interfaz es completamente interactiva y está pensada para ofrecer un panorama completo del estado del proyecto de un solo vistazo.

El dashboard presenta una estética de "ventana de navegador", con un diseño limpio y animaciones sutiles que mejoran la experiencia de usuario.

## 🚀 Tecnologías Utilizadas

*   **Frontend:** React 18 con Vite
*   **Librería de Gráficos:** Recharts
*   **Estilos:** CSS-in-JS (inline styles) con un enfoque moderno y gradientes.
*   **Fuente de Datos:**
    *   **Local:** Datos de ejemplo para demostración.
    *   **En Vivo:** Conexión directa a **Google Sheets** para actualizaciones en tiempo real.

## 核心 Características Principales

### 📈 Visualización de Datos Clave

El dashboard está compuesto por varias secciones, cada una diseñada para resaltar una métrica importante:

*   **Header Principal:** Muestra el **nombre del RUN actual** y la **cobertura de testing** con una barra de progreso.
*   **Grilla de Estadísticas:** Una serie de tarjetas interactivas que muestran:
    *   Tests Planificados
    *   Tests Ejecutados
    *   Bugs Totales
    *   Defectos
    *   Mejoras
    *   Bugs Abiertos
*   **Resultados del Run:** Un gráfico de torta (Pie Chart) que desglosa los resultados en:
    *   **Pass** (verde)
    *   **Failed** (rojo)
    *   **Pending** (amarillo)
*   **Estado de Bugs y Calidad:** Una tarjeta dedicada a mostrar el estado de los bugs:
    *   Bugs Abiertos
    *   Bugs Cerrados
    *   Bugs Cancelados
    *   Defectos y Mejoras
*   **Tests por Tester:** Un gráfico de barras que muestra el rendimiento de cada tester, con el detalle de casos `Pass`, `Failed` y `Pending`.

### 🔄 Datos en Vivo vs. Datos de Ejemplo

Una de las características más potentes es el **toggle para cambiar la fuente de datos**:

*   **📊 Datos de ejemplo:** Permite ver el dashboard con datos pre-cargados, ideal para demostraciones.
*   **🟢 Datos en vivo:** Se conecta a una **Google Sheet** y actualiza los datos automáticamente cada 30 segundos.

Esto permite tener un resumen siempre actualizado sin necesidad de intervención manual.

## 🛠️ Cómo Empezar

1.  **Clonar el repositorio.**
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Ejecutar el proyecto:**
    ```bash
    npm run dev
    ```
    Esto iniciará el servidor de desarrollo y abrirá el dashboard en tu navegador. Por defecto, usará los datos de ejemplo.

## 🔗 Conectar con Google Sheets

Para usar tus propios datos, seguí las instrucciones en `INSTRUCCIONES_GOOGLE_SHEETS.md`. En resumen:

1.  **Creá un archivo `.env`** en la raíz del proyecto.
2.  **Añadí tu `SHEET_ID` y `API_KEY` de Google:**
    ```
    VITE_GOOGLE_SHEET_ID=tu_sheet_id
    VITE_GOOGLE_API_KEY=tu_api_key
    ```
3.  **Reiniciá el servidor de desarrollo.**
4.  **Activá el toggle "Datos en vivo"** en el dashboard.

## 🎨 Personalización

El código está estructurado de forma modular en componentes de React, lo que facilita la personalización:

*   **`src/components`**: Modificá los componentes visuales.
*   **`src/services/sheetsService.js`**: Ajustá el `parser` si la estructura de tu Google Sheet es diferente.
*   **`src/data/testData.js`**: Cambiá los datos de ejemplo.

---

Este es un resumen completo del proyecto. ¡Espero que te sirva!

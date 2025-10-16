# Portfolio

Un portfolio moderno y minimalista construido con Astro, React y TailwindCSS.

---

## **Stack**

### **Frontend**

![Astro](https://img.shields.io/badge/Astro-FF5D01?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

### **Backend**

![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)

### **Tools**

![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black)

---

## **Características**

✨ **Diseño Minimalista** - Interfaz limpia y moderna  
📱 **Responsive** - Adaptado para todos los dispositivos  
🎨 **Animaciones Suaves** - Transiciones y efectos interactivos  
🔥 **Firebase Integration** - Backend para funcionalidades dinámicas  
⚡ **Optimizado** - Carga rápida y rendimiento excepcional  
🌙 **Tema Oscuro** - Diseño optimizado para lectura nocturna

---

## **Estructura del Proyecto**

```
Portfolio/
├── public/
│   └── svg/
├── src/
│   ├── components/
│   │   ├── contact.astro
│   │   ├── footer.astro
│   │   ├── home.astro
│   │   ├── logoWall.astro
│   │   ├── nav.astro
│   │   └── projects.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── React/
│   │   ├── LetterGlitch.tsx
│   │   ├── LikeButton.tsx
│   │   └── SkillsList.tsx
│   ├── pages/
│   │   └── index.astro
│   ├── firebase.ts
│   └── env.d.ts
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

---

## **Configuración Local**

### **Prerequisitos**

- Node.js 18+ o superior
- pnpm (recomendado) o npm

### **Instalación**

1. **Clona el repositorio:**

```bash
git clone https://github.com/Gan-dev/portfolio.git
cd portfolio
```

2. **Instala las dependencias:**

```bash
pnpm install
# o
npm install
```

3. **Configura las variables de entorno:**  
   Crea un archivo `.env` en la raíz del proyecto con tus credenciales de Firebase:

```env
PUBLIC_FIREBASE_API_KEY=tu_api_key
PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
PUBLIC_FIREBASE_APP_ID=tu_app_id
```

4. **Inicia el servidor de desarrollo:**

```bash
pnpm dev
# o
npm run dev
```

5. **Abre tu navegador:**  
   Visita `http://localhost:4321`

---

## **Scripts Disponibles**

```bash
pnpm dev          # Inicia el servidor de desarrollo
pnpm build        # Construye el proyecto para producción
pnpm preview      # Previsualiza la build de producción
```

---

## **Componentes Destacados**

### **LetterGlitch**

Efecto de texto glitch animado para títulos impactantes.

### **LikeButton**

Botón interactivo con integración a Firebase para gestionar likes.

### **SkillsList**

Lista desplegable de habilidades técnicas organizada por categorías.

### **Sidebar Navigation**

Navegación lateral responsive con animaciones suaves.

---

## **Variables CSS Globales**

El proyecto utiliza variables CSS personalizadas definidas en `Layout.astro`:

```css
--background: #0f1113 /* Fondo principal */ --component-bg: #1a1d21
  /* Fondo de componentes */ --sec: #37e4e7 /* Color acento (cyan) */
  --white: #dfdfdf /* Blanco principal */ --white-icon: #f3f3f398
  /* Iconos blancos */ --white-icon-tr: #f3f3f310 /* Iconos transparentes */;
```

---

## **Personalización**

### **Colores**

Modifica las variables CSS en `src/layouts/Layout.astro` para cambiar el esquema de colores.

### **Contenido**

Edita los componentes en `src/components/` para personalizar las secciones del portfolio.

### **Proyectos**

Actualiza `src/components/projects.astro` con tus propios proyectos.

---

## **Despliegue**

Este proyecto está optimizado para desplegarse en:

- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- Cualquier plataforma que soporte sitios estáticos

```bash
pnpm build
```

Los archivos estáticos se generarán en la carpeta `dist/`.

---

## **Licencia**

Este proyecto está bajo la Licencia MIT.  
Copyright © 2025. Todos los derechos reservados.

---

## **Créditos**

- Componente **LetterGlitch** adaptado de [ReactBits.dev](https://www.reactbits.dev/)
- Iconos de [Remix Icon](https://remixicon.com/)
- Fuentes de [CDN Fonts](https://www.cdnfonts.com/)

---

**Desarrollado con ❤️ usando Astro + React + TailwindCSS**

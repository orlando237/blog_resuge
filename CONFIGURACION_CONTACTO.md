# Configuración del Formulario de Contacto

## Validaciones Implementadas

### 1. Validación de Nombre
- ✅ Solo acepta letras (incluyendo caracteres especiales como ñ, á, é, í, ó, ú)
- ✅ Permite espacios entre nombres
- ✅ No acepta números ni símbolos especiales

### 2. Validación de Correo Electrónico
- ✅ Acepta los siguientes dominios:
  - @gmail.com
  - @outlook.com
  - @hotmail.com
  - @yahoo.com
  - @live.com
  - @icloud.com
  - @protonmail.com
- ✅ Formato válido de correo electrónico

### 3. Envío de Correos
- ✅ Los mensajes se envían automáticamente a: `osoriohoyosorlandodavid207@gmail.com`
- ✅ Incluye toda la información del formulario
- ✅ Alertas personalizadas en español

## Configuración de EmailJS

Para que el envío de correos funcione correctamente, sigue estos pasos:

### Paso 1: Crear Cuenta en EmailJS
1. Ve a [https://www.emailjs.com](https://www.emailjs.com)
2. Crea una cuenta gratuita
3. Verifica tu correo electrónico

### Paso 2: Configurar Servicio de Email
1. En el panel de EmailJS, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **Gmail** (recomendado)
4. Autoriza tu cuenta de Gmail
5. Copia el **Service ID** que aparece

### Paso 3: Crear Plantilla de Email
1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Usa esta plantilla:

```
Asunto: Nuevo mensaje de contacto - {{subject}}

Hola Orlando,

Has recibido un nuevo mensaje de contacto desde tu blog:

Nombre: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de Past Events Blog.
```

4. Guarda la plantilla y copia el **Template ID**

### Paso 4: Obtener Public Key
1. Ve a **"Account"** → **"API Keys"**
2. Copia tu **Public Key**

### Paso 5: Configurar el Archivo
1. Abre el archivo `emailjs-config.js`
2. Reemplaza los valores:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "tu_public_key_real",
    SERVICE_ID: "tu_service_id_real",
    TEMPLATE_ID: "tu_template_id_real"
}
```

## Pruebas

Una vez configurado:
1. Abre `index.html` en tu navegador
2. Ve a la sección de contacto
3. Llena el formulario con datos de prueba
4. Verifica que recibas el correo en `osoriohoyosorlandodavid207@gmail.com`

## Características Adicionales

- ✅ Alertas personalizadas con animaciones
- ✅ Validación en tiempo real
- ✅ Responsive design para móviles
- ✅ Feedback visual durante el envío
- ✅ Manejo de errores
- ✅ Autocompletado deshabilitado para mejor UX

## Solución de Problemas

### El formulario no envía correos
1. Verifica que EmailJS esté configurado correctamente
2. Revisa la consola del navegador para errores
3. Asegúrate de que los IDs en `emailjs-config.js` sean correctos

### Los correos no llegan
1. Verifica la carpeta de spam
2. Confirma que el email de destino sea correcto
3. Revisa la configuración del servicio en EmailJS

### Errores de validación
1. Verifica que el nombre solo contenga letras
2. Asegúrate de usar un correo con dominio válido
3. Completa todos los campos requeridos

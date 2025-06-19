// EmailJS Configuration
// Instrucciones para configurar EmailJS:

/*
PASOS PARA CONFIGURAR EMAILJS:

1. Ve a https://www.emailjs.com y crea una cuenta gratuita
2. Verifica tu correo electrónico
3. En el panel de EmailJS:
   - Ve a "Email Services" y conecta tu servicio de correo (Gmail recomendado)
   - Ve a "Email Templates" y crea una plantilla
   - Ve a "Account" -> "API Keys" para obtener tu Public Key

4. Reemplaza los valores abajo con tus datos reales:
*/

const EMAILJS_CONFIG = {
    // Tu Public Key de EmailJS (obtenlo desde Account -> API Keys)
    PUBLIC_KEY: "D2n5GhHP4eFdgk1N6",
    
    // Tu Service ID (obtenlo desde Email Services)
    SERVICE_ID: "service_i232g0c",
    
    // Tu Template ID (obtenlo desde Email Templates)
    TEMPLATE_ID: "template_oq2vxde"
}

// Plantilla sugerida para EmailJS:
/*
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
*/

import { Question } from './types';

// ---------------------------------------------------------------------------
// CONFIGURACIÓN DE GOOGLE SHEETS
// ---------------------------------------------------------------------------
// REVISA SI ESTA URL ES IGUAL A LA DE TU IMPLEMENTACIÓN ACTUAL EN GOOGLE APPS SCRIPT
export const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzJb-ks0db0SXO3JnUcY9spaIGOh720P5K5cdOYfdtKJtfieI4WZ4dlL7mhC9tFjVvO/exec";

/*
  -------------------------------------------------------------------------
  INSTRUCCIONES PARA GOOGLE APPS SCRIPT (VERSIÓN DEFINITIVA - FORM DATA)
  -------------------------------------------------------------------------
  Esta versión usa el método de "Formulario Estándar" que es el más robusto.
  
  1. Borra todo el código en tu editor de Google Apps Script.
  2. Pega este código nuevo (Actualizado con firma Xyclos Academy):

  function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 1. LEER DATOS (Modo Formulario Estándar)
    // Al recibir x-www-form-urlencoded, Google pone los datos en e.parameter
    var p = e.parameter;
    
    // 2. GUARDAR EN SHEETS
    sheet.appendRow([
      p.date, 
      p.firstName, 
      p.lastName, 
      p.email, 
      p.score, 
      p.total
    ]);
    
    // 3. ENVIAR CORREO
    try {
      MailApp.sendEmail({
        to: p.email,
        subject: "Resultados: Evaluación Estratégica de Marketing Digital",
        body: "Hola " + p.firstName + ",\n\n" +
              "Gracias por realizar la evaluación.\n" +
              "Tu resultado: " + p.score + " de " + p.total + " aciertos.\n\n" +
              "Atentamente,\nEquipo Xyclos Academy\nhttps://www.xyclos.academy"
      });
    } catch (err) {
      // Si falla el correo, continuamos para no perder el registro
    }
    
    return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
  }

  -------------------------------------------------------------------------
  PASOS DE IMPLEMENTACIÓN (¡CRUCIAL!):
  1. Dale al botón azul "Implementar" (arriba a la derecha).
  2. Selecciona "Gestionar implementaciones".
  3. Dale al icono de "Editar" (lápiz) en tu implementación activa.
  4. En Versión, selecciona "Nueva versión".
  5. Asegúrate de que "Quién tiene acceso" sea "Cualquiera".
  6. Dale a "Implementar".
  -------------------------------------------------------------------------
*/

// Based on the provided text about Sales Funnels and Digital Marketing Campaigns.
export const QUESTION_POOL: Question[] = [
  {
    id: 1,
    question: "¿Cuál es el objetivo principal de la fase TOFU (Top of Funnel)?",
    options: [
      "Cerrar la venta inmediatamente",
      "Atraer miradas y generar reconocimiento de marca",
      "Conseguir el correo electrónico del usuario",
      "Instalar una aplicación móvil"
    ],
    correctIndex: 1,
    feedback: "TOFU es la parte superior del embudo. Su meta es atraer miradas y generar notoriedad, ya que la gente aún no te conoce."
  },
  {
    id: 2,
    question: "En la fase MOFU (Middle of Funnel), ¿qué se busca principalmente?",
    options: [
      "Venta directa",
      "Alcance masivo sin interacción",
      "Generar interés, conexión y capturar datos",
      "Fidelizar clientes antiguos"
    ],
    correctIndex: 2,
    feedback: "En MOFU, la audiencia ya te ubica. El objetivo es nutrir esa relación, educar y capturar información de contacto."
  },
  {
    id: 3,
    question: "¿Qué métrica es fundamental para medir el éxito de una campaña de Ventas (BOFU)?",
    options: [
      "Likes y Comentarios",
      "Alcance",
      "ROAS (Retorno de la Inversión Publicitaria)",
      "Vistas de página"
    ],
    correctIndex: 2,
    feedback: "El ROAS mide la rentabilidad: cuánto dinero generas por cada dólar gastado en anuncios. Es clave en la fase de Ventas."
  },
  {
    id: 4,
    question: "¿Qué campaña es ideal para la fase de Descubrimiento (TOFU)?",
    options: [
      "Campaña de Reconocimiento (Awareness)",
      "Campaña de Clientes Potenciales (Leads)",
      "Campaña de Ventas",
      "Campaña de Promoción de App"
    ],
    correctIndex: 0,
    feedback: "La campaña de Reconocimiento está diseñada para maximizar la visibilidad y sembrar la notoriedad de marca."
  },
  {
    id: 5,
    question: "Si inviertes $100 y generas $400 en ventas, ¿cuál es tu ROAS?",
    options: [
      "400%",
      "4",
      "0.25",
      "3"
    ],
    correctIndex: 1,
    feedback: "El ROAS se calcula dividiendo los ingresos entre la inversión ($400 / $100 = 4). Por cada $1 invertido, recuperaste $4."
  },
  {
    id: 6,
    question: "¿Cuál es el error más común en marketing digital según el documento?",
    options: [
      "Usar demasiados hashtags",
      "Tratar de venderle a alguien que ni siquiera sabe que existes",
      "No usar TikTok",
      "Hacer campañas de tráfico"
    ],
    correctIndex: 1,
    feedback: "Intentar vender (BOFU) sin haber generado reconocimiento (TOFU) es ineficiente porque no se ha construido confianza."
  },
  {
    id: 7,
    question: "¿Para qué sirve una campaña de Tráfico?",
    options: [
      "Para conseguir likes en Facebook",
      "Para dirigir personas a un destino fuera de la plataforma (web, blog, WhatsApp)",
      "Para que la gente vea un video completo",
      "Para ventas directas inmediatas"
    ],
    correctIndex: 1,
    feedback: "El objetivo de Tráfico es llevar al usuario a una Landing Page, Blog o chat para que profundice su conocimiento."
  },
  {
    id: 8,
    question: "¿Qué se necesita técnicamente para una campaña de Promoción de App?",
    options: [
      "Solo una página de Facebook",
      "Un formulario de contacto",
      "Configurar el SDK (Kit de Desarrollo de Software)",
      "Tener 10,000 seguidores"
    ],
    correctIndex: 2,
    feedback: "El SDK es un prerrequisito técnico innegociable para el seguimiento preciso de instalaciones y eventos in-app."
  },
  {
    id: 9,
    question: "¿Cuánto se recomienda que dure una campaña de Reconocimiento para no saturar?",
    options: [
      "1 a 2 días",
      "Mínimo 7-10 días, idealmente entre 14 y 21 días",
      "3 meses",
      "Indefinidamente"
    ],
    correctIndex: 1,
    feedback: "Menos tiempo no genera impacto, y más tiempo puede aburrir a la audiencia si no se varían los anuncios."
  },
  {
    id: 10,
    question: "¿Qué tipo de campaña actúa como puente entre MOFU y BOFU al capturar datos?",
    options: [
      "Interacción",
      "Clientes Potenciales (Leads)",
      "Reconocimiento",
      "Tráfico"
    ],
    correctIndex: 1,
    feedback: "Las campañas de Leads capturan el interés (MOFU) y proporcionan el dato de contacto para cerrar la venta (BOFU)."
  },
  {
    id: 11,
    question: "¿Qué significa CPL?",
    options: [
      "Costo Por Like",
      "Campaña Para Líderes",
      "Costo Por Lead",
      "Clicks Por Landing"
    ],
    correctIndex: 2,
    feedback: "CPL significa Costo Por Lead, y es la métrica principal para medir la eficiencia de las campañas de generación de clientes potenciales."
  },
  {
    id: 12,
    question: "¿Qué métricas cualitativas se usan en campañas de Interacción?",
    options: [
      "Ventas totales",
      "Instalaciones de App",
      "Prueba social (Me gusta, comentarios, compartidos)",
      "Formularios llenados"
    ],
    correctIndex: 2,
    feedback: "La interacción genera prueba social, haciendo que la marca se perciba como más relevante y confiable."
  },
  {
    id: 13,
    question: "Si tu objetivo es que te visiten en tu sitio web, ¿qué campaña usas?",
    options: [
      "Reconocimiento",
      "Ventas",
      "Tráfico",
      "Promoción de App"
    ],
    correctIndex: 2,
    feedback: "La campaña de Tráfico está optimizada específicamente para conseguir visitas a la página de destino o clics en el enlace."
  },
  {
    id: 14,
    question: "¿Qué es un 'Lead Magnet'?",
    options: [
      "Un imán físico que se regala",
      "Un incentivo atractivo ofrecido a cambio de los datos de contacto del usuario",
      "Una herramienta de software",
      "Un tipo de anuncio de video"
    ],
    correctIndex: 1,
    feedback: "Es fundamental en campañas de Leads: ofreces valor (e-book, webinar, descuento) para que el usuario te dé sus datos."
  },
  {
    id: 15,
    question: "¿Cuál es la secuencia lógica estratégica recomendada?",
    options: [
      "Ventas -> Tráfico -> Reconocimiento",
      "Reconocimiento -> Interacción/Leads -> Ventas",
      "Leads -> Reconocimiento -> Tráfico",
      "Solo Ventas"
    ],
    correctIndex: 1,
    feedback: "El orden correcto es: primero que te conozcan (Reconocimiento), luego generar conexión (MOFU), y finalmente vender (Ventas)."
  },
  {
    id: 16,
    question: "Para campañas de Ventas, ¿qué herramienta técnica es crucial en tu sitio web?",
    options: [
      "Un contador de visitas",
      "El Pixel de seguimiento",
      "Un blog",
      "Un video de YouTube"
    ],
    correctIndex: 1,
    feedback: "El Pixel permite rastrear las conversiones, optimizar los anuncios para compras y crear audiencias de retargeting."
  },
  {
    id: 17,
    question: "¿Qué son las audiencias 'Lookalike'?",
    options: [
      "Audiencias que odian tu marca",
      "Audiencias similares a tus mejores clientes",
      "Usuarios que abandonaron el carrito",
      "Bots de internet"
    ],
    correctIndex: 1,
    feedback: "Las audiencias Lookalike (similares) se usan en TOFU para encontrar personas nuevas que se parecen a tus clientes actuales."
  },
  {
    id: 18,
    question: "¿Qué se debe optimizar en una campaña de Tráfico para asegurar calidad?",
    options: [
      "Clics en el enlace",
      "Vistas de página de destino (Landing Page Views)",
      "Alcance",
      "Impresiones"
    ],
    correctIndex: 1,
    feedback: "Optimizar por Vistas de página de destino confirma que el usuario no solo hizo clic, sino que esperó a que la página cargara."
  },
  {
    id: 19,
    question: "En el contexto BOFU, ¿qué tipo de audiencia tiene mayor intención?",
    options: [
      "Audiencia fría (desconocidos)",
      "Público general",
      "Visitantes recientes, carritos abandonados o listas de clientes",
      "Usuarios de TikTok al azar"
    ],
    correctIndex: 2,
    feedback: "Estas audiencias ya han mostrado interés y están mucho más cerca de tomar la decisión de compra."
  },
  {
    id: 20,
    question: "¿Cuál es el propósito del embudo de ventas?",
    options: [
      "Hacer diseños bonitos",
      "Alinear tácticas de marketing con la mentalidad y disposición del consumidor",
      "Gastar menos dinero",
      "Tener más seguidores en Instagram"
    ],
    correctIndex: 1,
    feedback: "El embudo es una herramienta estratégica para entregar el mensaje correcto a la persona adecuada en el momento preciso."
  },
  // --- NUEVAS PREGUNTAS (21-50) ---
  {
    id: 21,
    question: "¿Qué tipo de segmentación se recomienda para la fase TOFU?",
    options: [
      "Segmentación muy cerrada y específica",
      "Solo retargeting a clientes actuales",
      "Segmentación amplia o audiencias similares (lookalike)",
      "Segmentación por número de tarjeta de crédito"
    ],
    correctIndex: 2,
    feedback: "En TOFU buscas llegar a nuevas personas, por lo que una segmentación amplia permite a la plataforma encontrar a los mejores prospectos."
  },
  {
    id: 22,
    question: "¿Qué es el 'Deep Linking' en el contexto de Promoción de Apps?",
    options: [
      "Un enlace que lleva a la Dark Web",
      "Un enlace que dirige al usuario a una sección específica dentro de la app",
      "Un enlace roto",
      "Un enlace solo para ordenadores de escritorio"
    ],
    correctIndex: 1,
    feedback: "El deep linking mejora la experiencia del usuario al llevarlo directamente al contenido relevante dentro de la aplicación instalada."
  },
  {
    id: 23,
    question: "¿Cuál es la diferencia entre Alcance e Impresiones?",
    options: [
      "Son lo mismo",
      "Alcance son personas únicas; Impresiones son el número total de veces que se muestra el anuncio",
      "Alcance son clics; Impresiones son ventas",
      "Impresiones son más importantes que el ROAS"
    ],
    correctIndex: 1,
    feedback: "Una misma persona puede ver un anuncio varias veces (Impresiones), pero cuenta como un solo usuario en el Alcance."
  },
  {
    id: 24,
    question: "Si tu objetivo es generar una conversación directa con el cliente, ¿qué destino de tráfico podrías usar?",
    options: [
      "Wikipedia",
      "WhatsApp, Messenger o Direct de Instagram",
      "La página de inicio de Google",
      "Un video de YouTube ajeno"
    ],
    correctIndex: 1,
    feedback: "Las campañas de tráfico o interacción pueden dirigirse a apps de mensajería para iniciar un trato personalizado."
  },
  {
    id: 25,
    question: "¿Qué tipo de contenido suele funcionar mejor en campañas de Interacción?",
    options: [
      "Fotos de stock aburridas",
      "Textos legales largos sin imágenes",
      "Contenido que genere debate, preguntas o motive a compartir",
      "Botones de compra directa sin contexto"
    ],
    correctIndex: 2,
    feedback: "Para lograr engagement, el contenido debe apelar a la emoción o curiosidad del usuario para invitarlo a participar."
  },
  {
    id: 26,
    question: "¿Qué se debe hacer después de obtener un Lead?",
    options: [
      "Nada, esperar a que compre solo",
      "Enviarle spam diariamente",
      "Conectarlo a un CRM e iniciar un seguimiento inmediato",
      "Borrarlo de la base de datos"
    ],
    correctIndex: 2,
    feedback: "El lead es solo el inicio. La conversión real ocurre con el seguimiento comercial oportuno."
  },
  {
    id: 27,
    question: "¿Qué significa CTR?",
    options: [
      "Cost To Register",
      "Click-Through Rate (Tasa de clics)",
      "Customer Total Return",
      "Campaign Time Remaining"
    ],
    correctIndex: 1,
    feedback: "El CTR mide qué tan atractivo es tu anuncio: es el porcentaje de personas que hacen clic después de verlo."
  },
  {
    id: 28,
    question: "En una campaña de Ventas, ¿qué elemento es vital para mostrar productos dinámicamente?",
    options: [
      "El Catálogo de productos",
      "Un logo grande",
      "Música de fondo",
      "El botón de 'Me gusta'"
    ],
    correctIndex: 0,
    feedback: "El catálogo permite mostrar anuncios personalizados con los productos específicos que el usuario visitó o podría querer."
  },
  {
    id: 29,
    question: "¿Por qué no es ideal optimizar una campaña de Ventas por 'Clics'?",
    options: [
      "Porque los clics son muy caros",
      "Porque el algoritmo buscará curiosos que hacen clic, no necesariamente compradores",
      "Porque Facebook no lo permite",
      "Porque los clics no se pueden medir"
    ],
    correctIndex: 1,
    feedback: "Debes optimizar por el resultado que deseas. Si quieres compras, optimiza por 'Conversiones' o 'Compras', no por clics."
  },
  {
    id: 30,
    question: "¿Qué campaña usarías para recuperar a usuarios que abandonaron el carrito de compra?",
    options: [
      "Campaña de Reconocimiento",
      "Campaña de Ventas (Retargeting)",
      "Campaña de Tráfico",
      "Campaña de Interacción"
    ],
    correctIndex: 1,
    feedback: "El retargeting en la fase de Ventas (BOFU) es la estrategia más efectiva para cerrar conversiones pendientes."
  },
  {
    id: 31,
    question: "¿Cuál es el indicador de 'Recuerdo del Anuncio Estimado'?",
    options: [
      "Cuánta gente compró",
      "Cuánta gente hizo clic",
      "Una métrica que estima cuántas personas recordarían haber visto tu anuncio si se les pregunta 2 días después",
      "El costo por mil impresiones"
    ],
    correctIndex: 2,
    feedback: "Es una métrica clave en campañas de Reconocimiento (Brand Awareness) para medir la efectividad del impacto mental."
  },
  {
    id: 32,
    question: "¿Qué son los 'Eventos In-App'?",
    options: [
      "Fiestas presenciales",
      "Acciones específicas dentro de una aplicación (tutorial completado, nivel alcanzado, compra)",
      "Errores de la aplicación",
      "Notificaciones push"
    ],
    correctIndex: 1,
    feedback: "Las campañas de App Promotion pueden optimizarse para que los usuarios realicen estas acciones valiosas, no solo la instalación."
  },
  {
    id: 33,
    question: "Si tu ROAS es menor a 1 (ej: 0.8), ¿qué significa?",
    options: [
      "Que estás ganando mucho dinero",
      "Que por cada dólar invertido, recuperas 80 centavos (estás perdiendo dinero)",
      "Que tu campaña es viral",
      "Que el pixel no funciona"
    ],
    correctIndex: 1,
    feedback: "Un ROAS inferior a 1 indica que el retorno es menor que la inversión publicitaria directa."
  },
  {
    id: 34,
    question: "¿Qué es una 'Landing Page'?",
    options: [
      "La página de inicio de Facebook",
      "Una página web diseñada específicamente para recibir tráfico y convertir visitantes en leads o clientes",
      "Un perfil de Instagram",
      "Un correo electrónico"
    ],
    correctIndex: 1,
    feedback: "La Landing Page elimina distracciones y enfoca al usuario en una única acción (CTA)."
  },
  {
    id: 35,
    question: "¿Por qué se usan formularios instantáneos en campañas de Leads?",
    options: [
      "Porque son más bonitos",
      "Para reducir la fricción: cargan rápido y se autocompletan con datos del perfil del usuario",
      "Porque no requieren internet",
      "Porque son gratis"
    ],
    correctIndex: 1,
    feedback: "Facilitar el proceso de llenado aumenta significativamente la tasa de conversión de leads."
  },
  {
    id: 36,
    question: "¿Qué rol juega la 'Prueba Social' en el marketing?",
    options: [
      "Ninguno, es irrelevante",
      "Genera desconfianza",
      "Valida tu marca ante nuevos usuarios al mostrar que otros ya interactúan y confían en ella",
      "Sirve solo para influencers"
    ],
    correctIndex: 2,
    feedback: "Ver muchos likes o comentarios positivos reduce la incertidumbre de un cliente potencial nuevo."
  },
  {
    id: 37,
    question: "¿Cuál es el principal riesgo de ejecutar campañas aisladas sin estructura?",
    options: [
      "Gastar menos presupuesto",
      "Dispersión de esfuerzos y dilución de resultados",
      "Tener demasiados clientes",
      "Que te bloqueen la cuenta"
    ],
    correctIndex: 1,
    feedback: "Sin un hilo conductor (embudo), las acciones no se suman entre sí para guiar al usuario a la compra."
  },
  {
    id: 38,
    question: "¿Qué significa optimizar por 'Conversión'?",
    options: [
      "Pedirle al algoritmo que busque personas propensas a realizar una acción valiosa (comprar, registrarse)",
      "Buscar personas que solo miren el anuncio",
      "Cambiar el color del anuncio",
      "Reducir el tamaño de las imágenes"
    ],
    correctIndex: 0,
    feedback: "La optimización por conversión enfoca el presupuesto en usuarios con historial de tomar acciones."
  },
  {
    id: 39,
    question: "¿Cuál es la analogía utilizada para explicar por qué no vender en frío?",
    options: [
      "No pedir matrimonio en la primera cita",
      "No correr antes de caminar",
      "No vender hielo a esquimales",
      "No pescar sin anzuelo"
    ],
    correctIndex: 0,
    feedback: "Esta analogía ilustra la importancia de construir una relación y confianza antes de pedir el compromiso de compra."
  },
  {
    id: 40,
    question: "¿Qué tipo de anuncio es típico en la fase de Reconocimiento?",
    options: [
      "Un botón de 'Comprar ya' gigante",
      "Un video o imagen visualmente impactante que presente la marca o problema",
      "Un formulario largo",
      "Un código de descuento agresivo"
    ],
    correctIndex: 1,
    feedback: "El objetivo es captar la atención y ser memorable, no cerrar la transacción inmediatamente."
  },
  {
    id: 41,
    question: "¿Qué es el 'Retargeting' o 'Remarketing'?",
    options: [
      "Marketing para gente retirada",
      "Volver a impactar a usuarios que ya interactuaron con tu marca anteriormente",
      "Cambiar el logo de la empresa",
      "Hacer marketing en dos idiomas"
    ],
    correctIndex: 1,
    feedback: "Es la táctica más potente del BOFU, aprovechando que el usuario ya mostró interés previo."
  },
  {
    id: 42,
    question: "¿Qué ventaja tiene usar el objetivo de 'Promoción de App' sobre 'Tráfico' para una app?",
    options: [
      "Ninguna",
      "Que lleva directo a la tienda de aplicaciones (App Store/Play Store) y optimiza por descargas",
      "Que es más barato",
      "Que permite usar más texto"
    ],
    correctIndex: 1,
    feedback: "El objetivo específico asegura que el sistema busque usuarios propensos a instalar apps, no solo a visitar webs."
  },
  {
    id: 43,
    question: "¿Qué se entiende por 'Audiencia Fría'?",
    options: [
      "Personas que viven en climas fríos",
      "Personas que nunca han oído hablar de tu marca",
      "Personas que odian comprar",
      "Clientes antiguos inactivos"
    ],
    correctIndex: 1,
    feedback: "Las audiencias frías requieren calentamiento (TOFU/MOFU) antes de intentar venderles."
  },
  {
    id: 44,
    question: "¿Cuál es una buena práctica para la creatividad en campañas de reconocimiento?",
    options: [
      "Usar siempre la misma imagen por un año",
      "Variar el estilo, mensaje y formato para no aburrir (fatiga publicitaria)",
      "Usar imágenes de baja calidad",
      "No poner el logo de la marca"
    ],
    correctIndex: 1,
    feedback: "La variedad mantiene el interés y permite impactar al usuario desde diferentes ángulos."
  },
  {
    id: 45,
    question: "¿Qué métrica es secundaria en una campaña de Ventas?",
    options: [
      "ROAS",
      "Costo por Compra",
      "Likes",
      "Valor de conversión"
    ],
    correctIndex: 2,
    feedback: "Aunque los likes son buenos, en una campaña de ventas son vanidad. Lo que importa es la rentabilidad (ROAS)."
  },
  {
    id: 46,
    question: "¿Qué implica tener una 'Estrategia Digital Cohesionada'?",
    options: [
      "Tener cuentas en todas las redes sociales",
      "Que cada acción contribuya lógicamente a un objetivo superior dentro del embudo",
      "Gastar todo el presupuesto el primer día",
      "Copiar a la competencia"
    ],
    correctIndex: 1,
    feedback: "La cohesión significa que las piezas del rompecabezas (campañas) encajan para mover al cliente hacia la compra."
  },
  {
    id: 47,
    question: "¿Para qué sirve el botón CTA (Call to Action)?",
    options: [
      "Para decorar el anuncio",
      "Para indicar claramente al usuario qué acción debe tomar (ej: 'Más información', 'Comprar')",
      "Para cerrar el anuncio",
      "Para dar like automáticamente"
    ],
    correctIndex: 1,
    feedback: "Un CTA claro aumenta la probabilidad de que el usuario realice la acción deseada."
  },
  {
    id: 48,
    question: "¿En qué etapa del embudo se encuentra un usuario que añade un producto al carrito pero no compra?",
    options: [
      "TOFU",
      "MOFU",
      "BOFU",
      "Fuera del embudo"
    ],
    correctIndex: 2,
    feedback: "Está en la parte final (BOFU), mostrando una altísima intención de compra. Es ideal para retargeting."
  },
  {
    id: 49,
    question: "¿Qué es un 'Prospecto Calificado'?",
    options: [
      "Alguien que pasó un examen",
      "Un usuario que ha mostrado interés y cumple con el perfil de cliente ideal",
      "Cualquier persona en internet",
      "Un empleado de la empresa"
    ],
    correctIndex: 1,
    feedback: "El marketing busca calificar a los prospectos (pasarlos de fríos a tibios/calientes) para facilitar la venta."
  },
  {
    id: 50,
    question: "Si quieres aumentar la base de datos de tu newsletter, ¿qué campaña configuras?",
    options: [
      "Reconocimiento",
      "Ventas",
      "Clientes Potenciales (Leads)",
      "Promoción de App"
    ],
    correctIndex: 2,
    feedback: "El objetivo de Leads es recolectar datos (como el correo) a cambio de valor, ideal para newsletters."
  }
];
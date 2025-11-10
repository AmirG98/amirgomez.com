import { FormVariant } from './MultiStepForm';

export const formVariantsEs: Record<string, FormVariant> = {
  consultation: {
    id: 'consultation',
    title: 'Agenda Tu Sesión de Estrategia Gratuita',
    subtitle: 'Obtén una estrategia de marketing personalizada en 30 minutos',
    step1Title: 'Obtén Tu Sesión de Estrategia Gratuita de 30 Minutos',
    step1Subtitle: 'Únete a más de 200 dueños de negocios que han transformado su marketing con una sesión de estrategia personalizada. Sin presión de ventas, solo insights accionables.',
    step2Fields: [
      {
        name: 'firstName',
        label: 'Nombre',
        type: 'text',
        required: true,
        placeholder: 'Juan'
      },
      {
        name: 'lastName',
        label: 'Apellido',
        type: 'text',
        required: true,
        placeholder: 'García'
      },
      {
        name: 'company',
        label: 'Nombre de la Empresa',
        type: 'text',
        required: true,
        placeholder: 'Mi Empresa S.A.'
      },
      {
        name: 'phone',
        label: 'Número de Teléfono',
        type: 'tel',
        required: true,
        placeholder: '(555) 123-4567'
      },
      {
        name: 'monthlyBudget',
        label: 'Presupuesto Mensual de Marketing',
        type: 'select',
        required: true,
        placeholder: 'Selecciona rango de presupuesto',
        options: [
          'Menos de $1,000',
          '$1,000 - $5,000',
          '$5,000 - $10,000',
          '$10,000 - $25,000',
          '$25,000 - $50,000',
          '$50,000+'
        ]
      },
      {
        name: 'biggestChallenge',
        label: '¿Cuál es tu mayor desafío de marketing?',
        type: 'textarea',
        required: true,
        placeholder: 'Cuéntame sobre tu situación actual de marketing y lo que quieres mejorar...'
      }
    ],
    submitText: 'Agendar Mi Sesión',
    successMessage: '¡Gracias por tu interés! Me pondré en contacto pronto para hablar sobre tu proyecto y los próximos pasos.'
  },

  audit: {
    id: 'audit',
    title: 'Obtén Tu Auditoría de Marketing Gratuita',
    subtitle: 'Descubre oportunidades ocultas en tu marketing actual',
    step1Title: 'Obtén Tu Auditoría Gratuita de Rendimiento de Marketing',
    step1Subtitle: 'Analizaré tu marketing actual y te proporcionaré un reporte detallado con recomendaciones específicas para mejorar tu ROI.',
    step2Fields: [
      {
        name: 'firstName',
        label: 'Nombre',
        type: 'text',
        required: true,
        placeholder: 'Juan'
      },
      {
        name: 'lastName',
        label: 'Apellido',
        type: 'text',
        required: true,
        placeholder: 'García'
      },
      {
        name: 'company',
        label: 'Nombre de la Empresa',
        type: 'text',
        required: true,
        placeholder: 'Mi Empresa S.A.'
      },
      {
        name: 'website',
        label: 'URL del Sitio Web',
        type: 'url',
        required: true,
        placeholder: 'https://tuempresa.com'
      },
      {
        name: 'monthlyBudget',
        label: 'Gasto Publicitario Mensual Actual',
        type: 'select',
        required: true,
        placeholder: 'Selecciona gasto actual',
        options: [
          'Menos de $1,000',
          '$1,000 - $5,000',
          '$5,000 - $10,000',
          '$10,000 - $25,000',
          '$25,000 - $50,000',
          '$50,000+'
        ]
      },
      {
        name: 'mainGoal',
        label: '¿Cuál es tu objetivo principal de marketing?',
        type: 'select',
        required: true,
        placeholder: 'Selecciona tu objetivo principal',
        options: [
          'Aumentar leads/conversiones',
          'Reducir costo por adquisición',
          'Mejorar ROI/ROAS',
          'Escalar campañas existentes',
          'Lanzar nuevas campañas',
          'Mejor seguimiento/atribución'
        ]
      }
    ],
    submitText: 'Obtener Mi Auditoría Gratuita',
    successMessage: '¡Gracias por tu interés! Me pondré en contacto pronto para hablar sobre tu proyecto y compartir los resultados de tu auditoría.'
  },

  campaign: {
    id: 'campaign',
    title: 'Inicia Tu Campaña de Marketing',
    subtitle: 'Construyamos una campaña que genere resultados reales',
    step1Title: '¿Listo para Lanzar Tu Próxima Campaña?',
    step1Subtitle: 'Cuéntame sobre tu negocio y crearé una estrategia de campaña personalizada diseñada para maximizar tu ROI desde el primer día.',
    step2Fields: [
      {
        name: 'firstName',
        label: 'Nombre',
        type: 'text',
        required: true,
        placeholder: 'Juan'
      },
      {
        name: 'lastName',
        label: 'Apellido',
        type: 'text',
        required: true,
        placeholder: 'García'
      },
      {
        name: 'company',
        label: 'Nombre de la Empresa',
        type: 'text',
        required: true,
        placeholder: 'Mi Empresa S.A.'
      },
      {
        name: 'phone',
        label: 'Número de Teléfono',
        type: 'tel',
        required: true,
        placeholder: '(555) 123-4567'
      },
      {
        name: 'budgetRange',
        label: 'Rango de Presupuesto de Campaña',
        type: 'select',
        required: true,
        placeholder: 'Selecciona rango de presupuesto',
        options: [
          '$2,000 - $5,000/mes',
          '$5,000 - $10,000/mes',
          '$10,000 - $25,000/mes',
          '$25,000 - $50,000/mes',
          '$50,000+/mes'
        ]
      },
      {
        name: 'servicesInterested',
        label: '¿Qué servicios te interesan más?',
        type: 'select',
        required: true,
        placeholder: 'Selecciona servicio principal',
        options: [
          'Gestión de Google Ads',
          'Publicidad en Facebook/Instagram',
          'Automatización de Email Marketing',
          'Optimización de Tasa de Conversión',
          'Análisis y Seguimiento de Marketing',
          'Estrategia Completa de Marketing'
        ]
      },
      {
        name: 'timeline',
        label: '¿Cuándo te gustaría comenzar?',
        type: 'select',
        required: true,
        placeholder: 'Selecciona cronograma',
        options: [
          'Inmediatamente',
          'Dentro de 2 semanas',
          'Dentro de 1 mes',
          'Dentro de 3 meses',
          'Solo explorando opciones'
        ]
      }
    ],
    submitText: 'Iniciar Mi Campaña',
    successMessage: '¡Gracias por tu interés! Me pondré en contacto pronto para hablar sobre tu proyecto y discutir las necesidades de tu campaña.'
  },

  caseStudies: {
    id: 'caseStudies',
    title: 'Obtén Mi Guía de Crecimiento Gratuita',
    subtitle: 'Estrategias comprobadas para escalar tu negocio',
    step1Title: 'Obtén Tu Guía de Crecimiento Gratuita',
    step1Subtitle: 'Descarga mi guía completa con estrategias comprobadas, marcos de trabajo y tácticas que he usado para ayudar a más de 380 negocios a escalar sus ingresos.',
    step2Fields: [
      {
        name: 'firstName',
        label: 'Nombre',
        type: 'text',
        required: true,
        placeholder: 'Juan'
      },
      {
        name: 'lastName',
        label: 'Apellido',
        type: 'text',
        required: true,
        placeholder: 'García'
      },
      {
        name: 'company',
        label: 'Nombre de la Empresa',
        type: 'text',
        required: false,
        placeholder: 'Mi Empresa S.A. (opcional)'
      },
      {
        name: 'industry',
        label: 'Industria',
        type: 'select',
        required: true,
        placeholder: 'Selecciona tu industria',
        options: [
          'E-commerce',
          'SaaS/Tecnología',
          'Servicios Profesionales',
          'Salud',
          'Bienes Raíces',
          'Educación',
          'Manufactura',
          'Finanzas/Seguros',
          'Otro'
        ]
      },
      {
        name: 'role',
        label: 'Tu Rol',
        type: 'select',
        required: true,
        placeholder: 'Selecciona tu rol',
        options: [
          'Dueño del Negocio/CEO',
          'Director/Gerente de Marketing',
          'Coordinador de Marketing',
          'Especialista en Marketing Digital',
          'Consultor/Agencia',
          'Otro'
        ]
      }
    ],
    submitText: 'Obtener Mi Guía de Crecimiento',
    successMessage: '¡Gracias! Revisa tu email: te he enviado mi guía completa de crecimiento con estrategias y marcos comprobados. ¡Comienza a implementar hoy!'
  },

  newsletter: {
    id: 'newsletter',
    title: 'Únete a 5,000+ Especialistas en Marketing',
    subtitle: 'Recibe insights de marketing semanales en tu bandeja de entrada',
    step1Title: 'Recibe Insights de Marketing Semanales',
    step1Subtitle: 'Únete a más de 5,000 especialistas en marketing que reciben estrategias semanales, casos de estudio y tácticas en su bandeja de entrada. Sin spam, cancela en cualquier momento.',
    step2Fields: [
      {
        name: 'firstName',
        label: 'Nombre',
        type: 'text',
        required: true,
        placeholder: 'Juan'
      },
      {
        name: 'lastName',
        label: 'Apellido',
        type: 'text',
        required: false,
        placeholder: 'García (opcional)'
      }
    ],
    submitText: 'Suscribirse',
    successMessage: '¡Bienvenido a la comunidad! Revisa tu email para confirmar y recibir tus primeros insights de marketing.'
  }
};
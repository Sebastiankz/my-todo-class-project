export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://roble-api.openlab.uninorte.edu.co';

const config = {
    API_AUTHENTICATION_URL: `${API_BASE_URL}/auth/${import.meta.env.VITE_PROJECT_ID || 'prueba_2c17ca514c'}`,
    API_DATABASE_URL: `${API_BASE_URL}/database/${import.meta.env.VITE_PROJECT_ID || 'prueba_2c17ca514c'}`,
}

export default config;
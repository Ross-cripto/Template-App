import api from '@/core/lib/utils/axios';
import axios from 'axios';

/**
 * Create a new template
 * @param name name of the template
 * @param fields fields of the template
 * @returns Response with the created template
 */

export const createTemplate = async (name: string, fields: any[]): Promise<any> => {
  try {
    const response = await api.post('/templates', { name, fields });
    return response.data;
  } catch (error: any) {
    console.error("Error al crear la plantilla:", error);
    let errorMessage = "Ocurrió un error al crear la plantilla.";

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data?.message || `Error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No se pudo conectar con el servidor.";
      } else {
        errorMessage = `Error al configurar la petición: ${error.message}`;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
}

/**
 * Get all templates
 * @returns Response with the list of templates
 */
export const listTemplates = async (): Promise<any[]> => {
  try {
    const response = await api.get('/templates');
    return response.data;
  } catch (error: any) {
    let errorMessage = "Ocurrió un error al obtener las plantillas.";

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data?.message || `Error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "No se pudo conectar con el servidor.";
      } else {
        errorMessage = `Error al configurar la petición: ${error.message}`;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
}
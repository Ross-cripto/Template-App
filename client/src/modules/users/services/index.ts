import api from '@/core/lib/utils/axios';
import axios from 'axios';
import type { AuthResponse } from '@/modules/users/types/auth';

/**
 * Inicia sesión con Google
 * @param token Token de autenticación de Google
 * @returns Respuesta con datos del usuario y token JWT
 */
export const googleLogin = async (token: string): Promise<{ data: AuthResponse }> => {
  try {
    const response = await api.post<AuthResponse>(`/users/google`, { token })
    return response
  } catch (error: any) {
    console.error("Error al enviar el token al backend:", error)
    let errorMessage = "Ocurrió un error al iniciar sesión con Google."

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data?.message || `Error en la autenticación: ${error.response.status}`
      } else if (error.request) {
        errorMessage = "No se pudo conectar con el servidor."
      } else {
        errorMessage = `Error al configurar la petición: ${error.message}`
      }
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    throw new Error(errorMessage)
  }
}

/**
 * Obtiene la lista de usuarios
 * @returns Lista de usuarios
 */
export const listUsers = async () => {
  try {
    const response = await api.get(`/users`)
    return response
  } catch (error: any) {
    console.error("Error al obtener la lista de usuarios:", error)
    let errorMessage = "Ocurrió un error al obtener los usuarios."

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data?.message || `Error: ${error.response.status}`
      } else if (error.request) {
        errorMessage = "No se pudo conectar con el servidor."
      } else {
        errorMessage = `Error al configurar la petición: ${error.message}`
      }
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    throw new Error(errorMessage)
  }
}

/**
 * Cierra la sesión del usuario
 */
export const logout = async () => {
  try {
    // Si tu API tiene un endpoint para cerrar sesión, puedes llamarlo aquí
    // await api.post('/users/logout');
    return { success: true }
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
    throw error
  }
}


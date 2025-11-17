// src/services/apiClient.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

interface IRequestOptions extends RequestInit {
  withAuth?: boolean
}

export const apiClient = {
  async get<T>(url: string, options: IRequestOptions = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`GET ${url} failed with status ${response.status}`)
    }

    return response.json()
  },

  async post<T>(
    url: string,
    body: unknown,
    options: IRequestOptions = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
      ...options,
    })

    if (!response.ok) {
      throw new Error(`POST ${url} failed with status ${response.status}`)
    }

    return response.json()
  },

  async put<T>(
    url: string,
    body: unknown,
    options: IRequestOptions = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
      ...options,
    })

    if (!response.ok) {
      throw new Error(`PUT ${url} failed with status ${response.status}`)
    }

    return response.json()
  },

  async delete<T>(url: string, options: IRequestOptions = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`DELETE ${url} failed with status ${response.status}`)
    }

    return response.json()
  },
}

import { http } from './http'

// 2.1 Ping public: JSONPlaceholder
export async function pingTodo() {
  return http<{ id: number; title: string }>({
    path: 'https://jsonplaceholder.typicode.com/todos/1',
    method: 'GET'
  })
}

// 2.2 Vérif header Authorization via echo public
// On envoie Authorization et on vérifie qu'il est renvoyé dans la réponse
export async function echoAuthHeader() {
  return http<{ id: number; title: string }>({
    path: 'https://jsonplaceholder.typicode.com/todos/1',
    method: 'GET'
  })
}



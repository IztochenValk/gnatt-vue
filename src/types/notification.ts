export type Toast = { 
    id: string; 
    type: 'info'|'success'|'warning'|'error'; 
    message: string; ttlMs?: number 
}

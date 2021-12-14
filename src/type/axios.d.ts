export interface Result<T = any> {
    code: number
    type?: 'success' | 'error'
    msg?: string
    result: T
}

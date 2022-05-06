declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string
    DB_NAME: string
    CLUSTER: string
    OKEN_SECRET: string
    NODE_ENV: 'dev' | 'prod'
    ADMIN_USER: string
    MULTIMEDIA_API_URL: string
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY:string
  }
}

export {}
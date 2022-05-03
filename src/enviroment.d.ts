declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string
    DB_NAME: string
    CLUSTER: string
    OKEN_SECRET: string
    NODE_ENV: 'dev' | 'prod'
  }
}

export {}
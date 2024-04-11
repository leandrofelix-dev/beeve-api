export const errorMessagesPTBR = {
  'api/ERROR': 'Ocorreu um erro interno. Tente novamente mais tarde.',

  'config/DB_CONN_ERROR': 'Não foi possível conectar ao banco de dados.',

  'auth/INVALID_CREDENTIALS': 'Credenciais inválidas.',

  'event/INVALID_EVENT_CODE': 'Código de evento inválido.',
  'event/INVALID_EVENT_ID': 'Id de evento inválido.',
  'event/CODE_ALREADY_EXIST': 'Esse código de evento já existe.',
  'event/COVER_NOT_FOUND': 'Capa do evento não encontrada.',
  'event/NOT_FOUND': 'Evento não encontrado.',

  'subscription/NOT_FOUND': 'Inscrição não encontrada.',
  'subscription/USER_OR_EVENT_NOT_FOUND':
    'Esse usuário já possui inscrição nesse evento.',
  'subscription/USER_ALREADY_IN_EVENT':
    'Esse usuário já possui inscrição nesse evento.',

  'user/PASSWORD_NOT_MATCH': 'As senhas não coincidem.',
  'user/STUDENT_CODE_REQUIRED': 'O código de estudante é obrigatório.',
  'user/STUDENT_CODE_ALREADY_EXISTS':
    'Esse código de estudante já está cadastrado.',
  'user/EMAIL_ALREADY_EXISTS': 'Esse email já está cadastrado.',
  'user/NOT_FOUND': 'Usuário não encontrado.',

  'supa/MISSING_ENV_VARS': 'Variáveis de ambiente do Supabase não encontradas.',
  'supa/MISSING_FILE': 'Arquivo não encontrado.',
  'supa/MISSING_FILE_URL': 'URL do arquivo não encontrado.',
  'supa/UPLOAD_ERROR': 'Erro ao fazer upload da imagem.',
}

export const zodMessagesPTBR = {
  minLength: (fieldName: string, minLength: number) =>
    `O campo ${fieldName} deve ter no mínimo ${minLength} caracteres.`,
  maxLength: (fieldName: string, maxLength: number) =>
    `O campo ${fieldName} deve ter no máximo ${maxLength} caracteres.`,
  validDateTime: (fieldName: string) =>
    `O campo ${fieldName} deve ser uma data em string no formato AAAA-MM-DD HH:MM:SS.SS.`,
  minNumber: (fieldName: string, minValue: number) =>
    `O campo ${fieldName} deve ser no mínimo ${minValue}.`,
  booleanValue: (fieldName: string) =>
    `O campo ${fieldName} deve ser 'true' ou 'false'.`,
}

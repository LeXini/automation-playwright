// tests/utils/schemaValidator.ts
import Ajv, { JSONSchemaType, Schema } from 'ajv';
import * as fs from 'fs';
import * as path from 'path';

const ajv = new Ajv();

export function validateApiSchema(data: any, relativeSchemaPath: string, subSchemaName: string): boolean {

const fullPath = path.resolve(__dirname, relativeSchemaPath);

  if (!fs.existsSync(fullPath)) {
    console.error(`Erro: Arquivo de Schema não encontrado no caminho: ${fullPath}`);
    return false;
  }

  // 1. Carrega o ARQUIVO JSON inteiro
  const rawJsonFile = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));

  // 2. Extrai APENAS o sub-schema desejado usando o novo parâmetro
  const schemaToValidate = rawJsonFile[subSchemaName];

  if (!schemaToValidate) {
    console.error(`Erro: Sub-schema "${subSchemaName}" não encontrado no arquivo JSON.`);
    return false;
  }

  // 3. Compila e valida o SUB-SCHEMA extraído
  const validate = ajv.compile(schemaToValidate as Schema);
  const isValid = validate(data);

  if (!isValid) {
    console.error(`Falha na validação para o schema: ${relativeSchemaPath} -> ${subSchemaName}`);
    console.error('Erros AJV:', validate.errors);
  }

  return isValid as boolean;
}
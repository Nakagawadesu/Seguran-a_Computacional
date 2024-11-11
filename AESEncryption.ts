import * as crypto from "crypto";
import * as readline from "readline";

/**
 * Gera uma chave AES aleatória.
 * @param {number} size Tamanho da chave em bits (128 ou 256).
 * @returns {Buffer} Chave gerada.
 */
export function generateKey(size: 128 | 256 = 128): Buffer {
  if (![128, 256].includes(size))
    throw new Error("Tamanho de chave inválido. Use 128 ou 256.");
  return crypto.randomBytes(size / 8);
}

/**
 * Gera um IV aleatório.
 * @param {number} size Tamanho do IV em bytes.
 * @returns {Buffer} IV gerado.
 */
export function generateIV(size: number = 16): Buffer {
  return crypto.randomBytes(size);
}

/**
 * Função para criptografar usando AES.
 * @param {Buffer} key Chave AES.
 * @param {Buffer} iv IV (para modos CBC, CFB, OFB, CTR).
 * @param {string} data Dados a serem criptografados.
 * @param {string} mode Modo de operação (e.g., 'cbc', 'ecb', 'ctr').
 * @returns {string} Texto cifrado em base64.
 */
export type AESMode = "ecb" | "cbc" | "cfb1" | "cfb8" | "ofb" | "ctr" | "cfb";

export function encrypt(
  key: Buffer,
  iv: Buffer,
  data: string,
  mode: AESMode = "cbc"
): string {
  // If the mode is ECB, don't use an IV
  const cipher = crypto.createCipheriv(
    `aes-${key.length * 8}-${mode}`,
    key,
    mode === "ecb" ? Buffer.alloc(0) : iv // No IV for ECB, use an empty buffer
  );

  let encrypted = cipher.update(data, "utf8", "base64");
  encrypted += cipher.final("base64");

  return encrypted;
}
/**
 * Função para descriptografar usando AES.
 * @param {Buffer} key Chave AES.
 * @param {Buffer} iv IV (para modos CBC, CFB, OFB, CTR).
 * @param {string} encryptedData Texto cifrado em base64.
 * @param {string} mode Modo de operação (e.g., 'cbc', 'ecb', 'ctr').
 * @returns {string} Texto original.
 */
export function decrypt(
  key: Buffer,
  iv: Buffer,
  encryptedData: string,
  mode: string = "cbc"
): string {
  const decipher = crypto.createDecipheriv(
    `aes-${key.length * 8}-${mode}`,
    key,
    iv
  );
  let decrypted = decipher.update(encryptedData, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

import * as readline from "readline";
import dotenv from "dotenv";
dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}
import {
  generateKey,
  generateIV,
  encrypt,
  decrypt,
  AESMode,
} from "./AES/AESEncryption";

async function main() {
  try {
    const mode = (await prompt(
      "Escolha o modo de operação (ecb, cbc, cfb, ofb, ctr): "
    )) as AESMode;

    if (!["ecb", "cbc", "cfb", "ofb", "ctr"].includes(mode)) {
      console.log("Modo inválido.");
      rl.close();
      return;
    }

    const keySize = parseInt(
      await prompt("Escolha o tamanho da chave (128 ou 256): ")
    ) as 128 | 256;

    if (![128, 256].includes(keySize)) {
      console.log("Tamanho de chave inválido.");
      rl.close();
      return;
    }

    const key = Buffer.from(process.env.AES_KEY || "", "hex");

    const iv = mode !== "ecb" ? generateIV() : null;
    const data = await prompt("Digite o texto a ser criptografado: ");

    const encrypted = encrypt(key, iv ?? Buffer.alloc(0), data, mode);
    console.log("Texto criptografado (base64):", encrypted);

    const decrypted = decrypt(key, iv ?? Buffer.alloc(0), encrypted, mode);
    console.log("Texto descriptografado:", decrypted);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro:", error.message);
    } else {
      console.error("Erro desconhecido:", error);
    }
  } finally {
    rl.close();
  }
}

main();

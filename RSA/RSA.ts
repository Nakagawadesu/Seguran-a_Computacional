import { publicEncrypt, privateDecrypt } from "crypto";
import fs from "fs";

const publicKey = fs.readFileSync("./keys/rsa_public.pem", "utf8");
const privateKey = fs.readFileSync("./keys/rsa_private.pem", "utf8");

const message = "UMA MENSAGEM!!!!";

const encrypted = publicEncrypt(publicKey, Buffer.from(message));
console.log("Encrypted message:", encrypted.toString("base64"));

const decrypted = privateDecrypt(privateKey, encrypted);
console.log("Decrypted message:", decrypted.toString("utf8"));

import crypto from "crypto";

export class CryptoUtils {
  static iv = crypto.randomBytes(16); // 16-byte IV for AES-256-CBC

  static hash(input: string): string {
    return crypto.createHash("sha256").update(input).digest("hex");
  }

  static padKey(key: string): Buffer {
    return Buffer.from(key.padEnd(32, "0").slice(0, 32)); // Pad or truncate key
  }

  static encrypt(input: string, key: string): string {
    const paddedKey = this.padKey(key); // garantee is 32 bytes
    const cipher = crypto.createCipheriv("aes-256-cbc", paddedKey, this.iv);
    let encrypted = cipher.update(input, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  static decrypt(encrypted: string, key: string): string {
    const paddedKey = this.padKey(key); // garantee is 32 bytes
    const decipher = crypto.createDecipheriv("aes-256-cbc", paddedKey, this.iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  static generateRandom(): string {
    return crypto.randomBytes(16).toString("hex");
  }
}

export default CryptoUtils;

import { generateKey, generateIV, encrypt, decrypt } from "./AESEncryption";

describe("AES Encryption Tests", () => {
  const key: Buffer = generateKey(256);
  const iv: Buffer = generateIV();
  const data: string = "Texto secreto para cifrar";

  test("should encrypt and decrypt correctly using ECB mode", () => {
    const encryptedData: string = encrypt(key, Buffer.alloc(0), data, "ecb");
    console.log("Cifrado:", encryptedData);

    const decryptedData: string = decrypt(
      key,
      Buffer.alloc(0),
      encryptedData,
      "ecb"
    );
    console.log("Decifrado:", decryptedData);

    expect(decryptedData).toBe(data);
  });

  // Test for CBC Mode
  test("should encrypt and decrypt correctly using CBC mode", () => {
    const encryptedData = encrypt(key, iv, data, "cbc");
    const decryptedData = decrypt(key, iv, encryptedData, "cbc");
    expect(decryptedData).toBe(data);
  });

  // Test for CFB Mode
  test("should encrypt and decrypt correctly using CFB mode", () => {
    const encryptedData = encrypt(key, iv, data, "cfb");
    const decryptedData = decrypt(key, iv, encryptedData, "cfb");
    expect(decryptedData).toBe(data);
  });

  // Test for OFB Mode
  test("should encrypt and decrypt correctly using OFB mode", () => {
    const encryptedData = encrypt(key, iv, data, "ofb");
    const decryptedData = decrypt(key, iv, encryptedData, "ofb");
    expect(decryptedData).toBe(data);
  });

  // Test for CTR Mode
  test("should encrypt and decrypt correctly using CTR mode", () => {
    const encryptedData = encrypt(key, iv, data, "ctr");
    const decryptedData = decrypt(key, iv, encryptedData, "ctr");
    expect(decryptedData).toBe(data);
  });
});

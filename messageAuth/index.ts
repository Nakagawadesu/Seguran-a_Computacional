import CryptoUtils from "../cryptoUtils";

// A
// Simple Hash Authentication
function authenticateA(message: string, key: string): boolean {
  // Sender
  const hash = CryptoUtils.hash(message);
  const encrypted = CryptoUtils.encrypt(hash, key);

  // Receiver
  const decryptedHash = CryptoUtils.decrypt(encrypted, key);
  return decryptedHash === CryptoUtils.hash(message);
}

(() => {
  const message = "DIAGRAMA A";
  const key = "sharedKeyA123";

  console.time("Diagram (a) execution Time");
  const result = authenticateA(message, key);
  console.timeEnd("Diagram (a) Time");

  console.log("Diagram (a):", result); // Expected: true
})();

// B
// Hash with Secondary Key
function authenticateB(
  message: string,
  key: string,
  secondaryKey: string
): boolean {
  // Sender
  const hashWithKey = CryptoUtils.hash(message + secondaryKey);
  const encrypted = CryptoUtils.encrypt(hashWithKey, key);

  // Receiver
  const decryptedHash = CryptoUtils.decrypt(encrypted, key);
  return decryptedHash === CryptoUtils.hash(message + secondaryKey);
}

(() => {
  const message = "DIAGRAMA B";
  const key = "mainKeyB456";
  const secondaryKey = "secondaryKeyB789";

  console.time("Diagram (b) Time");
  const result = authenticateB(message, key, secondaryKey);
  console.timeEnd("Diagram (b) Time");

  console.log("Diagram (b):", result); // Expected: true
})();

// C
// Authentication with Nonce
function authenticateC(message: string): boolean {
  // Sender
  const nonce = CryptoUtils.generateRandom();
  const hash = CryptoUtils.hash(nonce + message);

  // Receiver
  const receiverHash = CryptoUtils.hash(nonce + message);
  return receiverHash === hash;
}

(() => {
  const message = "DIAGRAMA C";
  console.time("Diagram (c) Time");
  const result = authenticateC(message);
  console.timeEnd("Diagram (c) Time");

  console.log("Diagram (c):", result); // Expected: true
})();

// D
// Nonce + Encrypted Message
function authenticateD(message: string, key: string): boolean {
  // Sender
  const nonce = CryptoUtils.generateRandom();
  const hash = CryptoUtils.hash(message);
  const encrypted = CryptoUtils.encrypt(nonce + hash, key);

  // Receiver
  const decrypted = CryptoUtils.decrypt(encrypted, key);
  const [receivedNonce, receivedHash] = [
    decrypted.slice(0, 32),
    decrypted.slice(32),
  ];
  return receivedHash === CryptoUtils.hash(message);
}

(() => {
  const message = "DIAGRAMA D";
  const key = "keyD123";

  console.time("Diagram (d) Time");
  const result = authenticateD(message, key);
  console.timeEnd("Diagram (d) Time");

  console.log("Diagram (d):", result); // Expected: true
})();

// E
// Shared Secret Authentication
function authenticateE(message: string, sharedSecret: string): boolean {
  // Sender
  const hash = CryptoUtils.hash(message + sharedSecret);

  // Receiver
  const receiverHash = CryptoUtils.hash(message + sharedSecret);
  return receiverHash === hash;
}

(() => {
  const message = "DIAGRAMA E";
  const sharedSecret = "sharedSecretE123";

  console.time("Diagram (e) Time");
  const result = authenticateE(message, sharedSecret);
  console.timeEnd("Diagram (e) Time");

  console.log("Diagram (e):", result); // Expected: true
})();

// F
// Shared Secret + Encrypted Hash
function authenticateF(
  message: string,
  sharedSecret: string,
  key: string
): boolean {
  // Sender
  const hash = CryptoUtils.hash(message + sharedSecret); // H(M || S)
  const encryptedHash = CryptoUtils.encrypt(hash, key); // Encrypt H(M || S)

  // Receiver
  const decryptedHash = CryptoUtils.decrypt(encryptedHash, key); // Decrypt H(M || S)
  return decryptedHash === CryptoUtils.hash(message + sharedSecret); // Compare with computed hash
}

(() => {
  const message = "DIAGRAMA F";
  const sharedSecret = "sharedSecretF123";
  const key = "keyF456";

  console.time("Diagram (f) Time");
  const result = authenticateF(message, sharedSecret, key);
  console.timeEnd("Diagram (f) Time");

  console.log("Diagram (f):", result); // Expected: true
})();

#!/bin/bash

## importante dar as permissões  -- chmod +x keygen_and_crypto.sh

KEY_DIR="./keys"
mkdir -p $KEY_DIR

echo "==== Gerando Chaves RSA ===="
openssl genrsa -out $KEY_DIR/rsa_private.pem 2048
openssl rsa -in $KEY_DIR/rsa_private.pem -pubout -out $KEY_DIR/rsa_public.pem
echo "Chaves RSA geradas: $KEY_DIR/rsa_private.pem e $KEY_DIR/rsa_public.pem"

echo "==== Gerando Chaves EC (P-256 Curve) ===="
openssl ecparam -name prime256v1 -genkey -noout -out $KEY_DIR/ec_private.pem
openssl ec -in $KEY_DIR/ec_private.pem -pubout -out $KEY_DIR/ec_public.pem
echo "Chaves EC geradas: $KEY_DIR/ec_private.pem e $KEY_DIR/ec_public.pem"

echo "==== Gerando Chaves EC25519 ===="
ssh-keygen -t ed25519 -f $KEY_DIR/ed25519_key -N "" > /dev/null 2>&1
echo "Chaves EC25519 geradas: $KEY_DIR/ed25519_key e $KEY_DIR/ed25519_key.pub"

echo "==== Rodando Script TypeScript para Criptografia/Descriptografia ===="


if ! command -v ts-node &> /dev/null; then
  echo "ts-node não encontrado. Por favor, instale usando: npm install -g ts-node"
  exit 1
fi

ts-node RSA.ts

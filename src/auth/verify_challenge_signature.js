import { resolve } from '../did/resolver';
import { verifier as secp256k1 } from './crypto/secp256k1_2018';

const verifiers = {
	Secp256k1VerificationKey2018: secp256k1()
};

export const verifyChallengeSignature = async (nonce, signature, did) => {
	const { value, keyId } = signature;
	const { authentication, publicKey } = await resolve(did);
	if (!authentication || !authentication.includes(keyId)) {
		throw new Error('Invalid key usage');
	}
	const authKey = (publicKey || []).find(({ id }) => id === keyId);
	if (!authKey) {
		throw new Error(`Missing public key: ${keyId}`);
	}
	const verifier = verifiers[authKey.type];
	if (!verifier) {
		throw new Error(`Unsupported Public Key type: ${authKey.type}`);
	}
	return verifier.verify(nonce, value, authKey);
};

export const registerVerifier = (type, verifier) => {
	// TODO - Check if resolver adheres to interface
	verifiers[type] = verifier;
};
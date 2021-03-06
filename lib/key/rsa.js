"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPEMBits = exports.generateRSAKeyPair = void 0;

const {
  generateKeyPair
} = require('crypto');

const pemtools = require('pemtools');
/**
 * @module key/rsa
 */

/**
 * Generate a RSA Key Pair
 * @function generateRSAKeyPair
 *
 * @param {number} [length=4096] - key length in bytes
 * @returns {Promise<object>} keypair - contains publicKey adn privateKey
 * @example
 *
 * ```js
 * sk.key.generateRSAKeyPair();
 * ```
 */


const generateRSAKeyPair = (length = 4096) => {
  return new Promise((resolve, reject) => {
    generateKeyPair('rsa', {
      modulusLength: length,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      }
    }, (err, publicKey, privateKey) => {
      if (err) {
        return reject(err);
      }

      return resolve({
        privateKey,
        publicKey
      });
    });
  });
}; // TODO: reconsider adding third party for private key handing


exports.generateRSAKeyPair = generateRSAKeyPair;

const getPEMBits = privateKey => {
  const pem = pemtools(privateKey);
  return pem.pubkey.bits;
};

exports.getPEMBits = getPEMBits;
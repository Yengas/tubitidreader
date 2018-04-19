import CryptoJS from 'crypto-js';
import protobuf from 'protobufjs';
import { Buffer } from 'buffer';

// Generates 8 byte sign for the data with our hmac.
function generateSignForData({ id, name, department, grade, challenge }, secret){
  return CryptoJS.HmacSHA1(`${id}${name}${department}${grade}${challenge || 0}`, secret).words;
}

function loadTypes(){
  const data = require('./tubit-id');
  const root = protobuf.Root.fromJSON(data);
  const Department = root.lookupEnum('tubit.Department');
  const IDCard = root.lookupType('tubit.IDCard');

  return { Department, IDCard };
}

function getStudent({ id, department, grade, name }, Department){
  return { id, grade, name, department: Department.valuesById[department] };
}

export default () => {
  const { Department, IDCard } = loadTypes();

  class QRParser {
    constructor(secret){
      this.secret = secret;
    }

    async decode(b64Str){
      const data = Buffer.from(b64Str, 'base64');
      const card = IDCard.decode(data);
      const sign = generateSignForData(card, this.secret);

      if(!sign || sign.length < 2 || card.signHigh !== sign[0] || card.signLow !== sign[1])
        throw new Error('could not validate the sign');

      return getStudent(card, Department);
    }
  }

  return QRParser;
};

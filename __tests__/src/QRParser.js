import createQRParserClass from '../../src/QRParser';
import { HMAC_SECRET } from '../../src/secrets';

describe('parsing of qr codes', async () => {
  const testDatas = [
    {
      data: "CLDxka8EEAQYASIOU0VMw4dVSyBBS0RBxJ4o0vahyQUwot67ugQ=",
      result: { id: 1172601008, grade: 1, name: 'SELÇUK AKDAĞ', department: 'BSB' },
    }
  ];
  const invalidData = [
    "",
    "asdasdasd",
    "CLDxka8E",
  ];
  let QRParser = null;

  beforeAll(async () => {
    QRParser = await createQRParserClass();
  });

  it('should parse valid data with valid secret', async () => {
    const parser = new QRParser(HMAC_SECRET);

    for(let testData of testDatas){
      const card = await parser.decode(testData.data);
      expect(card).toEqual(testData.result);
    }
  });

  it('should throw when valid data, invalid secret', async () => {
    const parser = new QRParser(HMAC_SECRET + 'not valid now');

    for(let testData of testDatas){
      expect(parser.decode(testData.data)).rejects.toThrow();
    }
  });

  it('should throw with invalid data', async () => {
    const parser = new QRParser(HMAC_SECRET);

    for(let invalid of invalidData){
      expect(parser.decode(invalid)).rejects.toThrow();
    }
  });

});

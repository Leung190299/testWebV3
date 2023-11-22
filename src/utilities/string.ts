export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function uuidv4() {
  var d = new Date().getTime(); //Timestamp
  var d2 = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
export function generateRandomId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : uuidv4();
}
export function generateRandomSKU(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let sku = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sku += characters[randomIndex];
  }

  return sku;
}
export function generateRandomCardNumber() {
  var cardNumber = '';

  for (var i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) {
      cardNumber += ' ';
    }

    var digit = Math.floor(Math.random() * 10);
    cardNumber += digit;
  }

  return cardNumber;
}
export function randomOtp() {
  var otp = '';
  while (otp.length < 4) {
    var digit = Math.floor(Math.random() * 10);
    otp += digit;
  }
  return otp;
}
export function stringToASCII(str: string) {
  try {
    return str
      .replace(/[àáảãạâầấẩẫậăằắẳẵặ]/g, 'a')
      .replace(/[èéẻẽẹêềếểễệ]/g, 'e')
      .replace(/[đ]/g, 'd')
      .replace(/[ìíỉĩị]/g, 'i')
      .replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, 'o')
      .replace(/[ùúủũụưừứửữự]/g, 'u')
      .replace(/[ỳýỷỹỵ]/g, 'y');
  } catch {
    return '';
  }
}

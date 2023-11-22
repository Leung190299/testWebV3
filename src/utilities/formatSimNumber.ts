const simNumberTypeList = (simNumber: string) => {
  return simNumber.substring(0, 4) + ' ' + simNumber.substring(4);
};

const simNumberTypeGrid = (simNumber: string) => {
  return simNumber.substring(0, 4) + ' ' + simNumber.substring(4, 7) + ' ' + simNumber.substring(7);
};

export function formatPhone(phone: string) {
  // Remove any existing spaces or non-digit characters
  const cleanedNumber = phone.replace(/\D/g, '');

  // Apply the desired formatting
  const formattedNumber = cleanedNumber.replace(/(\d{4})(\d{6})/, '$1 $2');

  return formattedNumber;
}

export function formatPhoneNumber(phoneNumber: string) {
  // Remove any existing spaces or non-digit characters
  const cleanedNumber = phoneNumber.replace(/\D/g, '');

  // Apply the desired formatting
  const formattedNumber = cleanedNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

  return formattedNumber;
}

export { simNumberTypeList, simNumberTypeGrid };

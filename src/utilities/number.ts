export function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) * 100) / (max - min);
}
export function percentToValue(percent: number, min: number, max: number) {
  return (max - min) * percent + min;
}
export function roundValueToStep(value: number, step: number, min: number): number {
  const nearest = Math.round((value - min) / step) * step + min;
  return nearest;
}
export function clamp(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min);
}
export function randomBetween(from: number, to: number) {
  const diff = to - from;

  return from + Math.floor(Math.random() * diff);
}

export function formatNumber(number: number, suffixes = ['', 'k', 'tr']) {
  if (!number) return '0' + suffixes[0];
  // const suffixes = ['', 'k', 'tr']; // Suffixes for thousand, million, billion, trillion, ...
  const suffixIndex = Math.floor(Math.log10(Math.abs(number)) / 3); // Tính chỉ số đơn vị (k, M, G, ...)
  const abbreviatedNumber = number / Math.pow(1000, suffixIndex); // Giá trị số sau khi đã được rút gọn
  const formattedNumber = abbreviatedNumber.toLocaleString('vi') + suffixes[suffixIndex]; // Số đã được định dạng với số thập phân và đơn vị
  return formattedNumber;
}

export function getDiscountPercentage(discountPercentage: number | boolean | undefined, price: number, discountPrice?: number) {
  return discountPercentage == true && discountPrice ? Math.floor(((price - discountPrice) / price) * 100) : discountPercentage;
}

export function animateNumber(callback: (value: number) => void, from: number, to: number, duration: number) {
  let start: number | null = null;
  let animRef: number;
  let animate = (timestamp: number) => {
    start = start || timestamp;
    let progress = Math.min((timestamp - start) / duration, 1);
    const v = from + easeInOutCubic(progress) * (to - from);
    callback(v);
    if (progress < 1) {
      animRef = window.requestAnimationFrame(animate);
    }
  };
  animRef = window.requestAnimationFrame(animate);
  return () => {
    window.cancelAnimationFrame(animRef);
  };
}

function easeOutCirc(progress: number): number {
  return Math.sqrt(1 - Math.pow(progress - 1, 2));
}
function easeInOutQuad(progress: number): number {
  return progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
}
function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

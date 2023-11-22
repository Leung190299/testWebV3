export function getTranslate(el: HTMLElement | SVGElement) {
  const translate: { x: number; y: number } = {} as any;
  if (!window.getComputedStyle) return { x: 0, y: 0 };

  const style = getComputedStyle(el);
  const transform = style.transform || style.webkitTransform || (style as any).mozTransform;

  let mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) {
    translate.x = mat ? parseFloat(mat[1].split(', ')[12]) : 0;
    translate.y = mat ? parseFloat(mat[1].split(', ')[13]) : 0;
  } else {
    mat = transform.match(/^matrix\((.+)\)$/);
    translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
    translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;
  }
  return translate;
}

/**
 * See also {@link https://en.wikipedia.org/wiki/Ellipse#Parametric_representation}
 *
 * See also {@link https://stackoverflow.com/questions/74512797/finding-the-coordinates-of-a-point-in-an-ellipse-based-on-an-angle}
 */
export function getCoords(x: number, y: number, rx: number, ry: number, theta: number) {
  // Convert theta to radians
  const rad = (theta * Math.PI) / 180;

  // Rotate the point (x, y) by theta around the origin
  const rotatedX = x * Math.cos(rad) - y * Math.sin(rad);
  const rotatedY = x * Math.sin(rad) + y * Math.cos(rad);

  // Calculate the angle between the line from the origin to the rotated point and the positive x-axis
  const angle = Math.atan2(rotatedY * rx, rotatedX * ry);

  // Calculate the coordinates of the intersection point between the line and the rotated ellipse
  const px = rx * Math.cos(angle) * Math.cos(-rad) - ry * Math.sin(angle) * Math.sin(-rad);
  const py = rx * Math.cos(angle) * Math.sin(-rad) + ry * Math.sin(angle) * Math.cos(-rad);

  return { x: px, y: py };
}

export function getCoordsFollow(x: number, y: number, rate = 0.1) {
  return { x: x * rate, y: y * rate };
}

export function getPointerPosition(e: MouseEvent | TouchEvent) {
  if (e instanceof MouseEvent) return [e.clientX, e.clientY];
  if (e instanceof TouchEvent) return [e.targetTouches[0].pageX, e.targetTouches[0].pageY];
  throw new Error('dragging instance must be a valid MoutEvent or TouchEvent');
}

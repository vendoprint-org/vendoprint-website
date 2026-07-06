export interface Tilt {
  rotateX: number;
  rotateY: number;
}

export function calcTilt(
  mouseX: number,
  mouseY: number,
  rect: { width: number; height: number },
  maxDeg: number
): Tilt {
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const offsetX = mouseX - centerX;
  const offsetY = mouseY - centerY;

  const rawRotateY = (offsetX / centerX) * maxDeg;
  const rawRotateX = -(offsetY / centerY) * maxDeg;

  const rotateX = Math.min(maxDeg, Math.max(-maxDeg, rawRotateX));
  const rotateY = Math.min(maxDeg, Math.max(-maxDeg, rawRotateY));

  return {
    rotateX: rotateX === 0 ? 0 : rotateX,
    rotateY: rotateY === 0 ? 0 : rotateY,
  };
}

export const textToImage = async (
  text: string,
  { font, fontSize = 35, align = 'center', scale = 2 }: TextRenderOptions
): Promise<string> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  const CANVAS_WIDTH = 200 * scale; // Updated to match new canvas width
  canvas.width = CANVAS_WIDTH;
  
  ctx.font = `${fontSize * scale}px "${font}"`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const lineHeight = fontSize * scale * 1.2;
  const totalHeight = Math.max(lineHeight * lines.length, CANVAS_WIDTH);
  
  canvas.height = totalHeight;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize * scale}px "${font}"`;
  ctx.textAlign = align;
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'middle';
  
  lines.forEach((line, index) => {
    const y = (index * lineHeight) + (lineHeight / 2);
    ctx.fillText(line, canvas.width / 2, y);
  });
  
  return canvas.toDataURL('image/png');
};
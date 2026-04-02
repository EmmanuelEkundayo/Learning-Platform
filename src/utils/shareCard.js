import html2canvas from 'html2canvas';

/**
 * Generates a share card PNG from a DOM element.
 * @param {HTMLElement} element - The hidden card element to capture.
 * @param {string} slug - The concept slug for the filename.
 */
export async function generateShareCard(element, slug) {
  if (!element) return;
  
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // High resolution
      logging: false,
      useCORS: true,
      width: 600,
      height: 315
    });
    
    const image = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.href = image;
    link.download = `${slug}-lbf.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Failed to generate share card:', err);
  }
}

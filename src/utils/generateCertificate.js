import { jsPDF } from 'jspdf';

const ACCENT_COLORS = {
  DSA: '#3b82f6', // blue
  ML: '#f59e0b', // amber
  Frontend: '#8b5cf6', // violet
  Backend: '#10b981', // emerald
  'Software Engineering': '#f43f5e', // rose
};

/**
 * Generates a completion certificate as a PDF.
 * @param {string} domain - The completed domain name.
 * @param {string} userName - The user's name.
 * @param {number} conceptCount - Number of concepts in the domain.
 * @param {number} timestamp - Completion timestamp.
 */
export async function generateCertificate(domain, userName, conceptCount, timestamp) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const accent = ACCENT_COLORS[domain] || '#3b82f6';
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  const date = new Date(timestamp).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const certId = `LBF-${domain.toUpperCase().replace(/\s+/g, '-')}-${timestamp.toString(36).toUpperCase()}`;

  // 1. Background (dark)
  doc.setFillColor(15, 17, 23); // #0f1117
  doc.rect(0, 0, width, height, 'F');

  // 2. Decorative Double-Line Border
  doc.setDrawColor(accent);
  doc.setLineWidth(1.5);
  doc.rect(10, 10, width - 20, height - 20, 'D'); // Outer
  doc.setLineWidth(0.5);
  doc.rect(13, 13, width - 26, height - 26, 'D'); // Inner

  // 3. Corner Marks
  const s = 15;
  doc.setLineWidth(2);
  // Top Left
  doc.line(10, 10, 10 + s, 10);
  doc.line(10, 10, 10, 10 + s);
  // Top Right
  doc.line(width - 10, 10, width - 10 - s, 10);
  doc.line(width - 10, 10, width - 10, 10 + s);
  // Bottom Left
  doc.line(10, height - 10, 10 + s, height - 10);
  doc.line(10, height - 10, 10, height - 10 - s);
  // Bottom Right
  doc.line(width - 10, height - 10, width - 10 - s, height - 10);
  doc.line(width - 10, height - 10, width - 10, height - 10 - s);

  // 4. Header: Brand
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('Learn Blazingly Fast', width / 2, 40, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(200, 200, 200);
  doc.text('Certificate of Completion', width / 2, 50, { align: 'center' });

  // Divider
  doc.setDrawColor(accent);
  doc.setLineWidth(0.5);
  doc.line(width / 2 - 40, 58, width / 2 + 40, 58);

  // 5. Body
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text('This certifies that', width / 2, 75, { align: 'center' });

  // User Name
  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  doc.text(userName, width / 2, 95, { align: 'center' });

  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('has successfully completed all concepts in', width / 2, 110, { align: 'center' });

  // Domain Name
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  const [r, g, b] = hexToRgb(accent);
  doc.setTextColor(r, g, b);
  doc.text(domain, width / 2, 125, { align: 'center' });

  // Mastery Text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  const masteryText = `demonstrating mastery of ${conceptCount} concepts including\nvisualizations, exercises, and code execution.`;
  doc.text(masteryText, width / 2, 140, { align: 'center' });

  // 6. Footer
  doc.setFontSize(12);
  doc.setTextColor(150, 150, 150);
  doc.text(`Completed on ${date}`, width / 2, 170, { align: 'center' });

  // Bottom Branding
  doc.setFontSize(10);
  doc.text('Learn Blazingly Fast — learnblazinglyfast.tech', 20, height - 15);
  doc.text(certId, width - 20, height - 15, { align: 'right' });

  // Save the PDF
  doc.save(`LBF-Certificate-${domain.replace(/\s+/g, '-')}.pdf`);
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [255, 255, 255];
}

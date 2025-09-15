/**
 * Utility functions for handling images and preventing cache issues
 */

/**
 * Adds a cache-busting timestamp to image URLs to ensure fresh images are loaded
 * @param imageUrl - The original image URL
 * @returns Image URL with cache-busting parameter
 */
export function addCacheBuster(imageUrl: string): string {
  if (!imageUrl) return imageUrl;
  
  // Don't add cache buster to external URLs (already fresh) or data URLs
  if (imageUrl.startsWith('http') || imageUrl.startsWith('data:')) {
    return imageUrl;
  }
  
  const separator = imageUrl.includes('?') ? '&' : '?';
  return `${imageUrl}${separator}v=${Date.now()}`;
}

/**
 * Gets the appropriate image source, prioritizing database URLs over generated paths
 * @param dbImageUrl - Image URL from database
 * @param fallbackUrl - Fallback image URL
 * @param addCacheBusting - Whether to add cache busting parameters
 * @returns The appropriate image URL
 */
export function getImageSrc(
  dbImageUrl?: string | null, 
  fallbackUrl?: string,
  addCacheBusting: boolean = true
): string {
  const imageUrl = dbImageUrl || fallbackUrl || '';
  return addCacheBusting ? addCacheBuster(imageUrl) : imageUrl;
}

/**
 * Formats a title to match expected image filename patterns
 * @param title - The title to format
 * @returns Formatted filename
 */
export function formatImageName(title: string): string {
  if (!title) return '';
  return title.replace(/\s+/g, '_'); // Replace spaces with underscores
}

export const formatTitleToImageName = (title: string): string => {
  if (!title) return '';
  
  // Replace spaces with underscores and remove any special characters
  return title
    .trim()
    .replace(/\s+/g, '_') // Replace one or more spaces with single underscore
    .replace(/[^a-zA-Z0-9_]/g, '') // Remove any special characters except underscores
    .replace(/_+/g, '_'); // Replace multiple underscores with single underscore
};

export const getImagePath = (title: string): string => {
  const baseImagePath = '/images/products/modules-faceplates/';
  const formattedName = formatTitleToImageName(title);
  
  // Return the full path with jpg extension
  return formattedName ? `${baseImagePath}${formattedName}.jpg` : '/images/placeholder.jpg';
}; 
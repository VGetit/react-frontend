export const customSlugify = (text) => {
  if (!text) return "";

  const trMap = {
    'ş': 's', 'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ö': 'o', 'ç': 'c',
    'Ş': 's', 'I': 'i', 'Ğ': 'g', 'Ü': 'u', 'Ö': 'o', 'Ç': 'c', 'İ': 'i'
  };
  
  let slug = text.split('').map(char => trMap[char] || char).join('');

  slug = slug.replace(/[^a-z0-9]+/g, '-');

  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
};

export const formatUrl = (url) => {
  if (!url) return "";

  let formattedUrl = url.toLowerCase();
  formattedUrl = formattedUrl.replace("https://", "").replace("http://", "").replace("www.", "");
  return url;
};
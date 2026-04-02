/**
 * Deterministically selects a concept for the day based on the current date string.
 */
export function hashDate(dateStr) {
  return dateStr.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

/**
 * Returns the daily concept for the user.
 * Prioritizes concepts the user hasn't viewed yet.
 */
export function getDailyConcept(concepts, viewedSlugs = []) {
  if (!concepts || concepts.length === 0) return null;

  const today = new Date().toISOString().split('T')[0];
  const cacheKey = `lbf_daily_${today}`;
  const cachedSlug = localStorage.getItem(cacheKey);

  // If we already picked one today, stick with it
  if (cachedSlug) {
    const concept = concepts.find(c => c.slug === cachedSlug);
    if (concept) return concept;
  }

  // Otherwise, pick deterministically using the today's date hash
  const seed = hashDate(today);
  
  // Prioritize concepts not yet viewed by this user
  const unviewed = concepts.filter(c => !viewedSlugs.includes(c.slug));
  const pool = unviewed.length > 0 ? unviewed : concepts;
  
  const selected = pool[seed % pool.length];
  
  // Cache the selection for the rest of today
  localStorage.setItem(cacheKey, selected.slug);
  
  return selected;
}

/**
 * Checks if the daily concept card is hidden for today.
 */
export function isDailyHidden() {
  const today = new Date().toISOString().split('T')[0];
  return localStorage.getItem(`lbf_daily_hidden_${today}`) === 'true';
}

/**
 * Hides the daily concept card for the remainder of today.
 */
export function hideDailyForToday() {
  const today = new Date().toISOString().split('T')[0];
  localStorage.setItem(`lbf_daily_hidden_${today}`, 'true');
}

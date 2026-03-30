import Fuse from 'fuse.js';
import { useConceptStore } from '../store/conceptStore.js';
import { useProjectStore } from '../store/projectStore.js';

let conceptFuseInstance = null;
let projectFuseInstance = null;

/**
 * Searches concepts using Fuse.js fuzzy matching.
 */
export function searchConcepts(query) {
  const concepts = useConceptStore.getState().concepts;
  if (!concepts || concepts.length === 0) return [];
  
  if (!conceptFuseInstance || conceptFuseInstance.list !== concepts) {
    conceptFuseInstance = new Fuse(concepts, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'tags', weight: 0.3 },
        { name: 'card.intuition', weight: 0.2 },
        { name: 'category', weight: 0.1 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    });
  }

  if (!query.trim()) return concepts;
  return conceptFuseInstance.search(query).map(r => r.item);
}

/**
 * Searches projects using Fuse.js fuzzy matching.
 */
export function searchProjects(query) {
  const projects = useProjectStore.getState().projects;
  if (!projects || projects.length === 0) return [];

  if (!projectFuseInstance || projectFuseInstance.list !== projects) {
    projectFuseInstance = new Fuse(projects, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'tags', weight: 0.3 },
        { name: 'overview.what', weight: 0.2 },
        { name: 'stack', weight: 0.1 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    });
  }

  if (!query.trim()) return projects;
  return projectFuseInstance.search(query).map(r => r.item);
}

/**
 * Searches both concepts and projects.
 */
export function searchAll(query) {
  if (!query.trim()) return { concepts: [], projects: [] };
  
  return {
    concepts: searchConcepts(query).slice(0, 10),
    projects: searchProjects(query).slice(0, 5),
  };
}

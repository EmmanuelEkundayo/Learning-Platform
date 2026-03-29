import fs from 'fs';
import path from 'path';

const conceptsDir = path.resolve('src/data/concepts');
const files = fs.readdirSync(conceptsDir).filter(f => f.endsWith('.json'));

let errors = 0;

files.forEach(file => {
  const filePath = path.join(conceptsDir, file);
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const requiredFields = ['id', 'slug', 'title', 'domain', 'category', 'difficulty', 'card', 'visualization', 'exercise', 'related', 'tags'];
    
    requiredFields.forEach(field => {
      if (!content[field]) {
        console.error(`Error in ${file}: Missing field "${field}"`);
        errors++;
      }
    });

    if (content.card) {
      const cardFields = ['intuition', 'analogy', 'time_complexity', 'space_complexity', 'when_to_use', 'gotchas'];
      cardFields.forEach(field => {
        if (!content.card[field]) {
          console.error(`Error in ${file}: Missing card field "${field}"`);
          errors++;
        }
      });
      if (!Array.isArray(content.card.when_to_use)) {
        console.error(`Error in ${file}: "card.when_to_use" should be an array`);
        errors++;
      }
      if (!Array.isArray(content.card.gotchas)) {
        console.error(`Error in ${file}: "card.gotchas" should be an array`);
        errors++;
      }
    }

    if (content.visualization) {
      if (!content.visualization.type) {
        console.error(`Error in ${file}: Missing visualization type`);
        errors++;
      }
    }

    if (content.exercise) {
      const exerciseFields = ['type', 'prompt', 'starter_code', 'solution', 'hints', 'test_code'];
      exerciseFields.forEach(field => {
        if (!content.exercise[field]) {
          console.error(`Error in ${file}: Missing exercise field "${field}"`);
          errors++;
        }
      });
      if (!Array.isArray(content.exercise.hints)) {
        console.error(`Error in ${file}: "exercise.hints" should be an array`);
        errors++;
      }
    }

    if (!Array.isArray(content.related)) {
      console.error(`Error in ${file}: "related" should be an array`);
      errors++;
    }
    if (!Array.isArray(content.tags)) {
      console.error(`Error in ${file}: "tags" should be an array`);
      errors++;
    }

  } catch (e) {
    console.error(`Error parsing ${file}: ${e.message}`);
    errors++;
  }
});

if (errors === 0) {
  console.log(`Successfully validated ${files.length} concepts.`);
  process.exit(0);
} else {
  console.error(`Found ${errors} errors in total.`);
  process.exit(1);
}

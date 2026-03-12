import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
    // Simulate a delay to demonstrate loading state in the UI
    await new Promise((resolve) => setTimeout(resolve, 2000));

    //throw new Error('Loading meals failed');

    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    // use ? as a placeholder to prevent SQL injection
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    // Generate a slug from the meal title
    // and sanitize the instructions to prevent XSS attacks
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    // nodeJS - Save the image to the public/images directory
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    // Write the image data to the file system
    // Buffer - for handling binary data in Node.js
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!');
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `).run(meal);
}
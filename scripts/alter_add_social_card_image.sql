-- Add social card background image URL (scraped from store page og:image). Run once.
ALTER TABLE products ADD COLUMN social_card_image VARCHAR(500) DEFAULT '' AFTER screenshots;

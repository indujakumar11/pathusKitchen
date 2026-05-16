import fs from 'fs';
import path from 'path';

const SRC = 'c:/Users/ADMIN/Documents/Client-project/pathusKitchen/src';

const replaceInFile = (filePath, replacements) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  replacements.forEach(r => {
    content = content.replaceAll(r.search, r.replace);
  });
  fs.writeFileSync(filePath, content, 'utf-8');
};

// 1. Emojis
replaceInFile(path.join(SRC, 'data/products.js'), [
  { search: " icon: '🌶️',", replace: "" },
  { search: " icon: '🍲',", replace: "" },
  { search: " icon: '☕',", replace: "" },
]);

replaceInFile(path.join(SRC, 'components/home/Categories.jsx'), [
  { search: "icon: '🌶️',", replace: "icon: ''," },
  { search: "icon: '🍲',", replace: "icon: ''," },
  { search: "icon: '☕',", replace: "icon: ''," },
]);

replaceInFile(path.join(SRC, 'components/home/HowWeMakeIt.jsx'), [
  { search: "icon: '🌾',", replace: "icon: ''," },
  { search: "icon: '☀️',", replace: "icon: ''," },
  { search: "icon: '🏺',", replace: "icon: ''," },
  { search: "icon: '📦',", replace: "icon: ''," },
  { search: "<span className=\"promise-icon\">🤝</span>", replace: "" },
]);

replaceInFile(path.join(SRC, 'components/home/About.jsx'), [
  { search: "icon: '🌿',", replace: "icon: ''," },
  { search: "icon: '🏺',", replace: "icon: ''," },
  { search: "icon: '📦',", replace: "icon: ''," },
  { search: "icon: '🤍',", replace: "icon: ''," },
  { search: "<span>🌶️</span>", replace: "" },
]);

replaceInFile(path.join(SRC, 'components/layout/Header.jsx'), [
  { search: "<span className=\"logo-icon\">🌶️</span>", replace: "" },
]);

replaceInFile(path.join(SRC, 'components/layout/Footer.jsx'), [
  { search: "<span>🌶️</span>", replace: "" },
]);

replaceInFile(path.join(SRC, 'pages/Products.jsx'), [
  { search: "<span>🌶️</span>", replace: "" },
]);

replaceInFile(path.join(SRC, 'pages/NotFound.jsx'), [
  { search: "<span className=\"nf-icon\">🌶️</span>", replace: "" },
]);

replaceInFile(path.join(SRC, 'pages/Checkout.jsx'), [
  { search: "<span className=\"co-brand-icon\">🌶️</span>", replace: "" },
]);

// Hero.jsx FLOATERS
const heroPath = path.join(SRC, 'components/home/Hero.jsx');
if (fs.existsSync(heroPath)) {
  const heroContent = fs.readFileSync(heroPath, 'utf-8');
  const newHeroContent = heroContent.replace(/const FLOATERS = \[[\s\S]*?\];/, 'const FLOATERS = [];');
  fs.writeFileSync(heroPath, newHeroContent, 'utf-8');
}

// 2. Fonts for amount/prices - TARGETING EXACT CSS BLOCKS
replaceInFile(path.join(SRC, 'components/products/ProductCard.css'), [
  { search: ".price-amount {\n  font-family: var(--font-heading);", replace: ".price-amount {\n  font-family: var(--font-body);" }
]);

replaceInFile(path.join(SRC, 'pages/ProductDetail.css'), [
  { search: ".pill-price {\n  font-family: var(--font-heading);", replace: ".pill-price {\n  font-family: var(--font-body);" },
  { search: ".pd-price {\n  font-family: var(--font-heading);", replace: ".pd-price {\n  font-family: var(--font-body);" }
]);

replaceInFile(path.join(SRC, 'components/cart/CartSidebar.css'), [
  { search: ".ci-price {\n  font-family: var(--font-heading);", replace: ".ci-price {\n  font-family: var(--font-body);" },
  { search: ".cart-summary__row strong {\n  font-family: var(--font-heading);", replace: ".cart-summary__row strong {\n  font-family: var(--font-body);" }
]);

replaceInFile(path.join(SRC, 'pages/Checkout.css'), [
  { search: ".co-item-price {\n  font-family: var(--font-heading);", replace: ".co-item-price {\n  font-family: var(--font-body);" },
  { search: ".co-summary-row strong {\n  font-family: var(--font-heading);", replace: ".co-summary-row strong {\n  font-family: var(--font-body);" }
]);

console.log("Cleanup complete");

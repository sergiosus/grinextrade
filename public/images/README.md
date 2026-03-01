# Site Images

Professional images for Grinex Trade LLC are stored here.

## Product images (replace with correct professional images)

### TASK 1 — Waffle Towels  
**File:** `waffle-towels.jpg`  
**Used for:** Product "Waffle Towels" / "Вафельные полотенца" (ProductCard, products data).  
**Content:** Stack of white waffle towels, waffle texture clearly visible, hotel or clean studio background, premium textile look, export catalog style.  
**Requirements:** Resolution minimum 1200×800, format JPG.

### TASK 2 — Oilfield O-rings  
**File:** `orings.jpg`  
**Used for:** Product "Oilfield O-rings" / "Уплотнительные кольца для нефтегазовой отрасли" + Oil & Gas category card on home.  
**Content:** Black rubber O-rings, multiple sizes, industrial metal surface background, oil & gas style.  
**Requirements:** Resolution minimum 1200×800, format JPG.

All references in the app use these paths; only replace the image files.

## Regenerating images

From the project root:

```bash
npm run download-images
```

This downloads images from Unsplash into `public/images/` with validation (content-type `image/*`, size &gt; 50 KB). Images are cropped to 1200×800 where specified. Existing valid files are kept. Failed downloads are skipped (no empty files written).

## Files

| File | Use |
|------|-----|
| `hero-export.jpg` | Home hero background |
| `textile.jpg` | Textile category card |
| `waffle-towels.jpg` | **Waffle Towels** product (see TASK 1 above) |
| `bed-linen.jpg` | Hotel Bed Linen product |
| `orings.jpg` | **Oil & Gas** category + **Oilfield O-rings** product (see TASK 2 above) |
| `seals.jpg` | Industrial Seals product |
| `industrial.jpg` | (Unused after category simplification) |
| `contact.jpg` | Contact section background |

Replace with custom photography by saving files with the same names.

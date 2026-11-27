# Ditsy — brand and creative direction

## The idea

**Ditsy** is a lifestyle brand for people who love dressing up and love giving even more.
Positioning: *Thoughtfully curated treasures for every occasion.*

**Tagline:** Wear it. Give it. Keep it.
Three verbs, three relationships with a piece: you wear the jewellery, you give the gift, and whatever came from Ditsy is the kind of thing people keep.

**What makes it different from every other Indian artificial-jewellery store:** we edit. We don't list a thousand near-identical jhumkas. We go through Delhi's markets, pick the few hundred pieces that make us stop, pair them with gifts that feel personal, and pack everything as if it were going to someone we know.

## Personality

Warm, witty, a little indulgent, never loud. The friend with great taste who always knows what to wear to the sangeet and what to bring the hosts. We sound like a person, not a catalogue: plain verbs, short sentences, specific details ("small batches, so the good ones go quickly") instead of adjectives ("exquisite", "stunning").

Avoid: "elevate", "curated selection of exquisite", exclamation marks, ALL CAPS, discount-shouting.

## Architecture

```
DITSY (master brand: midnight + pearl + champagne gold, Bodoni wordmark)
├── Ditsy Jewellery   → for her, for the occasion. Peacock and gold.
│     Earrings · Sets · Ornaments · Edits · Bundles
└── Ditsy Gifting     → for them, from you. Blush and rose.
      Return gifts · Build your box · Collections · Hampers · Bulk & corporate
```
Both verticals share type, layout and voice. Each has a sub-brand lockup (the Ditsy wordmark with *jewellery* or *gifting* set beneath it). They separate through **colour world** (jewellery on peacock with gold, gifting on blush with rose, the master brand on midnight and pearl) and **motif** (the jhumka for jewellery, the ribboned box for gifting).

Business rule carried into the build: every jewellery order includes a small surprise gift, which ties the two verticals together at the moment of unboxing.

## Colour (v003)

Three colour worlds under one roof. No browns, no glitter, no gold gradients.

| Token | Hex | Role |
|---|---|---|
| Midnight | `#0E1F2E` | Master brand. Text, primary buttons, dark sections, footer. A deep blue-black that makes gold and skin tones glow. |
| Midnight deep | `#091521` | Announcement bar, story section. |
| Pearl | `#FAF8F5` | Page ground. A clean, barely warm white. |
| Peacock | `#12403F` / deep `#0B2D2C` | Ditsy Jewellery's world. The colour of emerald and peacock feathers, made for gold to sit on. |
| Champagne gold | `#C29B57` | The only metallic. Rules, focus rings, the jewel on the wordmark. Never a gradient. |
| Champagne | `#E9DDC4` | Light text on dark grounds. |
| Blush | `#F5DFD9` | Ditsy Gifting's world. Soft, never bright pink. |
| Rose | `#C7787E` | Gifting accent, sale price. |
| Mist | `#ECEFEE` | Quiet fills behind photos and inputs. |
| Ink | `#15212C` | Body text. |

## Type

- **Bodoni Moda** (display): high-contrast Didone, the language of fashion mastheads. Used large and tight for headlines and the wordmark.
- **Jost** (text and UI): geometric, Futura-descended, clean at small sizes on mobile.
Sentence case everywhere. No tracked-out uppercase labels.

## Signature moment

The homepage hero tells the tagline as three photographs of people: **Wear it.** (a woman laughing in a silk sari and bangles), **Give it.** (someone opening a beautifully wrapped gift), **Keep it.** (a bride in red and gold). The slides cross-fade slowly while each photo settles into place; the three words double as the slide tabs with a thin champagne progress line. It pauses on hover, swipes on mobile and doesn't autoplay for reduced-motion visitors.

The 3D jewellery models now live only on product pages, where turning a piece actually helps someone decide.

## Imagery

No illustrations or generated images anywhere. Until Ditsy's own shoot exists, every product, collection and occasion shows a real photograph of that type of piece, drawn from free-licence pools in `src/data/photos.ts` (earrings, necklaces and sets, face ornaments, bangles and hand pieces, hair, candles, gift boxes). Lifestyle photos of people live in `src/data/imagery.ts`. Adding `images: [...]` to a product replaces the stand-in everywhere.

Photography brief for the shoot: warm window light, skin and fabric close-ups (silk, organza, brocade), product on pearl, midnight or blush seamless grounds, one prop at most (marigold, a teacup, a ribbon). Shoot earrings on a model at three-quarter profile so the jhumka hangs. Minimum 3000px on the long edge.

## Copy samples

- Homepage story: "We went through thousands of pairs in Delhi's oldest markets. A few hundred made us stop. Those are the ones we sell."
- Gifting: "Every gift should feel thoughtfully chosen." Then: "We put gifts together the way you would if you had the time."
- New arrivals: "Fresh from our last trip to the markets. Small batches, so the good ones go quickly."

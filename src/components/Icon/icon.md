# Icons are weird.

When we say "icon", we actually mean two things…

- a component that can be plopped anywhere in a layout
- a drawing that might be inside an icon, or button, or… whatever

For example, there's the little up/down carats that exist on expanding lists. You wouldn't call that an icon, it's more like an arrow.

Also, we have a bunch of wrappers and and options for displaying icons — like filled and outlined circles — that don't make sense when an icon is embedded inside a button.

It's sort of like emoji. In the context of desktop computers, an icon is a small picture that acts like a button. An emoji is also a small picture, but it's inline text content, not explicitly clickable. 💩 is not a poop icon.

This gets confusing in code, because a <Button /> might want an icon but not an <Icon />. "Oh, well just make the circular frames options of the component" yeah but we've still got an <Icon /> component that has its own icon (svg) as an intrinsic property.

Oh, also Icons have l0-2 sizes, and glyphs are 16, 20, 24, 28px in size. And "outline" in the context of an icon means a circle around the drawing; outline to a glyph is one of two different drawing styles.

So, for reference:

- a **glyph** is a small drawing
- an **icon** is a component that includes a glyph

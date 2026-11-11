# Saintz Skills

Two [Claude Code](https://claude.com/claude-code) skills for designing user interfaces that look intentional and polished instead of generic.

| Skill | What it does |
|---|---|
| [`saintz-design`](skills/saintz-design/SKILL.md) | My house **look**: a dark, monochrome "liquid glass" style with frosted controls, white for the selected state, and springy motion. It includes exact colors, type scale, radii, glass recipes, component conventions and animation curves, plus a copy-paste [`tokens.css`](skills/saintz-design/references/tokens.css). |
| [`saintz-frontend`](skills/saintz-frontend/SKILL.md) | The **process and quality bar**: start from the subject, plan the design, challenge anything that's a generic default (the "AI slop" list), then build and critique. It covers layout, spacing, typography, color, component states, motion, interface copy and accessibility, plus a [layout & spacing reference](skills/saintz-frontend/references/layout-spacing.md). |

## Why they work together

They answer two different questions:

- **`saintz-frontend` answers *how* to design.** It works for any project and any brand: it makes Claude understand what's being built, plan a small token system, align everything to a grid and a spacing scale, design every state, write clear copy, and check the result at every screen size. It deliberately avoids the default looks that make generated pages feel templated.
- **`saintz-design` answers *what it should look like*** when the project is one of mine or when you want this particular style. It's a finished visual language, so there's no need to invent a new palette or type scale each time.

When both load, `saintz-frontend` runs the process and `saintz-design` supplies the look. Some things `saintz-frontend` lists as generic defaults (small uppercase eyebrow labels, `A · B · C` meta lines, hover lifts on cards) are deliberate parts of the `saintz-design` style. The skills say so, so they don't contradict each other. For any other brand or brief, `saintz-frontend` picks the look from the subject instead. Your own instructions always override both.

## Install

Copy the folders from `skills/` into your Claude Code skills directory:

- **Personal (all projects):** `~/.claude/skills/` (Windows: `%USERPROFILE%\.claude\skills\`)
- **One project only:** `<project>/.claude/skills/`

```bash
git clone https://github.com/saintzdid12/saintz-skills.git
cp -r saintz-skills/skills/* ~/.claude/skills/
```

Claude Code picks them up automatically. They load whenever you ask for UI work: building or restyling a page, app, component, dashboard or mockup, or asking for something to look better, cleaner or less generic. You can also call one directly by name, e.g. `/saintz-frontend`.

Want only the process without my look? Install just `saintz-frontend`.

## Credits

`saintz-frontend` is inspired by Anthropic's `frontend-design` skill and expands on its ideas. `saintz-design` is distilled from the interfaces of my own apps.

## License

[MIT](LICENSE)

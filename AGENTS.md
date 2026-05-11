# AGENTS.md - bricoymadera.com

## Reglas obligatorias

1. **Verificar antes de continuar**: tras modificar cualquier archivo, léelo con `read` antes de dar el siguiente paso. Nunca asumas que se escribió correctamente.
2. **Revisar skills disponibles**: antes de escribir artículos, copy o análisis, comprueba si existe una skill aplicable (`copywriting`, `keyword-research`, etc.) y úsala.

## Comandos

| Acción | Comando |
|---|---|
| Dev server | `hugo server` |
| Build producción | `hugo --gc --minify` |
| Crear nuevo contenido | `hugo new content <seccion>/<nombre>.md` |
| Actualizar tema | `git submodule update --remote --merge` |

## Stack y arquitectura

- **Hugo v0.161.0** (extended) + tema **PaperMod** (submódulo git).
- **Deploy**: GitHub Actions (`.github/workflows/hugo.yml`) → GitHub Pages. Se activa con push a `main`.
- **Dominio**: `bricoymadera.com` gestionado en Cloudflare (DNS → GitHub Pages).
- **Sin Node.js**: proyecto puro Hugo, no hay `package.json` ni build JS.

## Estructura de contenido

```
content/
  herramientas/          → artículos de reviews/guías (sección principal)
    _index.md            → listado de sección
    <articulo>.md        → posts individuales
  sobre-mi/
    _index.md            → página "Sobre Nosotros"
```

- `mainSections = ['herramientas']` en `hugo.toml` controla qué aparece en la home.
- Permalinks: `/herramientas/:slug/` para artículos, `/:slug/` para sobre-mi.
- Taxonomías: `categories` y `tags`.

## Shortcode Amazon

Todos los enlaces de afiliados usan `{{< amazon url="..." text="..." >}}` (`layouts/shortcodes/amazon.html`).

- Atributos obligatorios: `rel="nofollow sponsored noopener"`, `target="_blank"`.
- **Nunca** poner enlaces de Amazon directamente en markdown sin el shortcode.
- Texto por defecto: `"Ver precio en Amazon →"`.

## Imágenes

- Ubicación: `static/images/` (formato `.webp`).
- Referencia en contenido: ruta absoluta `/images/nombre-archivo.webp`.
- Nombres en `kebab-case` descriptivo.
- `alt` text obligatorio en cada imagen (en español, descriptivo).

## Convenciones de contenido

- **Idioma**: español (es-es).
- **Frontmatter**: `title`, `date`, `draft`, `description`, `tags`, `categories`.
- **Fechas**: formato `YYYY-MM-DDTHH:MM:SS+02:00`. `buildFuture = false` — artículos con fecha futura no se publican.
- **Nota de transparencia**: cada artículo con enlaces de afiliados debe incluir la nota de divulgación de Amazon Afiliados cerca del inicio.
- **Tono**: dirigido a principiantes, cercano, sin tecnicismos innecesarios.

## CI/CD

- Workflow: `.github/workflows/hugo.yml`
- Hugo se instala desde `.deb` en cada run (no hay cache).
- `submodules: recursive` es obligatorio para clonar PaperMod.
- Artifact: `./public` → GitHub Pages.

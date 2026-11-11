<div align="center">

# ProfileTTY

**Tu identidad, en caracteres.**

Tarjetas de perfil de GitHub con estética de terminal, generadas a partir de un archivo ASCII y una pequeña configuración JSON.

[![CI](https://github.com/KaduKessler/profiletty/actions/workflows/ci.yml/badge.svg)](https://github.com/KaduKessler/profiletty/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Node.js 24.12+](https://img.shields.io/badge/node-24.12%2B-339933.svg)
![Dependencies: 0](https://img.shields.io/badge/dependencies-0-brightgreen.svg)

[Inicio rápido](#inicio-rápido) · [Configuración](#configuración) · [Temas](#temas) · [Úsalo en GitHub](#úsalo-en-github)

[English](README.md) · [Português](README.pt.md) · [Español](README.es.md)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/profile-dark.svg">
  <img src="docs/profile-light.svg" alt="Ejemplo de ProfileTTY: marca de prompt en ASCII junto al trabajo, tecnologías y entorno de desarrollo" width="900">
</picture>

</div>

## Características

- **SVG estático.** Sin servidor, clave de API, analítica ni generador alojado. La tarjeta vive en tu repositorio.
- **20 temas de color.** Dracula, Nord, Tokyo Night, Catppuccin y más, además de tus propios colores.
- **Claro y oscuro.** Una tarjeta por modo, elegida automáticamente por GitHub.
- **Tu arte ASCII.** Cualquier archivo de texto, con los espacios conservados.
- **Seguro y accesible.** Los valores se escapan para XML, los textos largos se dividen en líneas y cada SVG tiene título y descripción.
- **Cero dependencias.** TypeScript nativo en Node.js, con un subconjunto de Fira Code incluido en cada SVG.

## Inicio rápido

Requiere **Node.js 24.12 o posterior** (se recomienda 26 LTS). No necesitas `npm install`.

```sh
git clone https://github.com/KaduKessler/profiletty.git
cd profiletty
npm run build
```

Esto genera la tarjeta de ejemplo en `dist/`:

```text
dist/
├── README.md
├── profile-dark.svg
└── profile-light.svg
```

Para personalizarla, copia `examples/profile.json`, sustituye los datos y apunta `ascii` a tu archivo de texto (ruta relativa al JSON). Las claves del JSON siguen en inglés; puedes traducir el contenido de los campos.

```sh
npm run card -- path/to/profile.json dist
```

## Configuración

```json
{
  "heading": "yourname@github",
  "ascii": "logo.txt",
  "groups": [
    {
      "name": "Work",
      "fields": [
        { "label": "Build", "value": "What you make" }
      ]
    },
    {
      "name": "Environment",
      "fields": [
        { "label": "Editor", "value": "Your editor" }
      ]
    }
  ]
}
```

| Configuración | Valor admitido |
| --- | --- |
| `heading` | Texto no vacío, hasta 40 caracteres |
| `ascii` | Ruta de un archivo de texto local |
| `groups` | De 1 a 8 grupos |
| `groups[].name` | Texto no vacío, hasta 30 caracteres |
| `groups[].fields` | De 1 a 12 pares de etiqueta y valor |
| `label` | Texto no vacío, de una línea, hasta 14 caracteres |
| `value` | Texto no vacío, de una línea, hasta 240 caracteres |
| `palette` | Opcional: `true` (predeterminado) o `false` para ocultar los bloques de color |
| `prompt` | Opcional: `true` (predeterminado) o `false` para ocultar la línea de prompt superior |
| `leaders` | Opcional: `true` para dibujar líneas de puntos entre la etiqueta y el valor alineado a la derecha (predeterminado `false`) |
| `command` | Opcional: comando mostrado en el prompt, hasta 30 caracteres (predeterminado `profiletty`) |
| `theme` | Preset de colores opcional para cada modo, por ejemplo `{ "dark": "dracula", "light": "github-light" }`. Consulta [Temas](#temas) |
| `colors` | Sustituciones opcionales en hexadecimal para cada modo, por ejemplo `{ "dark": { "accent": "#ff8800" } }`. Consulta [Temas](#temas) |

### Arte ASCII

Usa un `.txt` de cualquier conversor, como el [Image to ASCII de ASCII Art Archive](https://www.asciiart.eu/image-to-ascii), o dibuja tu propio arte. ProfileTTY representa texto existente; no convierte imágenes. Usa ASCII imprimible, hasta 180 columnas y 100 líneas, con espacios en lugar de tabulaciones. No se admiten emojis ni dibujos con bloques Unicode.

## Temas

Elige un preset para cada modo con `theme`. El valor por defecto es `github-dark` y `github-light`.

<table>
  <tr>
    <td align="center"><b>dracula</b><br><img src="docs/themes/dracula.svg" alt="preset dracula" width="310"></td>
    <td align="center"><b>tokyo-night</b><br><img src="docs/themes/tokyo-night.svg" alt="preset tokyo-night" width="310"></td>
    <td align="center"><b>catppuccin-latte</b><br><img src="docs/themes/catppuccin-latte.svg" alt="preset catppuccin-latte" width="310"></td>
  </tr>
</table>

Los 20 presets están en la **[galería de temas](docs/THEMES.md)**.

```json
{
  "theme": { "dark": "tokyo-night", "light": "tokyo-night-day" }
}
```

Cualquier preset funciona en ambos modos. Cambia colores sueltos con `colors`: las claves permitidas son `bg`, `fg`, `dim`, `accent` y `border`, con valores `#rrggbb` (o `""` en `border` para quitar el borde). Los 16 bloques de la paleta vienen del preset.

```json
{
  "theme": { "dark": "dracula" },
  "colors": { "dark": { "accent": "#ff79c6" }, "light": { "border": "" } }
}
```

Los colores de los presets vienen de los proyectos indicados en [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). No son temas oficiales de esos proyectos y ProfileTTY no está afiliado a ellos. En Solarized, dos bloques de la paleta tienen el mismo color que el fondo; así se define la paleta original.

## Úsalo en GitHub

Copia el contenido de `dist/` a tu repositorio de perfil `USERNAME/USERNAME` (o primero a un repositorio de prueba), manteniendo el README y los SVG en el mismo directorio. Guarda una copia de tu README antes de sustituirlo y añade tus enlaces debajo de la imagen.

El README generado elige el SVG claro u oscuro con el soporte de GitHub para `<picture>`. No hay JavaScript ni servicio alojado:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="profile-dark.svg">
  <img src="profile-light.svg" alt="Developer profile" width="1000">
</picture>
```

No combines `prefers-color-scheme` con otras condiciones, como `max-width`, en el mismo `media`: GitHub reescribe las fuentes de tema para quien ha iniciado sesión y descarta la condición extra. Los enlaces dibujados dentro de un SVG no sustituyen los enlaces Markdown. Comprueba el resultado en GitHub en ambos temas. Consulta el [anuncio de GitHub sobre imágenes según el tema](https://github.blog/changelog/2022-05-19-specify-theme-context-for-images-in-markdown-beta/).

Clona para generar localmente y copia solo el resultado a tu perfil. Haz un fork si quieres mantener tu propia versión y recibir actualizaciones. El proyecto no es un paquete npm ni un servicio alojado.

## Desarrollo

```sh
npm test
npm run build
npm run docs   # regenera docs/ (el CI falla si están desactualizados)
```

Las pruebas cubren validación (incluidos los mensajes de error), escape de XML, división de líneas, altura según el contenido, temas y la CLI. Node elimina los tipos durante la ejecución; las pruebas no equivalen a una comprobación estática de tipos. Consulta [CONTRIBUTING.md](CONTRIBUTING.md), en inglés.

## Autor y licencia

Creado por [Carlos Kessler](https://github.com/KaduKessler). El código y la documentación se distribuyen bajo la [licencia MIT](LICENSE). Los avisos de terceros (Fira Code, colores de GitHub Primer, temas de color) están en [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

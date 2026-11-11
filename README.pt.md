<div align="center">

# ProfileTTY

**Sua identidade, em caracteres.**

Gere cartões de perfil para o GitHub com visual de terminal usando um arquivo ASCII local e uma pequena configuração JSON.

Node.js 24.12+ · TypeScript · Sem dependências de execução · Sem API hospedada

[English](README.md) · [Português](README.pt.md) · [Español](README.es.md)

</div>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/profile-dark.svg">
  <img src="docs/profile-light.svg" alt="Exemplo do ProfileTTY: marca de prompt em ASCII com atuação, tecnologias e ambiente de desenvolvimento" width="1000">
</picture>

## Um perfil que fica no seu repositório

O ProfileTTY gera SVGs estáticos. Seu README não precisa de servidor, chave de API, serviço de análise ou gerador externo de imagens. Os valores são escapados para XML, textos longos quebram em linhas e a altura acompanha o conteúdo.

- Temas claro e escuro.
- Composição lado a lado, no estilo terminal.
- Arte ASCII centralizada, preservando espaços.
- Configuração JSON local com campos agrupados.
- Títulos e descrições acessíveis nos SVGs.

## Experimente

Use **Node.js 26 LTS** no desenvolvimento. **Node.js 24.12 ou superior** também é compatível. A execução de TypeScript é nativa; o gerador não compila nem verifica tipos com `tsc`.

```sh
git clone https://github.com/KaduKessler/profiletty.git
cd profiletty
npm test
npm run build
```

Não é necessário executar `npm install`.

A saída é gravada em `dist/`:

```text
dist/
├── README.md
├── profile-dark.svg
└── profile-light.svg
```

## Personalize

Copie `examples/profile.json` e substitua os dados. Em `ascii`, indique seu próprio arquivo de texto; o caminho é resolvido em relação ao arquivo JSON. As chaves do JSON permanecem em inglês; você pode traduzir os textos dos campos.

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

Gere seu cartão:

```sh
npm run card -- path/to/profile.json dist
```

| Configuração | Valor aceito |
| --- | --- |
| `heading` | Texto não vazio, até 40 caracteres |
| `ascii` | Caminho de um arquivo de texto local |
| `groups` | De 1 a 8 grupos |
| `groups[].name` | Texto não vazio, até 30 caracteres |
| `groups[].fields` | De 1 a 12 pares de rótulo e valor |
| `label` | Texto não vazio, em uma linha, até 14 caracteres |
| `value` | Texto não vazio, em uma linha, até 240 caracteres |
| `palette` | Opcional: `true` (padrão) ou `false` para ocultar os blocos de cor |
| `prompt` | Opcional: `true` (padrão) ou `false` para ocultar a linha de prompt no topo |
| `leaders` | Opcional: `true` para desenhar linhas de pontos entre o rótulo e o valor, alinhado à direita (padrão `false`) |
| `command` | Opcional: comando exibido no prompt, até 30 caracteres (padrão `profiletty`) |
| `theme` | Preset de cores opcional para cada modo, por exemplo `{ "dark": "dracula", "light": "github-light" }`. Veja [Temas](#temas) |
| `colors` | Substituições opcionais em hexadecimal para cada modo, por exemplo `{ "dark": { "accent": "#ff8800" } }`. Veja [Temas](#temas) |

A arte aceita caracteres ASCII imprimíveis, até 180 colunas e 100 linhas. Preserve os espaços à esquerda e use espaços em vez de tabulações. Emojis e desenhos com blocos Unicode não são aceitos. Cada SVG embute um subconjunto da Fira Code, então a aparência não depende das fontes instaladas.

## Temas

Cada cartão tem uma imagem escura e uma clara. Você escolhe um preset para cada uma com `theme`; o padrão é `github-dark` e `github-light`.

| Preset | Aparência |
| --- | --- |
| `github-dark`, `github-light` | Cores do GitHub Primer (padrão) |
| `dracula` | Dracula, escuro |
| `tokyo-night`, `tokyo-night-day` | Tokyo Night, escuro e claro |
| `solarized-dark`, `solarized-light` | Solarized, escuro e claro |

```json
{
  "theme": { "dark": "tokyo-night", "light": "tokyo-night-day" }
}
```

Qualquer preset funciona nos dois modos, então `"dark": "solarized-light"` é permitido. Um cartão claro numa página escura é escolha sua.

Troque cores avulsas com `colors`. As chaves aceitas são `bg`, `fg`, `dim`, `accent` e `border`. Use valores `#rrggbb`, ou `""` em `border` para tirar a borda. Os 16 blocos da paleta vêm do preset.

```json
{
  "theme": { "dark": "dracula" },
  "colors": { "dark": { "accent": "#ff79c6" }, "light": { "border": "" } }
}
```

Veja todos os presets renderizados em [docs/THEMES.md](docs/THEMES.md).

As cores dos presets vêm dos projetos listados em [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Não são temas oficiais desses projetos, e o ProfileTTY não é afiliado a eles. No Solarized, dois blocos da paleta têm a mesma cor do fundo; é assim que a paleta original é definida.

## Crie sua arte ASCII

Use um `.txt` de qualquer conversor ou desenhe sua arte. O ProfileTTY renderiza texto existente; não converte imagens. Conversores como o [Image to ASCII do ASCII Art Archive](https://www.asciiart.eu/image-to-ascii) servem; não são dependência de execução. Exporte como texto e preserve os espaços.

## Use no GitHub

Copie o conteúdo de `dist/` para seu repositório de perfil `USERNAME/USERNAME`, ou primeiro para um repositório de teste. Mantenha o README gerado e os SVGs na mesma pasta para os caminhos relativos funcionarem. Faça uma cópia do README atual antes de substituí-lo. Adicione seus links clicáveis abaixo da imagem.

O `<picture>` gerado seleciona a imagem clara ou escura. O comportamento final depende do GitHub e do ambiente de visualização; confira os dois temas. Em telas pequenas o card reduz junto com a página. Links desenhados dentro da imagem não substituem links Markdown.

### Seleção automática de tema

O README gerado usa o suporte do GitHub a `<picture>` para selecionar um SVG claro ou escuro previamente gerado conforme o tema de quem visualiza. Não é necessário JavaScript nem serviço hospedado. O SVG não muda de cor sozinho; o ambiente de visualização escolhe qual imagem exibir.

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="profile-dark.svg">
  <img src="profile-light.svg" alt="Developer profile" width="1000">
</picture>
```

Não combine `prefers-color-scheme` com outras condições, como `max-width`, no mesmo `media`: o GitHub reescreve as fontes de tema para quem está logado e descarta a condição extra. Ajuste os caminhos relativos conforme a pasta dos SVGs.

Veja o [anúncio do GitHub sobre imagens conforme o tema](https://github.blog/changelog/2022-05-19-specify-theme-context-for-images-in-markdown-beta/). Confira o resultado no GitHub nos dois temas.

### Fork, clone ou download?

- **Fork:** mantenha sua cópia no GitHub, personalize e acompanhe melhorias do projeto original.
- **Clone:** gere localmente e copie apenas a saída para seu perfil.
- **Download ZIP:** obtenha uma cópia local sem histórico Git.

Para criar um cartão, clonar e copiar os arquivos gerados é o caminho mais simples. Faça um fork se quiser manter uma versão própria e receber atualizações. O projeto não é um pacote npm nem um serviço hospedado.

## Desenvolvimento

```sh
npm test
npm run build
```

Os testes cobrem validação (incluindo mensagens de erro), escape de XML, quebra de linhas, altura conforme o conteúdo e a CLI. O Node remove os tipos na execução; os testes não equivalem a uma verificação estática de tipos.

Veja o fluxo de contribuição em [CONTRIBUTING.md](CONTRIBUTING.md), em inglês.

## Autor

Criado por [Carlos Kessler](https://github.com/KaduKessler).

## Licença

Código e documentação estão sob a [licença MIT](LICENSE).

Os avisos de terceiros (Fira Code, cores do GitHub Primer) estão em [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

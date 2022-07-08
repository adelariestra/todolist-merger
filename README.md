# TO DO LIST MERGER
---
> Project used to merge plain text and markdown files within a folder structure.

## Execution
### Options
`node $0 -m [a, t, p, s, g] -i [i, n] -r rootDir -o outputDir'`
- m: merge type
- i: iteration type (implementation pending)

Merge Types
- a: all, merges the full file
- t: only merges todolists
- p: within todolist, it get rids of all completed items
- s: structure, meaning it gets the file structure starting from the rootDir
- g: structure generation, generating as an output a file with bat commands to create the full directory in Windows.

### Example Outputs
#### s - Structure
```md

```

#### g - Structure Generation
```md

```

#### a - All
```md

```

#### t - To Do Lists
```md

```

#### p - Pending Items
```md

```


## Scripts: Building and Running the Scripts
<!-- TODO: pending -->

## General Considerations
Style Guide: https://google.github.io/styleguide/tsguide.html

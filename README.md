# Fun with Dataloaders
https://github.com/graphql/dataloader

## Why dataloaders?
- Elaborate on batching. Mention caching
### Batching
What is it? N+1
#### Why does it matter?
### Caching

## Examples without dataloader
### Most naive example (always fetch, regardless of graphql request)
- `console.log`
### Slightly better example (only fetch when asked, nested resolver)
- `console.log`

## Example with dataloader
### Instantiate dataloader manually
- `console.log`
#### Size matters
- don't return nulls
#### Order matters
- screw up the order
### Add dataloader to context


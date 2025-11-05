# Principles of this project

As I rembember and as I look through the project, I think there are some points that are important to point out.

## Update things (mostly) in-place

As I go along I'm trying to keep to the original spirit, at least where convenient.

An example of the kind of weirdness that I'm looking to preserve is keeping the structure of the game being self-contained and usable on its own as well as able to be puppeteered by the editor when loaded through an iframe.

Which is not to say anything about the fact that the types in `/editor/game/src/types.ts` are game types which get imported not only in the game but in the editor as well.

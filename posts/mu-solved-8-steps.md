Tonight I tried the MU Puzzle:

> Let's suppose to have the symbols `M`, `I`, and `U` which can be combined to produce strings of symbols or "words". The `MU` puzzle asks to start with a the "axiomatic" word `MI` and transform it into the word `MU` using in each step one of the following transformation rules:

> 1. At the end of any string ending in `I`, you can add a `U`, such as changing `MI` to `MIU`.
> 2. You can double any string after the `M` (that is, change `M`x, to `M`xx), such as changing `MIU` to `MIUIU`.
> 3. You can replace any `III` with a `U`, such as changing `MUIIIU` to `MUUU`.
> 4. You can remove any `UU`, such as changing `MUUU` to `MU`.

> Using these 4 rules is it possible to change `MI` into `MU`?

Woo-Hoo!!  I solved it!

1.  `MII`   (rule 2)
2.  `MIIII`  (rule 2)
3.  `MIIIIU` (rule 1)
4.  `MIUU` (rule 3)
5.  `MIUUIUU` (rule 2)
6.  `MIUUIUUIUU` (rule 2) 
7.  `MIII` (rule 4)
8.  `MU` (rule 3)

...then I learned that [there is no solution](http://en.wikipedia.org/wiki/MU_puzzle).  Thanks Wikipedia for making me feel like an idiot.  Can you spot my mistake?  

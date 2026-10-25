<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project structure rules
- All quiz app code lives in `src/quiz/` (`questions.ts` for the question bank, `types.ts` for shared constants, `QuizApp.tsx` as the single state owner, `components/` for reusable screens). `src/routes/index.tsx` only renders `<QuizApp />` — keep it that way so the quiz stays portable.

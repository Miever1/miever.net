/**
 * "Today I Learned" — short, dated notes. The single source for both the home
 * snapshot (latest few) and the full /notes page. Bilingual via the L() helper.
 *
 * Add a new entry at the TOP (entries render in array order). Keep each one to a
 * sentence or two — this is a low-friction stream, not the blog.
 *
 * NOTE (Aerman): the entries below are seed examples drawn from things that
 * actually came up — replace/extend them with your own as you go.
 */

export interface Localized {
    en: string;
    zh: string;
}

const L = (en: string, zh: string): Localized => ({ en, zh });

export type Lang = "en" | "zh";
export const pickLang = (value: Localized, lang: Lang): string => value[lang] || value.en;

export interface NotesEntry {
    id: string;
    /** ISO date (YYYY-MM-DD); shown and used for ordering context. */
    date: string;
    /** Short topic tag, e.g. "CSS", "Gatsby", "AI". */
    tag?: string;
    title: Localized;
    body: Localized;
    /** Optional reference link. */
    link?: { url: string; label?: Localized };
}

/** Newest first. */
export const notes: NotesEntry[] = [
    {
        id: "kind-feedback-during-job-search",
        date: "2026-07-07",
        tag: "Job Search",
        title: L(
            "A small kind reply can mean a lot",
            "找工作时,一封认真回复也会很重要",
        ),
        body: L(
            "During the job search, most rejections are silent or generic. Recently, someone from a startup took the time to mention what stood out in my background and offered to give more specific feedback if I applied for other roles. It did not change the outcome, but it made me feel seen. When the process gets tiring, small moments like this can still bring some warmth.",
            "找工作的时候,大多数拒信都很安静,或者很模板化。最近有一位 startup 的创始人认真提到了我背景里让他印象深刻的部分,还说如果我之后申请其他岗位,可以帮我看具体材料并给一些反馈。结果并没有改变,但那一刻会觉得自己有被看见。求职很累的时候,这种小小的善意还是会带来一些温暖。",
        ),
    }
];

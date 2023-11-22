import { Data } from '@/types/model';
import tutorials from '@/mock/tutorial.json';

export async function getTutorialBySlug(slug: string): Promise<Data.TutorialDetail | null> {
    for (const tutorialGroup of tutorials) {
        const tutorial = tutorialGroup.data.find((item) => item.slug === slug);
        if (tutorial) {
            const tutorialDetail: Data.TutorialDetail = {
                data: tutorial,
            };
            return tutorialDetail;
        }
    }

    return null;
}

export async function getTutorialSlugs(): Promise<string[]> {
    const slugs: string[] = [];

    for (const tutorialGroup of tutorials) {
        for (const tutorial of tutorialGroup.data) {
            slugs.push(tutorial.slug);
        }
    }

    return slugs;
}
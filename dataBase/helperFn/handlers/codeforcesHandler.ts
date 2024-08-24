import puppeteer, { Browser, Page } from 'puppeteer';
import { Platform, Status, Student } from '../../../types';
import * as cheerio from 'cheerio';

let browser: Browser | null = null;
let page: Page | null = null;

export const makeFriend = async (userHandle: string): Promise<void> => {
    if (!page) {
        await loginToCodeforces();
    }

    console.log(`Navigating to profile page for user ${userHandle}`);
    await page?.goto(`https://codeforces.com/profile/${userHandle}`);

    // console.log(`Checking if ${userHandle} is already a friend.`);
    const isAlreadyFriend = await page?.evaluate(() => {
        const starIcon = document.querySelector('img.removeFriend.friendStar') as HTMLImageElement;
        return starIcon; // Indicates user is already a friend
    });

    if (isAlreadyFriend) {
        console.log(`User ${userHandle} is already a friend.`);
        return;
    }

    // console.log(`Attempting to add ${userHandle} as a friend.`);
    const friendIcon = await page?.waitForSelector('img.addFriend.friendStar', { visible: true, timeout: 60 })
        .catch(() => {
            // console.log(`Element not found for ${userHandle}. Perhaps the user doesn't exist or is already a friend.`);
            return null;
        });

    if (!friendIcon) {
        return;
    }

    await friendIcon.click();
    console.log(`${userHandle} added as a friend.`);
};


export const dbStudentToOurStudent = (student: any): Student => {
    return {
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
        cpProfiles: {
            codeforces: student.codeforces,
            codechef: student.codechef,
            atcoder: student.atcoder,
            cses: student.cses,
        },
    };
}



export const isLoggedIn = async (): Promise<boolean> => {
    if (!page) return false;
    try {
        await page.goto('https://codeforces.com/');
        const loggedIn = await page.$('a[href*="logout"]') !== null;
        return loggedIn;
    } catch (error) {
        console.error('Failed to check login status:', error);
        return false;
    }
};

export const loginToCodeforces = async (): Promise<void> => {
    if (await isLoggedIn()) {
        console.log('Already logged in.');
        return;
    }

    const username = 'dummy_96';
    const password = '12345678';
    
    // browser = await puppeteer.launch({ headless: true });
    browser = await puppeteer.launch({
        headless: true, // Set to true if you don't want the browser to open
        slowMo: 100,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();

    try {
        await page.goto('https://codeforces.com/enter');
        await page.type('#handleOrEmail', username);
        await page.type('#password', password);
        await page.click('input[type="submit"]');
        await page.waitForNavigation();
        console.log('Login successful.');
    } catch (error) {
        console.error('Login failed:', error);
        if (browser) await browser.close();
    }
};

export const checkStudentSolution = async (problemURL: string, studentId: string): Promise<string> => {
    if (!page) {
        return 'Page is not initialized. Please log in first.';
    }

    try {
        await page.goto(`https://codeforces.com/submissions/${studentId}`);

        const accepted = await page.evaluate((problemURL) => {
            const rows = Array.from(document.querySelectorAll('.status-frame-datatable tr'));
            for (const row of rows) {
                const problemLink = row.querySelector('a') as HTMLAnchorElement;
                const verdict = row.querySelector('.verdict-accepted');
                if (problemLink && verdict && problemLink.href === problemURL) {
                    return true;
                }
            }
            return false;
        }, problemURL);

        return accepted
            ? `User ${studentId} has an accepted solution for this problem.`
            : `User ${studentId} does not have an accepted solution for this problem.`;

    } catch (error) {
        console.error('An error occurred while checking the solution:', error);
        return 'Error occurred while checking the solution.';
    }
};

export const closeBrowser = async (): Promise<void> => {
    if (browser) {
        console.log('Closing browser.');    
        await browser.close();
        browser = null;
        page = null;
    }
};

function determineUrlType(url: string): string {
    if (url.includes('/gym/')) return 'gym';
    if (url.includes('/group/')) return 'group';
    if (url.includes('/edu/')) return 'edu';
    if (url.includes('/contest/')) return 'contest';
    return 'unknown';
}

export const handleCodeforces = async (problemURL: string, userId: string): Promise<string> => {
    await loginToCodeforces();
    const result = await checkStudentSolution(problemURL, userId);
    await closeBrowser();
    return result;
};

export interface StandingEntry {
    row: string[];
}
export const getStandings = async (link: string): Promise<StandingEntry[]> => {
    const standings: StandingEntry[] = [];
    let currentPage = 1;

    try {
        if(!page || !browser) {
            await loginToCodeforces();
        }

        async function scrapePage(url: string) {
            await page?.goto(url, { waitUntil: "networkidle2" });
            await page?.waitForSelector("table.standings tbody");

            if(!page) return;
            const content = await page.content();
            // console.log(content);
            const $ = cheerio.load(content);

            $("table.standings tbody tr").each((index, element) => {
                const row: string[] = [];

                $(element).find("td").each((i, td) => {
                    row.push($(td).text().trim());
                });

                standings.push({ row });
            });
        }

        while (true) {
            const url = `${link}/page/${currentPage}`;
            await scrapePage(url);
            // if(!page) return;
            const nextPageData = await (page ? page.evaluate(() => {
                const activePage = document.querySelector(
                    ".custom-links-pagination .page-index.active"
                );
                if (activePage) {
                    const nobr = activePage.closest("nobr");
                    if (nobr) {
                        const nextNobr = nobr.nextElementSibling;
                        if (nextNobr) {
                            const nextPageLink = nextNobr.querySelector("a");
                            return !!nextPageLink;
                        }
                    }
                }
                return false;
            }) : false);

            if (nextPageData) {
                currentPage += 1;
            } else {
                break;
            }
        }
    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        closeBrowser();
    }

    return standings;
};

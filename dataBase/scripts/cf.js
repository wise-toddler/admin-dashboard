const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false, // Set to true if you don't want the browser to open
            slowMo: 100,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();
        const baseUrl = "https://codeforces.com/contest/1839/standings";
        const standings = [];
        let currentPage = 1;

        async function scrapePage(url) {
            console.log(`Navigating to ${url}`);
            await page.goto(url, { waitUntil: "networkidle2" });
            await page.waitForSelector("table.standings tbody");

            const content = await page.content();
            const $ = cheerio.load(content);

            $("table.standings tbody tr").each((index, element) => {
                const rank = $(element).find("td").eq(0).text().trim();
                const handle = $(element)
                    .find("td")
                    .eq(1)
                    .find("a")
                    .text()
                    .trim();
                const score = $(element).find("td").eq(3).text().trim();

                if (rank || handle || score) {
                    standings.push({ rank, handle, score });
                }
            });

            console.log(`Scraped ${standings.length} entries from ${url}`);
        }

        // Loop to handle pagination
        while (true) {
            const url = `${baseUrl}/page/${currentPage}`;
            await scrapePage(url);

            // Check if there's a next page
            const nextPageData = await page.evaluate(() => {
                const activePage = document.querySelector(
                    ".custom-links-pagination .page-index.active"
                );
                if (activePage) {
                    console.log(
                        `Active page: ${activePage.getAttribute("pageindex")}`
                    );
                    const nobr = activePage.closest("nobr"); // Get the closest parent <nobr> element
                    if (nobr) {
                        const nextNobr = nobr.nextElementSibling; // Check the next <nobr> sibling
                        if (nextNobr) {
                            const nextPageLink = nextNobr.querySelector("a");
                            return {
                                hasNext: !!nextPageLink,
                                reason: nextPageLink
                                    ? "Next page exists"
                                    : "Next page link not found",
                            };
                        } else {
                            console.log("No next <nobr> sibling found.");
                            return {
                                hasNext: false,
                                reason: "No next <nobr> sibling found.",
                            };
                        }
                    } else {
                        console.log("No <nobr> parent found for active page.");
                        return {
                            hasNext: false,
                            reason: "No <nobr> parent found.",
                        };
                    }
                } else {
                    console.log("No active page found.");
                    return { hasNext: false, reason: "No active page found." };
                }
            });

            console.log(`Next page check: ${nextPageData.reason}`);

            if (nextPageData.hasNext) {
                console.log(`Moving to next page: ${currentPage + 1}`);
                currentPage += 1; // Move to the next page
            } else {
                console.log("No more pages available. Exiting loop.");
                break; // No more pages, exit the loop
            }
        }

        console.log("All standings:", standings);

        // Write the standings data to a CSV file
        const csvContent =
            "Rank,Handle,Score\n" +
            standings
                .map((row) => `${row.rank},${row.handle},${row.score}`)
                .join("\n");
        fs.writeFileSync("leaderboard.csv", csvContent, "utf8");

        console.log("Standings have been written to leaderboard.csv");

        await browser.close();
    } catch (error) {
        console.error("Error occurred:", error);
    }
})();
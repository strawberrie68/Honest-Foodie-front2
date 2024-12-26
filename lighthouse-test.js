import puppeteer from "puppeteer";
import lighthouse from "lighthouse";
import fs from "fs/promises";

async function runLocalLighthouse() {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
  });

  try {
    const page = await browser.newPage();

    // Go to local login page
    await page.goto("http://localhost:5174/login");

    // Login (modify these selectors based on your form)
    await page.type("#email", "test@example.com");
    await page.type("#password", "test123");
    await page.click("#login-button");

    // If you're using localStorage instead of cookies
    // await page.evaluate(() => {
    //   // Add your localStorage setup here
    //   localStorage.setItem("userId", "your-test-user-id");
    //   // Add any other required localStorage items
    //   localStorage.setItem("token", "your-test-token");
    // });

    // Wait for login redirect or any indication that login is complete
    await page.waitForNavigation();
    // Or wait for a specific element that indicates successful login
    // await page.waitForSelector('#dashboard');

    // Run Lighthouse on your protected route
    const options = {
      port: new URL(browser.wsEndpoint()).port,
      output: "html",
      logLevel: "info",
    };

    // Run lighthouse on your target page
    const runnerResult = await lighthouse(
      "http://localhost:5174", // change to your protected route
      options,
      {
        extends: "lighthouse:default",
      },
    );

    // Save report
    await fs.writeFile("lighthouse-local-report.html", runnerResult.report);

    // Log scores
    console.log(
      "Performance Score:",
      runnerResult.lhr.categories.performance.score * 100,
    );
    console.log(
      "Accessibility Score:",
      runnerResult.lhr.categories.accessibility.score * 100,
    );
    console.log(
      "Best Practices Score:",
      runnerResult.lhr.categories["best-practices"].score * 100,
    );
    console.log("SEO Score:", runnerResult.lhr.categories.seo.score * 100);
  } catch (error) {
    console.error("Error running Lighthouse:", error);
  } finally {
    await browser.close();
  }
}

runLocalLighthouse();

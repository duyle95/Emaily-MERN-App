const puppeteer = require('puppeteer');

const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
  });

  page = await browser.newPage();
  await page.goto('localhost:3000');
});

afterEach(async () => {
  await browser.close();
});

test('the header has the correct text', async () => {
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);

  expect(text).toEqual('Emaily');
});

test('clicking login to start oauth flow', async () => {
  await page.click('.right a');

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test('when sign in, show log out button', async () => {
  const user = await userFactory();
  const { session, sig } = sessionFactory(user);

  await page.setCookie({ name: 'express:sess', value: session });
  await page.setCookie({ name: 'express:sess.sig', value: sig });
  await page.goto('localhost:3000');
  await page.waitFor('a[href="/api/logout"]');

  const text = await page.$eval('a[href="/api/logout"]', el => el.innerHTML);

  expect(text).toEqual('Logout');
});

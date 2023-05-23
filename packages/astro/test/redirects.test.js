import { expect } from 'chai';
import { loadFixture } from './test-utils.js';
import testAdapter from './test-adapter.js';

describe('Astro.redirect', () => {
	/** @type {import('./test-utils').Fixture} */
	let fixture;

	describe('output: "server"', () => {
		before(async () => {
			fixture = await loadFixture({
				root: './fixtures/ssr-redirect/',
				output: 'server',
				adapter: testAdapter(),
			});
			await fixture.build();
		});
	
		it('Returns a 302 status', async () => {
			const app = await fixture.loadTestAdapterApp();
			const request = new Request('http://example.com/secret');
			const response = await app.render(request);
			expect(response.status).to.equal(302);
			expect(response.headers.get('location')).to.equal('/login');
		});
	
		it('Warns when used inside a component', async () => {
			const app = await fixture.loadTestAdapterApp();
			const request = new Request('http://example.com/late');
			const response = await app.render(request);
			try {
				await response.text();
				expect(false).to.equal(true);
			} catch (e) {
				expect(e.message).to.equal(
					'The response has already been sent to the browser and cannot be altered.'
				);
			}
		});
	});

	describe('output: "static"', () => {
		before(async () => {
			process.env.STATIC_MODE = true;
			fixture = await loadFixture({
				root: './fixtures/ssr-redirect/',
				output: 'static',
				redirects: {
					'/one': '/',
					'/two': '/',
					'/blog/[...slug]': '/articles/[...slug]',
					'/three': {
						status: 302,
						destination: '/'
					}
				}
			});
			await fixture.build();
		});
	
		it('Includes the meta refresh tag in Astro.redirect pages', async () => {
			const html = await fixture.readFile('/secret/index.html');
			expect(html).to.include('http-equiv="refresh');
			expect(html).to.include('url=/login');
		});

		it('Includes the meta refresh tag in `redirect` config pages', async () => {
			let html = await fixture.readFile('/one/index.html');
			expect(html).to.include('http-equiv="refresh');
			expect(html).to.include('url=/');

			html = await fixture.readFile('/two/index.html');
			expect(html).to.include('http-equiv="refresh');
			expect(html).to.include('url=/');

			html = await fixture.readFile('/three/index.html');
			expect(html).to.include('http-equiv="refresh');
			expect(html).to.include('url=/');
		});

		it('Generates page for dynamic routes', async () => {
			let html = await fixture.readFile('/blog/one/index.html');
			expect(html).to.include('http-equiv="refresh');
			expect(html).to.include('url=/articles/one');

			html = await fixture.readFile('/blog/two/index.html');
			expect(html).to.include('http-equiv="refresh');
			expect(html).to.include('url=/articles/two');
		});
	});
});

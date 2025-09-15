export const load = async () => {
	if (typeof window !== 'undefined') {
		const w = window as any;
		if (!w.__console_patched__) {
			w.__console_patched__ = true;
			if (!import.meta.env?.DEV) {
				const orig = {
					log: console.log.bind(console),
					info: console.info.bind(console),
					debug: console.debug.bind(console),
					warn: console.warn.bind(console),
					error: console.error.bind(console),
					trace: console.trace.bind(console)
				};
				const allowSignature = (args: unknown[]) => {
					const first = (args as any[])[0];
					return typeof first === 'string' && first.includes('Developed by sharif');
				};
								const makeWrapper = (origFn: any) =>
									function () {
										const arr = Array.prototype.slice.call(arguments);
										if (allowSignature(arr)) origFn.apply(console, arr);
									};
				console.log = makeWrapper(orig.log);
				console.info = makeWrapper(orig.info);
				console.debug = makeWrapper(orig.debug);
				console.warn = makeWrapper(orig.warn);
				console.error = makeWrapper(orig.error);
				console.trace = makeWrapper(orig.trace);
			}
		}

		if (!('__sharif_sig__' in w)) {
			w.__sharif_sig__ = true;
			try {
				console.log('%cDeveloped by sharif', 'color:#00e1ff;font-weight:bold');
			} catch {
				// ignore
			}
		}
	}
	return {};
};
export const prerender = false;

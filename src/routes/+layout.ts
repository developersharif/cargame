export const load = async () => {
	if (typeof window !== 'undefined' && !('__sharif_sig__' in window)) {
		(window as any).__sharif_sig__ = true;
		try {
			console.log('%cDeveloped by sharif', 'color:#00e1ff;font-weight:bold');
		} catch {
			// ignore
		}
	}
	return {};
};
export const prerender = false;
